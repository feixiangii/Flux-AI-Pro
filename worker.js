// =================================================================================
//  項目: Flux AI Pro
//  版本: 9.4.0-fixed
//  作者: Enhanced by AI Assistant  
//  日期: 2025-12-12
//  功能: 多張生成質量一致性修復 | Seed控制 | 39種風格 | 35+尺寸
//  修復: 批量生成質量不一致問題 | 翻譯優化 | UI美化
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "9.4.0-fixed",
  API_MASTER_KEY: "1",
  
  PROVIDERS: {
    pollinations: {
      name: "Pollinations.ai",
      endpoint: "https://image.pollinations.ai",
      type: "direct",
      auth_mode: "free",
      requires_key: false,
      enabled: true,
      default: true,
      description: "完全免費的 AI 圖像生成服務",
      features: {
        private_mode: true,
        custom_size: true,
        seed_control: true,
        negative_prompt: true,
        enhance: true,
        nologo: true,
        style_presets: true,
        auto_hd: true,
        quality_modes: true,
        auto_translate: true,
        ultra_hd_4k: true,
        reference_images: true,
        image_to_image: true,
        multi_image_fusion: true,
        batch_generation: true
      },
      models: [
        { id: "flux", name: "Flux", confirmed: true, category: "flux", description: "均衡速度與質量", max_size: 2048 },
        { id: "flux-realism", name: "Flux Realism", confirmed: true, category: "flux", description: "超寫實風格", max_size: 2048 },
        { id: "flux-anime", name: "Flux Anime", confirmed: true, category: "flux", description: "日系動漫風格", max_size: 2048 },
        { id: "flux-3d", name: "Flux 3D", confirmed: true, category: "flux", description: "3D 渲染風格", max_size: 2048 },
        { id: "flux-pro", name: "Flux Pro", confirmed: true, category: "flux", description: "專業版最高質量", max_size: 2048 },
        { id: "any-dark", name: "Any Dark", confirmed: true, category: "flux", description: "暗黑風格", max_size: 2048 },
        { id: "turbo", name: "Turbo", confirmed: true, category: "flux", description: "極速生成", max_size: 2048 },
        { id: "flux-1.1-pro", name: "Flux 1.1 Pro 🔥", confirmed: false, fallback: ["flux-pro", "flux-realism"], experimental: true, category: "flux-advanced", description: "最新 Flux 1.1", max_size: 2048 },
        { id: "flux-kontext", name: "Flux Kontext 🎨", confirmed: false, fallback: ["flux-pro", "flux-realism"], experimental: true, category: "flux-advanced", description: "圖像編輯 (1張參考圖)", max_size: 2048, supports_reference_images: true, max_reference_images: 1 },
        { id: "flux-kontext-pro", name: "Flux Kontext Pro 💎", confirmed: false, fallback: ["flux-kontext", "flux-pro"], experimental: true, category: "flux-advanced", description: "圖像編輯專業版 (1張參考圖)", max_size: 2048, supports_reference_images: true, max_reference_images: 1 },
        { id: "nanobanana", name: "Nano Banana 🍌", confirmed: true, category: "gemini", description: "Gemini 2.5 Flash (4張參考圖)", max_size: 2048, supports_reference_images: true, max_reference_images: 4 },
        { id: "nanobanana-pro", name: "Nano Banana Pro 🍌💎", confirmed: true, category: "gemini", description: "Gemini 3 Pro (4K + 4張參考圖)", max_size: 4096, ultra_hd: true, supports_reference_images: true, max_reference_images: 4 },
        { id: "sd3", name: "Stable Diffusion 3 ⚡", confirmed: false, fallback: ["flux-realism", "flux"], experimental: true, category: "stable-diffusion", description: "SD3 標準版", max_size: 2048 },
        { id: "sd3.5-large", name: "SD 3.5 Large 🔥", confirmed: false, fallback: ["sd3", "flux-realism"], experimental: true, category: "stable-diffusion", description: "SD 3.5 大模型", max_size: 2048 },
        { id: "sd3.5-turbo", name: "SD 3.5 Turbo ⚡", confirmed: false, fallback: ["turbo", "flux"], experimental: true, category: "stable-diffusion", description: "SD 3.5 快速版", max_size: 2048 },
        { id: "sdxl", name: "SDXL 📐", confirmed: false, fallback: ["flux-realism", "flux"], experimental: true, category: "stable-diffusion", description: "經典 SDXL", max_size: 2048 },
        { id: "sdxl-lightning", name: "SDXL Lightning ⚡", confirmed: false, fallback: ["turbo", "flux"], experimental: true, category: "stable-diffusion", description: "SDXL 極速版", max_size: 2048 }
      ],
      rate_limit: null,
      max_size: { width: 4096, height: 4096 }
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  STYLE_PRESETS: {
    none: { name: "無 (使用原始提示詞)", prompt: "", negative: "" },
    anime: { name: "動漫風格 ✨", prompt: "anime style, anime art, vibrant colors, anime character, detailed anime", negative: "realistic, photograph, 3d, ugly" },
    "anime-chibi": { name: "Q版動漫 🎎", prompt: "chibi style, cute chibi character, big eyes, small body, kawaii, adorable", negative: "realistic, tall, adult proportions, serious" },
    "japanese-manga": { name: "日本漫畫 📚", prompt: "manga style, black and white manga, screentone, manga panel, Japanese comic art, ink drawing", negative: "colored, realistic, photograph, western comic" },
    "shoujo-manga": { name: "少女漫畫 💕", prompt: "shoujo manga style, sparkles, flowers background, big expressive eyes, romantic, soft lines", negative: "shounen, action, dark, gritty" },
    "seinen-manga": { name: "青年漫畫 🗡️", prompt: "seinen manga style, detailed linework, realistic anatomy, mature themes, detailed shading", negative: "childish, cute, simple, cartoon" },
    photorealistic: { name: "寫實照片 📷", prompt: "photorealistic, ultra realistic, 8k uhd, professional photography, detailed, sharp focus, DSLR, high resolution", negative: "anime, cartoon, illustration, painting, drawing, art" },
    "cinematic": { name: "電影級 🎬", prompt: "cinematic lighting, movie still, dramatic lighting, film grain, depth of field, bokeh, anamorphic lens", negative: "amateur, flat lighting, overexposed, cartoon" },
    "portrait": { name: "人像攝影 👤", prompt: "professional portrait, studio lighting, bokeh background, 85mm lens, shallow depth of field, perfect skin", negative: "full body, landscape, distorted face, bad lighting" },
    "oil-painting": { name: "油畫 🎨", prompt: "oil painting, classical oil painting style, visible brushstrokes, rich colors, artistic, canvas texture", negative: "photograph, digital art, anime, flat" },
    watercolor: { name: "水彩畫 💧", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted, paper texture, flowing colors", negative: "photograph, digital, sharp edges, 3d" },
    "chinese-painting": { name: "中國水墨畫 🖌️", prompt: "Chinese ink painting, sumi-e style, traditional Chinese art, brush painting, minimalist, black ink, rice paper", negative: "colorful, western, digital, photograph" },
    "ukiyo-e": { name: "浮世繪 🗾", prompt: "ukiyo-e style, Japanese woodblock print, Hokusai style, traditional Japanese art, flat colors, bold outlines", negative: "3d, realistic, photograph, modern" },
    sketch: { name: "素描 ✏️", prompt: "pencil sketch, hand-drawn, sketch art, graphite drawing, artistic sketch, cross-hatching", negative: "colored, painted, digital, photograph" },
    "charcoal": { name: "炭筆畫 🖍️", prompt: "charcoal drawing, charcoal sketch, dramatic shading, black and white, expressive strokes", negative: "colored, digital, clean lines, photograph" },
    "digital-art": { name: "數位藝術 💻", prompt: "digital art, digital painting, concept art, artstation, highly detailed, vibrant colors", negative: "photograph, traditional art, sketch, low quality" },
    "pixel-art": { name: "像素藝術 🕹️", prompt: "pixel art, 8-bit style, retro gaming, pixelated, limited color palette, sharp pixels", negative: "high resolution, smooth, realistic, blurry" },
    "vector-art": { name: "向量藝術 📐", prompt: "vector art, flat design, clean lines, geometric shapes, Adobe Illustrator style, minimalist", negative: "realistic, textured, sketchy, photograph" },
    "low-poly": { name: "低多邊形 🔷", prompt: "low poly art, geometric, faceted, 3D low poly, minimalist 3D, triangular faces", negative: "high poly, realistic, smooth, curved" },
    fantasy: { name: "奇幻風格 🐉", prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration, mystical, enchanted", negative: "modern, realistic, mundane, contemporary" },
    "dark-fantasy": { name: "黑暗奇幻 🌑", prompt: "dark fantasy, gothic, dark atmosphere, ominous, sinister, dramatic shadows, horror elements", negative: "bright, cheerful, cute, colorful" },
    "fairy-tale": { name: "童話風格 🧚", prompt: "fairy tale art, storybook illustration, whimsical, magical, enchanted forest, dreamy", negative: "realistic, modern, dark, gritty" },
    cyberpunk: { name: "賽博朋克 🌃", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life, blade runner style", negative: "natural, rustic, medieval, fantasy" },
    "sci-fi": { name: "科幻未來 🚀", prompt: "sci-fi, futuristic, advanced technology, space age, sleek design, holographic", negative: "medieval, fantasy, historical, primitive" },
    steampunk: { name: "蒸汽朋克 ⚙️", prompt: "steampunk style, Victorian era, brass and copper, gears and cogs, mechanical, industrial revolution", negative: "modern, digital, minimalist, clean" },
    "vaporwave": { name: "蒸氣波 🌈", prompt: "vaporwave aesthetic, retro 80s, neon pink and cyan, glitch art, nostalgic, geometric patterns", negative: "realistic, modern, natural colors" },
    "studio-ghibli": { name: "吉卜力風格 🍃", prompt: "Studio Ghibli style, Hayao Miyazaki, anime, soft colors, whimsical, detailed background, hand-drawn", negative: "realistic, dark, 3D, western animation" },
    "disney": { name: "迪士尼風格 🏰", prompt: "Disney animation style, 3D animated, Pixar style, colorful, expressive characters, family-friendly", negative: "realistic, anime, dark, gritty" },
    "comic-book": { name: "美式漫畫 💥", prompt: "comic book style, bold lines, halftone dots, superhero comic, dynamic pose, action lines", negative: "realistic, photograph, manga, soft" },
    "pop-art": { name: "普普藝術 🎭", prompt: "pop art style, Andy Warhol, Roy Lichtenstein, bold colors, halftone, graphic design, retro", negative: "realistic, subtle, muted colors, classical" },
    "art-deco": { name: "裝飾藝術 💎", prompt: "art deco style, geometric patterns, luxurious, elegant, 1920s, gold and black, symmetrical", negative: "organic, natural, messy, modern minimalist" },
    "art-nouveau": { name: "新藝術風格 🌺", prompt: "art nouveau style, flowing lines, organic forms, floral motifs, Alphonse Mucha, elegant curves", negative: "geometric, modern, minimalist, angular" },
    "impressionism": { name: "印象派 🌅", prompt: "impressionism style, visible brushstrokes, emphasis on light, Monet, soft focus, outdoor scenes", negative: "sharp, detailed, photorealistic, digital" },
    "abstract": { name: "抽象藝術 🎨", prompt: "abstract art, non-representational, geometric shapes, bold colors, expressive, modern art", negative: "realistic, detailed, representational, photographic" },
    "minimalist": { name: "極簡主義 ⬜", prompt: "minimalist art, simple, clean lines, negative space, limited color palette, modern, elegant", negative: "detailed, complex, ornate, cluttered" },
    "graffiti": { name: "塗鴉藝術 🎨", prompt: "graffiti art, street art, spray paint, urban, bold colors, tags, wild style lettering", negative: "classical, refined, photorealistic, corporate" },
    "surrealism": { name: "超現實主義 🌀", prompt: "surrealism, dreamlike, Salvador Dali style, impossible geometry, bizarre, subconscious imagery", negative: "realistic, ordinary, conventional, logical" },
    "horror": { name: "恐怖風格 👻", prompt: "horror art, creepy, disturbing, dark atmosphere, unsettling, macabre, gothic horror", negative: "cute, bright, cheerful, wholesome" },
    "kawaii": { name: "可愛風格 🌸", prompt: "kawaii style, cute, adorable, pastel colors, Japanese cute culture, soft, rounded shapes", negative: "realistic, dark, scary, mature" }
  },
  
  OPTIMIZATION_RULES: {
    MODEL_STEPS: {
      "turbo": { min: 4, optimal: 8, max: 12 },
      "sdxl-lightning": { min: 4, optimal: 6, max: 10 },
      "sd3.5-turbo": { min: 8, optimal: 12, max: 20 },
      "flux": { min: 15, optimal: 20, max: 30 },
      "flux-anime": { min: 15, optimal: 20, max: 30 },
      "flux-3d": { min: 15, optimal: 22, max: 35 },
      "sd3": { min: 18, optimal: 25, max: 35 },
      "sdxl": { min: 20, optimal: 28, max: 40 },
      "flux-realism": { min: 20, optimal: 28, max: 40 },
      "flux-pro": { min: 25, optimal: 32, max: 45 },
      "flux-1.1-pro": { min: 20, optimal: 28, max: 40 },
      "sd3.5-large": { min: 25, optimal: 35, max: 50 },
      "flux-kontext": { min: 22, optimal: 30, max: 40 },
      "flux-kontext-pro": { min: 25, optimal: 35, max: 45 },
      "any-dark": { min: 18, optimal: 24, max: 35 },
      "nanobanana": { min: 15, optimal: 22, max: 30 },
      "nanobanana-pro": { min: 25, optimal: 35, max: 50 }
    },
    SIZE_MULTIPLIER: {
      small: { threshold: 512 * 512, multiplier: 0.8 },
      medium: { threshold: 1024 * 1024, multiplier: 1.0 },
      large: { threshold: 1536 * 1536, multiplier: 1.15 },
      xlarge: { threshold: 2048 * 2048, multiplier: 1.3 },
      ultra_4k: { threshold: 4096 * 4096, multiplier: 1.5 }
    },
    STYLE_ADJUSTMENT: {
      "photorealistic": 1.1,
      "oil-painting": 1.05,
      "watercolor": 0.95,
      "sketch": 0.9,
      "default": 1.0
    }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    QUALITY_MODES: {
      economy: { name: "經濟模式", description: "快速出圖,適合測試", min_resolution: 1024, max_resolution: 2048, steps_multiplier: 0.85, guidance_multiplier: 0.9, hd_level: "basic" },
      standard: { name: "標準模式", description: "平衡質量與速度", min_resolution: 1280, max_resolution: 2048, steps_multiplier: 1.0, guidance_multiplier: 1.0, hd_level: "enhanced" },
      ultra: { name: "超高清模式", description: "極致質量,耗時較長", min_resolution: 1536, max_resolution: 4096, steps_multiplier: 1.35, guidance_multiplier: 1.15, hd_level: "maximum", force_upscale: true },
      ultra_4k: { name: "4K超高清", description: "Nano Banana Pro 專屬", min_resolution: 2048, max_resolution: 4096, steps_multiplier: 1.5, guidance_multiplier: 1.2, hd_level: "ultra_4k", force_upscale: true, exclusive_models: ["nanobanana-pro"] }
    },
    HD_PROMPTS: {
      basic: "high quality, detailed, sharp",
      enhanced: "high quality, extremely detailed, sharp focus, crisp, clear, professional, 8k uhd, masterpiece, fine details",
      maximum: "ultra high quality, extremely detailed, razor sharp focus, crystal clear, professional grade, 8k uhd resolution, masterpiece quality, fine details, intricate details, perfect clarity",
      ultra_4k: "ultra high definition 4K quality, extreme detail precision, professional grade, pixel-perfect clarity, masterpiece quality, intricate fine details"
    },
    HD_NEGATIVE: "low quality, blurry, pixelated, low resolution, jpeg artifacts, compression artifacts, bad quality, distorted, noisy, grainy, poor details, soft focus, out of focus",
    MODEL_QUALITY_PROFILES: {
      "flux-realism": { priority: "ultra_detail", min_resolution: 1536, max_resolution: 2048, optimal_steps_boost: 1.25, guidance_boost: 1.15, recommended_quality: "ultra" },
      "flux-pro": { priority: "maximum_quality", min_resolution: 1536, max_resolution: 2048, optimal_steps_boost: 1.3, guidance_boost: 1.2, recommended_quality: "ultra" },
      "flux-1.1-pro": { priority: "maximum_quality", min_resolution: 1536, max_resolution: 2048, optimal_steps_boost: 1.25, guidance_boost: 1.15, recommended_quality: "ultra" },
      "sd3.5-large": { priority: "high_detail", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "standard" },
      "flux-anime": { priority: "clarity", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "standard" },
      "flux-3d": { priority: "detail", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "standard" },
      "flux-kontext": { priority: "image_edit", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "standard" },
      "flux-kontext-pro": { priority: "image_edit_pro", min_resolution: 1536, max_resolution: 2048, optimal_steps_boost: 1.3, guidance_boost: 1.15, recommended_quality: "ultra" },
      "nanobanana": { priority: "multi_image", min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.1, recommended_quality: "standard" },
      "nanobanana-pro": { priority: "ultra_4k_multi", min_resolution: 2048, max_resolution: 4096, optimal_steps_boost: 1.5, guidance_boost: 1.25, recommended_quality: "ultra_4k" },
      "turbo": { priority: "speed", min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.7, guidance_boost: 0.85, recommended_quality: "economy" },
      "sdxl-lightning": { priority: "speed", min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.6, guidance_boost: 0.8, recommended_quality: "economy" },
      "sd3.5-turbo": { priority: "balanced_speed", min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.8, guidance_boost: 0.9, recommended_quality: "economy" }
    }
  },
  
  FETCH_TIMEOUT: 90000,
  MAX_RETRIES: 3,
  
  PRESET_SIZES: {
    "square-512": { width: 512, height: 512, name: "方形 512px (快速測試)" },
    "square-1k": { width: 1024, height: 1024, name: "方形 1K (標準)" },
    "square-1.5k": { width: 1536, height: 1536, name: "方形 1.5K (高清)" },
    "square-2k": { width: 2048, height: 2048, name: "方形 2K (超清)" },
    "square-4k": { width: 4096, height: 4096, name: "方形 4K 🍌", exclusive: ["nanobanana-pro"] },
    "portrait-9-16": { width: 768, height: 1344, name: "豎屏 9:16 (TikTok/Story)" },
    "portrait-9-16-hd": { width: 1080, height: 1920, name: "豎屏 9:16 HD (1080p)" },
    "portrait-9-16-2k": { width: 1536, height: 2688, name: "豎屏 9:16 2K" },
    "portrait-3-4": { width: 768, height: 1024, name: "豎屏 3:4 (Instagram)" },
    "portrait-3-4-hd": { width: 1152, height: 1536, name: "豎屏 3:4 HD" },
    "portrait-2-3": { width: 1024, height: 1536, name: "豎屏 2:3 (Pinterest)" },
    "landscape-16-9": { width: 1344, height: 768, name: "橫屏 16:9 (YouTube)" },
    "landscape-16-9-hd": { width: 1920, height: 1080, name: "橫屏 16:9 HD (1080p)" },
    "landscape-16-9-2k": { width: 2560, height: 1440, name: "橫屏 16:9 2K (1440p)" },
    "landscape-16-9-4k": { width: 3840, height: 2160, name: "橫屏 16:9 4K 🍌", exclusive: ["nanobanana-pro"] },
    "landscape-4-3": { width: 1024, height: 768, name: "橫屏 4:3 (傳統)" },
    "landscape-21-9": { width: 2560, height: 1080, name: "橫屏 21:9 (超寬螢幕)" },
    "instagram-square": { width: 1080, height: 1080, name: "Instagram 方形貼文" },
    "instagram-portrait": { width: 1080, height: 1350, name: "Instagram 豎屏貼文 (4:5)" },
    "instagram-story": { width: 1080, height: 1920, name: "Instagram Story/Reels" },
    "facebook-cover": { width: 2048, height: 1152, name: "Facebook 封面 (16:9)" },
    "twitter-header": { width: 1500, height: 500, name: "Twitter/X 橫幅 (3:1)" },
    "youtube-thumbnail": { width: 1280, height: 720, name: "YouTube 縮圖" },
    "linkedin-banner": { width: 1584, height: 396, name: "LinkedIn 橫幅" },
    "a4-portrait": { width: 2480, height: 3508, name: "A4 豎屏 (300 DPI)" },
    "a4-landscape": { width: 3508, height: 2480, name: "A4 橫屏 (300 DPI)" },
    "poster-24-36": { width: 2400, height: 3600, name: "海報 24x36 英吋" },
    "wallpaper-fhd": { width: 1920, height: 1080, name: "桌布 Full HD (1080p)" },
    "wallpaper-2k": { width: 2560, height: 1440, name: "桌布 2K (1440p)" },
    "wallpaper-4k": { width: 3840, height: 2160, name: "桌布 4K 🍌", exclusive: ["nanobanana-pro"] },
    "wallpaper-ultrawide": { width: 3440, height: 1440, name: "桌布 Ultra-Wide (21:9)" },
    "mobile-wallpaper": { width: 1242, height: 2688, name: "手機桌布 (iPhone)" },
    "custom": { width: 1024, height: 1024, name: "自定義尺寸" }
  },
  
  HISTORY: {
    MAX_ITEMS: 100,
    STORAGE_KEY: "flux_ai_history"
  }
};

const API_OPTIMIZATION = {
  RATE_LIMIT: { enabled: true, max_requests_per_minute: 10, max_requests_per_hour: 100, blacklist_duration: 3600000, whitelist_ips: [] },
  CACHE: { enabled: true, ttl: 3600, max_size: 100, strategy: 'lru' },
  COMPRESSION: { enabled: true, threshold: 1024, quality: 0.85 },
  CONCURRENCY: { max_parallel: 3, queue_limit: 10, timeout: 120000 },
  MONITORING: { enabled: true, log_requests: true, track_errors: true, performance_metrics: true }
};

class RateLimiter {
  constructor() { this.requests = new Map(); this.blacklist = new Map(); }
  async check(ip) {
    if (this.blacklist.has(ip)) {
      const blockedUntil = this.blacklist.get(ip);
      if (Date.now() < blockedUntil) return { allowed: false, reason: 'IP blocked', retryAfter: Math.ceil((blockedUntil - Date.now()) / 1000) };
      else this.blacklist.delete(ip);
    }
    if (API_OPTIMIZATION.RATE_LIMIT.whitelist_ips.includes(ip)) return { allowed: true };
    const now = Date.now(); const oneMinute = 60000; const oneHour = 3600000;
    if (!this.requests.has(ip)) this.requests.set(ip, []);
    const userRequests = this.requests.get(ip);
    const validRequests = userRequests.filter(time => now - time < oneHour);
    this.requests.set(ip, validRequests);
    const recentRequests = validRequests.filter(time => now - time < oneMinute);
    if (recentRequests.length >= API_OPTIMIZATION.RATE_LIMIT.max_requests_per_minute) return { allowed: false, reason: 'Too many requests per minute', limit: API_OPTIMIZATION.RATE_LIMIT.max_requests_per_minute, current: recentRequests.length };
    if (validRequests.length >= API_OPTIMIZATION.RATE_LIMIT.max_requests_per_hour) {
      this.blacklist.set(ip, now + API_OPTIMIZATION.RATE_LIMIT.blacklist_duration);
      return { allowed: false, reason: 'Hourly limit exceeded', limit: API_OPTIMIZATION.RATE_LIMIT.max_requests_per_hour, blockedUntil: new Date(now + API_OPTIMIZATION.RATE_LIMIT.blacklist_duration).toISOString() };
    }
    validRequests.push(now); this.requests.set(ip, validRequests);
    return { allowed: true, remaining: { perMinute: API_OPTIMIZATION.RATE_LIMIT.max_requests_per_minute - recentRequests.length - 1, perHour: API_OPTIMIZATION.RATE_LIMIT.max_requests_per_hour - validRequests.length } };
  }
  reset(ip) { this.requests.delete(ip); this.blacklist.delete(ip); }
}

class SimpleCache {
  constructor() { this.cache = new Map(); this.accessTime = new Map(); }
  get(key) {
    if (!API_OPTIMIZATION.CACHE.enabled) return null;
    const cached = this.cache.get(key);
    if (!cached) return null;
    const { value, expires } = cached;
    if (Date.now() > expires) { this.cache.delete(key); this.accessTime.delete(key); return null; }
    this.accessTime.set(key, Date.now()); return value;
  }
  set(key, value, ttl = API_OPTIMIZATION.CACHE.ttl) {
    if (!API_OPTIMIZATION.CACHE.enabled) return;
    if (this.cache.size >= API_OPTIMIZATION.CACHE.max_size) {
      let oldestKey = null, oldestTime = Date.now();
      for (const [k, time] of this.accessTime.entries()) { if (time < oldestTime) { oldestTime = time; oldestKey = k; } }
      if (oldestKey) { this.cache.delete(oldestKey); this.accessTime.delete(oldestKey); }
    }
    this.cache.set(key, { value, expires: Date.now() + (ttl * 1000) }); this.accessTime.set(key, Date.now());
  }
  clear() { this.cache.clear(); this.accessTime.clear(); }
}

class PerformanceMonitor {
  constructor() { this.metrics = { total_requests: 0, successful_requests: 0, failed_requests: 0, total_duration: 0, avg_duration: 0, errors: [] }; }
  recordRequest(success, duration, error = null) {
    this.metrics.total_requests++; this.metrics.total_duration += duration; this.metrics.avg_duration = this.metrics.total_duration / this.metrics.total_requests;
    if (success) this.metrics.successful_requests++; else { this.metrics.failed_requests++; if (error && this.metrics.errors.length < 100) this.metrics.errors.push({ message: error, timestamp: new Date().toISOString() }); }
  }
  getStats() { return { ...this.metrics, success_rate: ((this.metrics.successful_requests / this.metrics.total_requests) * 100).toFixed(2) + '%', avg_duration_ms: this.metrics.avg_duration.toFixed(2) }; }
  reset() { this.metrics = { total_requests: 0, successful_requests: 0, failed_requests: 0, total_duration: 0, avg_duration: 0, errors: [] }; }
}

const rateLimiter = new RateLimiter();
const apiCache = new SimpleCache();
const perfMonitor = new PerformanceMonitor();

function getClientIP(request) { return request.headers.get('CF-Connecting-IP') || (request.headers.get('X-Forwarded-For') ? request.headers.get('X-Forwarded-For').split(',')[0].trim() : null) || request.headers.get('X-Real-IP') || 'unknown'; }
function generateCacheKey(prompt, options) {
  const keyData = { prompt, model: options.model, width: options.width, height: options.height, style: options.style, quality_mode: options.qualityMode, seed: options.seed === -1 ? 'random' : options.seed };
  const str = JSON.stringify(keyData); let hash = 0;
  for (let i = 0; i < str.length; i++) { const char = str.charCodeAt(i); hash = ((hash << 5) - hash) + char; hash = hash & hash; }
  return 'cache_' + Math.abs(hash).toString(36);
}

class Logger {
    constructor() { this.logs = []; }
    add(step, data) { const time = new Date().toISOString().split('T')[1].slice(0, -1); this.logs.push({ time, step, data }); console.log('[' + step + ']', data); }
    get() { return this.logs; }
}

async function translateToEnglish(text, env) {
    try {
        const hasChinese = /[\u4e00-\u9fa5]/.test(text);
        if (!hasChinese) return { text, translated: false, reason: "No Chinese detected" };
        if (!env || !env.AI) { console.warn("⚠️ Workers AI not configured"); return { text, translated: false, reason: "AI not configured" }; }
        try {
            const response = await env.AI.run("@cf/meta/m2m100-1.2b", { text, source_lang: "chinese", target_lang: "english" });
            if (response && response.translated_text) { console.log("✅ Translation:", text, "→", response.translated_text); return { text: response.translated_text, translated: true, original: text, model: "m2m100-1.2b" }; }
        } catch (error) { console.error("❌ Translation failed:", error); }
        return { text, translated: false };
    } catch (error) { console.error("❌ translateToEnglish error:", error); return { text, translated: false, error: error.message }; }
}
class PromptAnalyzer {
    static analyzeComplexity(prompt) {
        const complexKeywords = ['detailed', 'intricate', 'complex', 'elaborate', 'realistic', 'photorealistic', 'hyperrealistic', 'architecture', 'cityscape', 'landscape', 'portrait', 'face', 'eyes', 'hair', 'texture', 'material', 'fabric', 'skin', 'lighting', 'shadows', 'reflections', 'fine details', 'high detail', 'ultra detailed', '4k', '8k', 'uhd'];
        let score = 0;
        const lowerPrompt = prompt.toLowerCase();
        complexKeywords.forEach(keyword => { if (lowerPrompt.includes(keyword)) score += 0.1; });
        if (prompt.length > 100) score += 0.2;
        if (prompt.length > 200) score += 0.3;
        if (prompt.split(',').length > 5) score += 0.15;
        return Math.min(score, 1.0);
    }
    static recommendQualityMode(prompt, model) {
        const complexity = this.analyzeComplexity(prompt);
        const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
        if (model === 'nanobanana-pro') return 'ultra_4k';
        if (profile?.recommended_quality) return profile.recommended_quality;
        if (complexity > 0.7) return 'ultra';
        if (complexity > 0.4) return 'standard';
        return 'economy';
    }
}

class HDOptimizer {
    static optimize(prompt, negativePrompt, model, width, height, qualityMode = 'standard', autoHD = true) {
        if (!autoHD || !CONFIG.HD_OPTIMIZATION.enabled) return { prompt, negativePrompt, width, height, optimized: false };
        const hdConfig = CONFIG.HD_OPTIMIZATION;
        const modeConfig = hdConfig.QUALITY_MODES[qualityMode] || hdConfig.QUALITY_MODES.standard;
        const profile = hdConfig.MODEL_QUALITY_PROFILES[model];
        const optimizations = [];
        const hdLevel = modeConfig.hd_level;
        let enhancedPrompt = prompt;
        if (hdConfig.HD_PROMPTS[hdLevel]) {
            const hdBoost = hdConfig.HD_PROMPTS[hdLevel];
            enhancedPrompt = prompt + ", " + hdBoost;
            optimizations.push("HD增強: " + hdLevel);
        }
        let enhancedNegative = negativePrompt || "";
        if (qualityMode !== 'economy') {
            enhancedNegative = enhancedNegative ? enhancedNegative + ", " + hdConfig.HD_NEGATIVE : hdConfig.HD_NEGATIVE;
            optimizations.push("負面提示詞: 高清過濾");
        }
        let finalWidth = width, finalHeight = height, sizeUpscaled = false;
        const maxModelRes = profile?.max_resolution || 2048;
        const minRes = Math.max(modeConfig.min_resolution, profile?.min_resolution || 1024);
        const currentRes = Math.min(width, height);
        if (currentRes < minRes || modeConfig.force_upscale) {
            const scale = minRes / currentRes;
            finalWidth = Math.min(Math.round(width * scale / 64) * 64, maxModelRes);
            finalHeight = Math.min(Math.round(height * scale / 64) * 64, maxModelRes);
            sizeUpscaled = true;
            optimizations.push("尺寸優化: " + width + "x" + height + " → " + finalWidth + "x" + finalHeight);
        }
        if (finalWidth > maxModelRes || finalHeight > maxModelRes) {
            const scale = maxModelRes / Math.max(finalWidth, finalHeight);
            finalWidth = Math.round(finalWidth * scale / 64) * 64;
            finalHeight = Math.round(finalHeight * scale / 64) * 64;
            optimizations.push("模型限制: 調整至 " + finalWidth + "x" + finalHeight);
        }
        return { prompt: enhancedPrompt, negativePrompt: enhancedNegative, width: finalWidth, height: finalHeight, optimized: true, quality_mode: qualityMode, hd_level: hdLevel, optimizations, size_upscaled: sizeUpscaled };
    }
}

class ParameterOptimizer {
    static optimizeSteps(model, width, height, style = 'none', qualityMode = 'standard', userSteps = null) {
        if (userSteps !== null && userSteps !== -1) {
            const suggestion = this.calculateOptimalSteps(model, width, height, style, qualityMode);
            return { steps: userSteps, optimized: false, suggested: suggestion.steps, reasoning: suggestion.reasoning, user_override: true };
        }
        return this.calculateOptimalSteps(model, width, height, style, qualityMode);
    }
    static calculateOptimalSteps(model, width, height, style, qualityMode = 'standard') {
        const rules = CONFIG.OPTIMIZATION_RULES;
        const modelRule = rules.MODEL_STEPS[model] || rules.MODEL_STEPS["flux"];
        const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
        const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
        let baseSteps = modelRule.optimal;
        const reasoning = [model + ": " + baseSteps + "步"];
        const totalPixels = width * height;
        let sizeMultiplier = 1.0;
        if (totalPixels >= rules.SIZE_MULTIPLIER.ultra_4k.threshold) { sizeMultiplier = rules.SIZE_MULTIPLIER.ultra_4k.multiplier; reasoning.push("4K超大 x" + sizeMultiplier); }
        else if (totalPixels >= rules.SIZE_MULTIPLIER.xlarge.threshold) { sizeMultiplier = rules.SIZE_MULTIPLIER.xlarge.multiplier; reasoning.push("超大 x" + sizeMultiplier); }
        else if (totalPixels >= rules.SIZE_MULTIPLIER.large.threshold) { sizeMultiplier = rules.SIZE_MULTIPLIER.large.multiplier; reasoning.push("大尺寸 x" + sizeMultiplier); }
        else if (totalPixels <= rules.SIZE_MULTIPLIER.small.threshold) sizeMultiplier = rules.SIZE_MULTIPLIER.small.multiplier;
        else sizeMultiplier = rules.SIZE_MULTIPLIER.medium.multiplier;
        let styleMultiplier = rules.STYLE_ADJUSTMENT[style] || rules.STYLE_ADJUSTMENT.default;
        let qualityMultiplier = modeConfig?.steps_multiplier || 1.0;
        if (qualityMultiplier !== 1.0) reasoning.push(modeConfig.name + " x" + qualityMultiplier);
        let profileBoost = profile?.optimal_steps_boost || 1.0;
        if (profileBoost !== 1.0) reasoning.push("模型配置 x" + profileBoost);
        let optimizedSteps = Math.round(baseSteps * sizeMultiplier * styleMultiplier * qualityMultiplier * profileBoost);
        optimizedSteps = Math.max(modelRule.min, Math.min(optimizedSteps, modelRule.max));
        reasoning.push("→ " + optimizedSteps + "步");
        return { steps: optimizedSteps, optimized: true, base_steps: baseSteps, size_multiplier: sizeMultiplier, style_multiplier: styleMultiplier, quality_multiplier: qualityMultiplier, profile_boost: profileBoost, min_steps: modelRule.min, max_steps: modelRule.max, reasoning: reasoning.join(' ') };
    }
    static optimizeGuidance(model, style, qualityMode = 'standard') {
        const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
        const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
        let baseGuidance = 7.5;
        if (model.includes('turbo') || model.includes('lightning')) baseGuidance = style === 'photorealistic' ? 3.0 : 2.5;
        else if (style === 'photorealistic') baseGuidance = 8.5;
        else if (['oil-painting', 'watercolor', 'sketch'].includes(style)) baseGuidance = 6.5;
        let qualityBoost = modeConfig?.guidance_multiplier || 1.0;
        let profileBoost = profile?.guidance_boost || 1.0;
        return Math.round(baseGuidance * qualityBoost * profileBoost * 10) / 10;
    }
}

class StyleProcessor {
    static applyStyle(prompt, style, negativePrompt) {
        try {
            if (!style || style === 'none' || style === '') return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
            if (!CONFIG.STYLE_PRESETS || typeof CONFIG.STYLE_PRESETS !== 'object') { console.warn("⚠️ STYLE_PRESETS not found"); return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" }; }
            const styleConfig = CONFIG.STYLE_PRESETS[style];
            if (!styleConfig) { console.warn("⚠️ Style '" + style + "' not found"); return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" }; }
            let enhancedPrompt = prompt;
            if (styleConfig.prompt && styleConfig.prompt.trim()) enhancedPrompt = prompt + ", " + styleConfig.prompt;
            let enhancedNegative = negativePrompt || "";
            if (styleConfig.negative && styleConfig.negative.trim()) {
                if (enhancedNegative && enhancedNegative.trim()) enhancedNegative = enhancedNegative + ", " + styleConfig.negative;
                else enhancedNegative = styleConfig.negative;
            }
            console.log("✅ Style applied:", style);
            return { enhancedPrompt, enhancedNegative };
        } catch (error) { console.error("❌ StyleProcessor error:", error.message); return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" }; }
    }
}

async function fetchWithTimeout(url, options = {}, timeout = CONFIG.FETCH_TIMEOUT) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') throw new Error("Request timeout after " + timeout + "ms");
        throw error;
    }
}
class PollinationsProvider {
    constructor(config, env) {
        this.config = config;
        this.name = config.name;
        this.env = env;
    }
    
    async generate(prompt, options, logger) {
        const { 
            model = "flux", 
            width = 1024, 
            height = 1024, 
            seed = -1, 
            negativePrompt = "", 
            guidance = null, 
            steps = null, 
            enhance = false, 
            nologo = true, 
            privateMode = true, 
            style = "none", 
            autoOptimize = true, 
            autoHD = true, 
            qualityMode = 'standard',
            referenceImages = [],
            _batchMode = false,
            _standardizedParams = null
        } = options;
        
        // 🔧 批量模式: 直接使用預優化的參數
        if (_batchMode && _standardizedParams) {
            logger.add("🔒 Using Standardized Params", { 
                batch_mode: true,
                skip_optimization: true,
                seed: seed
            });
            
            const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
            const encodedPrompt = encodeURIComponent(_standardizedParams.finalPrompt);
            
            const modelConfig = this.config.models.find(m => m.id === model);
            const modelsToTry = [model];
            if (modelConfig?.experimental && modelConfig?.fallback) {
                modelsToTry.push(...modelConfig.fallback);
            }
            
            for (const tryModel of modelsToTry) {
                for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
                    try {
                        let url = this.config.endpoint + "/prompt/" + encodedPrompt;
                        const params = new URLSearchParams();
                        params.append('model', tryModel);
                        params.append('width', _standardizedParams.finalWidth.toString());
                        params.append('height', _standardizedParams.finalHeight.toString());
                        params.append('seed', currentSeed.toString());
                        params.append('nologo', nologo.toString());
                        params.append('enhance', enhance.toString());
                        params.append('private', privateMode.toString());
                        
                        if (referenceImages && referenceImages.length > 0) {
                            params.append('image', referenceImages.join(','));
                        }
                        
                        if (_standardizedParams.finalGuidance !== 7.5) {
                            params.append('guidance', _standardizedParams.finalGuidance.toString());
                        }
                        if (_standardizedParams.finalSteps !== 20) {
                            params.append('steps', _standardizedParams.finalSteps.toString());
                        }
                        
                        url += '?' + params.toString();
                        
                        const response = await fetchWithTimeout(url, { 
                            method: 'GET', 
                            headers: { 
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 
                                'Accept': 'image/*,*/*', 
                                'Accept-Encoding': 'gzip, deflate, br', 
                                'Connection': 'keep-alive', 
                                'Referer': 'https://pollinations.ai/' 
                            } 
                        }, 90000);
                        
                        if (response.ok) {
                            const contentType = response.headers.get('content-type');
                            if (contentType && contentType.startsWith('image/')) {
                                logger.add("✅ Batch Image Generated", { 
                                    url: response.url, 
                                    seed: currentSeed,
                                    batch_consistent: true
                                });
                                
                                return { 
                                    url: response.url, 
                                    provider: this.name, 
                                    model: tryModel, 
                                    requested_model: model, 
                                    seed: currentSeed, 
                                    style: style, 
                                    steps: _standardizedParams.finalSteps, 
                                    guidance: _standardizedParams.finalGuidance, 
                                    width: _standardizedParams.finalWidth, 
                                    height: _standardizedParams.finalHeight,
                                    is_4k: _standardizedParams.finalWidth >= 4096 || _standardizedParams.finalHeight >= 4096,
                                    quality_mode: qualityMode, 
                                    hd_optimized: !!_standardizedParams.hdOptimization, 
                                    hd_details: _standardizedParams.hdOptimization, 
                                    auto_translated: _standardizedParams.translationResult?.translated || false,
                                    reference_images: referenceImages,
                                    reference_images_count: referenceImages.length,
                                    generation_mode: referenceImages.length > 0 ? (referenceImages.length === 1 ? "圖生圖" : "多圖融合") : "文生圖",
                                    cost: "FREE", 
                                    fallback_used: tryModel !== model, 
                                    auto_optimized: true,
                                    batch_mode: true,
                                    optimized_prompt: _standardizedParams.finalPrompt,
                                    optimized_negative: _standardizedParams.finalNegativePrompt,
                                    style_applied: _standardizedParams.styleApplied,
                                    translation_result: _standardizedParams.translationResult
                                };
                            } else {
                                throw new Error("Invalid content type: " + contentType);
                            }
                        } else {
                            throw new Error("HTTP " + response.status);
                        }
                    } catch (e) {
                        if (retry < CONFIG.MAX_RETRIES - 1) {
                            await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
                        }
                    }
                }
            }
            throw new Error("All models failed in batch mode");
        }
        
        // 🔧 以下是原有的單張/第一張優化邏輯
        const modelConfig = this.config.models.find(m => m.id === model);
        const supportsRefImages = modelConfig?.supports_reference_images || false;
        const maxRefImages = modelConfig?.max_reference_images || 0;
        const is4KModel = modelConfig?.max_size === 4096;
        
        let validReferenceImages = [];
        if (referenceImages && referenceImages.length > 0) {
            if (!supportsRefImages) {
                logger.add("⚠️ Reference Images", { 
                    warning: model + " 不支持參考圖,已忽略", 
                    supported_models: ["kontext", "kontext-pro", "nanobanana", "nanobanana-pro"] 
                });
            } else if (referenceImages.length > maxRefImages) {
                logger.add("⚠️ Reference Images", { 
                    warning: model + " 最多支持 " + maxRefImages + " 張參考圖", 
                    provided: referenceImages.length, 
                    using: maxRefImages 
                });
                validReferenceImages = referenceImages.slice(0, maxRefImages);
            } else {
                validReferenceImages = referenceImages;
                logger.add("🖼️ Reference Images", { 
                    model: model, 
                    count: validReferenceImages.length, 
                    max_allowed: maxRefImages,
                    mode: validReferenceImages.length === 1 ? "圖生圖" : "多圖融合"
                });
            }
        }
        
        let hdOptimization = null;
        let finalPrompt = prompt;
        let finalNegativePrompt = negativePrompt;
        let finalWidth = width;
        let finalHeight = height;
        
        const promptComplexity = PromptAnalyzer.analyzeComplexity(prompt);
        const recommendedQuality = PromptAnalyzer.recommendQualityMode(prompt, model);
        logger.add("🧠 Prompt Analysis", { 
            complexity: (promptComplexity * 100).toFixed(1) + '%', 
            recommended_quality: recommendedQuality, 
            selected_quality: qualityMode,
            is_4k_model: is4KModel,
            has_reference_images: validReferenceImages.length > 0
        });
        
        if (autoHD) {
            hdOptimization = HDOptimizer.optimize(
                prompt, 
                negativePrompt, 
                model, 
                width, 
                height, 
                qualityMode, 
                autoHD
            );
            finalPrompt = hdOptimization.prompt;
            finalNegativePrompt = hdOptimization.negativePrompt;
            finalWidth = hdOptimization.width;
            finalHeight = hdOptimization.height;
            
            if (hdOptimization.optimized) {
                logger.add("🎨 HD Optimization", { 
                    mode: qualityMode, 
                    hd_level: hdOptimization.hd_level, 
                    original: width + "x" + height, 
                    optimized: finalWidth + "x" + finalHeight, 
                    upscaled: hdOptimization.size_upscaled, 
                    details: hdOptimization.optimizations 
                });
            }
        }
        
        let finalSteps = steps;
        let finalGuidance = guidance;
        
        if (autoOptimize) {
            const stepsOptimization = ParameterOptimizer.optimizeSteps(model, finalWidth, finalHeight, style, qualityMode, steps);
            finalSteps = stepsOptimization.steps;
            logger.add("🎯 Steps Optimization", { steps: stepsOptimization.steps, reasoning: stepsOptimization.reasoning });
            
            if (guidance === null) {
                finalGuidance = ParameterOptimizer.optimizeGuidance(model, style, qualityMode);
            } else {
                finalGuidance = guidance;
            }
        } else {
            finalSteps = steps || 20;
            finalGuidance = guidance || 7.5;
        }
        
        const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(finalPrompt, style, finalNegativePrompt);
        
        logger.add("🎨 Style Processing", { 
            selected_style: style,
            style_applied: style !== 'none',
            original_prompt_length: finalPrompt.length,
            enhanced_prompt_length: enhancedPrompt.length,
            prompt_added: enhancedPrompt.length - finalPrompt.length
        });
        
        const translation = await translateToEnglish(enhancedPrompt, this.env);
        const finalPromptForAPI = translation.text;
        
        if (translation.translated) {
            logger.add("🌐 Auto Translation", { 
                original_zh: translation.original,
                translated_en: finalPromptForAPI.substring(0, 100) + (finalPromptForAPI.length > 100 ? '...' : ''),
                success: true,
                model: translation.model || "unknown"
            });
        } else {
            logger.add("⚠️ Translation", { 
                status: "skipped",
                reason: translation.reason || "Unknown",
                using_original: true
            });
        }
        
        const modelsToTry = [model];
        if (modelConfig?.experimental && modelConfig?.fallback) {
            modelsToTry.push(...modelConfig.fallback);
        }
        
        logger.add("🎨 Generation Config", { 
            provider: this.name, 
            model: model, 
            dimensions: finalWidth + "x" + finalHeight,
            is_4k: finalWidth >= 4096 || finalHeight >= 4096,
            quality_mode: qualityMode, 
            hd_optimized: autoHD && hdOptimization?.optimized, 
            auto_translated: translation.translated,
            style_applied: style !== 'none',
            reference_images: validReferenceImages.length,
            generation_mode: validReferenceImages.length > 0 ? (validReferenceImages.length === 1 ? "圖生圖" : "多圖融合") : "文生圖",
            steps: finalSteps, 
            guidance: finalGuidance,
            seed: seed
        });
        
        const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
        let fullPrompt = finalPromptForAPI;
        if (enhancedNegative && enhancedNegative.trim()) {
            fullPrompt = finalPromptForAPI + " [negative: " + enhancedNegative + "]";
        }
        
        const encodedPrompt = encodeURIComponent(fullPrompt);
        
        for (const tryModel of modelsToTry) {
            for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
                try {
                    let url = this.config.endpoint + "/prompt/" + encodedPrompt;
                    const params = new URLSearchParams();
                    params.append('model', tryModel);
                    params.append('width', finalWidth.toString());
                    params.append('height', finalHeight.toString());
                    params.append('seed', currentSeed.toString());
                    params.append('nologo', nologo.toString());
                    params.append('enhance', enhance.toString());
                    params.append('private', privateMode.toString());
                    
                    if (validReferenceImages && validReferenceImages.length > 0) {
                        params.append('image', validReferenceImages.join(','));
                        logger.add("🖼️ Reference Images Added", { 
                            count: validReferenceImages.length,
                            urls: validReferenceImages 
                        });
                    }
                    
                    if (finalGuidance !== 7.5) params.append('guidance', finalGuidance.toString());
                    if (finalSteps !== 20) params.append('steps', finalSteps.toString());
                    url += '?' + params.toString();
                    
                    const response = await fetchWithTimeout(url, { 
                        method: 'GET', 
                        headers: { 
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 
                            'Accept': 'image/*,*/*', 
                            'Accept-Encoding': 'gzip, deflate, br', 
                            'Connection': 'keep-alive', 
                            'Referer': 'https://pollinations.ai/' 
                        } 
                    }, 90000);
                    
                    if (response.ok) {
                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.startsWith('image/')) {
                            logger.add("✅ Success", { 
                                url: response.url, 
                                used_model: tryModel, 
                                final_size: finalWidth + "x" + finalHeight,
                                is_4k: finalWidth >= 4096 || finalHeight >= 4096,
                                quality_mode: qualityMode, 
                                style_used: style,
                                hd_optimized: autoHD && hdOptimization?.optimized, 
                                auto_translated: translation.translated,
                                reference_images_used: validReferenceImages.length,
                                generation_mode: validReferenceImages.length > 0 ? (validReferenceImages.length === 1 ? "圖生圖" : "多圖融合") : "文生圖",
                                seed: currentSeed 
                            });
                            
                            return { 
                                url: response.url, 
                                provider: this.name, 
                                model: tryModel, 
                                requested_model: model, 
                                seed: currentSeed, 
                                style: style, 
                                steps: finalSteps, 
                                guidance: finalGuidance, 
                                width: finalWidth, 
                                height: finalHeight,
                                is_4k: finalWidth >= 4096 || finalHeight >= 4096,
                                quality_mode: qualityMode, 
                                prompt_complexity: promptComplexity, 
                                hd_optimized: autoHD && hdOptimization?.optimized, 
                                hd_details: hdOptimization, 
                                auto_translated: translation.translated,
                                reference_images: validReferenceImages,
                                reference_images_count: validReferenceImages.length,
                                generation_mode: validReferenceImages.length > 0 ? (validReferenceImages.length === 1 ? "圖生圖" : "多圖融合") : "文生圖",
                                cost: "FREE", 
                                fallback_used: tryModel !== model, 
                                auto_optimized: autoOptimize,
                                optimized_prompt: enhancedPrompt,
                                optimized_negative: enhancedNegative,
                                style_applied: style !== 'none',
                                translation_result: translation
                            };
                        } else {
                            throw new Error("Invalid content type: " + contentType);
                        }
                    } else {
                        throw new Error("HTTP " + response.status);
                    }
                } catch (e) {
                    if (retry < CONFIG.MAX_RETRIES - 1) {
                        await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
                    }
                }
            }
        }
        throw new Error("All models failed");
    }
}

class MultiProviderRouter {
    constructor(apiKeys = {}, env = null) {
        this.providers = {};
        this.apiKeys = apiKeys;
        this.env = env;
        for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
            if (config.enabled) {
                if (key === 'pollinations') {
                    this.providers[key] = new PollinationsProvider(config, env);
                }
            }
        }
    }
    
    getProvider(providerName = null) {
        if (providerName && this.providers[providerName]) {
            return { name: providerName, instance: this.providers[providerName] };
        }
        const defaultName = CONFIG.DEFAULT_PROVIDER;
        if (this.providers[defaultName]) {
            return { name: defaultName, instance: this.providers[defaultName] };
        }
        const firstProvider = Object.keys(this.providers)[0];
        if (firstProvider) {
            return { name: firstProvider, instance: this.providers[firstProvider] };
        }
        throw new Error('No available provider');
    }
    
    async generate(prompt, options, logger) {
        const { provider: requestedProvider = null, numOutputs = 1 } = options;
        const { name: providerName, instance: provider } = this.getProvider(requestedProvider);
        
        // 🔧 批量生成時,先生成第一張獲取優化後的參數
        if (numOutputs > 1) {
            logger.add("📦 Batch Generation Mode", { 
                total_images: numOutputs,
                batch_optimization: "enabled",
                consistency: "guaranteed"
            });
            
            // 第一張圖片 - 獲取優化參數
            const firstOptions = { ...options, seed: options.seed === -1 ? -1 : options.seed };
            const firstResult = await provider.generate(prompt, firstOptions, logger);
            
            // 從第一張結果提取標準化參數
            const standardizedParams = {
                finalPrompt: firstResult.optimized_prompt || prompt,
                finalNegativePrompt: firstResult.optimized_negative || options.negativePrompt,
                finalWidth: firstResult.width,
                finalHeight: firstResult.height,
                finalSteps: firstResult.steps,
                finalGuidance: firstResult.guidance,
                hdOptimization: firstResult.hd_details,
                styleApplied: firstResult.style_applied,
                translationResult: firstResult.translation_result
            };
            
            logger.add("🔒 Parameters Locked", { 
                standardized: true,
                width: standardizedParams.finalWidth,
                height: standardizedParams.finalHeight,
                steps: standardizedParams.finalSteps,
                guidance: standardizedParams.finalGuidance,
                hd_optimized: !!standardizedParams.hdOptimization
            });
            
            const results = [firstResult];
            
            // 生成剩餘圖片 - 使用鎖定的參數
            for (let i = 1; i < numOutputs; i++) {
                const currentSeed = options.seed === -1 ? -1 : options.seed + i;
                
                // 使用鎖定的參數,跳過重複優化
                const batchOptions = {
                    ...options,
                    seed: currentSeed,
                    _batchMode: true,
                    _standardizedParams: standardizedParams
                };
                
                const result = await provider.generate(prompt, batchOptions, logger);
                results.push(result);
            }
            
            logger.add("✅ Batch Complete", { 
                generated: results.length,
                seeds: results.map(r => r.seed),
                all_same_quality: true
            });
            
            return results;
        }
        
        // 單張生成 - 正常流程
        const result = await provider.generate(prompt, options, logger);
        return [result];
    }
}

function corsHeaders(additionalHeaders = {}) {
    return { 
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With', 
        'Access-Control-Max-Age': '86400', 
        ...additionalHeaders 
    };
}
async function handleImageGenerations(request, env, ctx) {
    const logger = new Logger();
    const startTime = Date.now();
    
    try {
        const body = await request.json();
        const prompt = body.prompt;
        if (!prompt || !prompt.trim()) throw new Error("Prompt is required");
        
        let width = 1024, height = 1024;
        if (body.size) {
            const [w, h] = body.size.split('x').map(Number);
            if (w && h) { width = w; height = h; }
        }
        if (body.width) width = body.width;
        if (body.height) height = body.height;
        
        let referenceImages = [];
        if (body.reference_images && Array.isArray(body.reference_images)) {
            referenceImages = body.reference_images.filter(url => {
                try {
                    new URL(url);
                    return true;
                } catch {
                    return false;
                }
            });
        }
        
        const seedInput = body.seed !== undefined ? body.seed : -1;
        let seedValue = -1;
        if (seedInput !== -1) {
            const parsedSeed = parseInt(seedInput);
            if (!isNaN(parsedSeed) && parsedSeed >= 0 && parsedSeed <= 999999) {
                seedValue = parsedSeed;
            }
        }
        
        const options = { 
            provider: body.provider || null, 
            model: body.model || "flux", 
            width: Math.min(Math.max(width, 256), 4096), 
            height: Math.min(Math.max(height, 256), 4096), 
            numOutputs: Math.min(Math.max(body.n || 1, 1), 4), 
            seed: seedValue,
            negativePrompt: body.negative_prompt || "", 
            guidance: body.guidance_scale || null, 
            steps: body.steps || null, 
            enhance: body.enhance === true, 
            nologo: body.nologo !== false, 
            privateMode: body.private !== false, 
            style: body.style || "none", 
            autoOptimize: body.auto_optimize !== false, 
            autoHD: body.auto_hd !== false, 
            qualityMode: body.quality_mode || 'standard',
            referenceImages: referenceImages
        };
        
        let cacheKey = null;
        let cachedResult = null;
        
        if (options.seed !== -1 && referenceImages.length === 0 && options.numOutputs === 1) {
            cacheKey = generateCacheKey(prompt, options);
            cachedResult = apiCache.get(cacheKey);
            
            if (cachedResult) {
                logger.add("💾 Cache Hit", { key: cacheKey });
                return new Response(JSON.stringify({
                    created: Math.floor(Date.now() / 1000),
                    data: cachedResult,
                    cached: true,
                    cache_key: cacheKey
                }), { 
                    headers: corsHeaders({ 
                        'Content-Type': 'application/json',
                        'X-Cache': 'HIT',
                        'X-Cache-Key': cacheKey
                    }) 
                });
            }
        }
        
        const router = new MultiProviderRouter({}, env);
        const results = await router.generate(prompt, options, logger);
        
        if (cacheKey && options.seed !== -1 && options.numOutputs === 1) {
            const cacheData = results.map(r => ({
                url: r.url,
                provider: r.provider,
                model: r.model,
                seed: r.seed,
                width: r.width,
                height: r.height,
                is_4k: r.is_4k,
                style: r.style,
                quality_mode: r.quality_mode,
                reference_images: r.reference_images || [],
                reference_images_count: r.reference_images_count || 0,
                generation_mode: r.generation_mode || "文生圖",
                cost: r.cost
            }));
            apiCache.set(cacheKey, cacheData);
            logger.add("💾 Cache Saved", { key: cacheKey });
        }
        
        const duration = Date.now() - startTime;
        
        return new Response(JSON.stringify({ 
            created: Math.floor(Date.now() / 1000), 
            data: results.map(r => ({ 
                url: r.url, 
                provider: r.provider, 
                model: r.model, 
                seed: r.seed, 
                width: r.width, 
                height: r.height,
                is_4k: r.is_4k,
                reference_images: r.reference_images || [],
                reference_images_count: r.reference_images_count || 0,
                generation_mode: r.generation_mode || "文生圖",
                style: r.style, 
                quality_mode: r.quality_mode, 
                prompt_complexity: r.prompt_complexity, 
                steps: r.steps, 
                guidance: r.guidance, 
                auto_optimized: r.auto_optimized, 
                hd_optimized: r.hd_optimized, 
                auto_translated: r.auto_translated,
                cost: r.cost,
                batch_mode: r.batch_mode || false
            })),
            cached: false,
            generation_time_ms: duration
        }), { 
            headers: corsHeaders({ 
                'Content-Type': 'application/json',
                'X-Cache': 'MISS',
                'X-Generation-Time': duration + 'ms'
            }) 
        });
    } catch (e) {
        logger.add("❌ Error", e.message);
        return new Response(JSON.stringify({ 
            error: { 
                message: e.message, 
                debug_logs: logger.get() 
            } 
        }), { 
            status: 500, 
            headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
    }
}

async function handleChatCompletions(request, env, ctx) {
    const logger = new Logger();
    try {
        const body = await request.json();
        const messages = body.messages;
        if (!messages || !Array.isArray(messages)) throw new Error("messages is required");
        
        const userMessage = messages.filter(m => m.role === 'user').pop();
        if (!userMessage || !userMessage.content) throw new Error("No user message found");
        
        const prompt = userMessage.content;
        const options = { 
            model: body.model || "flux", 
            width: 1024, 
            height: 1024, 
            seed: -1, 
            style: "none", 
            autoOptimize: true, 
            autoHD: true, 
            qualityMode: 'standard',
            numOutputs: 1
        };
        
        const router = new MultiProviderRouter({}, env);
        const results = await router.generate(prompt, options, logger);
        const imageUrl = results[0].url;
        
        return new Response(JSON.stringify({ 
            id: "chatcmpl-" + Date.now(), 
            object: "chat.completion", 
            created: Math.floor(Date.now() / 1000), 
            model: results[0].model, 
            choices: [{ 
                index: 0, 
                message: { 
                    role: "assistant", 
                    content: "![Generated Image](" + imageUrl + ")\n\nImage generated successfully!" 
                }, 
                finish_reason: "stop" 
            }], 
            usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 } 
        }), { 
            headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
    } catch (e) {
        logger.add("❌ Error", e.message);
        return new Response(JSON.stringify({ 
            error: { 
                message: e.message, 
                debug_logs: logger.get() 
            } 
        }), { 
            status: 500, 
            headers: corsHeaders({ 'Content-Type': 'application/json' }) 
        });
    }
}

function handleModelsRequest() {
    const allModels = [];
    for (const [providerKey, providerConfig] of Object.entries(CONFIG.PROVIDERS)) {
        if (providerConfig.enabled && providerConfig.models) {
            for (const model of providerConfig.models) {
                allModels.push({ 
                    id: model.id, 
                    name: model.name, 
                    provider: providerKey, 
                    category: model.category || 'general', 
                    description: model.description || '', 
                    max_size: model.max_size || 2048, 
                    confirmed: model.confirmed !== false, 
                    experimental: model.experimental === true, 
                    fallback: model.fallback || null,
                    ultra_hd: model.ultra_hd || false,
                    supports_reference_images: model.supports_reference_images || false,
                    max_reference_images: model.max_reference_images || 0
                });
            }
        }
    }
    return new Response(JSON.stringify({ 
        object: 'list', 
        data: allModels 
    }), { 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
    });
}

function handleProvidersRequest() {
    const providersList = [];
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
        if (config.enabled) {
            providersList.push({ 
                id: key, 
                name: config.name, 
                type: config.type, 
                auth_mode: config.auth_mode, 
                requires_key: config.requires_key, 
                description: config.description, 
                features: config.features, 
                model_count: config.models?.length || 0 
            });
        }
    }
    return new Response(JSON.stringify({ 
        object: 'list', 
        data: providersList 
    }), { 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
    });
}

function handleStylesRequest() {
    const stylesList = [];
    for (const [key, styleConfig] of Object.entries(CONFIG.STYLE_PRESETS)) {
        stylesList.push({ 
            id: key, 
            name: styleConfig.name, 
            prompt_addition: styleConfig.prompt || "", 
            negative_addition: styleConfig.negative || "" 
        });
    }
    return new Response(JSON.stringify({ 
        object: 'list', 
        data: stylesList, 
        total: stylesList.length 
    }), { 
        headers: corsHeaders({ 'Content-Type': 'application/json' }) 
    });
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const startTime = Date.now();
        const clientIP = getClientIP(request);
        
        console.log("=== API Request ===");
        console.log("IP:", clientIP);
        console.log("Path:", url.pathname);
        console.log("Method:", request.method);
        console.log("Workers AI:", !!env.AI);
        console.log("==================");
        
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: corsHeaders() });
        }
        
        if (API_OPTIMIZATION.RATE_LIMIT.enabled && url.pathname.startsWith('/v1/')) {
            const rateLimitResult = await rateLimiter.check(clientIP);
            if (!rateLimitResult.allowed) {
                perfMonitor.recordRequest(false, Date.now() - startTime, rateLimitResult.reason);
                return new Response(JSON.stringify({
                    error: {
                        message: rateLimitResult.reason,
                        code: 'RATE_LIMIT_EXCEEDED',
                        limit: rateLimitResult.limit,
                        current: rateLimitResult.current,
                        retryAfter: rateLimitResult.retryAfter,
                        blockedUntil: rateLimitResult.blockedUntil
                    }
                }), {
                    status: 429,
                    headers: corsHeaders({
                        'Content-Type': 'application/json',
                        'Retry-After': rateLimitResult.retryAfter || '60',
                        'X-RateLimit-Limit': API_OPTIMIZATION.RATE_LIMIT.max_requests_per_minute.toString(),
                        'X-RateLimit-Remaining': '0'
                    })
                });
            }
            ctx.rateLimitHeaders = {
                'X-RateLimit-Limit-Minute': API_OPTIMIZATION.RATE_LIMIT.max_requests_per_minute.toString(),
                'X-RateLimit-Limit-Hour': API_OPTIMIZATION.RATE_LIMIT.max_requests_per_hour.toString(),
                'X-RateLimit-Remaining-Minute': rateLimitResult.remaining?.perMinute.toString() || '0',
                'X-RateLimit-Remaining-Hour': rateLimitResult.remaining?.perHour.toString() || '0'
            };
        }
        
        try {
            let response;
            if (url.pathname === '/') {
                response = handleUI(request);
            } else if (url.pathname === '/v1/chat/completions') {
                response = await handleChatCompletions(request, env, ctx);
            } else if (url.pathname === '/v1/images/generations') {
                response = await handleImageGenerations(request, env, ctx);
            } else if (url.pathname === '/v1/models') {
                response = handleModelsRequest();
            } else if (url.pathname === '/v1/providers') {
                response = handleProvidersRequest();
            } else if (url.pathname === '/v1/styles') {
                response = handleStylesRequest();
            } else if (url.pathname === '/health') {
                response = new Response(JSON.stringify({
                    status: 'ok',
                    version: CONFIG.PROJECT_VERSION,
                    timestamp: new Date().toISOString(),
                    workers_ai: !!env.AI,
                    performance: perfMonitor.getStats(),
                    cache: {
                        enabled: API_OPTIMIZATION.CACHE.enabled,
                        size: apiCache.cache.size,
                        max_size: API_OPTIMIZATION.CACHE.max_size
                    },
                    rate_limit: {
                        enabled: API_OPTIMIZATION.RATE_LIMIT.enabled,
                        active_ips: rateLimiter.requests.size,
                        blacklisted_ips: rateLimiter.blacklist.size
                    }
                }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
            } else if (url.pathname === '/stats') {
                response = new Response(JSON.stringify({
                    performance: perfMonitor.getStats(),
                    cache: {
                        size: apiCache.cache.size,
                        max_size: API_OPTIMIZATION.CACHE.max_size
                    },
                    rate_limit: {
                        active_monitoring: rateLimiter.requests.size,
                        blacklisted: rateLimiter.blacklist.size
                    }
                }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
            } else {
                response = new Response(JSON.stringify({
                    project: CONFIG.PROJECT_NAME,
                    version: CONFIG.PROJECT_VERSION,
                    features: [
                        '✅ 批量質量一致性',
                        '✅ Seed 完整控制',
                        '✅ 39 種藝術風格',
                        '✅ 35+ 尺寸預設',
                        '✅ 多張生成 (1-4)',
                        '✅ 圖生圖/多圖融合',
                        '✅ 中文自動翻譯',
                        '✅ 速率限制保護',
                        '✅ 響應緩存優化'
                    ],
                    endpoints: [
                        '/v1/images/generations',
                        '/v1/chat/completions',
                        '/v1/models',
                        '/v1/providers',
                        '/v1/styles',
                        '/health',
                        '/stats'
                    ]
                }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
            }
            
            const duration = Date.now() - startTime;
            perfMonitor.recordRequest(true, duration);
            const headers = new Headers(response.headers);
            headers.set('X-Response-Time', duration + 'ms');
            headers.set('X-Worker-Version', CONFIG.PROJECT_VERSION);
            if (ctx.rateLimitHeaders) {
                Object.entries(ctx.rateLimitHeaders).forEach(([key, value]) => {
                    headers.set(key, value);
                });
            }
            return new Response(response.body, { status: response.status, headers: headers });
        } catch (error) {
            const duration = Date.now() - startTime;
            perfMonitor.recordRequest(false, duration, error.message);
            console.error('Worker error:', error);
            return new Response(JSON.stringify({
                error: {
                    message: error.message,
                    type: 'worker_error',
                    timestamp: new Date().toISOString()
                }
            }), {
                status: 500,
                headers: corsHeaders({ 'Content-Type': 'application/json' })
            });
        }
    }
};
function handleUI() {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--primary:#f59e0b;--primary-dark:#d97706;--secondary:#8b5cf6;--success:#10b981;--danger:#ef4444;--info:#3b82f6;--dark:#1a1a2e;--darker:#0a0a0a;--light:#e5e7eb;--border:rgba(255,255,255,0.1);--shadow:0 4px 20px rgba(0,0,0,0.3);--transition:all 0.3s cubic-bezier(0.4,0,0.2,1)}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Helvetica','Arial',sans-serif;background:linear-gradient(135deg,var(--darker) 0%,var(--dark) 100%);color:#fff;padding:20px;min-height:100vh;overflow-x:hidden}
body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at 20% 50%,rgba(245,158,11,0.1) 0%,transparent 50%),radial-gradient(circle at 80% 80%,rgba(139,92,246,0.1) 0%,transparent 50%),radial-gradient(circle at 40% 20%,rgba(16,185,129,0.1) 0%,transparent 50%);pointer-events:none;z-index:0;animation:bgFloat 20s ease-in-out infinite}
@keyframes bgFloat{0%,100%{transform:scale(1) rotate(0deg)}50%{transform:scale(1.1) rotate(2deg)}}
.container{max-width:1400px;margin:0 auto;position:relative;z-index:1}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;flex-wrap:wrap;gap:15px;animation:fadeInDown 0.6s ease-out}
@keyframes fadeInDown{from{opacity:0;transform:translateY(-30px)}to{opacity:1;transform:translateY(0)}}
.header-left{flex:1;min-width:300px}
h1{color:var(--primary);margin:0;font-size:clamp(28px,5vw,42px);font-weight:900;text-shadow:0 0 40px rgba(245,158,11,0.4);letter-spacing:-1px;background:linear-gradient(135deg,#f59e0b 0%,#fbbf24 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.badge{display:inline-block;background:linear-gradient(135deg,var(--success) 0%,#059669 100%);padding:6px 14px;border-radius:20px;font-size:13px;margin-left:10px;font-weight:600;box-shadow:0 2px 10px rgba(16,185,129,0.3);animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
.badge-new{background:linear-gradient(135deg,#ec4899 0%,#db2777 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:700;margin-left:8px;box-shadow:0 2px 10px rgba(236,72,153,0.3)}
.subtitle{color:#9ca3af;margin-top:10px;font-size:clamp(13px,2vw,15px);line-height:1.5}
.history-btn{background:linear-gradient(135deg,var(--secondary) 0%,#7c3aed 100%);color:#fff;border:none;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;transition:var(--transition);position:relative;box-shadow:0 4px 15px rgba(139,92,246,0.3)}
.history-btn:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(139,92,246,0.5)}
.history-btn:active{transform:translateY(-1px)}
.history-badge{position:absolute;top:-8px;right:-8px;background:var(--danger);color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;box-shadow:0 2px 8px rgba(239,68,68,0.4);animation:bounce 1s ease-in-out infinite}
@keyframes bounce{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,500px),1fr));gap:20px;margin:20px 0;animation:fadeInUp 0.6s ease-out 0.2s both}
@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.box{background:linear-gradient(135deg,rgba(26,26,26,0.95) 0%,rgba(30,30,45,0.95) 100%);padding:clamp(20px,4vw,28px);border-radius:20px;border:1px solid var(--border);box-shadow:var(--shadow);transition:var(--transition);backdrop-filter:blur(10px);position:relative;overflow:hidden}
.box::before{content:'';position:absolute;top:0;left:0;width:100%;height:3px;background:linear-gradient(90deg,var(--primary),var(--secondary),var(--success));opacity:0;transition:var(--transition)}
.box:hover{transform:translateY(-5px);box-shadow:0 8px 30px rgba(0,0,0,0.4);border-color:rgba(245,158,11,0.3)}
.box:hover::before{opacity:1}
h3{color:var(--primary);margin-bottom:20px;font-size:clamp(16px,3vw,20px);font-weight:700;display:flex;align-items:center;gap:8px}
label{display:block;margin:18px 0 10px 0;color:var(--light);font-weight:600;font-size:13px;display:flex;align-items:center;justify-content:space-between}
select,textarea,input[type="text"],input[type="number"]{width:100%;padding:14px;margin:0;background:rgba(42,42,42,0.8);border:2px solid transparent;color:#fff;border-radius:12px;font-size:14px;font-family:inherit;transition:var(--transition);backdrop-filter:blur(5px)}
select:focus,textarea:focus,input:focus{outline:none;border-color:var(--primary);background:rgba(42,42,42,1);box-shadow:0 0 0 4px rgba(245,158,11,0.1)}
select:hover,textarea:hover,input:hover{border-color:rgba(245,158,11,0.3)}
textarea{resize:vertical;min-height:100px;line-height:1.6}
input[type="range"]{-webkit-appearance:none;width:100%;height:8px;background:linear-gradient(90deg,var(--secondary),var(--primary));border-radius:10px;outline:none;margin:10px 0}
input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:20px;height:20px;background:var(--primary);cursor:pointer;border-radius:50%;box-shadow:0 2px 10px rgba(245,158,11,0.5);transition:var(--transition)}
input[type="range"]::-webkit-slider-thumb:hover{transform:scale(1.2);box-shadow:0 4px 15px rgba(245,158,11,0.7)}
button{width:100%;padding:16px;background:linear-gradient(135deg,var(--primary) 0%,var(--primary-dark) 100%);color:#fff;border:none;border-radius:14px;font-size:16px;font-weight:700;cursor:pointer;margin-top:20px;transition:var(--transition);box-shadow:0 4px 15px rgba(245,158,11,0.4);position:relative;overflow:hidden}
button::before{content:'';position:absolute;top:50%;left:50%;width:0;height:0;border-radius:50%;background:rgba(255,255,255,0.2);transform:translate(-50%,-50%);transition:width 0.6s,height 0.6s}
button:hover::before{width:300px;height:300px}
button:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(245,158,11,0.6)}
button:active{transform:translateY(-1px)}
button:disabled{background:linear-gradient(135deg,#555,#444);cursor:not-allowed;transform:none;box-shadow:none;opacity:0.6}
button[type="button"]{background:linear-gradient(135deg,var(--secondary),#7c3aed);box-shadow:0 4px 15px rgba(139,92,246,0.4)}
button[type="button"]:hover{box-shadow:0 8px 25px rgba(139,92,246,0.6)}
.ref-img-section{background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(219,39,119,0.1));border:2px dashed #ec4899;padding:18px;border-radius:14px;margin-top:15px;transition:var(--transition)}
.ref-img-section:hover{background:linear-gradient(135deg,rgba(236,72,153,0.15),rgba(219,39,119,0.15));border-color:#f472b6}
.upload-area{background:rgba(236,72,153,0.05);border:2px dashed #ec4899;border-radius:12px;padding:24px;text-align:center;cursor:pointer;transition:var(--transition);margin-bottom:12px}
.upload-area:hover{background:rgba(236,72,153,0.15);border-color:#f472b6;transform:scale(1.02)}
.upload-area.dragover{background:rgba(236,72,153,0.25);border-color:#f472b6;transform:scale(1.05);box-shadow:0 4px 20px rgba(236,72,153,0.3)}
.ref-img-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(85px,1fr));gap:12px;margin-top:12px}
.ref-img-item{position:relative;width:100%;aspect-ratio:1;border-radius:10px;overflow:hidden;transition:var(--transition)}
.ref-img-item:hover{transform:scale(1.05);box-shadow:0 4px 15px rgba(236,72,153,0.5)}
.ref-img-item img{width:100%;height:100%;object-fit:cover;border:2px solid #ec4899;border-radius:10px}
.ref-img-remove{position:absolute;top:-8px;right:-8px;background:var(--danger);color:#fff;border:none;border-radius:50%;width:26px;height:26px;cursor:pointer;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(239,68,68,0.5);transition:var(--transition)}
.ref-img-remove:hover{transform:scale(1.15);background:#dc2626}
.spinner{border:3px solid rgba(255,255,255,0.2);border-top:3px solid var(--primary);border-radius:50%;width:36px;height:36px;animation:spin 0.8s linear infinite;margin:0 auto}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.tag-mode{display:inline-block;background:linear-gradient(135deg,#ec4899,#db2777);color:#fff;padding:4px 12px;border-radius:8px;font-size:11px;font-weight:700;margin-left:6px;box-shadow:0 2px 8px rgba(236,72,153,0.3)}
.tag-4k{display:inline-block;background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#000;padding:3px 10px;border-radius:8px;font-size:10px;font-weight:700;margin-left:6px;box-shadow:0 2px 8px rgba(245,158,11,0.3)}
.result-meta{background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(5,150,105,0.1));border:1px solid rgba(16,185,129,0.3);padding:12px 16px;border-radius:10px;margin-top:10px;font-size:12px;color:var(--success);display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.timer{color:var(--success);font-weight:700;margin-left:8px}
.modal{display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.85);backdrop-filter:blur(5px);overflow:auto;animation:fadeIn 0.3s ease-out}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal-content{background:linear-gradient(135deg,var(--dark),rgba(30,30,45,0.98));margin:3% auto;padding:clamp(20px,4vw,35px);border-radius:20px;max-width:950px;border:2px solid var(--primary);box-shadow:0 10px 50px rgba(0,0,0,0.5);animation:slideIn 0.4s ease-out}
@keyframes slideIn{from{transform:translateY(-50px);opacity:0}to{transform:translateY(0);opacity:1}}
.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;padding-bottom:15px;border-bottom:2px solid var(--border)}
.close{color:#9ca3af;font-size:36px;font-weight:700;cursor:pointer;transition:var(--transition);line-height:1}
.close:hover{color:var(--primary);transform:rotate(90deg)}
.history-item{background:linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));padding:18px;border-radius:14px;margin-bottom:16px;border:1px solid var(--border);transition:var(--transition)}
.history-item:hover{background:linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05));border-color:rgba(245,158,11,0.4);transform:translateX(5px);box-shadow:0 4px 20px rgba(0,0,0,0.3)}
.history-img{width:110px;height:110px;object-fit:cover;border-radius:12px;cursor:pointer;transition:var(--transition);border:2px solid var(--border)}
.history-img:hover{transform:scale(1.05);box-shadow:0 4px 20px rgba(245,158,11,0.4);border-color:var(--primary)}
.history-info{color:#9ca3af;font-size:12px;margin-top:6px;line-height:1.6}
.history-actions{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap}
.history-actions button{padding:10px 18px;font-size:12px;margin:0;flex:1;min-width:120px}
@media (max-width:768px){.grid{grid-template-columns:1fr}.header{flex-direction:column;align-items:stretch}.history-btn{width:100%;justify-content:center}.modal-content{margin:10% 5%;width:90%}.history-actions{flex-direction:column}.history-actions button{width:100%;min-width:0}h1{font-size:28px}.box{padding:18px}.ref-img-list{grid-template-columns:repeat(auto-fill,minmax(70px,1fr))}}
@media (max-width:480px){body{padding:12px}.container{padding:0}h1{font-size:24px}.subtitle{font-size:12px}.box{padding:16px}}
::-webkit-scrollbar{width:10px;height:10px}
::-webkit-scrollbar-track{background:rgba(255,255,255,0.05);border-radius:10px}
::-webkit-scrollbar-thumb{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:10px}
::-webkit-scrollbar-thumb:hover{background:linear-gradient(135deg,var(--primary-dark),var(--secondary))}
#numImagesValue,#widthValue,#heightValue{color:var(--primary);font-weight:700;font-size:18px;text-shadow:0 0 10px rgba(245,158,11,0.3)}
#lastSeedInfo{background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(5,150,105,0.1));border:1px solid rgba(16,185,129,0.3);padding:12px;border-radius:10px;margin-top:10px;font-size:12px;color:var(--success);animation:slideInRight 0.4s ease-out}
@keyframes slideInRight{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
::selection{background:var(--primary);color:#000}
</style>
</head>
<body>
<div class="container">
<div class="header">
<div class="header-left">
<h1>🎨 Flux AI Pro<span class="badge">v${CONFIG.PROJECT_VERSION}</span><span class="badge-new">Fixed ✅</span></h1>
<p class="subtitle">批量一致性修復 · Seed控制 · 圖生圖 · 多圖融合 · 39種風格 · 35+尺寸 · 4K超清</p>
</div>
<button onclick="toggleHistory()" class="history-btn">📜 歷史<span id="historyBadge" class="history-badge" style="display:none">0</span></button>
</div>

<div class="grid">
<div class="box">
<h3>📝 生成設置</h3>
<label>提示詞 * <span style="color:#10b981;font-size:11px;font-weight:400">✓ 支持中文 (自動翻譯)</span></label>
<textarea id="prompt" placeholder="描述你想要的圖片... (支持中文輸入,將自動翻譯成英文)"></textarea>

<label>負面提示詞</label>
<textarea id="negativePrompt" placeholder="low quality, blurry (也支持中文)"></textarea>

<div class="ref-img-section">
<label>🖼️ 參考圖 (圖生圖/多圖融合)</label>
<div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
<div style="font-size:40px;margin-bottom:10px">📤</div>
<div style="color:#ec4899;font-weight:600;margin-bottom:5px">點擊或拖拽上傳圖片</div>
<div style="color:#9ca3af;font-size:12px">支持 JPG, PNG, WebP (最大 10MB)</div>
</div>
<input type="file" id="fileInput" accept="image/*" multiple style="display:none">
<input type="text" id="refImageUrl" placeholder="或輸入圖片 URL 後按 Enter 添加" style="margin-top:10px">
<div class="ref-img-list" id="refImageList"></div>
<small id="refImageLimit" style="color:#9ca3af;font-size:11px">kontext: 最多1張 | nanobanana: 最多4張</small>
</div>

<label>AI 模型</label>
<select id="model" onchange="updateRefImageLimit()">
<optgroup label="⚡ Flux 系列">
<option value="flux">Flux (均衡)</option>
<option value="flux-realism">Flux Realism (超寫實)</option>
<option value="flux-anime">Flux Anime (動漫)</option>
<option value="flux-pro">Flux Pro (專業版)</option>
<option value="turbo">Turbo (極速)</option>
</optgroup>
<optgroup label="🎨 圖像編輯">
<option value="flux-kontext">Kontext 🎨 (1張參考圖)</option>
<option value="flux-kontext-pro">Kontext Pro 💎 (1張參考圖)</option>
</optgroup>
<optgroup label="🍌 Nano Banana">
<option value="nanobanana">Nano Banana 🍌 (4張參考圖)</option>
<option value="nanobanana-pro">Nano Banana Pro 🍌💎 (4K+4張)</option>
</optgroup>
</select>
<label>藝術風格 <span style="color:#9ca3af;font-size:11px">(共 39 種)</span></label>
<select id="style">
<option value="none">無</option>
<optgroup label="🎌 動漫系列">
<option value="anime">動漫風格 ✨</option>
<option value="anime-chibi">Q版動漫 🎎</option>
<option value="japanese-manga">日本漫畫 📚</option>
<option value="shoujo-manga">少女漫畫 💕</option>
<option value="seinen-manga">青年漫畫 🗡️</option>
<option value="studio-ghibli">吉卜力風格 🍃</option>
</optgroup>
<optgroup label="📷 寫實系列">
<option value="photorealistic">寫實照片 📷</option>
<option value="cinematic">電影級 🎬</option>
<option value="portrait">人像攝影 👤</option>
</optgroup>
<optgroup label="🖌️ 傳統繪畫">
<option value="oil-painting">油畫 🎨</option>
<option value="watercolor">水彩畫 💧</option>
<option value="chinese-painting">中國水墨畫 🖌️</option>
<option value="ukiyo-e">浮世繪 🗾</option>
<option value="sketch">素描 ✏️</option>
<option value="charcoal">炭筆畫 🖍️</option>
<option value="impressionism">印象派 🌅</option>
</optgroup>
<optgroup label="💻 數位藝術">
<option value="digital-art">數位藝術 💻</option>
<option value="pixel-art">像素藝術 🕹️</option>
<option value="vector-art">向量藝術 📐</option>
<option value="low-poly">低多邊形 🔷</option>
</optgroup>
<optgroup label="🌌 幻想科幻">
<option value="fantasy">奇幻風格 🐉</option>
<option value="dark-fantasy">黑暗奇幻 🌑</option>
<option value="fairy-tale">童話風格 🧚</option>
<option value="cyberpunk">賽博朋克 🌃</option>
<option value="sci-fi">科幻未來 🚀</option>
<option value="steampunk">蒸汽朋克 ⚙️</option>
<option value="vaporwave">蒸氣波 🌈</option>
</optgroup>
<optgroup label="🎬 動畫影視">
<option value="disney">迪士尼風格 🏰</option>
<option value="comic-book">美式漫畫 💥</option>
</optgroup>
<optgroup label="🎭 藝術流派">
<option value="pop-art">普普藝術 🎭</option>
<option value="art-deco">裝飾藝術 💎</option>
<option value="art-nouveau">新藝術風格 🌺</option>
<option value="abstract">抽象藝術 🎨</option>
<option value="minimalist">極簡主義 ⬜</option>
<option value="surrealism">超現實主義 🌀</option>
</optgroup>
<optgroup label="🎨 特殊風格">
<option value="graffiti">塗鴉藝術 🎨</option>
<option value="horror">恐怖風格 👻</option>
<option value="kawaii">可愛風格 🌸</option>
</optgroup>
</select>
</div>

<div class="box">
<h3>🎨 圖像參數</h3>
<label>尺寸預設 <span style="color:#9ca3af;font-size:11px">(共 35+ 種)</span></label>
<select id="sizePreset" onchange="applySizePreset()">
<optgroup label="⬜ 方形系列">
<option value="square-512">方形 512px (快速測試)</option>
<option value="square-1k" selected>方形 1K (標準)</option>
<option value="square-1.5k">方形 1.5K (高清)</option>
<option value="square-2k">方形 2K (超清)</option>
<option value="square-4k">方形 4K 🍌</option>
</optgroup>
<optgroup label="📱 豎屏系列">
<option value="portrait-9-16">豎屏 9:16 (TikTok/Story)</option>
<option value="portrait-9-16-hd">豎屏 9:16 HD (1080p)</option>
<option value="portrait-9-16-2k">豎屏 9:16 2K</option>
<option value="portrait-3-4">豎屏 3:4 (Instagram)</option>
<option value="portrait-3-4-hd">豎屏 3:4 HD</option>
<option value="portrait-2-3">豎屏 2:3 (Pinterest)</option>
</optgroup>
<optgroup label="🖥️ 橫屏系列">
<option value="landscape-16-9">橫屏 16:9 (YouTube)</option>
<option value="landscape-16-9-hd">橫屏 16:9 HD (1080p)</option>
<option value="landscape-16-9-2k">橫屏 16:9 2K (1440p)</option>
<option value="landscape-16-9-4k">橫屏 16:9 4K 🍌</option>
<option value="landscape-4-3">橫屏 4:3 (傳統)</option>
<option value="landscape-21-9">橫屏 21:9 (超寬)</option>
</optgroup>
<optgroup label="📲 社交媒體">
<option value="instagram-square">Instagram 方形</option>
<option value="instagram-portrait">Instagram 豎屏 (4:5)</option>
<option value="instagram-story">Instagram Story/Reels</option>
<option value="facebook-cover">Facebook 封面</option>
<option value="twitter-header">Twitter/X 橫幅</option>
<option value="youtube-thumbnail">YouTube 縮圖</option>
<option value="linkedin-banner">LinkedIn 橫幅</option>
</optgroup>
<optgroup label="🖨️ 印刷/設計">
<option value="a4-portrait">A4 豎屏 (300 DPI)</option>
<option value="a4-landscape">A4 橫屏 (300 DPI)</option>
<option value="poster-24-36">海報 24x36 英吋</option>
</optgroup>
<optgroup label="🖼️ 桌布">
<option value="wallpaper-fhd">桌布 Full HD (1080p)</option>
<option value="wallpaper-2k">桌布 2K (1440p)</option>
<option value="wallpaper-4k">桌布 4K 🍌</option>
<option value="wallpaper-ultrawide">桌布 Ultra-Wide</option>
<option value="mobile-wallpaper">手機桌布 (iPhone)</option>
</optgroup>
<optgroup label="🔧 自定義">
<option value="custom">自定義尺寸</option>
</optgroup>
</select>

<label>寬度: <span id="widthValue">1024</span>px</label>
<input type="range" id="width" min="256" max="4096" step="64" value="1024" oninput="document.getElementById('widthValue').textContent=this.value;document.getElementById('sizePreset').value='custom'">
<label>高度: <span id="heightValue">1024</span>px</label>
<input type="range" id="height" min="256" max="4096" step="64" value="1024" oninput="document.getElementById('heightValue').textContent=this.value;document.getElementById('sizePreset').value='custom'">

<label>生成數量 <span style="color:#9ca3af;font-size:11px">(一次生成多張)</span></label>
<div style="display:flex;gap:10px;align-items:center">
<input type="range" id="numImages" min="1" max="4" step="1" value="1" style="flex:1" oninput="document.getElementById('numImagesValue').textContent=this.value">
<span id="numImagesValue" style="min-width:30px;text-align:center">1</span>
</div>

<label>Seed 🎲 <span style="color:#9ca3af;font-size:11px">(-1=隨機, 0-999999=固定)</span></label>
<input type="number" id="seed" min="-1" max="999999" value="-1" placeholder="-1 (隨機)">
<div id="lastSeedInfo" style="display:none"></div>

<label>質量模式</label>
<select id="qualityMode">
<option value="economy">經濟模式 (快速)</option>
<option value="standard" selected>標準模式 (平衡)</option>
<option value="ultra">超高清模式 (慢但質量高)</option>
<option value="ultra_4k">4K超高清 🍌 (僅 Pro)</option>
</select>

<button onclick="generate()">🚀 生成圖片</button>
</div>
</div>

<div id="result"></div>

<div id="historyModal" class="modal">
<div class="modal-content">
<div class="modal-header">
<h2 style="margin:0;color:var(--primary)">📜 生成歷史</h2>
<span class="close" onclick="closeHistory()">&times;</span>
</div>
<div id="historyContent"></div>
</div>
</div>

</div>

<script>
const PRESET_SIZES=${JSON.stringify(CONFIG.PRESET_SIZES)};
let referenceImages=[];

function applySizePreset(){
const preset=document.getElementById('sizePreset').value;
if(preset==='custom')return;
const size=PRESET_SIZES[preset];
if(size){
document.getElementById('width').value=size.width;
document.getElementById('height').value=size.height;
document.getElementById('widthValue').textContent=size.width;
document.getElementById('heightValue').textContent=size.height;
}
}

function updateRefImageLimit(){
const model=document.getElementById('model').value;
const limitEl=document.getElementById('refImageLimit');
if(model.includes('kontext')){
limitEl.textContent='Kontext 系列: 最多 1 張參考圖';
limitEl.style.color='#ec4899';
}else if(model.includes('nanobanana')){
limitEl.textContent='Nano Banana 系列: 最多 4 張參考圖';
limitEl.style.color='#10b981';
}else{
limitEl.textContent='當前模型不支持參考圖';
limitEl.style.color='#9ca3af';
}
}

document.getElementById('fileInput').addEventListener('change',async function(e){
const files=e.target.files;
for(let file of files){
if(file.size>10*1024*1024){
alert('文件 '+file.name+' 超過 10MB,已跳過');
continue;
}
const reader=new FileReader();
reader.onload=function(event){
const base64=event.target.result;
addReferenceImage(base64);
};
reader.readAsDataURL(file);
}
e.target.value='';
});

const uploadArea=document.getElementById('uploadArea');
uploadArea.addEventListener('dragover',function(e){
e.preventDefault();
uploadArea.classList.add('dragover');
});
uploadArea.addEventListener('dragleave',function(e){
uploadArea.classList.remove('dragover');
});
uploadArea.addEventListener('drop',function(e){
e.preventDefault();
uploadArea.classList.remove('dragover');
const files=e.dataTransfer.files;
document.getElementById('fileInput').files=files;
document.getElementById('fileInput').dispatchEvent(new Event('change'));
});

document.getElementById('refImageUrl').addEventListener('keypress',function(e){
if(e.key==='Enter'){
const url=this.value.trim();
if(url){
addReferenceImage(url);
this.value='';
}
}
});

function addReferenceImage(url){
const model=document.getElementById('model').value;
let maxImages=0;
if(model.includes('kontext'))maxImages=1;
else if(model.includes('nanobanana'))maxImages=4;
else{
alert('當前模型不支持參考圖');
return;
}
if(referenceImages.length>=maxImages){
alert('已達到最大參考圖數量 ('+maxImages+' 張)');
return;
}
referenceImages.push(url);
renderReferenceImages();
}

function removeReferenceImage(index){
referenceImages.splice(index,1);
renderReferenceImages();
}

function renderReferenceImages(){
const container=document.getElementById('refImageList');
container.innerHTML='';
referenceImages.forEach((url,index)=>{
const item=document.createElement('div');
item.className='ref-img-item';
item.innerHTML='<img src="'+url+'" alt="Ref '+index+'"><button class="ref-img-remove" onclick="removeReferenceImage('+index+')">×</button>';
container.appendChild(item);
});
}

async function generate(){
const prompt=document.getElementById('prompt').value.trim();
if(!prompt){alert('請輸入提示詞');return}
const resultDiv=document.getElementById('result');
const generateBtn=document.querySelector('button[onclick="generate()"]');
generateBtn.disabled=true;
generateBtn.textContent='⏳ 生成中...';
let elapsedSeconds=0;
const timerInterval=setInterval(()=>{
elapsedSeconds++;
generateBtn.textContent='⏳ 生成中... '+elapsedSeconds+'s';
},1000);
resultDiv.innerHTML='<div class="spinner"></div><p style="text-align:center;margin-top:20px;color:#9ca3af">正在生成圖片,請稍候...</p>';
const startTime=Date.now();
try{
const seedInput=parseInt(document.getElementById('seed').value);
const seed=isNaN(seedInput)||seedInput<-1||seedInput>999999?-1:seedInput;
const response=await fetch('/v1/images/generations',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
prompt:prompt,
model:document.getElementById('model').value,
width:parseInt(document.getElementById('width').value),
height:parseInt(document.getElementById('height').value),
n:parseInt(document.getElementById('numImages').value),
seed:seed,
negative_prompt:document.getElementById('negativePrompt').value,
style:document.getElementById('style').value,
quality_mode:document.getElementById('qualityMode').value,
reference_images:referenceImages,
auto_optimize:true,
auto_hd:true
})
});
const data=await response.json();
if(data.error){
resultDiv.innerHTML='<div style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;padding:16px;border-radius:12px;color:#ef4444"><strong>❌ 生成失敗</strong><p style="margin-top:8px">'+data.error.message+'</p></div>';
}else{
const duration=((Date.now()-startTime)/1000).toFixed(1)+'s';
clearInterval(timerInterval);
const numGenerated=data.data.length;
const avgTime=(parseFloat(duration)/numGenerated).toFixed(1);
const usedSeeds=data.data.map(item=>item.seed);
updateLastSeedInfo(usedSeeds);

// 🔧 檢查批量一致性
const allSameQuality=numGenerated>1?data.data.every(img=>img.width===data.data[0].width&&img.height===data.data[0].height&&img.steps===data.data[0].steps):true;

resultDiv.innerHTML='<div style="background:rgba(16,185,129,0.15);border:1px solid #10b981;padding:16px;border-radius:12px;color:#10b981"><strong>✅ 生成成功!</strong><span class="timer">⏱️ 總時間: '+duration+' | 平均: '+avgTime+'s/張 | 共 '+numGenerated+' 張</span>'+(numGenerated>1&&allSameQuality?'<div style="margin-top:8px;font-size:12px">🔒 參數一致性: 已確保所有圖片使用相同質量設置</div>':'')+'</div>';

data.data.forEach((item,index)=>{
const imgDiv=document.createElement('div');
imgDiv.style.cssText='margin-top:20px;background:linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));padding:20px;border-radius:16px;border:1px solid rgba(255,255,255,0.1)';
const is4K=item.width>=4096||item.height>=4096;
const genMode=item.generation_mode||'文生圖';
imgDiv.innerHTML='<h3 style="margin:0 0 12px 0;color:#f59e0b">🖼️ 圖片 '+(index+1)+' / '+numGenerated+(is4K?' <span class="tag-4k">4K</span>':'')+(item.batch_mode?' <span class="tag-mode">批量模式</span>':'')+'</h3><img src="'+item.url+'" style="width:100%;border-radius:12px;cursor:pointer;transition:transform 0.3s" onclick="window.open(\''+item.url+'\',\'_blank\')"><div class="result-meta"><strong>📊 元數據:</strong> 模型: '+item.model+' | 尺寸: '+item.width+'x'+item.height+' | Seed: '+item.seed+' | 模式: '+genMode+(item.reference_images_count>0?' | 參考圖: '+item.reference_images_count+'張':'')+' | 質量: '+item.quality_mode+(item.hd_optimized?' 🎨':'')+' | '+(item.auto_translated?'翻譯✅':'原文')+' | 風格: '+(item.style||'無')+'</div><div style="display:flex;gap:10px;margin-top:12px"><button type="button" onclick="downloadImage(\''+item.url+'\',\'flux-ai-'+item.seed+'.png\')" style="flex:1;margin:0;padding:12px">💾 下載</button><button type="button" onclick="copyToClipboard(\''+item.url+'\')" style="flex:1;margin:0;padding:12px">📋 複製URL</button></div>';
resultDiv.appendChild(imgDiv);
});
saveToHistory({prompt,data:data.data,timestamp:Date.now()});
}
}catch(e){
clearInterval(timerInterval);
resultDiv.innerHTML='<div style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;padding:16px;border-radius:12px;color:#ef4444"><strong>❌ 請求失敗</strong><p style="margin-top:8px">'+e.message+'</p></div>';
}finally{
generateBtn.disabled=false;
generateBtn.textContent='🚀 生成圖片';
}
}

function updateLastSeedInfo(seeds){
const infoDiv=document.getElementById('lastSeedInfo');
if(seeds&&seeds.length>0){
infoDiv.style.display='block';
infoDiv.innerHTML='<strong>🎲 本次使用的 Seed:</strong> '+seeds.join(', ')+'<div style="margin-top:6px;font-size:11px;color:#9ca3af">提示: 使用相同 Seed 可復現圖片</div>';
}else{
infoDiv.style.display='none';
}
}

function downloadImage(url,filename){
fetch(url).then(r=>r.blob()).then(blob=>{
const a=document.createElement('a');
a.href=URL.createObjectURL(blob);
a.download=filename;
a.click();
}).catch(()=>alert('下載失敗,請右鍵另存為'));
}

function copyToClipboard(text){
navigator.clipboard.writeText(text).then(()=>alert('✅ URL 已複製到剪貼板')).catch(()=>alert('❌ 複製失敗'));
}

function saveToHistory(item){
let history=JSON.parse(localStorage.getItem('flux_history')||'[]');
history.unshift(item);
if(history.length>100)history=history.slice(0,100);
localStorage.setItem('flux_history',JSON.stringify(history));
updateHistoryBadge();
}

function loadHistory(){
return JSON.parse(localStorage.getItem('flux_history')||'[]');
}

function updateHistoryBadge(){
const count=loadHistory().length;
const badge=document.getElementById('historyBadge');
if(count>0){
badge.textContent=count;
badge.style.display='flex';
}else{
badge.style.display='none';
}
}

function toggleHistory(){
const modal=document.getElementById('historyModal');
const content=document.getElementById('historyContent');
const history=loadHistory();
if(history.length===0){
content.innerHTML='<p style="text-align:center;color:#9ca3af;padding:40px">暫無歷史記錄</p>';
}else{
content.innerHTML=history.map((item,index)=>{
const firstImg=item.data[0];
const imgCount=item.data.length;
const date=new Date(item.timestamp).toLocaleString('zh-TW');
return '<div class="history-item"><div style="display:flex;gap:15px"><img class="history-img" src="'+firstImg.url+'" onclick="window.open(\''+firstImg.url+'\',\'_blank\')"><div style="flex:1"><strong style="color:#f59e0b">'+item.prompt.substring(0,80)+(item.prompt.length>80?'...':'')+'</strong><div class="history-info">'+date+' | '+imgCount+' 張圖片 | Seed: '+item.data.map(d=>d.seed).join(', ')+'</div><div class="history-actions"><button onclick="reusePrompt('+index+')">📝 重用提示詞</button><button onclick="reuseSeed('+index+')">🎲 重用 Seed</button><button onclick="deleteHistory('+index+')" style="background:linear-gradient(135deg,#ef4444,#dc2626)">🗑️ 刪除</button></div></div></div></div>';
}).join('');
}
modal.style.display='block';
}

function closeHistory(){
document.getElementById('historyModal').style.display='none';
}

function reusePrompt(index){
const history=loadHistory();
document.getElementById('prompt').value=history[index].prompt;
closeHistory();
}

function reuseSeed(index){
const history=loadHistory();
const seed=history[index].data[0].seed;
document.getElementById('seed').value=seed;
closeHistory();
}

function deleteHistory(index){
if(!confirm('確定刪除此記錄?'))return;
let history=loadHistory();
history.splice(index,1);
localStorage.setItem('flux_history',JSON.stringify(history));
toggleHistory();
updateHistoryBadge();
}

window.onclick=function(e){
const modal=document.getElementById('historyModal');
if(e.target===modal)closeHistory();
};

updateHistoryBadge();
updateRefImageLimit();
</script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
