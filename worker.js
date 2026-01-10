// =================================================================================
//  項目: Flux AI Pro - NanoBanana Pro Edition (方案 C - 完整版)
//  版本: 11.0.0-nano-pro-c
//  功能: 圖生圖 + 多圖融合 + 限額追蹤 + 參考強度控制 + 完整記錄
//  更新: 2026-01-10
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro-NanoBanana-Pro",
  PROJECT_VERSION: "11.0.0-nano-pro-c",
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
      description: "官方 AI 圖像生成服務（需要 API Key）",
      features: {
        private_mode: true, custom_size: true, seed_control: true, negative_prompt: true, enhance: true, nologo: true, style_presets: true, auto_hd: true, quality_modes: true, auto_translate: true, reference_images: true, image_to_image: true, batch_generation: true, api_key_auth: true
      },
      models: [
        { 
          id: "nano-banana", 
          name: "Nano Banana 🍌", 
          confirmed: true, 
          category: "special", 
          description: "Nano Banana 風格模型 (每小時限額 20 張)", 
          max_size: 2048, 
          pricing: { image_price: 0, currency: "free" }, 
          input_modalities: ["text", "image"], 
          output_modalities: ["image"],
          supports_reference_images: true,
          max_reference_images: 3,
          supports_image_to_image: true
        },
        { 
          id: "gptimage", 
          name: "GPT-Image 🎨", 
          confirmed: true, 
          category: "gptimage", 
          description: "通用 GPT 圖像生成模型", 
          max_size: 2048, 
          pricing: { image_price: 0.0002, currency: "pollen" }, 
          input_modalities: ["text"], 
          output_modalities: ["image"] 
        },
        { 
          id: "gptimage-large", 
          name: "GPT-Image Large 🌟", 
          confirmed: true, 
          category: "gptimage", 
          description: "高質量 GPT 圖像生成模型", 
          max_size: 2048, 
          pricing: { image_price: 0.0003, currency: "pollen" }, 
          input_modalities: ["text"], 
          output_modalities: ["image"] 
        },
        { 
          id: "zimage", 
          name: "Z-Image Turbo ⚡", 
          confirmed: true, 
          category: "zimage", 
          description: "快速 6B 參數圖像生成 (Alpha)", 
          max_size: 2048, 
          pricing: { image_price: 0.0002, currency: "pollen" }, 
          input_modalities: ["text"], 
          output_modalities: ["image"] 
        },
        { 
          id: "flux", 
          name: "Flux 標準版", 
          confirmed: true, 
          category: "flux", 
          description: "快速且高質量的圖像生成", 
          max_size: 2048, 
          pricing: { image_price: 0.00012, currency: "pollen" }, 
          input_modalities: ["text"], 
          output_modalities: ["image"] 
        },
        { 
          id: "turbo", 
          name: "Flux Turbo ⚡", 
          confirmed: true, 
          category: "flux", 
          description: "超快速圖像生成", 
          max_size: 2048, 
          pricing: { image_price: 0.0003, currency: "pollen" }, 
          input_modalities: ["text"], 
          output_modalities: ["image"] 
        },
        { 
          id: "kontext", 
          name: "Kontext 🎨", 
          confirmed: true, 
          category: "kontext", 
          description: "上下文感知圖像生成（支持圖生圖）", 
          max_size: 2048, 
          pricing: { image_price: 0.04, currency: "pollen" }, 
          supports_reference_images: true, 
          max_reference_images: 1, 
          input_modalities: ["text", "image"], 
          output_modalities: ["image"],
          supports_image_to_image: true
        }
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
      "nano-banana": { min: 15, optimal: 20, max: 30 },
      "gptimage": { min: 10, optimal: 18, max: 28 },
      "gptimage-large": { min: 15, optimal: 25, max: 35 },
      "zimage": { min: 8, optimal: 15, max: 25 }, 
      "flux": { min: 15, optimal: 20, max: 30 }, 
      "turbo": { min: 4, optimal: 8, max: 12 }, 
      "kontext": { min: 18, optimal: 25, max: 35 } 
    },
    SIZE_MULTIPLIER: { 
      small: { threshold: 512 * 512, multiplier: 0.8 }, 
      medium: { threshold: 1024 * 1024, multiplier: 1.0 }, 
      large: { threshold: 1536 * 1536, multiplier: 1.15 }, 
      xlarge: { threshold: 2048 * 2048, multiplier: 1.3 } 
    },
    STYLE_ADJUSTMENT: { 
      "photorealistic": 1.1, 
      "oil-painting": 1.05, 
      "watercolor": 0.95, 
      "sketch": 0.9, 
      "manga": 1.0, 
      "pixel-art": 0.85, 
      "3d-render": 1.15, 
      "default": 1.0 
    }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    QUALITY_MODES: {
      economy: { name: "經濟模式", description: "快速出圖", min_resolution: 1024, max_resolution: 2048, steps_multiplier: 0.85, guidance_multiplier: 0.9, hd_level: "basic" },
      standard: { name: "標準模式", description: "平衡質量與速度", min_resolution: 1280, max_resolution: 2048, steps_multiplier: 1.0, guidance_multiplier: 1.0, hd_level: "enhanced" },
      ultra: { name: "超高清模式", description: "極致質量", min_resolution: 1536, max_resolution: 2048, steps_multiplier: 1.35, guidance_multiplier: 1.15, hd_level: "maximum", force_upscale: true }
    },
    HD_PROMPTS: { 
      basic: "high quality, detailed, sharp", 
      enhanced: "high quality, highly detailed, sharp focus, professional, 8k uhd", 
      maximum: "masterpiece, best quality, ultra detailed, 8k uhd, high resolution, professional photography, sharp focus, HDR" 
    },
    HD_NEGATIVE: "blurry, low quality, distorted, ugly, bad anatomy, low resolution, pixelated, artifacts, noise",
    MODEL_QUALITY_PROFILES: {
      "nano-banana": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.0, guidance_boost: 1.0, recommended_quality: "standard" },
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

// ====== RateLimiter: 負責 KV 限制邏輯 ======
class RateLimiter {
  constructor(env) {
    this.env = env;
    this.KV = env.FLUX_KV;
  }
  
  async checkLimit(ip) {
    if (!this.KV) {
      console.warn("⚠️ FLUX_KV 未綁定，跳過限制");
      return { allowed: true, remaining: 20 };
    }
    
    const key = `nano_limit:${ip}`;
    const windowSize = 3600 * 1000; // 1小時 (毫秒)
    const maxRequests = 20; // 限制數量
    
    try {
      const rawData = await this.KV.get(key);
      let timestamps = rawData ? JSON.parse(rawData) : [];
      const now = Date.now();
      
      // 清除過期的時間戳
      timestamps = timestamps.filter(ts => now - ts < windowSize);
      
      if (timestamps.length >= maxRequests) {
        const oldest = timestamps[0];
        const resetTime = oldest + windowSize;
        const waitMin = Math.ceil((resetTime - now) / 60000);
        return { 
          allowed: false, 
          reason: `🍌 香蕉能量耗盡！限額已滿 (20張/小時)。請休息 ${waitMin} 分鐘後再來。`, 
          remaining: 0,
          resetTime: resetTime,
          waitMinutes: waitMin
        };
      }
      
      // 添加當前請求的時間戳
      timestamps.push(now);
      await this.KV.put(key, JSON.stringify(timestamps), { expirationTtl: 3600 });
      
      return { 
        allowed: true, 
        remaining: maxRequests - timestamps.length,
        used: timestamps.length,
        total: maxRequests
      };
    } catch (err) {
      console.error("KV Error:", err);
      return { allowed: true, remaining: 20 };
    }
  }
}

function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') || 
         request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

async function translateToEnglish(text, env) {
  try {
    const hasChinese = /[\u4e00-\u9fa5\u3400-\u4db5\u20000-\u2a6d6]/.test(text);
    if (!hasChinese) return { text: text, translated: false, reason: "No Chinese detected" };
    
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" + encodeURIComponent(text);
    const response = await fetch(url, { 
      method: 'GET', 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
      } 
    });
    
    if (!response.ok) throw new Error(`Google API HTTP ${response.status}`);
    
    const data = await response.json();
    let translatedText = "";
    
    if (data && data[0] && Array.isArray(data[0])) { 
      data[0].forEach(segment => { 
        if (segment && segment[0]) translatedText += segment[0]; 
      }); 
    }
    
    if (!translatedText) throw new Error("Empty translation result");
    
    console.log(`✅ [Google GTX] Translated: "${text.substring(0,10)}..." -> "${translatedText.substring(0,10)}..."`);
    return { text: translatedText.trim(), translated: true, original: text, model: "google-gtx-free" };
  } catch (error) {
    console.error("❌ Translate Error:", error.message);
    return { text: text, translated: false, error: error.message };
  }
}

class PromptAnalyzer {
  static analyzeComplexity(prompt) {
    const complexKeywords = ['detailed', 'intricate', 'complex', 'elaborate', 'realistic', 'photorealistic', 'hyperrealistic', 'architecture', 'cityscape', 'landscape', 'portrait', 'face', 'eyes', 'hair', 'texture', 'material', 'fabric', 'skin', 'lighting', 'shadows', 'reflections', 'fine details', 'high detail', 'ultra detailed', '4k', '8k', 'uhd', 'hdr'];
    let score = 0;
    const lowerPrompt = prompt.toLowerCase();
    
    complexKeywords.forEach(keyword => { 
      if (lowerPrompt.includes(keyword)) score += 0.1; 
    });
    
    if (prompt.length > 100) score += 0.2;
    if (prompt.length > 200) score += 0.3;
    if (prompt.split(',').length > 5) score += 0.15;
    
    return Math.min(score, 1.0);
  }
  
