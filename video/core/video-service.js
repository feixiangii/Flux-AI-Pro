/**
 * 影片生成服務核心
 */

import { PollinationsProvider } from '../providers/pollinations-provider.js';
import { POLLINATIONS_CONFIG } from '../config/pollinations.config.js';
import { Logger } from '../utils/logger.js';

export class VideoService {
  /**
   * 建構函式
   * @param {Object} env - Cloudflare Workers 環境變數
   */
  constructor(env) {
    this.env = env;
    this.logger = new Logger();
    this.provider = new PollinationsProvider(env, this.logger);
    this.config = POLLINATIONS_CONFIG;
  }

  /**
   * 生成影片
   * @param {string} prompt - 提示詞
   * @param {Object} options - 生成選項
   * @returns {Promise<Object>} 生成結果
   */
  async generate(prompt, options = {}) {
    this.logger.add('🎬 開始生成影片', { prompt, options });

    try {
      const result = await this.provider.generate(prompt, options);
      this.logger.add('✅ 影片生成成功', { 
        mimeType: result.mimeType,
        size: result.size 
      });
      return result;
    } catch (error) {
      this.logger.add('❌ 影片生成失敗', { error: error.message });
      throw error;
    }
  }

  /**
   * 獲取支援的模型列表
   * @returns {Array} 模型列表
   */
  getModels() {
    return this.config.models;
  }

  /**
   * 獲取支援的樣式列表
   * @returns {Array} 樣式列表
   */
  getStyles() {
    return [
      { id: 'cinematic', name: '電影風格', description: '電影級質感' },
      { id: 'anime', name: '動漫風格', description: '日系動漫風格' },
      { id: 'realistic', name: '寫實風格', description: '真實寫實風格' },
      { id: 'artistic', name: '藝術風格', description: '藝術創作風格' },
      { id: '3d', name: '3D 風格', description: '3D 渲染風格' }
    ];
  }

  /**
   * 獲取預設尺寸列表
   * @returns {Object} 尺寸配置
   */
  getPresetSizes() {
    return this.config.presetSizes;
  }

  /**
   * 獲取預設參數
   * @returns {Object} 預設參數
   */
  getDefaults() {
    return this.config.defaults;
  }

  /**
   * 獲取日誌
   * @returns {Array} 日誌陣列
   */
  getLogs() {
    return this.logger.getLogs();
  }

  /**
   * 清空日誌
   */
  clearLogs() {
    this.logger.clear();
  }
}
