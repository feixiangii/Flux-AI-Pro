/**
 * 影片生成模組入口
 * 
 * 這個模組提供簡化的 Pollinations.ai 影片生成功能
 * 移除了其他供應商（Runway、Pika、Luma、Kling）
 */

// 核心服務
export { VideoService } from './core/video-service.js';
export { VideoRateLimiter } from './core/rate-limiter.js';

// 供應商
export { PollinationsProvider } from './providers/pollinations-provider.js';

// 配置
export { POLLINATIONS_CONFIG } from './config/pollinations.config.js';

// 工具
export { Logger } from './utils/logger.js';

// API 處理器
export { handleVideoAPI } from './api/handlers.js';
