/**
 * 影片生成限流器
 */

export class VideoRateLimiter {
  /**
   * 建構函式
   * @param {Object} env - Cloudflare Workers 環境變數
   * @param {Object} config - 限流配置
   */
  constructor(env, config) {
    this.env = env;
    this.config = config;
    this.kvNamespace = env?.FLUX_KV || env?.VIDEO_KV || env?.KV;
  }

  /**
   * 獲取客戶端 IP
   * @param {Request} request - 請求物件
   * @returns {string} IP 地址
   */
  getClientIP(request) {
    return request.headers.get('CF-Connecting-IP') || 
           request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() || 
           request.headers.get('X-Real-IP') ||
           'unknown';
  }

  /**
   * 檢查限流
   * @param {string} ip - IP 地址
   * @returns {Promise<Object>} 限流檢查結果
   */
  async checkLimit(ip) {
    if (!this.kvNamespace) {
      // 如果沒有 KV，跳過限流檢查
      return { allowed: true, remaining: Infinity };
    }

    const key = `video_quota:${ip}`;
    const data = await this.kvNamespace.get(key, { type: 'json' });

    if (!data) {
      return { 
        allowed: true, 
        remaining: this.config.rateLimit.maxPerHour - 1 
      };
    }

    const now = Date.now();
    const windowMs = 3600000; // 1 小時

    // 檢查時間窗口是否過期
    if (now - data.timestamp > windowMs) {
      await this.kvNamespace.delete(key);
      return { 
        allowed: true, 
        remaining: this.config.rateLimit.maxPerHour - 1 
      };
    }

    // 檢查是否超過限制
    if (data.count >= this.config.rateLimit.maxPerHour) {
      const retryAfter = Math.ceil((windowMs - (now - data.timestamp)) / 1000);
      return { 
        allowed: false, 
        remaining: 0,
        retryAfter 
      };
    }

    return { 
      allowed: true, 
      remaining: this.config.rateLimit.maxPerHour - data.count - 1 
    };
  }

  /**
   * 檢查冷卻時間
   * @param {string} ip - IP 地址
   * @returns {Promise<Object>} 冷卻檢查結果
   */
  async checkCooldown(ip) {
    if (!this.kvNamespace) {
      return { allowed: true };
    }

    const key = `video_cooldown:${ip}`;
    const data = await this.kvNamespace.get(key, { type: 'json' });

    if (!data) {
      return { allowed: true };
    }

    const now = Date.now();
    const cooldownMs = this.config.rateLimit.cooldownSeconds * 1000;

    if (now - data.timestamp < cooldownMs) {
      const remaining = Math.ceil((cooldownMs - (now - data.timestamp)) / 1000);
      return { 
        allowed: false, 
        remaining 
      };
    }

    await this.kvNamespace.delete(key);
    return { allowed: true };
  }

  /**
   * 記錄生成
   * @param {string} ip - IP 地址
   * @returns {Promise<void>}
   */
  async recordGeneration(ip) {
    if (!this.kvNamespace) {
      return;
    }

    const quotaKey = `video_quota:${ip}`;
    const cooldownKey = `video_cooldown:${ip}`;

    // 更新配額
    const quotaData = await this.kvNamespace.get(quotaKey, { type: 'json' });
    if (!quotaData) {
      await this.kvNamespace.put(quotaKey, JSON.stringify({
        count: 1,
        timestamp: Date.now()
      }), { expirationTtl: 3600 });
    } else {
      await this.kvNamespace.put(quotaKey, JSON.stringify({
        count: quotaData.count + 1,
        timestamp: quotaData.timestamp
      }), { expirationTtl: 3600 });
    }

    // 設置冷卻
    await this.kvNamespace.put(cooldownKey, JSON.stringify({
      timestamp: Date.now()
    }), { expirationTtl: this.config.rateLimit.cooldownSeconds });
  }

  /**
   * 獲取配額資訊
   * @param {string} ip - IP 地址
   * @returns {Promise<Object>} 配額資訊
   */
  async getQuotaInfo(ip) {
    if (!this.kvNamespace) {
      return {
        maxPerHour: this.config.rateLimit.maxPerHour,
        used: 0,
        remaining: Infinity,
        resetAt: null
      };
    }

    const key = `video_quota:${ip}`;
    const data = await this.kvNamespace.get(key, { type: 'json' });

    if (!data) {
      return {
        maxPerHour: this.config.rateLimit.maxPerHour,
        used: 0,
        remaining: this.config.rateLimit.maxPerHour,
        resetAt: null
      };
    }

    const now = Date.now();
    const windowMs = 3600000;
    const resetAt = data.timestamp + windowMs;

    if (now - data.timestamp > windowMs) {
      return {
        maxPerHour: this.config.rateLimit.maxPerHour,
        used: 0,
        remaining: this.config.rateLimit.maxPerHour,
        resetAt: null
      };
    }

    return {
      maxPerHour: this.config.rateLimit.maxPerHour,
      used: data.count,
      remaining: this.config.rateLimit.maxPerHour - data.count,
      resetAt: new Date(resetAt).toISOString()
    };
  }

  /**
   * 重置配額
   * @param {string} ip - IP 地址
   * @returns {Promise<void>}
   */
  async resetQuota(ip) {
    if (!this.kvNamespace) {
      return;
    }

    const key = `video_quota:${ip}`;
    await this.kvNamespace.delete(key);
  }
}
