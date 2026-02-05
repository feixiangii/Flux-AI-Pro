/**
 * Pollinations.ai 影片生成配置
 */

export const POLLINATIONS_CONFIG = {
  name: 'Pollinations',
  envKey: 'POLLINATIONS_VIDEO_API_KEY',
  
  // API 端點配置
  api: {
    baseUrl: 'https://image.pollinations.ai/video',
    animateUrl: 'https://image.pollinations.ai/animate',
    timeout: 120000 // 120 秒
  },
  
  // 支援的模型
  models: [
    { id: 'flux-video', name: 'Flux Video', description: '預設模型，高品質影片生成' },
    { id: 'turbo', name: 'Turbo', description: '快速生成模式' }
  ],
  
  // 預設尺寸
  presetSizes: {
    '16:9': { width: 1280, height: 720, label: '橫向 (16:9)' },
    '9:16': { width: 720, height: 1280, label: '直向 (9:16)' },
    '1:1': { width: 1024, height: 1024, label: '方形 (1:1)' }
  },
  
  // 限流配置
  rateLimit: {
    maxPerHour: 5,
    cooldownSeconds: 180
  },
  
  // 預設參數
  defaults: {
    model: 'flux-video',
    fps: 24,
    duration: 5
  }
};
