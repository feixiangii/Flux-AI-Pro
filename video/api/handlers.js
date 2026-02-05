/**
 * 影片生成 API 處理器
 */

import { VideoService } from '../core/video-service.js';
import { VideoRateLimiter } from '../core/rate-limiter.js';
import { POLLINATIONS_CONFIG } from '../config/pollinations.config.js';

/**
 * CORS 標頭
 * @param {Object} extra - 額外標頭
 * @returns {Object} CORS 標頭
 */
function corsHeaders(extra = {}) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    ...extra
  };
}

/**
 * 處理影片 API 請求
 * @param {Request} request - 請求物件
 * @param {Object} env - 環境變數
 * @returns {Promise<Response>} 回應
 */
export async function handleVideoAPI(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  // 處理 OPTIONS 預檢請求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders() });
  }

  const videoService = new VideoService(env);
  const rateLimiter = new VideoRateLimiter(env, POLLINATIONS_CONFIG);

  // 路由處理
  if (path === '/api/video/generate' && request.method === 'POST') {
    return handleGenerate(request, videoService, rateLimiter);
  } else if (path === '/api/video/models' && request.method === 'GET') {
    return handleModels(videoService);
  } else if (path === '/api/video/styles' && request.method === 'GET') {
    return handleStyles(videoService);
  } else if (path === '/api/video/sizes' && request.method === 'GET') {
    return handleSizes(videoService);
  } else if (path === '/api/video/quota' && request.method === 'GET') {
    return handleQuota(request, rateLimiter);
  } else if (path === '/api/video/config' && request.method === 'GET') {
    return handleConfig(videoService);
  }

  return new Response(
    JSON.stringify({ error: '未知的 API 端點' }), 
    { 
      status: 404, 
      headers: corsHeaders({ 'Content-Type': 'application/json' }) 
    }
  );
}

/**
 * 處理影片生成請求
 * @param {Request} request - 請求物件
 * @param {VideoService} videoService - 影片服務
 * @param {VideoRateLimiter} rateLimiter - 限流器
 * @returns {Promise<Response>} 回應
 */
async function handleGenerate(request, videoService, rateLimiter) {
  try {
    const body = await request.json();
    const { 
      prompt, 
      model, 
      width, 
      height, 
      fps, 
      duration, 
      referenceImage, 
      apiKey 
    } = body;

    // 驗證參數
    if (!prompt && !referenceImage) {
      return new Response(
        JSON.stringify({ error: '請提供提示詞或參考圖片' }), 
        { 
          status: 400, 
          headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        }
      );
    }

    // 獲取客戶端 IP
    const ip = rateLimiter.getClientIP(request);

    // 檢查限流
    const limitCheck = await rateLimiter.checkLimit(ip);
    if (!limitCheck.allowed) {
      return new Response(
        JSON.stringify({ 
          error: '速率限制超過',
          retryAfter: limitCheck.retryAfter 
        }), 
        { 
          status: 429, 
          headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        }
      );
    }

    // 檢查冷卻
    const cooldownCheck = await rateLimiter.checkCooldown(ip);
    if (!cooldownCheck.allowed) {
      return new Response(
        JSON.stringify({ 
          error: '請稍後再試',
          cooldownRemaining: cooldownCheck.remaining 
        }), 
        { 
          status: 429, 
          headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        }
      );
    }

    // 生成影片
    const result = await videoService.generate(prompt || '', {
      model,
      width,
      height,
      fps,
      duration,
      referenceImage,
      apiKey
    });

    // 記錄使用量
    await rateLimiter.recordGeneration(ip);

    // 獲取更新後的配額資訊
    const quotaInfo = await rateLimiter.getQuotaInfo(ip);

    return new Response(
      JSON.stringify({
        success: true,
        video: result,
        quota: {
          maxPerHour: quotaInfo.maxPerHour,
          used: quotaInfo.used,
          remaining: quotaInfo.remaining,
          resetAt: quotaInfo.resetAt
        }
      }), 
      { 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500, 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
      }
    );
  }
}

/**
 * 處理模型列表請求
 * @param {VideoService} videoService - 影片服務
 * @returns {Response} 回應
 */
function handleModels(videoService) {
  return new Response(
    JSON.stringify({ models: videoService.getModels() }), 
    { 
      headers: corsHeaders({ 'Content-Type': 'application/json' }) 
    }
  );
}

/**
 * 處理樣式列表請求
 * @param {VideoService} videoService - 影片服務
 * @returns {Response} 回應
 */
function handleStyles(videoService) {
  return new Response(
    JSON.stringify({ styles: videoService.getStyles() }), 
    { 
      headers: corsHeaders({ 'Content-Type': 'application/json' }) 
    }
  );
}

/**
 * 處理尺寸列表請求
 * @param {VideoService} videoService - 影片服務
 * @returns {Response} 回應
 */
function handleSizes(videoService) {
  return new Response(
    JSON.stringify({ sizes: videoService.getPresetSizes() }), 
    { 
      headers: corsHeaders({ 'Content-Type': 'application/json' }) 
    }
  );
}

/**
 * 處理配額查詢請求
 * @param {Request} request - 請求物件
 * @param {VideoRateLimiter} rateLimiter - 限流器
 * @returns {Promise<Response>} 回應
 */
async function handleQuota(request, rateLimiter) {
  const ip = rateLimiter.getClientIP(request);
  const quotaInfo = await rateLimiter.getQuotaInfo(ip);

  return new Response(
    JSON.stringify({ quota: quotaInfo }), 
    { 
      headers: corsHeaders({ 'Content-Type': 'application/json' }) 
    }
  );
}

/**
 * 處理配置查詢請求
 * @param {VideoService} videoService - 影片服務
 * @returns {Response} 回應
 */
function handleConfig(videoService) {
  return new Response(
    JSON.stringify({
      models: videoService.getModels(),
      styles: videoService.getStyles(),
      sizes: videoService.getPresetSizes(),
      defaults: videoService.getDefaults()
    }), 
    { 
      headers: corsHeaders({ 'Content-Type': 'application/json' }) 
    }
  );
}
