// ============================================
// 📋 Pollinations Worker v9.5.3 - gen.pollinations.ai
// ============================================

/**
 * 🔧 核心配置
 */
const CONFIG = {
  // API 配置
  POLLINATIONS_ENDPOINT: 'https://gen.pollinations.ai',
  PATH_PREFIX: '/image',
  AUTH_HEADER: 'Authorization',
  
  // 模型配置
  AVAILABLE_MODELS: ['zimage', 'flux', 'turbo', 'kontext'],
  DEFAULT_MODEL: 'flux',
  
  // 尺寸限制
  MIN_SIZE: 256,
  MAX_SIZE: 2048,
  DEFAULT_WIDTH: 1024,
  DEFAULT_HEIGHT: 1024,
  
  // 超時和重試
  DEFAULT_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000,
  
  // 錯誤消息
  ERRORS: {
    NO_API_KEY: 'POLLINATIONS_API_KEY environment variable is not set',
    INVALID_MODEL: 'Invalid model specified',
    INVALID_SIZE: 'Width and height must be between 256 and 2048',
    INVALID_PROMPT: 'Prompt is required and must be a non-empty string',
    GENERATION_FAILED: 'Image generation failed',
    TIMEOUT: 'Request timeout',
    RATE_LIMIT: 'Rate limit exceeded'
  }
};
// ============================================
// 🛠️ 初始化和工具函數
// ============================================

/**
 * 初始化運行時配置（從環境變量）
 */
function initializeConfig(env) {
  const runtimeConfig = { ...CONFIG };
  
  // 從環境變量覆蓋
  if (env.POLLINATIONS_ENDPOINT) {
    runtimeConfig.POLLINATIONS_ENDPOINT = env.POLLINATIONS_ENDPOINT;
  }
  
  if (env.DEFAULT_MODEL && CONFIG.AVAILABLE_MODELS.includes(env.DEFAULT_MODEL)) {
    runtimeConfig.DEFAULT_MODEL = env.DEFAULT_MODEL;
  }
  
  if (env.MAX_TIMEOUT) {
    runtimeConfig.DEFAULT_TIMEOUT = parseInt(env.MAX_TIMEOUT);
  }
  
  // API Key
  runtimeConfig.API_KEY = env.POLLINATIONS_API_KEY || null;
  
  return runtimeConfig;
}

/**
 * 生成隨機種子
 */
function generateSeed() {
  return Math.floor(Math.random() * 1000000);
}

/**
 * 驗證參數
 */
function validateParams(params) {
  const errors = [];
  
  // 驗證提示詞
  if (!params.prompt || typeof params.prompt !== 'string' || params.prompt.trim().length === 0) {
    errors.push(CONFIG.ERRORS.INVALID_PROMPT);
  }
  
  // 驗證模型
  if (params.model && !CONFIG.AVAILABLE_MODELS.includes(params.model)) {
    errors.push(`${CONFIG.ERRORS.INVALID_MODEL}. Available: ${CONFIG.AVAILABLE_MODELS.join(', ')}`);
  }
  
  // 驗證尺寸
  if (params.width) {
    const width = parseInt(params.width);
    if (isNaN(width) || width < CONFIG.MIN_SIZE || width > CONFIG.MAX_SIZE) {
      errors.push(`Width ${CONFIG.ERRORS.INVALID_SIZE}`);
    }
  }
  
  if (params.height) {
    const height = parseInt(params.height);
    if (isNaN(height) || height < CONFIG.MIN_SIZE || height > CONFIG.MAX_SIZE) {
      errors.push(`Height ${CONFIG.ERRORS.INVALID_SIZE}`);
    }
  }
  
  return errors;
}

/**
 * 標準化參數
 */
function normalizeParams(params, config) {
  return {
    prompt: params.prompt.trim(),
    model: params.model || config.DEFAULT_MODEL,
    width: parseInt(params.width) || config.DEFAULT_WIDTH,
    height: parseInt(params.height) || config.DEFAULT_HEIGHT,
    seed: params.seed ? parseInt(params.seed) : generateSeed(),
    nologo: params.nologo !== false,
    private: params.private === true,
    enhance: params.enhance === true
  };
}

/**
 * 格式化錯誤響應
 */
