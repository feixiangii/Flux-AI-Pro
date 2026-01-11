// =================================================================================
//  項目: Flux AI Pro - NanoBanana Edition
//  版本: 10.6.7 (Live Stats)
//  更新: 新增實時在線人數(KV)與總生成量統計
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "10.6.7",
  API_MASTER_KEY: "1",
  FETCH_TIMEOUT: 120000,
  MAX_RETRIES: 3,
  
  POLLINATIONS_AUTH: {
    enabled: true,
    token: "", 
    method: "header"
  },
  
  PRESET_SIZES: {
    "square-1k": { name: "方形 1024x1024", width: 1024, height: 1024 },
    "square-1.5k": { name: "方形 1536x1536", width: 1536, height: 1536 },
    "square-2k": { name: "方形 2048x2048", width: 2048, height: 2048 },
    "portrait-9-16-hd": { name: "豎屏 9:16 HD", width: 1080, height: 1920 },
    "landscape-16-9-hd": { name: "橫屏 16:9 HD", width: 1920, height: 1080 },
    "instagram-square": { name: "Instagram 方形", width: 1080, height: 1080 },
    "wallpaper-fhd": { name: "桌布 Full HD", width: 1920, height: 1080 }
  },
  
  PROVIDERS: {
    pollinations: {
      name: "Pollinations.ai",
      endpoint: "https://gen.pollinations.ai",
      pathPrefix: "/image",
      type: "direct",
      auth_mode: "required",
      requires_key: true,
      enabled: true,
      default: true,
      description: "官方 AI 圖像生成服務",
      features: {
        private_mode: true, custom_size: true, seed_control: true, negative_prompt: true, enhance: true, nologo: true, style_presets: true, auto_hd: true, quality_modes: true, auto_translate: true, reference_images: true, image_to_image: true, batch_generation: true, api_key_auth: true
      },
      models: [
        { id: "nanobanana-pro", name: "Nano Banana Pro 🍌", confirmed: true, category: "special", description: "Nano Banana Pro 風格模型 (每小時限額 5 張)", max_size: 2048, pricing: { image_price: 0, currency: "free" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "gptimage", name: "GPT-Image 🎨", confirmed: true, category: "gptimage", description: "通用 GPT 圖像生成模型", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "gptimage-large", name: "GPT-Image Large 🌟", confirmed: true, category: "gptimage", description: "高質量 GPT 圖像生成模型", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "zimage", name: "Z-Image Turbo ⚡", confirmed: true, category: "zimage", description: "快速 6B 參數圖像生成 (Alpha)", max_size: 2048, pricing: { image_price: 0.0002, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "flux", name: "Flux 標準版", confirmed: true, category: "flux", description: "快速且高質量的圖像生成", max_size: 2048, pricing: { image_price: 0.00012, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "turbo", name: "Flux Turbo ⚡", confirmed: true, category: "flux", description: "超快速圖像生成", max_size: 2048, pricing: { image_price: 0.0003, currency: "pollen" }, input_modalities: ["text"], output_modalities: ["image"] },
        { id: "kontext", name: "Kontext 🎨", confirmed: true, category: "kontext", description: "上下文感知圖像生成（支持圖生圖）", max_size: 2048, pricing: { image_price: 0.04, currency: "pollen" }, supports_reference_images: true, max_reference_images: 1, input_modalities: ["text", "image"], output_modalities: ["image"] }
      ],
      rate_limit: null,
      max_size: { width: 2048, height: 2048 }
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  STYLE_PRESETS: {
    none: { name: "無風格", prompt: "", negative: "", category: "basic", icon: "⚡", description: "使用原始提示詞" },
    anime: { name: "動漫風格", prompt: "anime style, anime art, vibrant colors, cel shading, detailed anime", negative: "realistic, photograph, 3d, ugly", category: "illustration", icon: "🎭", description: "日系動漫風格" },
    ghibli: { name: "吉卜力", prompt: "Studio Ghibli style, Hayao Miyazaki, anime, soft colors, whimsical, detailed background, hand-drawn", negative: "realistic, dark, 3D, western animation", category: "illustration", icon: "🍃", description: "宮崎駿動畫風格" },
    manga: { name: "日本漫畫", prompt: "manga style, japanese comic art, black and white, screentones, halftone patterns, dynamic poses, detailed linework", negative: "color, colorful, realistic, photo, western comic", category: "manga", icon: "📖", description: "經典日本漫畫黑白網點" },
    "manga-color": { name: "彩色日漫", prompt: "colored manga style, japanese comic art, vibrant colors, cel shading, clean linework, digital coloring", negative: "realistic, photo, western style, messy", category: "manga", icon: "🎨", description: "彩色日本漫畫風格" },
    "american-comic": { name: "美式漫畫", prompt: "american comic book style, bold lines, vibrant colors, superhero art, dynamic action, dramatic shading", negative: "anime, manga, realistic photo, soft", category: "manga", icon: "💥", description: "美國超級英雄漫畫" },
    "korean-webtoon": { name: "韓國網漫", prompt: "korean webtoon style, manhwa art, detailed linework, soft colors, romantic, vertical scroll format", negative: "american comic, rough sketch, dark", category: "manga", icon: "📱", description: "韓國網路漫畫風格" },
    chibi: { name: "Q版漫畫", prompt: "chibi style, super deformed, cute, kawaii, big head small body, simple features, adorable", negative: "realistic proportions, serious, dark", category: "manga", icon: "🥰", description: "Q版可愛漫畫風格" },
    "black-white": { name: "黑白", prompt: "black and white, monochrome, high contrast, dramatic lighting, grayscale", negative: "color, colorful, vibrant, saturated", category: "monochrome", icon: "⚫⚪", description: "純黑白高對比效果" },
    sketch: { name: "素描", prompt: "pencil sketch, hand drawn, graphite drawing, detailed shading, artistic sketch, loose lines", negative: "color, digital, polished, photo", category: "monochrome", icon: "✏️", description: "鉛筆素描手繪質感" },
    "ink-drawing": { name: "水墨畫", prompt: "traditional chinese ink painting, sumi-e, brush strokes, minimalist, zen aesthetic, black ink on white paper", negative: "color, western style, detailed, cluttered", category: "monochrome", icon: "🖌️", description: "中國傳統水墨畫" },
    silhouette: { name: "剪影", prompt: "silhouette art, stark contrast, black shapes, minimalist, dramatic, shadow play, clean edges", negative: "detailed, realistic, colorful, textured", category: "monochrome", icon: "👤", description: "剪影藝術極簡構圖" },
    charcoal: { name: "炭筆畫", prompt: "charcoal drawing, rough texture, dramatic shading, expressive, smudged, artistic, monochrome", negative: "clean, digital, colorful, precise", category: "monochrome", icon: "🖤", description: "炭筆繪畫粗糙質感" },
    photorealistic: { name: "寫實照片", prompt: "photorealistic, 8k uhd, high quality, detailed, professional photography, sharp focus", negative: "anime, cartoon, illustration, painting, drawing, art", category: "realistic", icon: "📷", description: "攝影級寫實效果" },
    "oil-painting": { name: "油畫", prompt: "oil painting, canvas texture, visible brushstrokes, rich colors, artistic, masterpiece", negative: "photograph, digital art, anime, flat", category: "painting", icon: "🖼️", description: "經典油畫質感" },
    watercolor: { name: "水彩畫", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted, paper texture, flowing colors", negative: "photograph, digital, sharp edges, 3d", category: "painting", icon: "💧", description: "清新水彩風格" },
    impressionism: { name: "印象派", prompt: "impressionist painting, soft brushstrokes, light and color focus, Monet style, outdoor scene, visible brush marks", negative: "sharp, detailed, photorealistic, dark", category: "art-movement", icon: "🌅", description: "印象派繪畫光影捕捉" },
    abstract: { name: "抽象派", prompt: "abstract art, non-representational, geometric shapes, bold colors, modern art, expressive", negative: "realistic, figurative, detailed, representational", category: "art-movement", icon: "🎭", description: "抽象藝術幾何圖形" },
    cubism: { name: "立體主義", prompt: "cubist style, geometric shapes, multiple perspectives, fragmented, Picasso inspired, angular forms", negative: "realistic, smooth, traditional, single perspective", category: "art-movement", icon: "🔷", description: "立體主義多視角解構" },
    surrealism: { name: "超現實主義", prompt: "surrealist art, dreamlike, bizarre, impossible scenes, Salvador Dali style, imaginative, symbolic", negative: "realistic, mundane, ordinary, logical", category: "art-movement", icon: "🌀", description: "超現實主義夢幻場景" },
    "pop-art": { name: "普普藝術", prompt: "pop art style, bold colors, comic book elements, Andy Warhol inspired, retro, screen print effect", negative: "subtle, muted, traditional, realistic", category: "art-movement", icon: "🎪", description: "普普藝術大膽色彩" },
    neon: { name: "霓虹燈", prompt: "neon lights, glowing, vibrant neon colors, night scene, electric, luminous, dark background", negative: "daylight, muted, natural, dull", category: "visual", icon: "💡", description: "霓虹燈發光效果" },
    vintage: { name: "復古", prompt: "vintage style, retro, aged, nostalgic, warm tones, classic, faded colors, old photograph", negative: "modern, futuristic, clean, vibrant", category: "visual", icon: "📻", description: "復古懷舊褪色效果" },
    steampunk: { name: "蒸汽朋克", prompt: "steampunk style, Victorian era, brass and copper, gears and mechanisms, mechanical, industrial", negative: "modern, minimalist, clean, futuristic", category: "visual", icon: "⚙️", description: "蒸汽朋克機械美學" },
    minimalist: { name: "極簡主義", prompt: "minimalist design, clean, simple, geometric, negative space, modern, uncluttered", negative: "detailed, complex, ornate, busy", category: "visual", icon: "◽", description: "極簡設計留白美學" },
    vaporwave: { name: "蒸氣波", prompt: "vaporwave aesthetic, retro futuristic, pastel colors, glitch art, 80s 90s nostalgia, neon pink and blue", negative: "realistic, natural, muted, traditional", category: "visual", icon: "🌴", description: "蒸氣波復古未來" },
    "pixel-art": { name: "像素藝術", prompt: "pixel art, 8-bit, 16-bit, retro gaming style, pixelated, nostalgic, limited color palette", negative: "high resolution, smooth, realistic, detailed", category: "digital", icon: "🎮", description: "像素藝術復古遊戲" },
    "low-poly": { name: "低多邊形", prompt: "low poly 3d, geometric, faceted, minimalist 3d art, polygonal, angular shapes", negative: "high poly, detailed, realistic, organic", category: "digital", icon: "🔺", description: "低多邊形3D幾何" },
    "3d-render": { name: "3D渲染", prompt: "3d render, cinema 4d, octane render, detailed, professional lighting, ray tracing, photorealistic 3d", negative: "2d, flat, hand drawn, sketchy", category: "digital", icon: "🎬", description: "專業3D渲染寫實光影" },
    gradient: { name: "漸變", prompt: "gradient art, smooth color transitions, modern, vibrant gradients, soft blending, colorful", negative: "solid colors, flat, harsh edges, traditional", category: "digital", icon: "🌈", description: "漸變藝術柔和過渡" },
    glitch: { name: "故障藝術", prompt: "glitch art, digital corruption, RGB shift, distorted, cyberpunk, data moshing, scanlines", negative: "clean, perfect, traditional, smooth", category: "digital", icon: "📺", description: "故障美學數位崩壞" },
    "ukiyo-e": { name: "浮世繪", prompt: "ukiyo-e style, japanese woodblock print, Hokusai inspired, traditional japanese art, flat colors, bold outlines", negative: "modern, western, photographic, 3d", category: "traditional", icon: "🗾", description: "日本浮世繪木刻版畫" },
    "stained-glass": { name: "彩繪玻璃", prompt: "stained glass art, colorful, leaded glass, church window style, luminous, geometric patterns, light through glass", negative: "realistic, photographic, modern, opaque", category: "traditional", icon: "🪟", description: "彩繪玻璃透光效果" },
    "paper-cut": { name: "剪紙藝術", prompt: "paper cut art, layered paper, shadow box effect, intricate patterns, handcrafted, silhouette", negative: "painted, digital, realistic, photographic", category: "traditional", icon: "✂️", description: "剪紙藝術層次堆疊" },
    gothic: { name: "哥特風格", prompt: "gothic style, dark, ornate, Victorian gothic, mysterious, dramatic, baroque elements, elegant darkness", negative: "bright, cheerful, minimalist, modern", category: "aesthetic", icon: "🦇", description: "哥特美學黑暗華麗" },
    "art-nouveau": { name: "新藝術", prompt: "art nouveau style, organic forms, flowing lines, decorative, elegant, floral motifs, Alphonse Mucha inspired", negative: "geometric, minimalist, modern, rigid", category: "aesthetic", icon: "🌺", description: "新藝術流動線條" },
    cyberpunk: { name: "賽博朋克", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life, blade runner style", negative: "natural, rustic, medieval, fantasy", category: "scifi", icon: "🌃", description: "賽博朋克未來科幻" },
    fantasy: { name: "奇幻風格", prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration, mystical, enchanted", negative: "modern, realistic, mundane, contemporary", category: "fantasy", icon: "🐉", description: "奇幻魔法世界" }
  },
  
  STYLE_CATEGORIES: {
    'basic': { name: '基礎', icon: '⚡', order: 1 },
    'illustration': { name: '插畫動畫', icon: '🎨', order: 2 },
    'manga': { name: '漫畫風格', icon: '📖', order: 3 },
    'monochrome': { name: '黑白單色', icon: '⚫', order: 4 },
    'realistic': { name: '寫實照片', icon: '📷', order: 5 },
    'painting': { name: '繪畫風格', icon: '🖼️', order: 6 },
    'art-movement': { name: '藝術流派', icon: '🎭', order: 7 },
    'visual': { name: '視覺風格', icon: '✨', order: 8 },
    'digital': { name: '數位風格', icon: '💻', order: 9 },
    'traditional': { name: '傳統藝術', icon: '🏛️', order: 10 },
    'aesthetic': { name: '美學風格', icon: '🌟', order: 11 },
    'scifi': { name: '科幻', icon: '🚀', order: 12 },
    'fantasy': { name: '奇幻', icon: '🐉', order: 13 }
  },
  
  OPTIMIZATION_RULES: {
    MODEL_STEPS: { 
      "nanobanana-pro": { min: 15, optimal: 20, max: 30 },
      "gptimage": { min: 10, optimal: 18, max: 28 },
      "gptimage-large": { min: 15, optimal: 25, max: 35 },
      "zimage": { min: 8, optimal: 15, max: 25 }, 
      "flux": { min: 15, optimal: 20, max: 30 }, 
      "turbo": { min: 4, optimal: 8, max: 12 }, 
      "kontext": { min: 18, optimal: 25, max: 35 } 
    },
    SIZE_MULTIPLIER: { small: { threshold: 512 * 512, multiplier: 0.8 }, medium: { threshold: 1024 * 1024, multiplier: 1.0 }, large: { threshold: 1536 * 1536, multiplier: 1.15 }, xlarge: { threshold: 2048 * 2048, multiplier: 1.3 } },
    STYLE_ADJUSTMENT: { "photorealistic": 1.1, "oil-painting": 1.05, "watercolor": 0.95, "sketch": 0.9, "manga": 1.0, "pixel-art": 0.85, "3d-render": 1.15, "default": 1.0 }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    QUALITY_MODES: {
      economy: { name: "經濟模式", description: "快速出圖", min_resolution: 1024, max_resolution: 2048, steps_multiplier: 0.85, guidance_multiplier: 0.9, hd_level: "basic" },
      standard: { name: "標準模式", description: "平衡質量與速度", min_resolution: 1280, max_resolution: 2048, steps_multiplier: 1.0, guidance_multiplier: 1.0, hd_level: "enhanced" },
      ultra: { name: "超高清模式", description: "極致質量", min_resolution: 1536, max_resolution: 2048, steps_multiplier: 1.35, guidance_multiplier: 1.15, hd_level: "maximum", force_upscale: true }
    },
    HD_PROMPTS: { basic: "high quality, detailed, sharp", enhanced: "high quality, highly detailed, sharp focus, professional, 8k uhd", maximum: "masterpiece, best quality, ultra detailed, 8k uhd, high resolution, professional photography, sharp focus, HDR" },
    HD_NEGATIVE: "blurry, low quality, distorted, ugly, bad anatomy, low resolution, pixelated, artifacts, noise",
    MODEL_QUALITY_PROFILES: {
      "nanobanana-pro": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
      "gptimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
      "gptimage-large": { min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.15, guidance_boost: 1.05, recommended_quality: "ultra" },
      "zimage": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "economy" },
      "flux": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.1, guidance_boost: 1.0, recommended_quality: "standard" },
      "turbo": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 0.9, guidance_boost: 0.95, recommended_quality: "economy" },
      "kontext": { min_resolution: 1280, max_resolution: 2048, optimal_steps_boost: 1.2, guidance_boost: 1.1, recommended_quality: "ultra" }
    }
  }
};

class Logger {
  constructor() { this.logs = []; }
  add(title, data) { this.logs.push({ title, data, timestamp: new Date().toISOString() }); }
  get() { return this.logs; }
}

// ====== KV Stats Manager ======
class StatsManager {
  constructor(env) { this.env = env; }

  // 更新在線狀態並返回統計數據
  async updateAndGet(ip) {
    if (!this.env.FLUX_KV) return { online: 1, total: 0 };
    
    const KEY_ONLINE = 'stats:online_users_v2';
    const KEY_TOTAL = 'stats:total_generations';
    const WINDOW_MS = 5 * 60 * 1000; // 5分鐘內視為在線
    const NOW = Date.now();

    try {
        // 1. 併行獲取數據
        let [onlineDataRaw, totalCount] = await Promise.all([
            this.env.FLUX_KV.get(KEY_ONLINE),
            this.env.FLUX_KV.get(KEY_TOTAL)
        ]);

        let onlineUsers = onlineDataRaw ? JSON.parse(onlineDataRaw) : {};
        let total = parseInt(totalCount || '0');
        let dirty = false;

        // 2. 清理過期用戶
        const activeUsers = {};
        for (const [userIp, timestamp] of Object.entries(onlineUsers)) {
            if (NOW - timestamp < WINDOW_MS) {
                activeUsers[userIp] = timestamp;
            } else {
                dirty = true;
            }
        }

        // 3. 更新當前用戶 (Debounce: 每個 IP 每分鐘最多寫入一次 KV)
        if (!activeUsers[ip] || (NOW - activeUsers[ip] > 60000)) {
            activeUsers[ip] = NOW;
            dirty = true;
        }

        // 4. 寫回 KV (Fire and forget, don't await to block response)
        if (dirty) {
            this.env.FLUX_KV.put(KEY_ONLINE, JSON.stringify(activeUsers), { expirationTtl: 600 }).catch(e=>console.error(e));
        }

        return { online: Object.keys(activeUsers).length, total: total };

    } catch (e) {
        console.error("Stats Error:", e);
        return { online: 1, total: 0 };
    }
  }

  // 增加總生成數
  async incrementTotal() {
    if (!this.env.FLUX_KV) return;
    const KEY_TOTAL = 'stats:total_generations';
    try {
        let current = await this.env.FLUX_KV.get(KEY_TOTAL);
        let newVal = (parseInt(current || '0') + 1);
        // 使用後台寫入
        this.env.FLUX_KV.put(KEY_TOTAL, newVal.toString()).catch(e=>console.error(e));
    } catch(e) { console.error(e); }
  }
}

class RateLimiter {
  constructor(env) {
    this.env = env;
    this.KV = env.FLUX_KV;
  }
  async checkLimit(ip) {
    if (!this.KV) return { allowed: true };
    const key = `nano_limit:${ip}`;
    const windowSize = 3600 * 1000; // 1小時
    const maxRequests = 5; 
    try {
      const rawData = await this.KV.get(key);
      let timestamps = rawData ? JSON.parse(rawData) : [];
      const now = Date.now();
      timestamps = timestamps.filter(ts => now - ts < windowSize);
      if (timestamps.length >= maxRequests) {
        const oldest = timestamps[0];
        const waitMin = Math.ceil(((oldest + windowSize) - now) / 60000);
        return { allowed: false, reason: `🍌 限額已滿 (5張/小時)。請休息 ${waitMin} 分鐘。`, remaining: 0 };
      }
      timestamps.push(now);
      await this.KV.put(key, JSON.stringify(timestamps), { expirationTtl: 3600 });
      return { allowed: true, remaining: maxRequests - timestamps.length };
    } catch (err) {
      return { allowed: true };
    }
  }
}

function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';
}

async function translateToEnglish(text, env) {
  try {
    const hasChinese = /[\u4e00-\u9fa5]/.test(text);
    if (!hasChinese) return { text: text, translated: false };
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" + encodeURIComponent(text);
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!response.ok) throw new Error("Translation API failed");
    const data = await response.json();
    let translatedText = "";
    if (data && data[0]) data[0].forEach(s => { if (s && s[0]) translatedText += s[0]; });
    return { text: translatedText.trim(), translated: true };
  } catch (error) {
    return { text: text, translated: false, error: error.message };
  }
}

class PromptAnalyzer {
  static analyzeComplexity(prompt) {
    const keywords = ['detailed', 'intricate', 'realistic', 'photorealistic', '8k', 'hdr'];
    let score = 0;
    keywords.forEach(k => { if (prompt.toLowerCase().includes(k)) score += 0.1; });
    if (prompt.length > 100) score += 0.2;
    return Math.min(score, 1.0);
  }
  static recommendQualityMode(prompt, model) {
    const complexity = this.analyzeComplexity(prompt);
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
    
    let enhancedPrompt = prompt;
    if (hdConfig.HD_PROMPTS[modeConfig.hd_level]) enhancedPrompt += ", " + hdConfig.HD_PROMPTS[modeConfig.hd_level];
    
    let enhancedNegative = negativePrompt || "";
    if (qualityMode !== 'economy') enhancedNegative += ", " + hdConfig.HD_NEGATIVE;

    const maxModelRes = profile?.max_resolution || 2048;
    const minRes = Math.max(modeConfig.min_resolution, profile?.min_resolution || 1024);
    
    let finalWidth = width;
    let finalHeight = height;
    
    // Scale up logic
    const currentRes = Math.min(width, height);
    if (currentRes < minRes || modeConfig.force_upscale) {
      const scale = minRes / currentRes;
      finalWidth = Math.min(Math.round(width * scale / 64) * 64, maxModelRes);
      finalHeight = Math.min(Math.round(height * scale / 64) * 64, maxModelRes);
    }

    return { prompt: enhancedPrompt, negativePrompt: enhancedNegative, width: finalWidth, height: finalHeight, optimized: true, hd_level: modeConfig.hd_level };
  }
}

class ParameterOptimizer {
  static optimizeSteps(model, width, height, style = 'none', qualityMode = 'standard', userSteps = null) {
    if (userSteps) return { steps: userSteps };
    const base = CONFIG.OPTIMIZATION_RULES.MODEL_STEPS[model]?.optimal || 20;
    const modeMult = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode]?.steps_multiplier || 1.0;
    return { steps: Math.round(base * modeMult) };
  }
  static optimizeGuidance(model, style, qualityMode = 'standard') {
    let base = 7.5;
    if (style === 'photorealistic') base = 8.5;
    if (model.includes('turbo')) base = 3.5;
    return base;
  }
}

class StyleProcessor {
  static applyStyle(prompt, style, negativePrompt) {
    if (!style || style === 'none' || !CONFIG.STYLE_PRESETS[style]) return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
    const s = CONFIG.STYLE_PRESETS[style];
    return { 
        enhancedPrompt: prompt + (s.prompt ? ", " + s.prompt : ""), 
        enhancedNegative: (negativePrompt || "") + (s.negative ? ", " + s.negative : "")
    };
  }
}

async function fetchWithTimeout(url, options = {}, timeout = 120000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

function corsHeaders() {
  return { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': '*' };
}

class PollinationsProvider {
  constructor(config, env) { this.config = config; this.env = env; }
  
  async generate(prompt, options, logger) {
    const { model, width, height, seed, negativePrompt, style, autoHD, qualityMode, steps, guidance } = options;
    
    let basePrompt = prompt;
    const trans = await translateToEnglish(prompt, this.env);
    if (trans.translated) basePrompt = trans.text;

    let finalPrompt = basePrompt;
    let finalNeg = negativePrompt;
    let finalW = width;
    let finalH = height;

    if (autoHD) {
        const hd = HDOptimizer.optimize(basePrompt, negativePrompt, model, width, height, qualityMode, true);
        finalPrompt = hd.prompt;
        finalNeg = hd.negativePrompt;
        finalW = hd.width;
        finalH = hd.height;
    }

    const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(finalPrompt, style, finalNeg);
    const fullPrompt = enhancedPrompt + (enhancedNegative ? " [negative: " + enhancedNegative + "]" : "");
    
    const finalSteps = steps || ParameterOptimizer.optimizeSteps(model, finalW, finalH, style, qualityMode).steps;
    const finalGuidance = guidance || ParameterOptimizer.optimizeGuidance(model, style, qualityMode);
    
    const params = new URLSearchParams({
        model, width: finalW, height: finalH, seed: seed === -1 ? Math.floor(Math.random()*1e6) : seed,
        nologo: options.nologo, enhance: options.enhance, private: options.privateMode,
        steps: finalSteps, guidance: finalGuidance
    });
    
    if (options.referenceImages?.length) params.append('image', options.referenceImages[0]);

    const url = `${this.config.endpoint}/image/${encodeURIComponent(fullPrompt)}?${params}`;
    const headers = { 
        'Authorization': `Bearer ${CONFIG.POLLINATIONS_AUTH.token}`,
        'User-Agent': 'FluxWorker/1.0',
        'Referer': 'https://pollinations.ai/'
    };

    for (let i = 0; i < 3; i++) {
        try {
            const res = await fetchWithTimeout(url, { headers });
            if (res.ok && res.headers.get('content-type').includes('image')) {
                const buf = await res.arrayBuffer();
                return { imageData: buf, contentType: res.headers.get('content-type'), seed: options.seed, model };
            }
            if (res.status === 429) throw new Error("Rate limit exceeded");
            if (res.status >= 500) throw new Error("Server error");
        } catch (e) {
            if (i === 2) throw e;
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
    }
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (env.POLLINATIONS_API_KEY) CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY;
    
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders() });
    
    try {
      if (url.pathname === '/stats') {
        return await handleStats(request, env);
      }
      else if (url.pathname === '/nano') { 
        return handleNanoPage(request); 
      } 
      else if (url.pathname === '/') { 
        return handleUI(request); 
      } 
      else if (url.pathname === '/_internal/generate') { 
        return await handleInternalGenerate(request, env); 
      } 
      else {
        return new Response('Not Found', { status: 404 });
      }
    } catch (e) {
      return new Response(JSON.stringify({ error: { message: e.message } }), { status: 500, headers: corsHeaders() });
    }
  }
};

async function handleStats(request, env) {
    const ip = getClientIP(request);
    const statsMgr = new StatsManager(env);
    const stats = await statsMgr.updateAndGet(ip);
    return new Response(JSON.stringify(stats), { headers: { 'Content-Type': 'application/json', ...corsHeaders() }});
}

async function handleInternalGenerate(request, env) {
    const body = await request.json();
    const ip = getClientIP(request);
    const logger = new Logger();

    // Check Nano Limit
    if (body.model === 'nanobanana-pro') {
        const limiter = new RateLimiter(env);
        const check = await limiter.checkLimit(ip);
        if (!check.allowed) {
            return new Response(JSON.stringify({ error: { message: check.reason } }), { status: 429, headers: corsHeaders() });
        }
    }

    const provider = new PollinationsProvider(CONFIG.PROVIDERS.pollinations, env);
    try {
        const result = await provider.generate(body.prompt, {
            model: body.model || 'gptimage',
            width: body.width || 1024,
            height: body.height || 1024,
            seed: body.seed || -1,
            style: body.style || 'none',
            nologo: body.nologo !== false,
            enhance: body.enhance === true,
            privateMode: true,
            autoHD: body.auto_hd !== false,
            qualityMode: body.quality_mode || 'standard',
            steps: body.steps ? parseInt(body.steps) : null,
            guidance: body.guidance_scale ? parseFloat(body.guidance_scale) : null,
            referenceImages: body.reference_images || []
        }, logger);

        // Success - Increment Stats
        const statsMgr = new StatsManager(env);
        ctx.waitUntil(statsMgr.incrementTotal());

        return new Response(result.imageData, {
            headers: { 
                'Content-Type': result.contentType, 
                'X-Seed': result.seed.toString(),
                ...corsHeaders() 
            }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: { message: e.message } }), { status: 400, headers: corsHeaders() });
    }
}

function handleNanoPage(request) {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>🍌 NanoBanana Pro</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍌</text></svg>">
<style>
:root { --primary: #FACC15; --bg-dark: #0f0f11; --panel-bg: rgba(30, 30, 35, 0.7); --border: rgba(255, 255, 255, 0.1); --text: #ffffff; --glass: blur(20px); }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: sans-serif; background: var(--bg-dark); color: var(--text); height: 100vh; display: flex; overflow: hidden; }
.sidebar { width: 380px; background: var(--panel-bg); backdrop-filter: var(--glass); padding: 24px; display: flex; flex-direction: column; border-right: 1px solid var(--border); overflow-y: auto; z-index: 10; }
.main-stage { flex: 1; background: #000; display: flex; align-items: center; justify-content: center; position: relative; }
.logo-area { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.logo-icon { font-size: 28px; }
.stats-badge { background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 6px; font-size: 11px; color: #4ade80; display: flex; align-items: center; gap: 4px; margin-left: auto; }
.control-group { margin-bottom: 20px; }
textarea, select, input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 8px; padding: 12px; color: #fff; margin-top: 5px; }
.gen-btn { width: 100%; background: var(--primary); color: #000; border: none; padding: 16px; border-radius: 12px; font-weight: 800; cursor: pointer; transition: 0.2s; }
.gen-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.quota-box { margin-top: auto; padding-top: 15px; border-top: 1px solid var(--border); }
.quota-bar { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; margin-top: 5px; }
.quota-fill { height: 100%; background: var(--primary); width: 100%; }
#resultImg { max-width: 90%; max-height: 85%; border-radius: 12px; display: none; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
.loading { position: absolute; display: none; flex-direction: column; align-items: center; }
.spinner { font-size: 40px; animation: spin 1s infinite; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@media (max-width: 900px) { body { flex-direction: column; } .sidebar { width: 100%; height: auto; } .main-stage { height: 50vh; order: -1; } }
</style>
</head>
<body>
    <div class="sidebar">
        <div class="logo-area">
            <div class="logo-icon">🍌</div>
            <div>
                <h1 style="font-size:18px">Nano Pro</h1>
                <div style="font-size:10px; color:#666">Flux Engine</div>
            </div>
            <div class="stats-badge" id="liveStats">
                <span style="width:6px;height:6px;background:#4ade80;border-radius:50%;display:inline-block"></span>
                <span id="onlineCount">-</span> Online
            </div>
        </div>

        <div class="control-group">
            <label style="font-size:12px;color:#aaa">Prompt</label>
            <textarea id="prompt" rows="3" placeholder="描述..."></textarea>
        </div>
        
        <div class="control-group">
            <label style="font-size:12px;color:#aaa">Size & Style</label>
            <div style="display:flex;gap:5px">
                <select id="size">
                    <option value="1024,1024">Square 1:1</option>
                    <option value="1080,1920">Story 9:16</option>
                    <option value="1920,1080">Wallpaper 16:9</option>
                </select>
                <select id="style">
                    <option value="none">無風格</option>
                    <option value="photorealistic">寫實</option>
                    <option value="anime">動漫</option>
                    <option value="cyberpunk">賽博</option>
                </select>
            </div>
        </div>

        <button id="genBtn" class="gen-btn">生成圖像 (1 🍌)</button>

        <div class="quota-box">
            <div style="display:flex;justify-content:space-between;font-size:12px;color:#aaa">
                <span>Energy</span>
                <span id="quotaText">5/5</span>
            </div>
            <div class="quota-bar"><div id="quotaFill" class="quota-fill"></div></div>
        </div>
    </div>

    <div class="main-stage">
        <h1 style="color:#222;font-size:60px;font-weight:900" id="placeholder">NANO</h1>
        <img id="resultImg">
        <div class="loading">
            <div class="spinner">🍌</div>
            <div style="margin-top:10px;color:var(--primary);font-size:12px;font-weight:bold">GENERATING...</div>
        </div>
    </div>

<script>
    // Stats Logic
    async function updateStats() {
        try {
            const res = await fetch('/stats');
            const data = await res.json();
            document.getElementById('onlineCount').textContent = data.online;
        } catch(e) {}
    }
    setInterval(updateStats, 10000); // Poll every 10s
    updateStats();

    // Gen Logic
    const els = {
        prompt: document.getElementById('prompt'),
        genBtn: document.getElementById('genBtn'),
        img: document.getElementById('resultImg'),
        loader: document.querySelector('.loading'),
        ph: document.getElementById('placeholder')
    };

    let quota = 5;
    const cooldownKey = 'nano_cd';
    
    function checkCooldown() {
        const last = localStorage.getItem(cooldownKey);
        if(last) {
            const left = 60 - Math.floor((Date.now() - parseInt(last))/1000);
            if(left > 0) startTimer(left);
        }
    }
    
    function startTimer(sec) {
        els.genBtn.disabled = true;
        let s = sec;
        const t = setInterval(() => {
            els.genBtn.textContent = \`⚡ 回充中 (\${s}s)\`;
            s--;
            if(s < 0) {
                clearInterval(t);
                els.genBtn.disabled = false;
                els.genBtn.textContent = '生成圖像 (1 🍌)';
            }
        }, 1000);
    }
    
    checkCooldown();

    els.genBtn.onclick = async () => {
        if(!els.prompt.value) return alert('請輸入提示詞');
        
        els.genBtn.disabled = true;
        els.loader.style.display = 'flex';
        els.img.style.display = 'none';
        els.ph.style.display = 'none';
        
        try {
            const [w,h] = document.getElementById('size').value.split(',').map(Number);
            const res = await fetch('/_internal/generate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    prompt: els.prompt.value,
                    model: 'nanobanana-pro',
                    width: w, height: h,
                    style: document.getElementById('style').value,
                    seed: Math.floor(Math.random()*1e6),
                    nologo: true
                })
            });
            
            if(res.status === 429) {
                throw new Error("限額已滿！請稍後再來");
            }
            if(!res.ok) throw new Error("生成失敗");
            
            const blob = await res.blob();
            els.img.src = URL.createObjectURL(blob);
            els.img.style.display = 'block';
            
            // Start Cooldown
            localStorage.setItem(cooldownKey, Date.now());
            startTimer(60);
            
            // Quota Visual Update (Local only)
            quota--;
            document.getElementById('quotaText').textContent = Math.max(0, quota) + '/5';
            document.getElementById('quotaFill').style.width = (Math.max(0, quota)/5)*100 + '%';

        } catch(e) {
            alert(e.message);
            els.genBtn.disabled = false;
        } finally {
            els.loader.style.display = 'none';
        }
    };
</script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html', ...corsHeaders() } });
}

function handleUI(request) {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro</title>
<style>
body{background:#0a0a0a;color:#fff;font-family:sans-serif;margin:0;display:flex;flex-direction:column;height:100vh}
.nav{padding:15px;background:#111;border-bottom:1px solid #333;display:flex;justify-content:space-between;align-items:center}
.logo{font-weight:bold;font-size:20px;color:#f59e0b}
.stats-bar{font-size:12px;color:#888;background:#222;padding:5px 10px;border-radius:20px;display:flex;gap:15px}
.stat-item{display:flex;align-items:center;gap:5px}
.iframe-container{flex:1;border:none;width:100%}
</style>
</head>
<body>
<div class="nav">
    <div class="logo">🎨 Flux AI Pro</div>
    <div class="stats-bar">
        <div class="stat-item">🟢 <span id="online">...</span> Online</div>
        <div class="stat-item">🚀 <span id="total">...</span> Gen</div>
    </div>
    <div>
        <a href="/nano" target="_blank" style="color:#f59e0b;text-decoration:none;border:1px solid #f59e0b;padding:5px 10px;border-radius:5px">🍌 Nano版</a>
    </div>
</div>
<!-- 嵌入 Nano 作為默認視圖或只顯示簡單歡迎頁 -->
<iframe src="/nano" class="iframe-container"></iframe>
<script>
async function loadStats(){
    try{
        const r = await fetch('/stats');
        const d = await r.json();
        document.getElementById('online').innerText = d.online;
        document.getElementById('total').innerText = d.total;
    }catch(e){}
}
setInterval(loadStats, 10000);
loadStats();
</script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html', ...corsHeaders() } });
}