  static recommendQualityMode(prompt, model) {
    const complexity = this.analyzeComplexity(prompt);
    const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
    
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
    
    // 增強提示詞
    let enhancedPrompt = prompt;
    if (hdConfig.HD_PROMPTS[hdLevel]) { 
      enhancedPrompt = prompt + ", " + hdConfig.HD_PROMPTS[hdLevel]; 
      optimizations.push("HD增強: " + hdLevel); 
    }
    
    // 增強負面提示詞
    let enhancedNegative = negativePrompt || "";
    if (qualityMode !== 'economy') { 
      enhancedNegative = enhancedNegative ? enhancedNegative + ", " + hdConfig.HD_NEGATIVE : hdConfig.HD_NEGATIVE; 
      optimizations.push("負面提示詞: 高清過濾"); 
    }
    
    // 尺寸優化
    let finalWidth = width;
    let finalHeight = height;
    let sizeUpscaled = false;
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
    
    return { 
      prompt: enhancedPrompt, 
      negativePrompt: enhancedNegative, 
      width: finalWidth, 
      height: finalHeight, 
      optimized: true, 
      quality_mode: qualityMode, 
      hd_level: hdLevel, 
      optimizations, 
      size_upscaled: sizeUpscaled 
    };
  }
}

class ParameterOptimizer {
  static optimizeSteps(model, width, height, style = 'none', qualityMode = 'standard', userSteps = null) {
    if (userSteps !== null && userSteps !== -1) { 
      const suggestion = this.calculateOptimalSteps(model, width, height, style, qualityMode); 
      return { 
        steps: userSteps, 
        optimized: false, 
        suggested: suggestion.steps, 
        reasoning: suggestion.reasoning, 
        user_override: true 
      }; 
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
    
    if (totalPixels >= rules.SIZE_MULTIPLIER.xlarge.threshold) { 
      sizeMultiplier = rules.SIZE_MULTIPLIER.xlarge.multiplier; 
      reasoning.push("超大 x" + sizeMultiplier); 
    }
    else if (totalPixels >= rules.SIZE_MULTIPLIER.large.threshold) { 
      sizeMultiplier = rules.SIZE_MULTIPLIER.large.multiplier; 
      reasoning.push("大尺寸 x" + sizeMultiplier); 
    }
    else if (totalPixels <= rules.SIZE_MULTIPLIER.small.threshold) { 
      sizeMultiplier = rules.SIZE_MULTIPLIER.small.multiplier; 
    }
    else { 
      sizeMultiplier = rules.SIZE_MULTIPLIER.medium.multiplier; 
    }
    
    let styleMultiplier = rules.STYLE_ADJUSTMENT[style] || rules.STYLE_ADJUSTMENT.default;
    let qualityMultiplier = modeConfig?.steps_multiplier || 1.0;
    
    if (qualityMultiplier !== 1.0) reasoning.push(modeConfig.name + " x" + qualityMultiplier);
    
    let profileBoost = profile?.optimal_steps_boost || 1.0;
    if (profileBoost !== 1.0) reasoning.push("模型配置 x" + profileBoost);
    
    let optimizedSteps = Math.round(baseSteps * sizeMultiplier * styleMultiplier * qualityMultiplier * profileBoost);
    optimizedSteps = Math.max(modelRule.min, Math.min(optimizedSteps, modelRule.max));
    
    reasoning.push("→ " + optimizedSteps + "步");
    
    return { 
      steps: optimizedSteps, 
      optimized: true, 
      base_steps: baseSteps, 
      size_multiplier: sizeMultiplier, 
      style_multiplier: styleMultiplier, 
      quality_multiplier: qualityMultiplier, 
      profile_boost: profileBoost, 
      min_steps: modelRule.min, 
      max_steps: modelRule.max, 
      reasoning: reasoning.join(' ') 
    };
  }
  
  static optimizeGuidance(model, style, qualityMode = 'standard') {
    const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
    const profile = CONFIG.HD_OPTIMIZATION.MODEL_QUALITY_PROFILES[model];
    
    let baseGuidance = 7.5;
    
    if (model.includes('turbo')) baseGuidance = style === 'photorealistic' ? 3.0 : 2.5;
    else if (style === 'photorealistic') baseGuidance = 8.5;
    else if (['oil-painting', 'watercolor', 'sketch'].includes(style)) baseGuidance = 6.5;
    else if (['manga', 'anime', 'chibi'].includes(style)) baseGuidance = 7.0;
    else if (['pixel-art', 'low-poly'].includes(style)) baseGuidance = 6.0;
    
    let qualityBoost = modeConfig?.guidance_multiplier || 1.0;
    let profileBoost = profile?.guidance_boost || 1.0;
    
    return Math.round(baseGuidance * qualityBoost * profileBoost * 10) / 10;
  }
}

class StyleProcessor {
  static applyStyle(prompt, style, negativePrompt) {
    try {
      if (!style || style === 'none' || style === '') return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
      if (!CONFIG.STYLE_PRESETS || typeof CONFIG.STYLE_PRESETS !== 'object') return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
      
      const styleConfig = CONFIG.STYLE_PRESETS[style];
      if (!styleConfig) return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
      
      let enhancedPrompt = prompt;
      if (styleConfig.prompt && styleConfig.prompt.trim()) enhancedPrompt = prompt + ", " + styleConfig.prompt;
      
      let enhancedNegative = negativePrompt || "";
      if (styleConfig.negative && styleConfig.negative.trim()) {
        if (enhancedNegative && enhancedNegative.trim()) enhancedNegative = enhancedNegative + ", " + styleConfig.negative;
        else enhancedNegative = styleConfig.negative;
      }
      
      return { enhancedPrompt: enhancedPrompt, enhancedNegative: enhancedNegative };
    } catch (error) { 
      console.error("❌ StyleProcessor error:", error.message); 
      return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" }; 
    }
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

function corsHeaders(additionalHeaders = {}) {
  return { 
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Source', 
    'Access-Control-Max-Age': '86400', 
    ...additionalHeaders 
  };
}

class PollinationsProvider {
  constructor(config, env) { 
    this.config = config; 
    this.name = config.name; 
    this.env = env; 
  }
  
  async generate(prompt, options, logger) {
    const { 
      model = "zimage", 
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
      imageToImageMode = false,
      referenceStrength = 0.7
    } = options;
    
    const modelConfig = this.config.models.find(m => m.id === model);
    const supportsRefImages = modelConfig?.supports_reference_images || false;
    const maxRefImages = modelConfig?.max_reference_images || 0;
    const supportsI2I = modelConfig?.supports_image_to_image || false;
    
    let validReferenceImages = [];
    if (referenceImages && referenceImages.length > 0) {
      if (!supportsRefImages) {
        logger.add("⚠️ Reference Images", { 
          warning: model + " 不支持參考圖像，已忽略", 
          supported_models: ["nano-banana", "kontext"] 
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
          mode: imageToImageMode ? "圖生圖" : "多圖融合" 
        });
      }
    }
    
    // 圖生圖模式驗證
    if (imageToImageMode && !supportsI2I) {
      logger.add("⚠️ Image-to-Image Not Supported", { 
        model: model, 
        message: "該模型不支持圖生圖，改用文生圖模式" 
      });
      imageToImageMode = false;
    }
    
    let basePrompt = prompt;
    let translationLog = { translated: false };

    if (/[\u4e00-\u9fa5]/.test(prompt)) {
      logger.add("🌐 Pre-translation", { message: "Detecting Chinese, translating first..." });
      const translation = await translateToEnglish(prompt, this.env);
      if (translation.translated) {
        basePrompt = translation.text;
        translationLog = translation;
        logger.add("✅ Translation Success", { original: prompt, translated: basePrompt });
      } else {
        logger.add("⚠️ Translation Failed", { error: translation.error });
      }
    }

    const promptComplexity = PromptAnalyzer.analyzeComplexity(basePrompt);
    const recommendedQuality = PromptAnalyzer.recommendQualityMode(basePrompt, model);
    logger.add("🧠 Prompt Analysis", { 
      complexity: (promptComplexity * 100).toFixed(1) + '%', 
      recommended_quality: recommendedQuality, 
      selected_quality: qualityMode, 
      has_reference_images: validReferenceImages.length > 0,
      image_to_image_mode: imageToImageMode
    });
    
    let hdOptimization = null;
    let optimizedPrompt = basePrompt;
    let finalNegative = negativePrompt;
    let finalWidth = width;
    let finalHeight = height;
    
    if (autoHD) {
      hdOptimization = HDOptimizer.optimize(basePrompt, negativePrompt, model, width, height, qualityMode, autoHD);
      optimizedPrompt = hdOptimization.prompt;
      finalNegative = hdOptimization.negativePrompt;
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
      logger.add("🎯 Steps Optimization", { 
        steps: stepsOptimization.steps, 
        reasoning: stepsOptimization.reasoning 
      });
      if (guidance === null) finalGuidance = ParameterOptimizer.optimizeGuidance(model, style, qualityMode);
      else finalGuidance = guidance;
    } else {
      finalSteps = steps || 20;
      finalGuidance = guidance || 7.5;
    }
    
    const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(optimizedPrompt, style, finalNegative);
    const finalFullPrompt = enhancedPrompt;

    logger.add("🎨 Style Processing", { 
      selected_style: style, 
      style_name: CONFIG.STYLE_PRESETS[style]?.name || style, 
      style_applied: style !== 'none', 
      original_prompt_length: optimizedPrompt.length, 
      enhanced_prompt_length: enhancedPrompt.length 
    });
    
    const currentSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
    let fullPrompt = finalFullPrompt;
    if (enhancedNegative && enhancedNegative.trim()) fullPrompt = finalFullPrompt + " [negative: " + enhancedNegative + "]";
    
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const pathPrefix = this.config.pathPrefix || "";
    let baseUrl = this.config.endpoint + pathPrefix + "/" + encodedPrompt;
    
    const params = new URLSearchParams();
    params.append('model', model);
    params.append('width', finalWidth.toString());
    params.append('height', finalHeight.toString());
    params.append('seed', currentSeed.toString());
    params.append('nologo', nologo.toString());
    params.append('enhance', enhance.toString());
    params.append('private', privateMode.toString());
    
    // 參考圖像處理
    if (validReferenceImages && validReferenceImages.length > 0) {
      if (imageToImageMode) {
        // 圖生圖：只用第一張，添加 strength
        params.append('image', validReferenceImages[0]);
        params.append('strength', referenceStrength.toString());
        logger.add("🖼️ Image-to-Image Parameters", { 
          image: validReferenceImages[0].substring(0, 50) + "...", 
          strength: referenceStrength 
        });
      } else {
        // 多圖融合：用所有圖
        params.append('image', validReferenceImages.join(','));
        logger.add("🔀 Reference Fusion Parameters", { 
          count: validReferenceImages.length, 
          urls: validReferenceImages 
        });
      }
    }
    
    if (finalGuidance !== 7.5) params.append('guidance', finalGuidance.toString());
    if (finalSteps !== 20) params.append('steps', finalSteps.toString());
    
    const headers = { 
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 
      'Accept': 'image/*', 
      'Referer': 'https://pollinations.ai/' 
    };
    
    const authConfig = CONFIG.POLLINATIONS_AUTH;
    if (authConfig.enabled && authConfig.token) {
      headers['Authorization'] = `Bearer ${authConfig.token}`;
      logger.add("🔐 API Authentication", { 
        method: "Bearer Token", 
        token_prefix: authConfig.token.substring(0, 8) + "...", 
        enabled: true, 
        endpoint: this.config.endpoint 
      });
    } else {
      logger.add("⚠️ No API Key", { 
        authenticated: false, 
        note: "新 API 端點需要 API Key，請設置 POLLINATIONS_API_KEY 環境變量", 
        endpoint: this.config.endpoint, 
        warning: "未認證的請求可能會失敗" 
      });
    }
    
    const url = baseUrl + '?' + params.toString();
    logger.add("📡 API Request", { 
      endpoint: this.config.endpoint, 
      path: pathPrefix + "/" + encodedPrompt.substring(0, 50) + "...", 
      model: model, 
      authenticated: authConfig.enabled && !!authConfig.token, 
      generation_mode: imageToImageMode ? "圖生圖" : (validReferenceImages.length > 0 ? "多圖融合" : "文生圖"),
      reference_images_count: validReferenceImages.length,
      full_url: url.substring(0, 100) + "..." 
    });
    
    for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
      try {
        const response = await fetchWithTimeout(url, { method: 'GET', headers: headers }, 120000);
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.startsWith('image/')) {
            logger.add("✅ Success", { 
              url: response.url, 
              used_model: model, 
              final_size: finalWidth + "x" + finalHeight, 
              quality_mode: qualityMode, 
              style_used: style, 
              style_name: CONFIG.STYLE_PRESETS[style]?.name || style, 
              hd_optimized: autoHD && hdOptimization?.optimized, 
              auto_translated: translationLog.translated, 
              reference_images_used: validReferenceImages.length, 
              generation_mode: imageToImageMode ? "圖生圖" : (validReferenceImages.length > 0 ? "多圖融合" : "文生圖"),
              reference_strength: imageToImageMode ? referenceStrength : null,
              authenticated: authConfig.enabled && !!authConfig.token, 
              seed: currentSeed 
            });
            
            const imageBlob = await response.blob();
            const imageBuffer = await imageBlob.arrayBuffer();
            return { 
              imageData: imageBuffer, 
              contentType: contentType, 
              url: response.url, 
              provider: this.name, 
              model: model, 
              requested_model: model, 
              seed: currentSeed, 
              style: style, 
              style_name: CONFIG.STYLE_PRESETS[style]?.name || style, 
              style_category: CONFIG.STYLE_PRESETS[style]?.category || 'unknown', 
              steps: finalSteps, 
              guidance: finalGuidance, 
              width: finalWidth, 
              height: finalHeight, 
              quality_mode: qualityMode, 
              prompt_complexity: promptComplexity, 
              hd_optimized: autoHD && hdOptimization?.optimized, 
              hd_details: hdOptimization, 
              auto_translated: translationLog.translated,
              reference_images: validReferenceImages, 
              reference_images_count: validReferenceImages.length,
              reference_strength: imageToImageMode ? referenceStrength : null,
              generation_mode: imageToImageMode ? "圖生圖" : (validReferenceImages.length > 0 ? "多圖融合" : "文生圖"), 
              authenticated: authConfig.enabled && !!authConfig.token, 
              cost: "FREE", 
              auto_optimized: autoOptimize 
            };
          } else { 
            throw new Error("Invalid content type: " + contentType); 
          }
        } else if (response.status === 401) { 
          throw new Error("Authentication failed: Invalid or missing API key. Please set POLLINATIONS_API_KEY"); 
        } 
        else if (response.status === 403) { 
          throw new Error("Access forbidden: API key may lack required permissions"); 
        } 
        else { 
          throw new Error("HTTP " + response.status + ": " + (await response.text()).substring(0, 200)); 
        }
      } catch (e) {
        logger.add("❌ Request Failed", { 
          error: e.message, 
          model: model, 
          retry: retry + 1, 
          max_retries: CONFIG.MAX_RETRIES, 
          endpoint: this.config.endpoint 
        });
        if (retry < CONFIG.MAX_RETRIES - 1) await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
        else throw new Error("Generation failed: " + e.message);
      }
    }
    