function errorResponse(message, status = 400, details = null) {
  return new Response(JSON.stringify({
    error: true,
    message,
    details,
    timestamp: new Date().toISOString()
  }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

/**
 * 日誌輸出
 */
function log(level, message, data = {}) {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    level,
    message,
    ...data
  };
  console.log(JSON.stringify(logData));
}
// ============================================
// 🔗 URL 構建函數
// ============================================

/**
 * 構建 Pollinations API URL
 */
function buildPollinationsURL(params, config) {
  const {
    prompt,
    model,
    width,
    height,
    seed,
    nologo,
    private: isPrivate,
    enhance
  } = params;
  
  // 基礎 URL：https://gen.pollinations.ai/image/{model}/{prompt}
  let url = `${config.POLLINATIONS_ENDPOINT}${config.PATH_PREFIX}/${model}/${encodeURIComponent(prompt)}`;
  
  // 查詢參數
  const queryParams = new URLSearchParams();
  
  queryParams.append('width', width.toString());
  queryParams.append('height', height.toString());
  queryParams.append('seed', seed.toString());
  
  if (nologo) {
    queryParams.append('nologo', 'true');
  }
  
  if (isPrivate) {
    queryParams.append('private', 'true');
  }
  
  if (enhance) {
    queryParams.append('enhance', 'true');
  }
  
  const queryString = queryParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  
  return url;
}

/**
 * 構建多個 URL（用於批量生成）
 */
function buildMultipleURLs(params, config, count = 1) {
  const urls = [];
  const baseParams = { ...params };
  
  for (let i = 0; i < count; i++) {
    const urlParams = {
      ...baseParams,
      seed: baseParams.seed ? baseParams.seed + i : generateSeed()
    };
    urls.push(buildPollinationsURL(urlParams, config));
  }
  
  return urls;
}
// ============================================
// 🌐 API 請求函數
// ============================================

/**
 * 發送請求到 Pollinations API
 */
async function makePollinationsRequest(url, config, options = {}) {
  const {
    timeout = config.DEFAULT_TIMEOUT,
    signal
  } = options;
  
  const headers = {
    'Accept': 'image/png, image/jpeg, image/webp, image/*',
    'User-Agent': 'Pollinations-Worker/9.5.3'
  };
  
  // 添加認證
  if (config.API_KEY) {
    headers[config.AUTH_HEADER] = `Bearer ${config.API_KEY}`;
  }
  
  log('info', 'Making request to Pollinations API', { url });
  
  try {
    // 創建帶超時的 AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const fetchSignal = signal || controller.signal;
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal: fetchSignal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API returned ${response.status}: ${errorText}`);
    }
    
    const contentType = response.headers.get('Content-Type') || '';
    if (!contentType.includes('image')) {
      throw new Error(`Expected image, got ${contentType}`);
    }
    
    log('info', 'Request successful', {
      status: response.status,
      contentType
    });
    
    return response;
    
  } catch (error) {
    if (error.name === 'AbortError') {
      log('error', 'Request timeout', { url, timeout });
      throw new Error(CONFIG.ERRORS.TIMEOUT);
    }
    
    log('error', 'Request failed', {
      url,
      error: error.message
    });
    
    throw error;
  }
}

/**
 * 並行發送多個請求
 */
async function makeMultipleRequests(urls, config) {
  const promises = urls.map(url => 
    makePollinationsRequest(url, config)
      .catch(error => ({ error: error.message }))
  );
  
  return await Promise.all(promises);
}

/**
 * 帶重試的請求
 */
async function requestWithRetry(url, config, maxRetries = CONFIG.MAX_RETRIES) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      log('info', `Request attempt ${attempt}/${maxRetries}`, { url });
      
      const response = await makePollinationsRequest(url, config);
      return response;
      
    } catch (error) {
      lastError = error;
      
      log('warn', `Attempt ${attempt} failed`, {
        url,
        error: error.message
      });
      
      // 如果不是最後一次嘗試，等待後重試
      if (attempt < maxRetries) {
        const delay = CONFIG.RETRY_DELAY * attempt;
        log('info', `Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  log('error', 'All retry attempts failed', {
    url,
    maxRetries,
    lastError: lastError.message
  });
  
  throw lastError;
}
// ============================================
// 🎨 圖片生成主函數
// ============================================

/**
 * 生成單張圖片
 */
async function generateSingleImage(params, env) {
  const config = initializeConfig(env);
  
  // 驗證參數
  const validationErrors = validateParams(params);
  if (validationErrors.length > 0) {
    return errorResponse(
      'Validation failed',
      400,
      validationErrors
    );
  }
  
  // 標準化參數
  const normalizedParams = normalizeParams(params, config);
  
  log('info', 'Generating single image', normalizedParams);
  
  try {
    // 構建 URL
    const url = buildPollinationsURL(normalizedParams, config);
    
    // 發送請求（帶重試）
    const response = await requestWithRetry(url, config);
    
    // 創建新的響應（保留圖片數據）
    const imageBlob = await response.blob();
    
    return new Response(imageBlob, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/png',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=31536000',
        'X-Generated-Seed': normalizedParams.seed.toString(),
        'X-Model': normalizedParams.model,
        'X-Dimensions': `${normalizedParams.width}x${normalizedParams.height}`
      }
    });
    
  } catch (error) {
    log('error', 'Image generation failed', {
      params: normalizedParams,
      error: error.message
    });
    
    return errorResponse(
      CONFIG.ERRORS.GENERATION_FAILED,
      500,
      error.message
    );
  }
}

/**
 * 生成多張圖片（批量）
 */
async function generateMultipleImages(params, env) {
  const config = initializeConfig(env);
  const count = Math.min(parseInt(params.count) || 1, 4); // 最多 4 張
  
  // 驗證參數
  const validationErrors = validateParams(params);
  if (validationErrors.length > 0) {
    return errorResponse(
      'Validation failed',
      400,
      validationErrors
    );
  }
  
  // 標準化參數
  const normalizedParams = normalizeParams(params, config);
  
  log('info', 'Generating multiple images', {
    ...normalizedParams,
    count
  });
  
  try {
    // 構建多個 URL
    const urls = buildMultipleURLs(normalizedParams, config, count);
    
    // 並行請求
    const responses = await makeMultipleRequests(urls, config);
    
    // 處理結果
    const results = await Promise.all(
      responses.map(async (response, index) => {
        if (response.error) {
          return {
            success: false,
            error: response.error,
            seed: normalizedParams.seed + index
          };
        }
        
        const blob = await response.blob();
        const base64 = await blobToBase64(blob);
        
        return {
          success: true,
          seed: normalizedParams.seed + index,
          data: base64,
          contentType: response.headers.get('Content-Type')
        };
      })
    );
    
    return new Response(JSON.stringify({
      success: true,
      count: results.length,
      results
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    log('error', 'Batch generation failed', {
      params: normalizedParams,
      count,
      error: error.message
    });
    
    return errorResponse(
      'Batch generation failed',
      500,
      error.message
    );
  }
}

/**
 * 輔助函數：Blob 轉 Base64
 */
async function blobToBase64(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:' + blob.type + ';base64,' + btoa(binary);
}
// ============================================
// 🛣️ 路由處理函數
// ============================================

/**
 * 處理圖片生成請求
 */
async function handleGenerate(request, env) {
  if (request.method !== 'POST') {
    return errorResponse('Method not allowed. Use POST.', 405);
  }
  
  try {
    const contentType = request.headers.get('Content-Type') || '';
    let params;
    
    if (contentType.includes('application/json')) {
      params = await request.json();
    } else {
      return errorResponse('Content-Type must be application/json', 400);
    }
    
    // 檢查是否是批量生成
    if (params.count && params.count > 1) {
      return await generateMultipleImages(params, env);
    } else {
      return await generateSingleImage(params, env);
    }
    
  } catch (error) {
    log('error', 'Request handling failed', {
      error: error.message
    });
    
    return errorResponse(
      'Invalid request',
      400,
      error.message
    );
  }
}

/**
 * 健康檢查
 */
async function handleHealth(env) {
  const config = initializeConfig(env);
  
  return new Response(JSON.stringify({
    status: 'ok',
    version: '9.5.3-gen-api',
    endpoint: config.POLLINATIONS_ENDPOINT,
    pathPrefix: config.PATH_PREFIX,
    authEnabled: !!config.API_KEY,
    hasApiKey: !!config.API_KEY,
    models: config.AVAILABLE_MODELS,
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

/**
 * 模型列表
 */
async function handleModels() {
  return new Response(JSON.stringify({
    models: CONFIG.AVAILABLE_MODELS.map(model => ({
      id: model,
      name: model.toUpperCase(),
      description: getModelDescription(model)
    })),
    default: CONFIG.DEFAULT_MODEL
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

/**
 * 獲取模型描述
 */
function getModelDescription(model) {
  const descriptions = {
    'flux': 'Latest stable model with high quality output',
    'zimage': 'High detail and quality model',
    'turbo': 'Fast generation with good quality',
    'kontext': 'Context-aware image generation'
  };
  return descriptions[model] || 'Image generation model';
}

/**
 * 處理 CORS 預檢請求
 */
function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}
// ============================================
// 🎨 Web UI HTML 界面 - 完整版
// ============================================

function getWebUI() {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pollinations AI 圖片生成器 v9.5.3</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; color: #333; }
    .container { max-width: 1400px; margin: 0 auto; background: white; min-height: 100vh; box-shadow: 0 0 60px rgba(0,0,0,0.3); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
    .header-left h1 { font-size: 1.8em; margin-bottom: 5px; }
    .header-left .version { opacity: 0.9; font-size: 0.85em; }
    .api-status { padding: 8px 16px; background: rgba(255,255,255,0.2); border-radius: 20px; font-size: 0.85em; }
    .tab-navigation { display: flex; background: #f8f9fa; border-bottom: 2px solid #e0e0e0; padding: 0 30px; }
    .tab-button { padding: 15px 30px; background: none; border: none; font-size: 1em; font-weight: 600; color: #666; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; position: relative; }
    .tab-button:hover { color: #667eea; background: rgba(102, 126, 234, 0.05); }
    .tab-button.active { color: #667eea; border-bottom-color: #667eea; background: white; }
    .tab-button .badge { position: absolute; top: 8px; right: 8px; background: #667eea; color: white; font-size: 0.7em; padding: 2px 6px; border-radius: 10px; min-width: 18px; text-align: center; }
    .tab-content { display: none; padding: 30px; animation: fadeIn 0.3s; }
    .tab-content.active { display: block; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .generate-tab { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
    .form-section, .preview-section { background: #f8f9fa; padding: 25px; border-radius: 12px; }
    .preview-section { display: flex; flex-direction: column; gap: 15px; }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #555; font-size: 0.95em; }
    .form-group input[type="text"], .form-group textarea, .form-group select, .form-group input[type="number"] { width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1em; transition: border-color 0.3s; }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #667eea; }
    .form-group textarea { resize: vertical; min-height: 100px; font-family: inherit; }
    .ratio-selector { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-bottom: 10px; }
    .ratio-btn { padding: 12px 8px; background: white; border: 2px solid #e0e0e0; border-radius: 8px; cursor: pointer; transition: all 0.3s; display: flex; flex-direction: column; align-items: center; gap: 6px; }
    .ratio-btn:hover { border-color: #667eea; background: rgba(102, 126, 234, 0.05); }
    .ratio-btn.active { border-color: #667eea; background: rgba(102, 126, 234, 0.1); font-weight: 600; }
    .ratio-icon { width: 30px; height: 30px; background: #667eea; border-radius: 4px; }
    .ratio-icon.square { width: 30px; height: 30px; }
    .ratio-icon.landscape-wide { width: 40px; height: 22px; }
    .ratio-icon.portrait-tall { width: 22px; height: 40px; }
    .ratio-icon.landscape { width: 36px; height: 27px; }
    .ratio-icon.portrait { width: 27px; height: 36px; }
    .ratio-icon.ultrawide { width: 42px; height: 18px; }
    .ratio-btn span { font-size: 0.85em; color: #666; }
    .ratio-btn.active span { color: #667eea; }
    .size-preview { text-align: center; padding: 10px; background: white; border-radius: 6px; font-size: 0.9em; color: #666; }
    .size-preview strong { color: #667eea; }
    .style-selector { margin-bottom: 15px; }
    .style-quick { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 10px; }
    .style-btn { padding: 12px; background: white; border: 2px solid #e0e0e0; border-radius: 8px; cursor: pointer; transition: all 0.3s; font-size: 0.9em; display: flex; align-items: center; justify-content: center; gap: 6px; }
    .style-btn:hover { border-color: #667eea; background: rgba(102, 126, 234, 0.05); }
    .style-btn.active { border-color: #667eea; background: rgba(102, 126, 234, 0.1); font-weight: 600; color: #667eea; }
    .style-more { width: 100%; padding: 10px; background: white; border: 2px dashed #e0e0e0; border-radius: 8px; cursor: pointer; transition: all 0.3s; font-size: 0.9em; color: #666; }
    .style-more:hover { border-color: #667eea; color: #667eea; }
    .style-expanded { display: none; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 10px; padding: 15px; background: white; border-radius: 8px; }
    .style-expanded.show { display: grid; }
    .style-card { padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; cursor: pointer; transition: all 0.3s; text-align: center; }
    .style-card:hover { border-color: #667eea; background: rgba(102, 126, 234, 0.05); }
    .style-card.active { border-color: #667eea; background: rgba(102, 126, 234, 0.1); }
    .style-card-icon { font-size: 2em; margin-bottom: 8px; }
    .style-card-name { font-weight: 600; margin-bottom: 4px; color: #333; }
    .style-card-desc { font-size: 0.8em; color: #999; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .btn { width: 100%; padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-size: 1.1em; font-weight: 600; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
    .btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3); }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-secondary { background: #6c757d; margin-top: 10px; }
    .info { background: #e3f2fd; color: #1976d2; padding: 10px; border-radius: 6px; font-size: 0.9em; margin-top: 8px; }
    .preview-container { background: #fff; border-radius: 8px; min-height: 400px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 2px dashed #e0e0e0; }
    .preview-container.has-image { border: none; }
    .preview-container img { max-width: 100%; max-height: 600px; display: block; border-radius: 8px; }
    .preview-placeholder { text-align: center; color: #999; padding: 40px; }
    .preview-placeholder .icon { font-size: 4em; margin-bottom: 15px; opacity: 0.3; }
    .loading { text-align: center; padding: 40px; }
    .spinner { border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 0 auto 20px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .image-meta { background: white; padding: 15px; border-radius: 8px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 0.9em; }
    .image-meta .meta-item { display: flex; flex-direction: column; }
    .image-meta .meta-label { font-weight: 600; color: #666; margin-bottom: 4px; }
    .image-meta .meta-value { color: #333; }
    .preview-actions { display: flex; gap: 10px; }
    .preview-actions button { flex: 1; padding: 12px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
    .btn-download { background: #28a745; color: white; }
    .btn-download:hover { background: #218838; }
    .btn-save { background: #667eea; color: white; }
    .btn-save:hover { background: #5568d3; }
    .history-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #e0e0e0; }
    .history-stats { display: flex; gap: 20px; font-size: 0.9em; color: #666; }
    .history-actions { display: flex; gap: 10px; }
    .history-actions button, .history-actions select { padding: 8px 16px; border: 2px solid #e0e0e0; border-radius: 6px; background: white; cursor: pointer; font-size: 0.9em; transition: all 0.3s; }
    .history-actions button:hover { border-color: #667eea; color: #667eea; }
    .search-box { margin-bottom: 20px; }
    .search-box input { width: 100%; padding: 12px 20px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1em; }
    .search-box input:focus { outline: none; border-color: #667eea; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
    .gallery-item { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; }
    .gallery-item:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    .gallery-item-image { width: 100%; height: 250px; object-fit: cover; background: #f5f5f5; }
    .gallery-item-info { padding: 15px; }
    .gallery-item-prompt { font-size: 0.9em; color: #333; margin-bottom: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4; }
    .gallery-item-meta { display: flex; justify-content: space-between; font-size: 0.8em; color: #999; margin-bottom: 10px; }
    .gallery-item-style { display: inline-block; padding: 2px 8px; background: rgba(102, 126, 234, 0.1); color: #667eea; border-radius: 4px; font-size: 0.75em; margin-bottom: 10px; }
    .gallery-item-actions { display: flex; gap: 5px; }
    .gallery-item-actions button { flex: 1; padding: 8px; border: none; border-radius: 4px; font-size: 0.85em; cursor: pointer; transition: all 0.3s; font-weight: 600; }
    .btn-reuse { background: #667eea; color: white; }
    .btn-reuse:hover { background: #5568d3; }
    .btn-item-delete { background: #dc3545; color: white; }
    .btn-item-delete:hover { background: #c82333; }
    .empty-state { text-align: center; padding: 60px 20px; color: #999; }
    .empty-state .icon { font-size: 5em; margin-bottom: 20px; opacity: 0.3; }
    .message { position: fixed; top: 20px; right: 20px; padding: 15px 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 1000; animation: slideIn 0.3s; max-width: 400px; }
    @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    .message.success { background: #d4edda; color: #155724; border-left: 4px solid #28a745; }
    .message.error { background: #f8d7da; color: #721c24; border-left: 4px solid #dc3545; }
    .message.info { background: #d1ecf1; color: #0c5460; border-left: 4px solid #17a2b8; }
    .floating-button { position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 50%; font-size: 1.5em; cursor: pointer; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: transform 0.3s; z-index: 999; display: none; }
    .floating-button.show { display: block; }
    .floating-button:hover { transform: scale(1.1); }
    .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 2000; align-items: center; justify-content: center; animation: fadeIn 0.3s; }
    .modal.active { display: flex; }
    .modal-content { max-width: 95%; max-height: 95%; position: relative; }
    .modal-close { position: absolute; top: -50px; right: 0; background: rgba(255,255,255,0.2); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5em; cursor: pointer; transition: background 0.3s; }
    .modal-close:hover { background: rgba(255,255,255,0.3); }
    .modal-image { max-width: 100%; max-height: 90vh; display: block; border-radius: 8px; }
    @media (max-width: 1024px) { .generate-tab { grid-template-columns: 1fr; } .gallery { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); } .style-expanded { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { .header { flex-direction: column; gap: 15px; text-align: center; } .tab-navigation { padding: 0 15px; overflow-x: auto; } .tab-button { padding: 12px 20px; white-space: nowrap; } .tab-content { padding: 20px 15px; } .ratio-selector { grid-template-columns: repeat(4, 1fr); } .ratio-btn { padding: 10px 6px; } .ratio-icon { transform: scale(0.8); } .style-quick { grid-template-columns: repeat(2, 1fr); } .style-expanded { grid-template-columns: 1fr; } .row { grid-template-columns: 1fr; } .gallery { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; } .gallery-item-image { height: 180px; } .history-header { flex-direction: column; align-items: flex-start; gap: 15px; } .history-actions { width: 100%; flex-direction: column; } .history-actions button, .history-actions select { width: 100%; } .floating-button { bottom: 20px; right: 20px; width: 50px; height: 50px; font-size: 1.2em; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-left">
        <h1>🎨 Pollinations AI 圖片生成器</h1>
        <div class="version">v9.5.3-gen-api | Powered by gen.pollinations.ai</div>
      </div>
      <div class="api-status" id="apiStatus">檢查中...</div>
    </div>
    <div class="tab-navigation">
      <button class="tab-button active" data-tab="generate">🚀 生成圖片</button>
      <button class="tab-button" data-tab="history">📚 歷史記錄<span class="badge" id="historyCount">0</span></button>
    </div>
    <div class="tab-content active" id="generateTab">
      <div class="generate-tab">
        <div class="form-section">
          <form id="generateForm">
            <div class="form-group">
              <label for="prompt">📝 圖片描述 *</label>
              <textarea id="prompt" name="prompt" placeholder="例如：a beautiful sunset over mountains" required></textarea>
              <div class="info">💡 使用英文描述效果更佳</div>
            </div>
            <div class="form-group">
              <label for="model">🤖 生成模型</label>
              <select id="model" name="model">
                <option value="flux">FLUX - 最新穩定模型（推薦）</option>
                <option value="zimage">ZImage - 高質量細節</option>
                <option value="turbo">Turbo - 快速生成</option>
              </select>
            </div>
            <div class="form-group">
              <label>📐 圖片比例</label>
              <div class="ratio-selector">
                <button type="button" class="ratio-btn active" data-ratio="1:1" data-width="1024" data-height="1024"><div class="ratio-icon square"></div><span>1:1</span></button>
                <button type="button" class="ratio-btn" data-ratio="16:9" data-width="1344" data-height="768"><div class="ratio-icon landscape-wide"></div><span>16:9</span></button>
                <button type="button" class="ratio-btn" data-ratio="9:16" data-width="768" data-height="1344"><div class="ratio-icon portrait-tall"></div><span>9:16</span></button>
                <button type="button" class="ratio-btn" data-ratio="4:3" data-width="1152" data-height="896"><div class="ratio-icon landscape"></div><span>4:3</span></button>
                <button type="button" class="ratio-btn" data-ratio="3:4" data-width="896" data-height="1152"><div class="ratio-icon portrait"></div><span>3:4</span></button>
                <button type="button" class="ratio-btn" data-ratio="21:9" data-width="1536" data-height="640"><div class="ratio-icon ultrawide"></div><span>21:9</span></button>
                <button type="button" class="ratio-btn" data-ratio="custom" data-width="1024" data-height="1024"><div class="ratio-icon square"></div><span>自定義</span></button>
              </div>
              <div class="size-preview" id="sizePreview">→ <strong id="currentSize">1024 x 1024</strong></div>
            </div>
            <div class="form-group" id="customSizeGroup" style="display: none;">
              <div class="row">
                <div><label for="width">寬度（像素）</label><input type="number" id="width" name="width" value="1024" min="256" max="2048" step="64"></div>
                <div><label for="height">高度（像素）</label><input type="number" id="height" name="height" value="1024" min="256" max="2048" step="64"></div>
              </div>
            </div>
            <div class="form-group">
              <label>🎨 圖片風格（可選）</label>
              <div class="style-selector">
                <div class="style-quick">
                  <button type="button" class="style-btn active" data-style="none">∅ 無</button>
                  <button type="button" class="style-btn" data-style="photorealistic">📷 寫實</button>
                  <button type="button" class="style-btn" data-style="digital_art">🎨 數位</button>
                  <button type="button" class="style-btn" data-style="anime">🎭 動漫</button>
                </div>
                <button type="button" class="style-more" id="styleMoreBtn">📋 更多風格...</button>
                <div class="style-expanded" id="styleExpanded">
                  <div class="style-card" data-style="none"><div class="style-card-icon">∅</div><div class="style-card-name">無風格</div><div class="style-card-desc">原始提示詞</div></div>
                  <div class="style-card" data-style="photorealistic"><div class="style-card-icon">📷</div><div class="style-card-name">寫實攝影</div><div class="style-card-desc">專業攝影風格</div></div>
                  <div class="style-card" data-style="digital_art"><div class="style-card-icon">🎨</div><div class="style-card-name">數位藝術</div><div class="style-card-desc">鮮豔概念藝術</div></div>
                  <div class="style-card" data-style="oil_painting"><div class="style-card-icon">🖌️</div><div class="style-card-name">油畫</div><div class="style-card-desc">古典繪畫風格</div></div>
                  <div class="style-card" data-style="anime"><div class="style-card-icon">🎭</div><div class="style-card-name">動漫</div><div class="style-card-desc">日式動畫風格</div></div>
                  <div class="style-card" data-style="watercolor"><div class="style-card-icon">💧</div><div class="style-card-name">水彩</div><div class="style-card-desc">柔和水彩畫</div></div>
                  <div class="style-card" data-style="render_3d"><div class="style-card-icon">🔮</div><div class="style-card-name">3D渲染</div><div class="style-card-desc">高質量3D效果</div></div>
                  <div class="style-card" data-style="cyberpunk"><div class="style-card-icon">🌃</div><div class="style-card-name">賽博朋克</div><div class="style-card-desc">霓虹未來感</div></div>
                  <div class="style-card" data-style="vintage"><div class="style-card-icon">📻</div><div class="style-card-name">復古</div><div class="style-card-desc">懷舊復古風</div></div>
                  <div class="style-card" data-style="minimalist"><div class="style-card-icon">◻️</div><div class="style-card-name">極簡</div><div class="style-card-desc">簡潔現代風</div></div>
                  <div class="style-card" data-style="fantasy"><div class="style-card-icon">✨</div><div class="style-card-name">奇幻</div><div class="style-card-desc">魔法史詩風</div></div>
                  <div class="style-card" data-style="sketch"><div class="style-card-icon">✏️</div><div class="style-card-name">素描</div><div class="style-card-desc">鉛筆手繪風</div></div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="seed">🎲 隨機種子（可選）</label>
              <input type="number" id="seed" name="seed" placeholder="留空自動生成">
            </div>
            <button type="submit" class="btn" id="generateBtn">🚀 開始生成</button>
            <button type="button" class="btn btn-secondary" id="randomBtn">🎲 隨機種子</button>
          </form>
        </div>
        <div class="preview-section">
          <div class="preview-container" id="previewContainer">
            <div class="preview-placeholder"><div class="icon">🖼️</div><p>生成的圖片將在這裡顯示</p></div>
          </div>
          <div id="imageMeta" style="display: none;"></div>
          <div class="preview-actions" id="previewActions" style="display: none;">
            <button class="btn-download" id="downloadBtn">📥 下載圖片</button>
            <button class="btn-save" id="saveBtn">💾 保存到歷史</button>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-content" id="historyTab">
      <div class="history-header">
        <div class="history-stats">
          <span>📊 總計：<strong id="totalCount">0</strong> 張</span>
          <span>💾 已用：<strong id="storageUsed">0</strong> MB</span>
        </div>
        <div class="history-actions">
          <select id="sortSelect"><option value="newest">最新優先</option><option value="oldest">最舊優先</option></select>
          <button id="clearAllBtn">🗑️ 清空全部</button>
        </div>
      </div>
      <div class="search-box"><input type="text" id="searchInput" placeholder="🔍 搜索提示詞..."></div>
      <div class="gallery" id="gallery"></div>
      <div class="empty-state" id="emptyState"><div class="icon">📭</div><h3>還沒有歷史記錄</h3><p>生成圖片後會自動保存在這裡</p></div>
    </div>
  </div>
  <button class="floating-button" id="floatingBtn" title="返回生成">⬆️</button>
  <div class="modal" id="imageModal">
    <div class="modal-content">
      <button class="modal-close" id="modalClose">✕</button>
      <img class="modal-image" id="modalImage" src="" alt="Preview">
    </div>
  </div>
  <div id="messageContainer"></div>
  <script>
    const STYLE_PRESETS={none:"",photorealistic:"photorealistic, professional photography, high detail, 8k uhd, dslr, soft lighting",digital_art:"digital art, vibrant colors, concept art, trending on artstation, highly detailed",oil_painting:"oil painting, artistic, painterly, fine art, classical style, textured brushstrokes",anime:"anime style, manga art, cel shaded, vibrant, japanese animation, detailed",watercolor:"watercolor painting, soft colors, artistic, flowing, delicate, traditional medium",render_3d:"3d render, octane render, unreal engine, high quality, detailed, cinematic lighting",cyberpunk:"cyberpunk style, neon lights, futuristic, sci-fi, dark atmosphere, vibrant colors",vintage:"vintage style, retro aesthetic, nostalgic, film grain, faded colors, classic",minimalist:"minimalist, clean, simple, modern design, elegant, uncluttered",fantasy:"fantasy art, magical, ethereal, epic, dramatic lighting, mystical atmosphere",sketch:"pencil sketch, hand drawn, artistic, detailed linework, monochrome"};const STYLE_NAMES={none:"無風格",photorealistic:"寫實攝影",digital_art:"數位藝術",oil_painting:"油畫",anime:"動漫",watercolor:"水彩",render_3d:"3D渲染",cyberpunk:"賽博朋克",vintage:"復古",minimalist:"極簡",fantasy:"奇幻",sketch:"素描"};let db;const DB_NAME='PollinationsHistory',DB_VERSION=1,STORE_NAME='images';function initDB(){return new Promise((e,t)=>{const n=indexedDB.open(DB_NAME,DB_VERSION);n.onerror=()=>t(n.error),n.onsuccess=()=>{db=n.result,e(db)},n.onupgradeneeded=e=>{const t=e.target.result;if(!t.objectStoreNames.contains(STORE_NAME)){const e=t.createObjectStore(STORE_NAME,{keyPath:"id",autoIncrement:!0});e.createIndex("timestamp","timestamp",{unique:!1}),e.createIndex("prompt","prompt",{unique:!1})}}})}async function saveToHistory(e){return new Promise((t,n)=>{const o=db.transaction([STORE_NAME],"readwrite").objectStore(STORE_NAME).add({...e,timestamp:Date.now()});o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error)})}async function getAllHistory(){return new Promise((e,t)=>{const n=db.transaction([STORE_NAME],"readonly").objectStore(STORE_NAME).getAll();n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function deleteHistory(e){return new Promise((t,n)=>{const o=db.transaction([STORE_NAME],"readwrite").objectStore(STORE_NAME).delete(e);o.onsuccess=()=>t(),o.onerror=()=>n(o.error)})}async function clearAllHistory(){return new Promise((e,t)=>{const n=db.transaction([STORE_NAME],"readwrite").objectStore(STORE_NAME).clear();n.onsuccess=()=>e(),n.onerror=()=>t(n.error)})}function showMessage(e,t="info"){const n=document.getElementById("messageContainer"),o=document.createElement("div");o.className=\`message \${t}\`,o.textContent=e,n.appendChild(o),setTimeout(()=>{o.remove()},5e3)}function switchTab(e){document.querySelectorAll(".tab-button").forEach(e=>{e.classList.remove("active")}),document.querySelectorAll(".tab-content").forEach(e=>{e.classList.remove("active")}),document.querySelector(\`[data-tab="\${e}"]\`).classList.add("active"),document.getElementById(\`\${e}Tab\`).classList.add("active"),"history"===e?(document.getElementById("floatingBtn").classList.add("show"),loadHistory()):document.getElementById("floatingBtn").classList.remove("show")}async function updateHistoryCount(){const e=await getAllHistory();document.getElementById("historyCount").textContent=e.length,document.getElementById("totalCount").textContent=e.length;let t=0;e.forEach(e=>{e.imageData&&(t+=e.imageData.length)});const n=(t/1024/1024).toFixed(2);document.getElementById("storageUsed").textContent=n}async function loadHistory(){const e=await getAllHistory(),t=document.getElementById("gallery"),n=document.getElementById("emptyState"),o=document.getElementById("sortSelect").value;e.sort((e,t)=>"newest"===o?t.timestamp-e.timestamp:e.timestamp-t.timestamp);const a=document.getElementById("searchInput").value.toLowerCase(),s=a?e.filter(e=>e.prompt.toLowerCase().includes(a)):e;0===s.length?(t.style.display="none",n.style.display="block"):(t.style.display="grid",n.style.display="none",t.innerHTML=s.map(e=>{const t=STYLE_NAMES[e.style]||"無風格";return\`<div class="gallery-item" data-id="\${e.id}"><img class="gallery-item-image" src="\${e.imageData}" alt="\${e.prompt}" loading="lazy"><div class="gallery-item-info"><div class="gallery-item-prompt">\${e.prompt}</div>\${e.style&&"none"!==e.style?\`<div class="gallery-item-style">\${t}</div>\`:""}<div class="gallery-item-meta"><span>\${e.model}</span><span>\${e.ratio}</span></div><div class="gallery-item-actions"><button class="btn-reuse" onclick="reuseParams(\${e.id})">🔄 重用</button><button class="btn-item-delete" onclick="deleteItem(\${e.id})">🗑️ 刪除</button></div></div></div>\`}).join(""),document.querySelectorAll(".gallery-item-image").forEach(e=>{e.addEventListener("click",()=>{document.getElementById("modalImage").src=e.src,document.getElementById("imageModal").classList.add("active")})})),updateHistoryCount()}async function reuseParams(e){const t=await getAllHistory(),n=t.find(t=>t.id===e);if(n){document.getElementById("prompt").value=n.originalPrompt||n.prompt,document.getElementById("model").value=n.model,document.getElementById("seed").value=n.seed||"";const e=document.querySelector(\`[data-ratio="\${n.ratio}"]\`);if(e&&(document.querySelectorAll(".ratio-btn").forEach(e=>e.classList.remove("active")),e.classList.add("active"),updateSizePreview(n.width,n.height)),t){const e=document.querySelector(\`.style-quick [data-style="\${n.style||"none"}"]\`);e&&e.classList.add("active")}switchTab("generate"),showMessage("✅ 參數已填充","success")}}async function deleteItem(e){confirm("確定要刪除這張圖片嗎？")&&(await deleteHistory(e),await loadHistory(),showMessage("✅ 已刪除","success"))}function updateSizePreview(e,t){document.getElementById("currentSize").textContent=\`\${e} x \${t}\`}async function checkAPIStatus(){try{const e=await fetch("/health"),t=await e.json(),n=document.getElementById("apiStatus");t.status==="ok"&&t.hasApiKey?(n.textContent="✅ API 已就緒",n.style.background="rgba(76, 175, 80, 0.3)"):t.status==="ok"&&!t.hasApiKey?(n.textContent="⚠️ 缺少 API Key",n.style.background="rgba(255, 152, 0, 0.3)"):(n.textContent="❌ API 不可用",n.style.background="rgba(244, 67, 54, 0.3)")}catch(e){document.getElementById("apiStatus").textContent="❌ 連接失敗"}}document.querySelectorAll(".tab-button").forEach(e=>{e.addEventListener("click",()=>{switchTab(e.dataset.tab)})}),document.getElementById("floatingBtn").addEventListener("click",()=>{switchTab("generate")}),document.getElementById("modalClose").addEventListener("click",()=>{document.getElementById("imageModal").classList.remove("active")}),document.getElementById("imageModal").addEventListener("click",e=>{"imageModal"===e.target.id&&document.getElementById("imageModal").classList.remove("active")}),document.querySelectorAll(".ratio-btn").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".ratio-btn").forEach(e=>e.classList.remove("active")),e.classList.add("active");const t=e.dataset.ratio,n=parseInt(e.dataset.width),o=parseInt(e.dataset.height);if("custom"===t){document.getElementById("customSizeGroup").style.display="block";const e=document.getElementById("width").value,t=document.getElementById("height").value;updateSizePreview(e,t)}else document.getElementById("customSizeGroup").style.display="none",document.getElementById("width").value=n,document.getElementById("height").value=o,updateSizePreview(n,o)})}),document.getElementById("width").addEventListener("input",e=>{updateSizePreview(e.target.value,document.getElementById("height").value)}),document.getElementById("height").addEventListener("input",e=>{updateSizePreview(document.getElementById("width").value,e.target.value)}),document.querySelectorAll(".style-btn").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".style-btn, .style-card").forEach(e=>e.classList.remove("active")),e.classList.add("active");const t=e.dataset.style,n=document.querySelector(\`.style-card[data-style="\${t}"]\`);n&&n.classList.add("active")})}),document.querySelectorAll(".style-card").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".style-btn, .style-card").forEach(e=>e.classList.remove("active")),e.classList.add("active");const t=e.dataset.style,n=document.querySelector(\`.style-quick [data-style="\${t}"]\`);n&&n.classList.add("active")})}),document.getElementById("styleMoreBtn").addEventListener("click",()=>{const e=document.getElementById("styleExpanded"),t=document.getElementById("styleMoreBtn");e.classList.contains("show")?(e.classList.remove("show"),t.textContent="📋 更多風格..."):(e.classList.add("show"),t.textContent="🔼 收起")}),document.getElementById("randomBtn").addEventListener("click",()=>{document.getElementById("seed").value=Math.floor(1e6*Math.random())}),document.getElementById("sortSelect").addEventListener("change",loadHistory),document.getElementById("searchInput").addEventListener("input",loadHistory),document.getElementById("clearAllBtn").addEventListener("click",async()=>{confirm("確定要清空所有歷史記錄嗎？此操作不可恢復！")&&(await clearAllHistory(),await loadHistory(),showMessage("✅ 已清空所有記錄","success"))}),document.getElementById("generateForm").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("generateBtn"),n=document.getElementById("previewContainer"),o=document.getElementById("imageMeta"),a=document.getElementById("previewActions");t.disabled=!0,t.textContent="⏳ 生成中...",n.innerHTML='<div class="loading"><div class="spinner"></div><p>正在生成圖片，請稍候...</p></div>',n.classList.remove("has-image"),o.style.display="none",a.style.display="none";const s=document.querySelector(".style-btn.active, .style-card.active"),r=s?s.dataset.style:"none",i=STYLE_PRESETS[r],d=document.querySelector(".ratio-btn.active").dataset.ratio,l=document.getElementById("prompt").value,c=i?\`\${l}, \${i}\`:l,u=new FormData(e.target),m={prompt:c,model:u.get("model"),width:parseInt(u.get("width")),height:parseInt(u.get("height")),seed:u.get("seed")?parseInt(u.get("seed")):void 0};try{const e=await fetch("/_internal/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)});if(!e.ok){const t=await e.json();throw new Error(t.message||"生成失敗")}const t=await e.blob(),s=URL.createObjectURL(t),i=new FileReader;i.onloadend=async()=>{const e=i.result;window.currentImage={imageData:e,originalPrompt:l,prompt:c,model:m.model,width:m.width,height:m.height,ratio:d,style:r,seed:m.seed||Math.floor(1e6*Math.random())},n.innerHTML=\`<img src="\${s}" alt="Generated image">\`,n.classList.add("has-image");const u=STYLE_NAMES[r]||"無風格";o.innerHTML=\`<div class="image-meta"><div class="meta-item"><div class="meta-label">模型</div><div class="meta-value">\${m.model}</div></div><div class="meta-item"><div class="meta-label">比例</div><div class="meta-value">\${d}</div></div><div class="meta-item"><div class="meta-label">尺寸</div><div class="meta-value">\${m.width} x \${m.height}</div></div><div class="meta-item"><div class="meta-label">風格</div><div class="meta-value">\${u}</div></div><div class="meta-item"><div class="meta-label">種子</div><div class="meta-value">\${window.currentImage.seed}</div></div><div class="meta-item"><div class="meta-label">大小</div><div class="meta-value">\${(t.size/1024).toFixed(2)} KB</div></div></div>\`,o.style.display="block",a.style.display="flex",showMessage("✅ 圖片生成成功！","success")},i.readAsDataURL(t)}catch(e){n.innerHTML=\`<div class="preview-placeholder"><div class="icon">❌</div><p>\${e.message}</p></div>\`,showMessage("生成失敗: "+e.message,"error")}finally{t.disabled=!1,t.textContent="🚀 開始生成"}}),document.getElementById("downloadBtn").addEventListener("click",()=>{if(window.currentImage){const e=document.createElement("a");e.href=window.currentImage.imageData,e.download=\`pollinations_\${Date.now()}.png\`,e.click(),showMessage("✅ 下載開始","success")}}),document.getElementById("saveBtn").addEventListener("click",async()=>{if(window.currentImage)try{await saveToHistory(window.currentImage),await updateHistoryCount(),showMessage("✅ 已保存到歷史記錄","success")}catch(e){showMessage("保存失敗: "+e.message,"error")}}),async function(){try{await initDB(),await checkAPIStatus(),await updateHistoryCount(),console.log("✅ 應用初始化完成")}catch(e){console.error("初始化失敗:",e),showMessage("初始化失敗: "+e.message,"error")}}();
  </script>
</body>
</html>`;
}
// ============================================
// 🚀 主 Worker 導出函數
// ============================================

export default {
  /**
   * ✅ 主請求處理函數
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    try {
      // CORS 預檢請求
      if (request.method === 'OPTIONS') {
        return handleOptions();
      }
      
      // API 路由
      switch (path) {
        // 圖片生成端點
        case '/_internal/generate':
          return await handleGenerate(request, env);
        
        // 健康檢查
        case '/health':
          return await handleHealth(env);
        
        // 模型列表
        case '/models':
          return await handleModels();
        
        // Web UI 首頁
        case '/':
          return new Response(getWebUI(), {
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'public, max-age=3600'
            }
          });
        
        // 404 未找到
        default:
          return new Response(JSON.stringify({
            error: true,
            message: 'Not found',
            availableEndpoints: [
              '/ - Web UI',
              '/_internal/generate - Image generation API',
              '/health - Health check',
              '/models - List available models'
            ]
          }), {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
      }
      
    } catch (error) {
      console.error('❌ Worker error:', error);
      
      return new Response(JSON.stringify({
        error: true,
        message: 'Internal server error: ' + error.message,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};
