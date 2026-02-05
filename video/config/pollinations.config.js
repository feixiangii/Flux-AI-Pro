/**
 * Pollinations.ai 影片生成配置
 * 官方 API 文件: https://pollinations.ai/
 */

export const POLLINATIONS_CONFIG = {
  name: 'Pollinations',
  envKey: 'POLLINATIONS_VIDEO_API_KEY',
  
  // API 端點配置
  api: {
    baseUrl: 'https://gen.pollinations.ai/image',
    animateUrl: 'https://gen.pollinations.ai/image/animate',
    timeout: 120000 // 120 秒
  },
  
  // 支援的模型
  models: [
    {
      id: 'seedance',
      name: 'Seedance',
      description: 'BytePlus 模型，文字/圖片轉影片 (2-10秒)',
      cost: '0.0000018/token',
      features: ['text-to-video', 'image-to-video'],
      duration: { min: 2, max: 10 },
      paid: false
    },
    {
      id: 'seedance-pro',
      name: 'Seedance Pro',
      description: 'BytePlus 進階版，更好的提示詞遵循 (2-10秒)',
      cost: '0.000001/token',
      features: ['text-to-video', 'image-to-video'],
      duration: { min: 2, max: 10 },
      paid: false
    },
    {
      id: 'wan',
      name: 'Wan',
      description: '圖片轉影片含音訊 (2-15秒，最高 1080P)',
      cost: '0.025 Pollen/sec',
      features: ['image-to-video', 'audio'],
      duration: { min: 2, max: 15 },
      paid: false
    }
  ],
  
  // 預設尺寸
  presetSizes: {
    '16:9': { width: 1280, height: 720, label: '橫向 (16:9)' },
    '9:16': { width: 720, height: 1280, label: '直向 (9:16)' },
    '1:1': { width: 1024, height: 1024, label: '方形 (1:1)' },
    '1080p': { width: 1920, height: 1080, label: 'Full HD (1080P)' }
  },
  
  // 限流配置
  rateLimit: {
    maxPerHour: 5,
    cooldownSeconds: 180
  },
  
  // 預設參數
  defaults: {
    model: 'seedance',
    fps: 24,
    duration: 5
  }
};
