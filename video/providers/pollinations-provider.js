/**
 * Pollinations.ai 影片生成供應商
 */

import { POLLINATIONS_CONFIG } from '../config/pollinations.config.js';

export class PollinationsProvider {
  /**
   * 建構函式
   * @param {Object} env - Cloudflare Workers 環境變數
   * @param {Logger} logger - 日誌實例
   */
  constructor(env, logger) {
    this.config = POLLINATIONS_CONFIG;
    this.env = env;
    this.logger = logger;
  }

  /**
   * 生成影片
   * @param {string} prompt - 提示詞
   * @param {Object} options - 生成選項
   * @returns {Promise<Object>} 生成結果
   */
  async generate(prompt, options = {}) {
    const { 
      model = this.config.defaults.model,
      width, 
      height, 
      fps = this.config.defaults.fps,
      duration = this.config.defaults.duration,
      referenceImage,
      apiKey 
    } = options;

    const finalApiKey = this.getApiKey(apiKey);
    const headers = this.buildHeaders(finalApiKey);

    if (referenceImage) {
      return this.generateImageToVideo(referenceImage, { model, width, height, fps, duration }, headers);
    } else {
      return this.generateTextToVideo(prompt, { model, width, height, fps, duration }, headers);
    }
  }

  /**
   * 文字轉影片
   * @param {string} prompt - 提示詞
   * @param {Object} params - 參數
   * @param {Object} headers - 請求標頭
   * @returns {Promise<Object>} 生成結果
   */
  async generateTextToVideo(prompt, params, headers) {
    const urlParams = new URLSearchParams();
    urlParams.append('model', params.model);
    if (params.width) urlParams.append('width', params.width);
    if (params.height) urlParams.append('height', params.height);
    if (params.fps) urlParams.append('fps', params.fps);
    if (params.duration) urlParams.append('duration', params.duration);

    const url = `${this.config.api.baseUrl}/${encodeURIComponent(prompt)}?${urlParams.toString()}`;
    
    this.logger?.add('📤 發送 Text-to-Video 請求', { url, model: params.model });

    const response = await this.fetchWithTimeout(url, { headers }, this.config.api.timeout);
    await this.handleResponse(response);

    return this.processVideoResponse(response);
  }

  /**
   * 圖片轉影片
   * @param {string} imageUrl - 圖片 URL
   * @param {Object} params - 參數
   * @param {Object} headers - 請求標頭
   * @returns {Promise<Object>} 生成結果
   */
  async generateImageToVideo(imageUrl, params, headers) {
    const urlParams = new URLSearchParams();
    urlParams.append('model', params.model);
    urlParams.append('image', imageUrl);
    if (params.width) urlParams.append('width', params.width);
    if (params.height) urlParams.append('height', params.height);
    if (params.fps) urlParams.append('fps', params.fps);
    if (params.duration) urlParams.append('duration', params.duration);

    const url = `${this.config.api.animateUrl}?${urlParams.toString()}`;
    
    this.logger?.add('📤 發送 Image-to-Video 請求', { url, model: params.model });

    const response = await this.fetchWithTimeout(url, { headers }, this.config.api.timeout);
    await this.handleResponse(response);

    return this.processVideoResponse(response);
  }

  /**
   * 處理影片回應
   * @param {Response} response - Fetch 回應
   * @returns {Promise<Object>} 處理後的影片資料
   */
  async processVideoResponse(response) {
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const mimeType = blob.type || 'video/mp4';

    return {
      url: `data:${mimeType};base64,${base64}`,
      mimeType,
      size: blob.size
    };
  }

  /**
   * 帶超時的 Fetch 請求
   * @param {string} url - 請求 URL
   * @param {Object} options - Fetch 選項
   * @param {number} timeout - 超時時間（毫秒）
   * @returns {Promise<Response>} Fetch 回應
   */
  async fetchWithTimeout(url, options, timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('請求超時');
      }
      throw error;
    }
  }

  /**
   * 獲取 API Key
   * @param {string} userKey - 用戶提供的 API Key
   * @returns {string|null} API Key
   */
  getApiKey(userKey) {
    return this.env?.[this.config.envKey] || userKey;
  }

  /**
   * 建立請求標頭
   * @param {string} apiKey - API Key
   * @returns {Object} 請求標頭
   */
  buildHeaders(apiKey) {
    const headers = {};
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
    return headers;
  }

  /**
   * 處理回應
   * @param {Response} response - Fetch 回應
   * @returns {Promise<Response>} 處理後的回應
   */
  async handleResponse(response) {
    if (!response.ok) {
      throw await this.parseError(response);
    }
    return response;
  }

  /**
   * 解析錯誤
   * @param {Response} response - Fetch 回應
   * @returns {Promise<Error>} 錯誤物件
   */
  async parseError(response) {
    const text = await response.text();
    let message = `Pollinations API 錯誤: ${response.status}`;
    
    if (response.status === 429) {
      message = this.handleRateLimit(text);
    } else {
      message += ` - ${text}`;
    }
    
    return new Error(message);
  }

  /**
   * 處理速率限制錯誤
   * @param {string} errorText - 錯誤文字
   * @returns {string} 錯誤訊息
   */
  handleRateLimit(errorText) {
    try {
      const data = JSON.parse(errorText);
      if (data.retryAfterSeconds) {
        const min = Math.floor(data.retryAfterSeconds / 60);
        const sec = data.retryAfterSeconds % 60;
        return `速率限制超過。請等待 ${min} 分 ${sec} 秒後重試。`;
      }
    } catch {}
    return `速率限制超過。請稍後重試或提供 API Key。`;
  }
}