    throw new Error("Model " + model + " failed after " + CONFIG.MAX_RETRIES + " retries");
  }
}

class MultiProviderRouter {
  constructor(apiKeys = {}, env = null) {
    this.providers = {};
    this.apiKeys = apiKeys;
    this.env = env;
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
      if (config.enabled) {
        if (key === 'pollinations') this.providers[key] = new PollinationsProvider(config, env);
      }
    }
  }
  
  getProvider(providerName = null) {
    if (providerName && this.providers[providerName]) return { name: providerName, instance: this.providers[providerName] };
    const defaultName = CONFIG.DEFAULT_PROVIDER;
    if (this.providers[defaultName]) return { name: defaultName, instance: this.providers[defaultName] };
    const firstProvider = Object.keys(this.providers)[0];
    if (firstProvider) return { name: firstProvider, instance: this.providers[firstProvider] };
    throw new Error('No available provider');
  }
  
  async generate(prompt, options, logger) {
    const { provider: requestedProvider = null, numOutputs = 1 } = options;
    const { name: providerName, instance: provider } = this.getProvider(requestedProvider);
    const results = [];
    for (let i = 0; i < numOutputs; i++) {
      const currentOptions = { ...options, seed: options.seed === -1 ? -1 : options.seed + i };
      const result = await provider.generate(prompt, currentOptions, logger);
      results.push(result);
    }
    return results;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const startTime = Date.now();
    const clientIP = getClientIP(request);
    
    if (env.POLLINATIONS_API_KEY) { 
      CONFIG.POLLINATIONS_AUTH.enabled = true; 
      CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY; 
    } 
    else { 
      console.warn("⚠️ POLLINATIONS_API_KEY not set - requests may fail on new API endpoint"); 
      CONFIG.POLLINATIONS_AUTH.enabled = false; 
      CONFIG.POLLINATIONS_AUTH.token = ""; 
    }
    
    console.log("=== Request Info ===");
    console.log("IP:", clientIP);
    console.log("Path:", url.pathname);
    console.log("Method:", request.method);
    console.log("API Endpoint:", CONFIG.PROVIDERS.pollinations.endpoint);
    console.log("===================");
    
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders() });
    
    try {
      let response;
      if (url.pathname === '/nano') { 
        response = handleNanoPage(request); 
      } 
      else if (url.pathname === '/' || url.pathname === '') { 
        response = handleUI(request); 
      } 
      else if (url.pathname === '/_internal/generate') { 
        response = await handleInternalGenerate(request, env, ctx); 
      } 
      else if (url.pathname === '/health') {
        response = new Response(JSON.stringify({
          status: 'ok', 
          version: CONFIG.PROJECT_VERSION, 
          timestamp: new Date().toISOString(),
          styles_count: Object.keys(CONFIG.STYLE_PRESETS).length,
          api_auth: { 
            enabled: CONFIG.POLLINATIONS_AUTH.enabled, 
            method: CONFIG.POLLINATIONS_AUTH.method, 
            has_token: !!CONFIG.POLLINATIONS_AUTH.token, 
            endpoint: CONFIG.PROVIDERS.pollinations.endpoint 
          },
          models: CONFIG.PROVIDERS.pollinations.models.map(m => ({ 
            id: m.id, 
            name: m.name, 
            category: m.category, 
            supports_reference_images: m.supports_reference_images || false,
            supports_image_to_image: m.supports_image_to_image || false
          })),
          style_categories: Object.keys(CONFIG.STYLE_CATEGORIES).map(key => ({ 
            id: key, 
            name: CONFIG.STYLE_CATEGORIES[key].name, 
            icon: CONFIG.STYLE_CATEGORIES[key].icon, 
            count: Object.values(CONFIG.STYLE_PRESETS).filter(s => s.category === key).length 
          }))
        }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      } else {
        response = new Response(JSON.stringify({ 
          error: 'Not Found', 
          message: '此 Worker 僅提供 Web UI 界面', 
          available_paths: ['/', '/health', '/_internal/generate', '/nano'] 
        }), { status: 404, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
      
      const duration = Date.now() - startTime;
      const headers = new Headers(response.headers);
      headers.set('X-Response-Time', duration + 'ms');
      headers.set('X-Worker-Version', CONFIG.PROJECT_VERSION);
      headers.set('X-API-Endpoint', CONFIG.PROVIDERS.pollinations.endpoint);
      return new Response(response.body, { status: response.status, headers: headers });
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ 
        error: { 
          message: error.message, 
          type: 'worker_error', 
          timestamp: new Date().toISOString(), 
          duration_ms: duration 
        } 
      }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
  }
};

async function handleInternalGenerate(request, env, ctx) {
  const logger = new Logger();
  const startTime = Date.now();
  const clientIP = getClientIP(request);
  
  try {
    const body = await request.json();
    const prompt = body.prompt;
    if (!prompt || !prompt.trim()) throw new Error("Prompt is required");

    // ====== NanoBanana 來源與限流檢查 ======
    if (body.model === 'nano-banana') {
        // 1. 來源檢查：必須帶有特殊 Header
        const source = request.headers.get('X-Source');
        if (source !== 'nano-page') {
             return new Response(JSON.stringify({ 
                error: { message: "🍌 Nano Banana 模型僅限於獨立頁面使用！", type: 'access_denied' } 
            }), { status: 403, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }

        // 2. 限流檢查 - 詳細返回信息
        const limiter = new RateLimiter(env);
        const check = await limiter.checkLimit(clientIP);
        
        if (!check.allowed) {
            return new Response(JSON.stringify({ 
                error: { 
                    message: check.reason, 
                    type: 'rate_limit_exceeded',
                    remaining: check.remaining,
                    used: check.used,
                    total: check.total,
                    reset_in_minutes: check.waitMinutes
                } 
            }), { status: 429, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }

        // 3. 成功，回傳剩餘額度
        logger.add("🍌 Rate Limit Status", { 
            remaining: check.remaining, 
            used: check.used,
            max: check.total, 
            ip: clientIP,
            window: "1小時"
        });
    }
    // ===============================================
    
    let width = 1024, height = 1024;
    if (body.width) width = body.width;
    if (body.height) height = body.height;
    
    // ====== 參考圖像處理（支持多張，最多 3 張）======
    let referenceImages = [];
    if (body.reference_images && Array.isArray(body.reference_images)) {
      referenceImages = body.reference_images.filter(url => { 
        try { new URL(url); return true; } 
        catch { return false; } 
      }).slice(0, 3); // 限制最多 3 張
    }

    // 圖生圖模式：使用第一張參考圖作為基礎
    const imageToImageMode = body.generation_mode === 'image-to-image' && referenceImages.length > 0;
    const referenceStrength = body.reference_strength !== undefined ? parseFloat(body.reference_strength) : 0.7;
    
    // 驗證 strength 範圍
    const validStrength = Math.max(0.1, Math.min(1.0, referenceStrength));
    
    if (imageToImageMode) {
      logger.add("🖼️ Image-to-Image Mode", { 
        base_image: referenceImages[0].substring(0, 50) + "...",
        strength: validStrength,
        reference_images_count: referenceImages.length
      });
    } else if (referenceImages.length > 0) {
      logger.add("🔀 Reference Fusion Mode", { 
        images: referenceImages.map(url => url.substring(0, 50) + "..."),
        count: referenceImages.length
      });
    }
    
    const seedInput = body.seed !== undefined ? body.seed : -1;
    let seedValue = -1;
    if (seedInput !== -1) { 
        const parsedSeed = parseInt(seedInput); 
        if (!isNaN(parsedSeed)) seedValue = parsedSeed; 
    }
    
    const autoOptimize = body.auto_optimize !== false;
    const userSteps = body.steps ? parseInt(body.steps) : null;
    const userGuidance = body.guidance_scale ? parseFloat(body.guidance_scale) : null;

    const options = { 
      provider: body.provider || null, 
      model: body.model || "gptimage", 
      width: Math.min(Math.max(width, 256), 2048), 
      height: Math.min(Math.max(height, 256), 2048), 
      numOutputs: Math.min(Math.max(body.n || 1, 1), 4), 
      seed: seedValue, 
      negativePrompt: body.negative_prompt || "", 
      guidance: autoOptimize ? null : userGuidance, 
      steps: autoOptimize ? null : userSteps, 
      enhance: body.enhance === true, 
      nologo: body.nologo !== false, 
      privateMode: body.private !== false, 
      style: body.style || "none", 
      autoOptimize: autoOptimize, 
      autoHD: body.auto_hd !== false, 
      qualityMode: body.quality_mode || 'standard', 
      referenceImages: referenceImages,
      imageToImageMode: imageToImageMode,
      referenceStrength: validStrength
    };
    
    const router = new MultiProviderRouter({}, env);
    const results = await router.generate(prompt, options, logger);
    const duration = Date.now() - startTime;
    
    if (results.length === 1 && results[0].imageData) {
      const result = results[0];
      return new Response(result.imageData, {
        headers: { 
          'Content-Type': result.contentType || 'image/png', 
          'Content-Disposition': `inline; filename="nano-${result.seed}.png"`,
          'X-Model': result.model, 
          'X-Model-Name': result.style_name || result.model,
          'X-Seed': result.seed.toString(), 
          'X-Width': result.width.toString(), 
          'X-Height': result.height.toString(), 
          'X-Generation-Time': duration + 'ms',
          'X-Quality-Mode': result.quality_mode,
          'X-Style': result.style,
          'X-Style-Name': result.style_name || result.style,
          'X-Style-Category': result.style_category || 'unknown',
          'X-Generation-Mode': result.generation_mode || '文生圖',
          'X-Reference-Count': result.reference_images_count.toString(),
          'X-Reference-Strength': result.reference_strength?.toString() || '0',
          'X-Authenticated': result.authenticated ? 'true' : 'false', 
          'X-API-Endpoint': CONFIG.PROVIDERS.pollinations.endpoint, 
          ...corsHeaders() 
        }
      });
    }
    
    const imagesData = await Promise.all(results.map(async (r) => {
      if (r.imageData) {
        const uint8Array = new Uint8Array(r.imageData);
        let binary = '';
        const len = uint8Array.byteLength;
        for (let i = 0; i < len; i++) binary += String.fromCharCode(uint8Array[i]);
        return { 
          image: `data:${r.contentType};base64,${btoa(binary)}`, 
          model: r.model, 
          seed: r.seed, 
          width: r.width, 
          height: r.height,
          quality_mode: r.quality_mode,
          style: r.style,
          style_name: r.style_name,
          style_category: r.style_category,
          generation_mode: r.generation_mode,
          reference_count: r.reference_images_count,
          reference_strength: r.reference_strength,
          authenticated: r.authenticated 
        };
      }
      return null;
    }));
    
    return new Response(JSON.stringify({ 
      created: Math.floor(Date.now() / 1000), 
      data: imagesData.filter(d => d !== null), 
      generation_time_ms: duration,
      api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint, 
      authenticated: CONFIG.POLLINATIONS_AUTH.enabled, 
      styles_available: Object.keys(CONFIG.STYLE_PRESETS).length 
    }), { headers: corsHeaders({ 'Content-Type': 'application/json', 'X-Generation-Time': duration + 'ms' }) });
  } catch (e) {
    logger.add("❌ Error", e.message);
    return new Response(JSON.stringify({ 
      error: { 
        message: e.message, 
        debug_logs: logger.get(), 
        api_endpoint: CONFIG.PROVIDERS.pollinations.endpoint, 
        authenticated: CONFIG.POLLINATIONS_AUTH.enabled 
      } 
    }), { status: 400, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
  }
}

function handleNanoPage(request) {
  const html = \`<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🍌 NanoBanana Pro - 方案 C</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍌</text></svg>">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:100%;height:100%}
body{font-family:system-ui,sans-serif;background:#1a1a1a;color:#fff;display:flex;flex-direction:column}
.top-bar{background:rgba(0,0,0,0.5);border-bottom:1px solid #444;padding:12px 20px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
.logo-area{display:flex;align-items:center;gap:12px;font-size:28px}
.title{color:#FACC15;font-weight:900;font-size:18px}
.subtitle{font-size:10px;color:#888}
.quota-display{display:flex;align-items:center;gap:15px}
.quota-item{background:rgba(250,204,21,0.1);border:1px solid rgba(250,204,21,0.3);padding:6px 12px;border-radius:8px;font-size:12px}
.quota-label{color:#aaa;font-size:10px;text-transform:uppercase}
.quota-value{color:#FACC15;font-weight:900;font-size:16px}
.nav-btn{padding:8px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#ddd;cursor:pointer;font-size:12px;text-decoration:none;transition:0.3s}
.nav-btn:hover{border-color:#FACC15;color:#FACC15}

.main{flex:1;display:grid;grid-template-columns:320px 1fr 380px;gap:20px;padding:20px;overflow:hidden}
.panel{background:#2a2a2a;border:1px solid #333;border-radius:12px;padding:20px;overflow-y:auto}

.section-title{color:#FACC15;font-size:13px;font-weight:900;text-transform:uppercase;margin-bottom:15px}
.form-group{margin-bottom:16px}
label{display:block;margin-bottom:6px;font-size:12px;color:#bbb;font-weight:600}
input,textarea,select{width:100%;padding:10px;background:#333;border:1px solid #555;border-radius:8px;color:#fff;font-size:13px;font-family:inherit;transition:0.3s}
input:focus,textarea:focus,select:focus{outline:none;border-color:#FACC15;box-shadow:0 0 8px rgba(250,204,21,0.2)}
textarea{resize:vertical;min-height:80px}

.mode-tabs{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:15px}
.mode-tab{padding:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;cursor:pointer;text-align:center;font-size:12px;transition:0.3s;font-weight:600}
.mode-tab.active{background:rgba(250,204,21,0.2);border-color:#FACC15;color:#FACC15}

.image-upload{border:2px dashed #555;border-radius:10px;padding:20px;text-align:center;cursor:pointer;transition:0.3s}
.image-upload:hover{border-color:#FACC15}
.image-upload.active{border-color:#FACC15;background:rgba(250,204,21,0.05)}
.upload-icon{font-size:32px;margin-bottom:8px}

.image-previews{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px}
.preview-item{position:relative;border-radius:8px;overflow:hidden;background:#333;aspect-ratio:1}
.preview-item img{width:100%;height:100%;object-fit:cover}
.preview-remove{position:absolute;top:5px;right:5px;background:#ef4444;border:none;border-radius:50%;width:24px;height:24px;color:#fff;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center}

.slider-group{margin-bottom:15px}
.slider-label{display:flex;justify-content:space-between;margin-bottom:6px;font-size:12px;color:#bbb}
.slider-value{color:#FACC15;font-weight:600}
input[type="range"]{width:100%;cursor:pointer}

.preset-buttons{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:15px}
.preset-btn{padding:10px;background:rgba(250,204,21,0.1);border:1px solid rgba(250,204,21,0.2);border-radius:6px;color:#FACC15;cursor:pointer;font-size:12px;font-weight:600;transition:0.3s}
.preset-btn.active{background:rgba(250,204,21,0.3);border-color:#FACC15}
.preset-btn:hover{background:rgba(250,204,21,0.25)}

.advanced-toggle{display:flex;align-items:center;gap:8px;margin-bottom:10px;cursor:pointer;user-select:none}
input[type="checkbox"]{width:16px;height:16px;cursor:pointer}
.advanced-params{background:#222;border:1px solid #555;border-radius:8px;padding:15px;display:none;margin-top:10px}
.advanced-params.show{display:block}

.btn{width:100%;padding:12px;background:linear-gradient(45deg, #FACC15, #EAB308);border:none;border-radius:8px;color:#000;font-weight:900;font-size:14px;cursor:pointer;transition:all 0.3s}
.btn:hover{transform:translateY(-2px);box-shadow:0 5px 15px rgba(250,204,21,0.3)}
.btn:disabled{opacity:0.5;cursor:not-allowed}

.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;height:100%;overflow-y:auto}
.gallery-item{position:relative;border-radius:10px;overflow:hidden;background:#333;border:1px solid #555;cursor:pointer;transition:0.3s;aspect-ratio:1}
.gallery-item img{width:100%;height:100%;object-fit:cover;display:block}
.gallery-item:hover{transform:scale(1.05);border-color:#FACC15;box-shadow:0 0 15px rgba(250,204,21,0.2)}

.loading{text-align:center;padding:40px 20px;color:#FACC15}
.spinner{border:3px solid rgba(250,204,21,0.2);border-top:3px solid #FACC15;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 15px}
@keyframes spin{to{transform:rotate(360deg)}}

.toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#ef4444;color:white;padding:12px 24px;border-radius:8px;display:none;z-index:100;font-weight:600}
.toast.success{background:#22c55e}

.history-item{background:#333;border:1px solid #555;border-radius:8px;padding:10px;margin-bottom:8px;cursor:pointer;transition:0.3s}
.history-item:hover{border-color:#FACC15;background:#404040}
.history-time{font-size:10px;color:#888}
.history-prompt{font-size:12px;color:#fff;margin:5px 0;word-break:break-all}
.history-meta{font-size:10px;color:#666}

@media(max-width:1400px){
  .main{grid-template-columns:1fr;gap:15px}
  .left-panel{display:none}
}

@media(max-width:900px){
  .main{grid-template-columns:1fr;gap:15px}
  .right-panel{display:none}
}

@media(max-width:768px){
  .main{grid-template-columns:1fr;gap:15px}
  .mode-tabs{grid-template-columns:1fr}
  .image-previews{grid-template-columns:repeat(2,1fr)}
  .quota-display{flex-direction:column;align-items:flex-start;gap:10px}
}
</style>
</head>
<body>
<div id="toast" class="toast"></div>

<!-- 頂部欄 -->
<div class="top-bar">
<div class="logo-area">
  <span>🍌</span>
  <div>
    <div class="title">NanoBanana Pro</div>
    <div class="subtitle">圖生圖 • 多圖融合 • 專業版 (方案 C)</div>
  </div>
</div>
<div class="quota-display">
  <div class="quota-item">
    <div class="quota-label">📊 今天已用</div>
    <div class="quota-value"><span id="usedQuota">0</span>/20</div>
  </div>
  <div class="quota-item">
    <div class="quota-label">⚡ 剩餘額度</div>
    <div class="quota-value" id="remainingQuota">20</div>
  </div>
  <a href="/" class="nav-btn">← 返回</a>
</div>
</div>

<!-- 主內容 -->
<div class="main">
<!-- 左側：控制面板 -->
<div class="panel" id="leftPanel">
<div class="section-title">⚙️ 生成配置</div>

<form id="genForm">
<!-- 生成模式切換 -->
<div class="form-group">
  <label>🎨 生成模式</label>
  <div class="mode-tabs">
    <button type="button" class="mode-tab active" data-mode="text">📝 文生圖</button>
    <button type="button" class="mode-tab" data-mode="image">🖼️ 圖生圖</button>
    <button type="button" class="mode-tab" data-mode="fusion">🔀 融合</button>
  </div>
  <input type="hidden" id="genMode" value="text">
</div>

<!-- 提示詞 -->
<div class="form-group">
  <label>✍️ 描述 / 修改指令</label>
  <textarea id="prompt" placeholder="例如: Make it more vibrant, change to sunset lighting..." required></textarea>
</div>

<!-- 參考圖上傳 -->
<div class="form-group" id="imageUploadGroup" style="display:none">
  <label>📸 上傳圖片 (最多 3 張)</label>
  <div class="image-upload" id="imageUpload">
    <div class="upload-icon">📤</div>
    <div style="font-size:12px;color:#bbb">點擊或拖放上傳</div>
  </div>
  <input type="file" id="imageInput" accept="image/*" multiple hidden>
  <div class="image-previews" id="previewsContainer"></div>
</div>

<!-- 尺寸 & 風格 -->
<div class="form-group">
  <label>📐 尺寸</label>
  <select id="ratio">
    <option value="1024,1024">方形 1024x1024</option>
    <option value="1080,1920">豎屏 1080x1920</option>
    <option value="1920,1080">寬屏 1920x1080</option>
  </select>
</div>

<div class="form-group">
  <label>🎨 風格</label>
  <select id="style">
    <option value="none">無風格</option>
    <option value="photorealistic">寫實照片</option>
    <option value="anime">日系動漫</option>
    <option value="cyberpunk">賽博龐克</option>
    <option value="oil-painting">油畫</option>
  </select>
</div>

<!-- 參考強度滑塊（圖生圖模式）-->
<div class="form-group" id="strengthGroup" style="display:none">
  <label>💪 參考圖強度</label>
  <div class="slider-group">
    <div class="slider-label">
      <span>弱 (更創意)</span>
      <span class="slider-value" id="strengthValue">0.7</span>
      <span>強 (更接近原圖)</span>
    </div>
    <input type="range" id="strength" min="0.1" max="1" step="0.1" value="0.7">
  </div>
</div>

<!-- 質量模式 -->
<div class="form-group">
  <label>⭐ 質量模式</label>
  <select id="quality">
    <option value="economy">⚡ 經濟 (快速)</option>
    <option value="standard" selected>📊 標準 (推薦)</option>
    <option value="ultra">✨ 超高清</option>
  </select>
</div>

<!-- 批量生成 -->
<div class="form-group">
  <label>📊 一次生成張數</label>
  <div class="preset-buttons">
    <button type="button" class="preset-btn active" data-n="1">1 張</button>
    <button type="button" class="preset-btn" data-n="2">2 張</button>
    <button type="button" class="preset-btn" data-n="4">4 張</button>
  </div>
  <input type="hidden" id="batchSize" value="1">
</div>

<!-- 進階參數 -->
<div class="advanced-toggle" id="advToggle">
  <input type="checkbox" id="advCheckbox">
  <label for="advCheckbox" style="margin:0;cursor:pointer;font-size:12px">🛠️ 進階參數</label>
</div>
<div class="advanced-params" id="advParams">
  <div class="form-group">
    <label>Steps (生成步數)</label>
    <input type="number" id="steps" value="20" min="5" max="50">
  </div>
  <div class="form-group">
    <label>Guidance (引導係數)</label>
    <input type="number" id="guidance" value="7.5" step="0.5" min="1" max="20">
  </div>
</div>

<!-- 提交按鈕 -->
<button type="submit" class="btn" style="margin-top:15px">🍌 立即生成</button>
<button type="button" class="btn" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#ddd;margin-top:10px" id="clearHistoryBtn">🗑️ 清空歷史</button>
</form>
</div>

<!-- 中間：結果預覽 -->
<div class="panel" style="padding:0;display:flex;flex-direction:column">
<div style="padding:20px;border-bottom:1px solid #444;flex-shrink:0">
  <div class="section-title" style="margin:0">📸 結果畫廊</div>
</div>
<div id="resultGallery" class="gallery" style="flex:1">
  <div class="loading">
    <div style="font-size:24px">🍌</div>
    <div style="margin-top:10px">還沒有生成任何圖像</div>
  </div>
</div>
</div>

<!-- 右側：歷史記錄 -->
<div class="panel" id="rightPanel" style="padding:0;display:flex;flex-direction:column">
<div style="padding:20px;border-bottom:1px solid #444;flex-shrink:0;display:flex;justify-content:space-between;align-items:center">
  <div class="section-title" style="margin:0">📚 本地記錄</div>
  <button id="clearAllBtn" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);padding:4px 8px;border-radius:4px;color:#ddd;cursor:pointer;font-size:11px">清空</button>
</div>
<div id="historyList" style="flex:1;overflow-y:auto;padding:10px">
  <div style="text-align:center;padding:20px;color:#666;font-size:12px">暫無記錄</div>
</div>
</div>
</div>

<script>
// ====== IndexedDB 設置 ======
const DB_NAME='NanoBananaProDB',STORE_NAME='images',DB_VERSION=1;
const dbPromise=new Promise((r,j)=>{
  const req=indexedDB.open(DB_NAME,DB_VERSION);
  req.onupgradeneeded=e=>{
    const db=e.target.result;
    if(!db.objectStoreNames.contains(STORE_NAME))db.createObjectStore(STORE_NAME,{keyPath:'id'});
  };
  req.onsuccess=e=>r(e.target.result);
  req.onerror=e=>j(e.target.error);
});

async function saveToDB(item){
  const db=await dbPromise;
  return new Promise(r=>{
    const tx=db.transaction(STORE_NAME,'readwrite');
    tx.objectStore(STORE_NAME).put(item);
    tx.oncomplete=()=>r();
  });
}

async function getHistory(){
  const db=await dbPromise;
  return new Promise(r=>{
    const tx=db.transaction(STORE_NAME,'readonly');
    const req=tx.objectStore(STORE_NAME).getAll();
    req.onsuccess=()=>r((req.result||[]).sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp)));
  });
}

async function clearAllHistory(){
  const db=await dbPromise;
  const tx=db.transaction(STORE_NAME,'readwrite');
  tx.objectStore(STORE_NAME).clear();
  await new Promise(r=>tx.oncomplete=r);
}

// ====== UI 邏輯 ======
const toast=document.getElementById('toast');
function showToast(m,s=false){
  toast.textContent=m;
  toast.className='toast'+(s?' success':'');
  toast.style.display='block';
  setTimeout(()=>toast.style.display='none',3000);
}

// 生成模式切換
const modeTabs=document.querySelectorAll('.mode-tab');
const genModeInput=document.getElementById('genMode');
const imageUploadGroup=document.getElementById('imageUploadGroup');
const strengthGroup=document.getElementById('strengthGroup');

modeTabs.forEach(tab=>{
  tab.addEventListener('click',(e)=>{
    e.preventDefault();
    modeTabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    const mode=tab.dataset.mode;
    genModeInput.value=mode;
    
    if(mode==='text'){
      imageUploadGroup.style.display='none';
      strengthGroup.style.display='none';
    }else if(mode==='image'){
      imageUploadGroup.style.display='block';
      strengthGroup.style.display='block';
    }else if(mode==='fusion'){
      imageUploadGroup.style.display='block';
      strengthGroup.style.display='none';
    }
  });
});

// 圖片上傳處理
const imageUpload=document.getElementById('imageUpload');
const imageInput=document.getElementById('imageInput');
const previewsContainer=document.getElementById('previewsContainer');
let uploadedImages=[];

imageUpload.addEventListener('click',()=>imageInput.click());
imageUpload.addEventListener('dragover',(e)=>{e.preventDefault();imageUpload.classList.add('active');});
imageUpload.addEventListener('dragleave',()=>imageUpload.classList.remove('active'));
imageUpload.addEventListener('drop',(e)=>{
  e.preventDefault();
  imageUpload.classList.remove('active');
  handleFiles(e.dataTransfer.files);
});
imageInput.addEventListener('change',(e)=>handleFiles(e.target.files));

function handleFiles(files){
  uploadedImages=[];
  previewsContainer.innerHTML='';
  Array.from(files).slice(0,3).forEach((file,idx)=>{
    const reader=new FileReader();
    reader.onload=(e)=>{
      const src=e.target.result;
      uploadedImages.push(src);
      const div=document.createElement('div');
      div.className='preview-item';
      div.innerHTML=\\\`<img src="\\\${src}" alt="preview"><button type="button" class="preview-remove" data-idx="\\\${idx}">×</button>\\\`;
      div.querySelector('.preview-remove').addEventListener('click',(ev)=>{
        ev.preventDefault();
        uploadedImages.splice(idx,1);
        div.remove();
      });
      previewsContainer.appendChild(div);
    };
    reader.readAsDataURL(file);
  });
}

// Strength 滑塊
document.getElementById('strength').addEventListener('input',(e)=>{
  document.getElementById('strengthValue').textContent=e.target.value;
});

// 批量大小
document.querySelectorAll('.preset-btn').forEach(btn=>{
  btn.addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelectorAll('.preset-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('batchSize').value=btn.dataset.n;
  });
});

// 進階參數
document.getElementById('advCheckbox').addEventListener('change',(e)=>{
  document.getElementById('advParams').classList.toggle('show',e.target.checked);
});

// 生成邏輯
document.getElementById('genForm').addEventListener('submit',async(e)=>{
  e.preventDefault();
  const prompt=document.getElementById('prompt').value.trim();
  if(!prompt)return showToast('請輸入提示詞！');
  
  const mode=document.getElementById('genMode').value;
  const [w,h]=document.getElementById('ratio').value.split(',').map(Number);
  const style=document.getElementById('style').value;
  const quality=document.getElementById('quality').value;
  const batch=parseInt(document.getElementById('batchSize').value);
  const strength=parseFloat(document.getElementById('strength').value);
  const useAdv=document.getElementById('advCheckbox').checked;
  
  const btn=document.querySelector('button[type="submit"]');
  btn.disabled=true;
  document.getElementById('resultGallery').innerHTML=\\\`<div class="loading" style="grid-column:1/-1"><div class="spinner"></div><div>生成中 (\\\${batch} 張)...</div></div>\\\`;
  
  try{
    for(let i=0;i<batch;i++){
      const res=await fetch('/_internal/generate',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'X-Source':'nano-page'
        },
        body:JSON.stringify({
          prompt,model:'nano-banana',width:w,height:h,style,quality_mode:quality,
          seed:-1,auto_optimize:!useAdv,
          generation_mode:mode,
          reference_images:uploadedImages.length>0?uploadedImages:[],
          reference_strength:strength,
          steps:useAdv?parseInt(document.getElementById('steps').value):null,
          guidance_scale:useAdv?parseFloat(document.getElementById('guidance').value):null,
          nologo:true
        })
      });
      
      if(res.status===429){
        const err=await res.json();
        throw new Error(err.error.message);
      }
      if(!res.ok)throw new Error('生成失敗');
      
      const blob=await res.blob();
      const url=URL.createObjectURL(blob);
      const genMode=res.headers.get('X-Generation-Mode')||mode;
      const item={
        id:Date.now()+Math.random(),
        timestamp:new Date().toISOString(),
        prompt,style,mode:genMode,
        blobUrl:url,
        seed:res.headers.get('X-Seed')||'-1',
        base64:await new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result);f.readAsDataURL(blob);})
      };
      await saveToDB(item);
      
      if(document.querySelector('.loading')){
        document.getElementById('resultGallery').innerHTML='';
      }
      
      const div=document.createElement('div');
      div.className='gallery-item';
      div.innerHTML=\\\`<img src="\\\${url}" alt="result">\\\`;
      div.addEventListener('click',()=>{
        const a=document.createElement('a');
        a.href=url;
        a.download='nano-\\\${item.id}.png';
        a.click();
      });
      document.getElementById('resultGallery').insertBefore(div,document.getElementById('resultGallery').firstChild);
    }
    
    updateQuotaDisplay();
    renderHistory();
    showToast('✅ 生成完成！',true);
  }catch(err){
    showToast('❌ '+err.message);
  }finally{
    btn.disabled=false;
  }
});

// 配額顯示
function updateQuotaDisplay(){
  const used=parseInt(document.getElementById('usedQuota').textContent)||0;
  document.getElementById('usedQuota').textContent=used+1;
  document.getElementById('remainingQuota').textContent=Math.max(0,20-(used+1));
}

// 歷史記錄渲染
async function renderHistory(){
  const history=await getHistory();
  const list=document.getElementById('historyList');
  if(history.length===0){
    list.innerHTML='<div style="text-align:center;padding:20px;color:#666;font-size:12px">暫無記錄</div>';
    return;
  }
  list.innerHTML=history.map(item=>\\\`
    <div class="history-item" onclick="copyPrompt(this)">
      <div class="history-time">\\\${item.timestamp.slice(5,16)}</div>
      <div class="history-prompt">\\\${item.prompt.slice(0,50)}...</div>
      <div class="history-meta">\\\${item.mode} • \\\${item.style}</div>
    </div>
  \\\`).join('');
}

function copyPrompt(el){
  const prompt=el.querySelector('.history-prompt').textContent;
  navigator.clipboard.writeText(prompt).then(()=>showToast('✅ 已複製',true));
}

document.getElementById('clearAllBtn').addEventListener('click',async()=>{
  if(confirm('確定要清空所有記錄？')){
    await clearAllHistory();
    renderHistory();
    showToast('✅ 已清空',true);
  }
});

window.addEventListener('load',()=>{
  updateQuotaDisplay();
  renderHistory();
});
</script>
</body>
</html>\`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}

function handleUI() {
  const authStatus = CONFIG.POLLINATIONS_AUTH.enabled ? '<span style="color:#22c55e;font-weight:600;font-size:12px">🔐 已認證</span>' : '<span style="color:#f59e0b;font-weight:600;font-size:12px">⚠️ 需要 API Key</span>';
  
  // 生成樣式選單 HTML
  const styleCategories = CONFIG.STYLE_CATEGORIES;
  const stylePresets = CONFIG.STYLE_PRESETS;
  let styleOptionsHTML = '';
  const sortedCategories = Object.entries(styleCategories).sort((a, b) => a[1].order - b[1].order);
  for (const [categoryKey, categoryInfo] of sortedCategories) {
    const stylesInCategory = Object.entries(stylePresets).filter(([key, style]) => style.category === categoryKey);
    if (stylesInCategory.length > 0) {
      styleOptionsHTML += `<optgroup label="${categoryInfo.icon} ${categoryInfo.name}">`;
      for (const [styleKey, styleConfig] of stylesInCategory) {
        const selected = styleKey === 'none' ? ' selected' : '';
        styleOptionsHTML += `<option value="${styleKey}"${selected}>${styleConfig.icon} ${styleConfig.name}</option>`;
      }
      styleOptionsHTML += '</optgroup>';
    }
  }
  
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>">
<style>
/* 主頁 CSS 省略 - 保持原樣 */
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%);color:#fff;min-height:100vh}
.container{max-width:100%;margin:0;padding:0;height:100vh;display:flex;flex-direction:column}
.top-nav{background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.1);padding:15px 25px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
.nav-left{display:flex;align-items:center;gap:20px}
.logo{color:#f59e0b;font-size:24px;font-weight:800;text-shadow:0 0 20px rgba(245,158,11,0.6);display:flex;align-items:center;gap:10px}
.badge{background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600}
.nav-menu{display:flex;gap:10px;align-items:center}
.nav-btn{padding:8px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#9ca3af;cursor:pointer;font-size:14px;font-weight:600;transition:all 0.3s;display:flex;align-items:center;gap:6px;text-decoration:none}
.nav-btn:hover{border-color:#f59e0b;color:#fff}
.nav-btn.active{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;border-color:#f59e0b}
.nav-btn.nano-btn:hover {border-color: #FACC15; background: rgba(250, 204, 21, 0.1); color: #FACC15; box-shadow: 0 0 10px rgba(250, 204, 21, 0.2);}
.lang-btn{padding:6px 10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#ccc;cursor:pointer;font-size:12px;margin-left:10px}
.main-content{flex:1;display:flex;overflow:hidden}
.left-panel{width:320px;background:rgba(255,255,255,0.03);border-right:1px solid rgba(255,255,255,0.1);overflow-y:auto;padding:20px;flex-shrink:0}
.center-panel{flex:1;padding:20px;overflow-y:auto}
.right-panel{width:380px;background:rgba(255,255,255,0.03);border-left:1px solid rgba(255,255,255,0.1);overflow-y:auto;padding:20px;flex-shrink:0}
@media(max-width:1024px){.main-content{flex-direction:column}.left-panel,.right-panel{width:100%;border:none;border-bottom:1px solid rgba(255,255,255,0.1)}}
.page{display:none}
.page.active{display:block}
.page.active .main-content{display:flex}
.form-group{margin-bottom:16px}
label{display:block;margin-bottom:6px;font-weight:600;font-size:13px;color:#e5e7eb}
input,textarea,select{width:100%;padding:10px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;font-size:13px;transition:all 0.3s}
input:focus,textarea:focus,select:focus{outline:none;border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.1)}
select{background-color:#1e293b!important;color:#e2e8f0!important;cursor:pointer}
.btn{padding:12px 24px;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;gap:8px;justify-content:center;width:100%}
.btn-primary{background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;box-shadow:0 4px 15px rgba(245,158,11,0.3)}
.btn-primary:disabled{opacity:0.5;cursor:not-allowed}
.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
.gallery-item{background:rgba(0,0,0,0.4);border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);transition:all 0.3s}
.gallery-item img{width:100%;height:280px;object-fit:cover;display:block;cursor:pointer}
.gallery-info{padding:15px}
.gallery-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:5px}
.model-badge,.seed-badge,.style-badge{padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.1)}
.gallery-actions{display:flex;gap:8px;margin-top:10px}
.action-btn{padding:6px 12px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:6px;font-size:12px;color:#fff;cursor:pointer;flex:1}
.action-btn:hover{background:rgba(255,255,255,0.2)}
.loading{text-align:center;padding:60px 20px;color:#9ca3af}
.spinner{border:3px solid rgba(255,255,255,0.1);border-top:3px solid #f59e0b;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 15px}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.history-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px}
.history-stats{display:flex;gap:20px;font-size:14px}
.modal{display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.9);align-items:center;justify-content:center}
.modal.show{display:flex}
.modal-content img{max-width:90vw;max-height:90vh;border-radius:8px}
.modal-close{position:absolute;top:20px;right:20px;color:#fff;font-size:32px;cursor:pointer}
</style>
</head>
<body>
<div class="container">
<div class="top-nav">
    <div class="nav-left">
        <div class="logo">🎨 Flux AI Pro <span class="badge">v${CONFIG.PROJECT_VERSION}</span></div>
        <div><div class="api-status">${authStatus}</div></div>
    </div>
    <div class="nav-menu">
        <a href="/nano" target="_blank" class="nav-btn nano-btn" style="border-color:rgba(250,204,21,0.5);color:#FACC15;margin-right:5px">
            🍌 Nano版
        </a>
        <button class="nav-btn active" data-page="generate"><span data-t="nav_gen">🎨 生成圖像</span></button>
        <button class="nav-btn" data-page="history"><span data-t="nav_his">📚 歷史記錄</span> <span id="historyCount" style="background:rgba(245,158,11,0.2);padding:2px 8px;border-radius:10px;font-size:11px">0</span></button>
        <button class="lang-btn" id="langSwitch">EN / 繁中</button>
    </div>
</div>
<div id="generatePage" class="page active">
<div class="main-content">
<div class="left-panel">
<div class="section-title" data-t="settings_title">⚙️ 生成參數</div>
<form id="generateForm">
<div class="form-group">
    <label data-t="model_label">模型選擇</label>
    <select id="model">
        <optgroup label="🤖 GPT-Image Series">
        <option value="gptimage" selected>GPT-Image 🎨</option>
        <option value="gptimage-large">GPT-Image Large 🌟</option>
        </optgroup>
        <optgroup label="⚡ Z-Image Series">
        <option value="zimage">Z-Image Turbo ⚡ (6B)</option>
        </optgroup>
        <optgroup label="🎨 Flux Series">
        <option value="flux">Flux Standard</option>
        <option value="turbo">Flux Turbo ⚡</option>
        </optgroup>
        <optgroup label="🖼️ Kontext Series">
        <option value="kontext">Kontext 🎨 (Img2Img)</option>
        </optgroup>
    </select>
</div>
<div class="form-group"><label data-t="size_label">尺寸預設</label><select id="size"><option value="square-1k" selected>Square 1024x1024</option><option value="square-1.5k">Square 1536x1536</option><option value="portrait-9-16-hd">Portrait 1080x1920</option><option value="landscape-16-9-hd">Landscape 1920x1080</option></select></div>
<div class="form-group"><label data-t="style_label">藝術風格 🎨</label><select id="style">${styleOptionsHTML}</select></div>
<div class="form-group"><label data-t="quality_label">質量模式</label><select id="qualityMode"><option value="economy">Economy</option><option value="standard" selected>Standard</option><option value="ultra">Ultra HD</option></select></div>

<div class="form-group">
    <label data-t="seed_label">Seed (種子碼)</label>
    <div style="display:flex; gap:10px;">
        <input type="number" id="seed" value="-1" placeholder="Random (-1)" disabled style="flex:1; opacity: 0.7; cursor: not-allowed; font-family: monospace;">
        <button type="button" id="seedToggleBtn" class="btn" style="width:auto; padding:0 15px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);">🎲</button>
    </div>
</div>

<div class="form-group" style="background:rgba(255,255,255,0.05); padding:10px; border-radius:8px; margin-top:15px;">
    <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
            <label for="autoOptimize" style="margin:0; cursor:pointer;" data-t="auto_opt_label">✨ 自動優化</label>
            <div style="font-size:11px; color:#9ca3af; margin-top:2px;" data-t="auto_opt_desc">自動調整 Steps 與 Guidance</div>
        </div>
        <input type="checkbox" id="autoOptimize" checked style="width:auto; width:20px; height:20px; cursor:pointer;">
    </div>
    
    <div id="advancedParams" style="display:none; margin-top:15px; border-top:1px solid rgba(255,255,255,0.1); padding-top:15px;">
        <div style="font-size:12px; color:#f59e0b; margin-bottom:10px; font-weight:bold;" data-t="adv_settings">🛠️ 進階參數</div>
        
        <div class="form-group">
            <label data-t="steps_label">生成步數 (Steps)</label>
            <input type="number" id="steps" value="25" min="1" max="50">
        </div>
        
        <div class="form-group">
            <label data-t="guidance_label">引導係數 (Guidance)</label>
            <input type="number" id="guidanceScale" value="7.5" step="0.1" min="1" max="20">
        </div>
    </div>
</div>

<button type="submit" class="btn btn-primary" id="generateBtn" data-t="gen_btn" style="margin-top:10px;">🎨 開始生成</button>
</form>
</div>
<div class="center-panel">
<div id="results"><div class="empty-state"><p data-t="empty_title">尚未生成任何圖像</p></div></div>
</div>
<div class="right-panel">
<div class="form-group"><label data-t="pos_prompt">正面提示詞</label><textarea id="prompt" placeholder="Describe your image..." required></textarea></div>
<div class="form-group"><label data-t="neg_prompt">負面提示詞 (可選)</label><textarea id="negativePrompt" placeholder="What to avoid..." rows="4"></textarea></div>
<div class="form-group"><label data-t="ref_img">參考圖像 URL (Kontext 專用)</label><textarea id="referenceImages" placeholder="Image URLs separated by comma" rows="3"></textarea></div>
</div></div></div>
<div id="historyPage" class="page">
<div class="main-content" style="flex-direction:column;padding:20px">
<div class="history-header">
<div class="history-stats"><div class="stat-item"><div class="label" data-t="stat_total">📊 總記錄數</div><div class="value" id="historyTotal">0</div></div><div class="stat-item"><div class="label" data-t="stat_storage">💾 存儲空間 (永久)</div><div class="value" id="storageSize">0 KB</div></div></div>
<div class="history-actions"><button class="btn btn-secondary" id="exportBtn" style="width:auto;padding:10px 20px" data-t="btn_export">📥 導出</button><button class="btn btn-danger" id="clearBtn" style="width:auto;padding:10px 20px" data-t="btn_clear">🗑️ 清空</button></div>
</div>
<div id="historyList" style="padding:0 20px"><p>Loading history...</p></div>
</div></div>
<div id="imageModal" class="modal"><span class="modal-close" id="modalCloseBtn">×</span><div class="modal-content"><img id="modalImage" src=""></div></div>
<script>
// ====== IndexedDB 管理核心 (解決死圖) ======
const DB_NAME='FluxAI_DB',STORE_NAME='images',DB_VERSION=1;
const dbPromise=new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,DB_VERSION);
    req.onupgradeneeded=(e)=>{
        const db=e.target.result;
        if(!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME,{keyPath:'id'});
    };
    req.onsuccess=(e)=>resolve(e.target.result);
    req.onerror=(e)=>reject(e.target.error);
});
async function saveToDB(item){
    const db=await dbPromise;
    return new Promise((resolve)=>{
        const tx=db.transaction(STORE_NAME,'readwrite');
        const store=tx.objectStore(STORE_NAME);
        store.put(item);
        tx.oncomplete=()=>resolve();
    });
}
async function getHistoryFromDB(){
    const db=await dbPromise;
    return new Promise((resolve)=>{
        const tx=db.transaction(STORE_NAME,'readonly');
        const store=tx.objectStore(STORE_NAME);
        const req=store.getAll();
        req.onsuccess=()=>resolve((req.result||[]).sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp)));
    });
}
async function deleteFromDB(id){
    const db=await dbPromise;
    const tx=db.transaction(STORE_NAME,'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    await new Promise(r=>tx.oncomplete=r);
    updateHistoryDisplay();
}
async function clearDB(){
    const db=await dbPromise;
    const tx=db.transaction(STORE_NAME,'readwrite');
    tx.objectStore(STORE_NAME).clear();
    await new Promise(r=>tx.oncomplete=r);
    updateHistoryDisplay();
}

// ====== I18N 與 UI 邏輯 ======
const I18N={
    zh:{
        nav_gen:"🎨 生成圖像", nav_his:"📚 歷史記錄", settings_title:"⚙️ 生成參數", model_label:"模型選擇", size_label:"尺寸預設", style_label:"藝術風格 🎨", quality_label:"質量模式", seed_label:"Seed (種子碼)", seed_random:"🎲 隨機", seed_lock:"🔒 鎖定", auto_opt_label:"✨ 自動優化", auto_opt_desc:"自動調整 Steps 與 Guidance", adv_settings:"🛠️ 進階參數", steps_label:"生成步數 (Steps)", guidance_label:"引導係數 (Guidance)", gen_btn:"🎨 開始生成", empty_title:"尚未生成任何圖像", pos_prompt:"正面提示詞", neg_prompt:"負面提示詞 (可選)", ref_img:"參考圖像 URL (Kontext 專用)", stat_total:"📊 總記錄數", stat_storage:"💾 存儲空間 (永久)", btn_export:"📥 導出", btn_clear:"🗑️ 清空", no_history:"暫無歷史記錄", btn_reuse:"🔄 重用", btn_dl:"💾 下載"
    },
    en:{
        nav_gen:"🎨 Create", nav_his:"📚 History", settings_title:"⚙️ Settings", model_label:"Model", size_label:"Size", style_label:"Art Style 🎨", quality_label:"Quality", seed_label:"Seed", seed_random:"🎲 Random", seed_lock:"🔒 Lock", auto_opt_label:"✨ Auto Optimize", auto_opt_desc:"Auto adjust Steps & Guidance", adv_settings:"🛠️ Advanced", steps_label:"Steps", guidance_label:"Guidance Scale", gen_btn:"🎨 Generate", empty_title:"No images yet", pos_prompt:"Positive Prompt", neg_prompt:"Negative Prompt", ref_img:"Reference Image URL", stat_total:"📊 Total", stat_storage:"💾 Storage", btn_export:"📥 Export", btn_clear:"🗑️ Clear", no_history:"No history found", btn_reuse:"🔄 Reuse", btn_dl:"💾 Save"
    }
};
let curLang='zh';
function toggleLang(){curLang=curLang==='zh'?'en':'zh';updateLang();}
function updateLang(){
    document.querySelectorAll('[data-t]').forEach(el=>{const k=el.getAttribute('data-t');if(I18N[curLang][k])el.textContent=I18N[curLang][k];});
    const seedToggleBtn = document.getElementById('seedToggleBtn');
    if(seedToggleBtn && isSeedRandom !== undefined) {
        seedToggleBtn.innerHTML = isSeedRandom ? I18N[curLang].seed_random : I18N[curLang].seed_lock;
    }
}
document.getElementById('langSwitch').onclick=toggleLang;

// 頁面切換 (排除 Nano 按鈕)
document.querySelectorAll('.nav-btn:not(.nano-btn)').forEach(btn=>{
    btn.addEventListener('click',function(){
        const p=this.dataset.page;
        if(!p) return;
        document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(x=>x.classList.remove('active'));
        document.getElementById(p+'Page').classList.add('active');
        this.classList.add('active');
        if(p==='history') updateHistoryDisplay();
    });
});

// Seed Toggle 與 Auto Optimize 邏輯
const seedInput = document.getElementById('seed');
const seedToggleBtn = document.getElementById('seedToggleBtn');
const autoOptCheckbox = document.getElementById('autoOptimize');
const advParamsDiv = document.getElementById('advancedParams');
let isSeedRandom = true;

function updateSeedUI() {
    if (isSeedRandom) {
        seedInput.value = '-1';
        seedInput.disabled = true;
        seedInput.style.opacity = '0.7';
        seedInput.style.cursor = 'not-allowed';
        seedToggleBtn.innerHTML = I18N[curLang].seed_random;
        seedToggleBtn.classList.remove('active');
        seedToggleBtn.style.background = 'rgba(255,255,255,0.1)';
        seedToggleBtn.style.color = '#fff';
    } else {
        if(seedInput.value === '-1') seedInput.value = Math.floor(Math.random() * 1000000);
        seedInput.disabled = false;
        seedInput.style.opacity = '1';
        seedInput.style.cursor = 'text';
        seedToggleBtn.innerHTML = I18N[curLang].seed_lock;
        seedToggleBtn.classList.add('active');
        seedToggleBtn.style.background = '#f59e0b';
        seedToggleBtn.style.color = '#000';
    }
}

seedToggleBtn.addEventListener('click', () => { isSeedRandom = !isSeedRandom; updateSeedUI(); });
autoOptCheckbox.addEventListener('change', () => { advParamsDiv.style.display = autoOptCheckbox.checked ? 'none' : 'block'; });

// 生成與歷史記錄處理
const PRESET_SIZES=\${JSON.stringify(CONFIG.PRESET_SIZES)};
const STYLE_PRESETS=\${JSON.stringify(CONFIG.STYLE_PRESETS)};

async function addToHistory(item){
    let base64Data = item.image;
    if(!base64Data && item.url){
        try{
            const resp = await fetch(item.url);
            const blob = await resp.blob();
            base64Data = await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.readAsDataURL(blob);});
        }catch(e){console.error("Image convert failed",e);}
    }
    const record={
        id: Date.now()+Math.random(), timestamp: new Date().toISOString(), prompt: item.prompt, model: item.model, style: item.style, seed: item.seed, base64: base64Data || item.url
    };
    await saveToDB(record);
}

async function updateHistoryDisplay(){
    const history = await getHistoryFromDB();
    const list = document.getElementById('historyList');
    document.getElementById('historyCount').textContent=history.length;
    document.getElementById('historyTotal').textContent=history.length;
    const size = JSON.stringify(history).length;
    document.getElementById('storageSize').textContent = (size/1024/1024).toFixed(2)+' MB';

    if(history.length===0){ list.innerHTML='<div class="empty-state"><p>'+I18N[curLang].no_history+'</p></div>'; return; }
    const div=document.createElement('div');div.className='gallery';
    history.forEach(item=>{
        const imgSrc = item.base64 || item.url;
        const d=document.createElement('div'); d.className='gallery-item';
        d.innerHTML=\`<img src="\${imgSrc}" loading="lazy"><div class="gallery-info"><div class="gallery-meta"><span class="model-badge">\${item.model}</span><span class="seed-badge">#\${item.seed}</span></div><div class="gallery-actions"><button class="action-btn reuse-btn">\${I18N[curLang].btn_reuse}</button><button class="action-btn download-btn">\${I18N[curLang].btn_dl}</button><button class="action-btn delete delete-btn">🗑️</button></div></div>\`;
        d.querySelector('img').onclick=()=>openModal(imgSrc);
        d.querySelector('.reuse-btn').onclick=()=>{
            document.getElementById('prompt').value=item.prompt||'';
            document.getElementById('model').value=item.model||'gptimage';
            document.getElementById('style').value=item.style||'none';
            const savedSeed = item.seed;
            if (savedSeed && savedSeed !== -1 && savedSeed !== '-1') { isSeedRandom = false; seedInput.value = savedSeed; } else { isSeedRandom = true; seedInput.value = '-1'; }
            updateSeedUI();
            document.querySelector('[data-page="generate"]').click();
        };
        d.querySelector('.download-btn').onclick=()=>{const a=document.createElement('a');a.href=imgSrc;a.download='flux-'+item.seed+'.png';a.click();};
        d.querySelector('.delete-btn').onclick=()=>deleteFromDB(item.id);
        div.appendChild(d);
    });
    list.innerHTML=''; list.appendChild(div);
}

function openModal(src){document.getElementById('modalImage').src=src;document.getElementById('imageModal').classList.add('show');}
document.getElementById('modalCloseBtn').onclick=()=>document.getElementById('imageModal').classList.remove('show');
document.getElementById('clearBtn').onclick=()=>{if(confirm('Clear all history?'))clearDB();};
document.getElementById('exportBtn').onclick=async()=>{
    const history=await getHistoryFromDB();
    const blob=new Blob([JSON.stringify(history,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='flux-history.json';a.click();
};

document.getElementById('generateForm').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const btn=document.getElementById('generateBtn');
    const prompt=document.getElementById('prompt').value;
    const resDiv=document.getElementById('results');
    const sizeConfig=PRESET_SIZES[document.getElementById('size').value];
    
    if(!prompt)return;
    btn.disabled=true; btn.textContent=curLang==='zh'?'生成中...':'Generating...';
    resDiv.innerHTML='<div class="loading"><div class="spinner"></div></div>';
    
    const currentSeed = isSeedRandom ? -1 : parseInt(seedInput.value);
    const isAutoOpt = autoOptCheckbox.checked;

    try{
        const res=await fetch('/_internal/generate',{
            method:'POST', headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                prompt, model:document.getElementById('model').value, width:sizeConfig.width, height:sizeConfig.height,
                style:document.getElementById('style').value, quality_mode:document.getElementById('qualityMode').value,
                seed: currentSeed, auto_optimize: isAutoOpt,
                steps: isAutoOpt ? null : parseInt(document.getElementById('steps').value),
                guidance_scale: isAutoOpt ? null : parseFloat(document.getElementById('guidanceScale').value),
                negative_prompt:document.getElementById('negativePrompt').value,
                reference_images:document.getElementById('referenceImages').value.split(',').filter(u=>u.trim())
            })
        });
        
        let items=[];
        const contentType=res.headers.get('content-type');
        if(contentType&&contentType.startsWith('image/')){
            const blob=await res.blob();
            const reader=new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend=async()=>{
                const base64=reader.result;
                const realSeed = res.headers.get('X-Seed');
                const item={ image:base64, prompt, model:res.headers.get('X-Model'), seed: realSeed, style:res.headers.get('X-Style') };
                await addToHistory(item);
                displayResult([item]);
            };
        }else{
            const data=await res.json();
            if(data.error) throw new Error(data.error.message);
            for(const d of data.data){ const item={...d, prompt}; await addToHistory(item); items.push(item); }
            displayResult(items);
        }
    }catch(err){ resDiv.innerHTML='<p style="color:red;text-align:center">'+err.message+'</p>'; }
    finally{ btn.disabled=false; btn.textContent=I18N[curLang].gen_btn; }
});

function displayResult(items){
    const div=document.createElement('div');div.className='gallery';
    items.forEach(item=>{
        const d=document.createElement('div');d.className='gallery-item';
        d.innerHTML=\`<img src="\${item.image||item.url}" onclick="openModal(this.src)">\`;
        div.appendChild(d);
    });
    document.getElementById('results').innerHTML='';
    document.getElementById('results').appendChild(div);
}

window.onload=()=>{
    updateLang();
    updateHistoryDisplay();
};
</script>
</body>
</html>\`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}
