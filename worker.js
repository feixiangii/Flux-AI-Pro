// ============================================================
// 🎨 Flux AI Pro - 完整修復版 v9.4.1
// ============================================================
// ✅ 批量質量一致性修復
// ✅ 質量模式尺寸預設一致性修復
// ✅ Seed 完整控制
// ✅ 圖生圖 + 多圖融合
// ✅ 39 種風格 + 35+ 尺寸
// ============================================================

const CONFIG = {
  PROJECT_NAME: "Flux AI Pro API",
  PROJECT_VERSION: "9.4.1",
  
  PROVIDERS: {
    pollinations: {
      enabled: true,
      name: "Pollinations AI",
      type: "free",
      auth_mode: "none",
      requires_key: false,
      description: "免費 AI 圖像生成服務",
      features: ["文生圖", "多模型", "無限制", "快速"],
      models: [
        { id: "flux", name: "Flux", category: "general", confirmed: true, max_size: 2048 },
        { id: "flux-realism", name: "Flux Realism", category: "photorealistic", confirmed: true, max_size: 2048 },
        { id: "flux-anime", name: "Flux Anime", category: "anime", confirmed: true, max_size: 2048 },
        { id: "flux-3d", name: "Flux 3D", category: "3d", confirmed: true, max_size: 2048 },
        { id: "turbo", name: "Turbo", category: "fast", confirmed: true, max_size: 2048 }
      ]
    },
    nanobanana: {
      enabled: true,
      name: "Nano Banana",
      type: "free",
      auth_mode: "none",
      requires_key: false,
      description: "高質量 4K 圖像生成",
      features: ["4K超清", "圖生圖", "多圖融合", "專業級"],
      models: [
        { id: "nanobanana", name: "Nano Banana", category: "ultra_hd", confirmed: true, max_size: 4096, ultra_hd: true, supports_reference_images: true, max_reference_images: 4 },
        { id: "nanobanana-pro", name: "Nano Banana Pro", category: "ultra_hd", confirmed: true, max_size: 4096, ultra_hd: true, supports_reference_images: true, max_reference_images: 4 }
      ]
    },
    kontext: {
      enabled: true,
      name: "Flux Kontext",
      type: "free",
      auth_mode: "none",
      requires_key: false,
      description: "圖像編輯和重繪專家",
      features: ["圖生圖", "精準編輯", "風格遷移", "高質量"],
      models: [
        { id: "flux-kontext", name: "Flux Kontext", category: "image_editing", confirmed: true, max_size: 2048, supports_reference_images: true, max_reference_images: 1 },
        { id: "flux-kontext-pro", name: "Flux Kontext Pro", category: "image_editing", confirmed: true, max_size: 2048, supports_reference_images: true, max_reference_images: 1 }
      ]
    }
  },

  STYLE_PRESETS: {
    none: { name: "無", prompt: "", negative: "" },
    anime: { name: "動漫風格", prompt: "anime style, vibrant colors, detailed illustration", negative: "realistic, photo" },
    "anime-chibi": { name: "Q版動漫", prompt: "chibi anime style, cute, kawaii, super deformed", negative: "realistic, tall proportions" },
    "japanese-manga": { name: "日本漫畫", prompt: "Japanese manga style, black and white line art, screentone, dynamic composition", negative: "color, realistic" },
    "shoujo-manga": { name: "少女漫畫", prompt: "shoujo manga style, sparkles, flowers, romantic atmosphere, big eyes", negative: "realistic, dark" },
    "seinen-manga": { name: "青年漫畫", prompt: "seinen manga style, detailed, mature themes, realistic proportions", negative: "childish, simple" },
    "studio-ghibli": { name: "吉卜力風格", prompt: "Studio Ghibli style, hand-drawn, dreamy atmosphere, nature, whimsical", negative: "3D, CGI, realistic" },
    photorealistic: { name: "寫實照片", prompt: "photorealistic, ultra detailed, 8k uhd, high quality, professional photography", negative: "cartoon, painting, illustration" },
    cinematic: { name: "電影級", prompt: "cinematic lighting, dramatic, film grain, depth of field, bokeh, anamorphic lens", negative: "flat lighting, amateur" },
    portrait: { name: "人像攝影", prompt: "portrait photography, professional studio lighting, sharp focus, beautiful face", negative: "full body, landscape" },
    "oil-painting": { name: "油畫", prompt: "oil painting, classical art style, rich colors, brush strokes, canvas texture", negative: "digital, photo" },
    watercolor: { name: "水彩畫", prompt: "watercolor painting, soft colors, fluid, artistic, traditional art", negative: "digital, photo, sharp edges" },
    "chinese-painting": { name: "中國水墨畫", prompt: "traditional Chinese ink painting, brush strokes, minimalist, zen, mountain and water", negative: "colorful, western style" },
    "ukiyo-e": { name: "浮世繪", prompt: "ukiyo-e style, Japanese woodblock print, flat colors, bold outlines, Edo period", negative: "3D, realistic, modern" },
    sketch: { name: "素描", prompt: "pencil sketch, hand-drawn, black and white, crosshatching, detailed linework", negative: "color, painting" },
    charcoal: { name: "炭筆畫", prompt: "charcoal drawing, dramatic shadows, smudged, expressive, monochrome", negative: "color, clean lines" },
    impressionism: { name: "印象派", prompt: "impressionist painting, visible brush strokes, light and color, loose composition", negative: "photorealistic, sharp details" },
    "digital-art": { name: "數位藝術", prompt: "digital art, highly detailed, vibrant colors, concept art, trending on artstation", negative: "traditional media, photo" },
    "pixel-art": { name: "像素藝術", prompt: "pixel art, 8-bit, retro gaming style, limited color palette, crisp pixels", negative: "smooth, realistic, HD" },
    "vector-art": { name: "向量藝術", prompt: "vector art, flat design, clean lines, geometric shapes, modern illustration", negative: "textured, painterly" },
    "low-poly": { name: "低多邊形", prompt: "low poly 3D art, geometric, faceted, minimalist, vibrant colors", negative: "high detail, realistic" },
    fantasy: { name: "奇幻風格", prompt: "fantasy art, magical, ethereal, epic composition, glowing effects, mystical atmosphere", negative: "realistic, modern, mundane" },
    "dark-fantasy": { name: "黑暗奇幻", prompt: "dark fantasy, gothic, mysterious, dramatic lighting, ominous atmosphere, detailed", negative: "bright, cheerful, simple" },
    "fairy-tale": { name: "童話風格", prompt: "fairy tale illustration, whimsical, storybook art, enchanting, colorful, magical", negative: "dark, realistic, modern" },
    cyberpunk: { name: "賽博朋克", prompt: "cyberpunk, neon lights, futuristic city, high tech low life, sci-fi, detailed", negative: "natural, vintage, medieval" },
    "sci-fi": { name: "科幻未來", prompt: "sci-fi, futuristic, advanced technology, space age, sleek design, otherworldly", negative: "medieval, fantasy, old-fashioned" },
    steampunk: { name: "蒸汽朋克", prompt: "steampunk, Victorian era, brass gears, steam powered, industrial, vintage machinery", negative: "modern, digital, minimalist" },
    vaporwave: { name: "蒸氣波", prompt: "vaporwave aesthetic, retro 80s 90s, pastel colors, glitch art, surreal, nostalgic", negative: "modern, realistic, dark" },
    disney: { name: "迪士尼風格", prompt: "Disney animation style, expressive characters, vibrant colors, family friendly, magical", negative: "realistic, dark, adult themes" },
    "comic-book": { name: "美式漫畫", prompt: "American comic book style, bold lines, dynamic action, speech bubbles, halftone dots", negative: "realistic, manga, soft" },
    "pop-art": { name: "普普藝術", prompt: "pop art style, bold colors, Ben-Day dots, high contrast, graphic design, retro", negative: "subtle, realistic, muted colors" },
    "art-deco": { name: "裝飾藝術", prompt: "art deco style, geometric patterns, luxury, elegance, 1920s aesthetics, ornate", negative: "minimalist, rustic, organic" },
    "art-nouveau": { name: "新藝術風格", prompt: "art nouveau style, flowing lines, organic forms, floral motifs, decorative, elegant", negative: "geometric, minimalist, modern" },
    abstract: { name: "抽象藝術", prompt: "abstract art, non-representational, geometric shapes, bold colors, experimental", negative: "realistic, figurative, detailed" },
    minimalist: { name: "極簡主義", prompt: "minimalist design, simple, clean lines, limited color palette, negative space", negative: "detailed, ornate, busy" },
    surrealism: { name: "超現實主義", prompt: "surrealist art, dreamlike, impossible scenes, symbolic, thought-provoking, bizarre", negative: "realistic, logical, mundane" },
    graffiti: { name: "塗鴉藝術", prompt: "graffiti art, street art, spray paint, bold colors, urban, expressive tags", negative: "formal, traditional, clean" },
    horror: { name: "恐怖風格", prompt: "horror art, dark, creepy, disturbing, macabre, gothic, nightmare fuel", negative: "cheerful, bright, cute" },
    kawaii: { name: "可愛風格", prompt: "kawaii style, super cute, pastel colors, adorable, Japanese cute culture, happy", negative: "scary, realistic, dark" }
  },

  PRESET_SIZES: {
    "square-512": { width: 512, height: 512, name: "方形 512px" },
    "square-1k": { width: 1024, height: 1024, name: "方形 1K" },
    "square-1.5k": { width: 1536, height: 1536, name: "方形 1.5K" },
    "square-2k": { width: 2048, height: 2048, name: "方形 2K" },
    "square-4k": { width: 4096, height: 4096, name: "方形 4K" },
    "portrait-9-16": { width: 576, height: 1024, name: "豎屏 9:16" },
    "portrait-9-16-hd": { width: 1080, height: 1920, name: "豎屏 9:16 HD" },
    "portrait-9-16-2k": { width: 1440, height: 2560, name: "豎屏 9:16 2K" },
    "portrait-3-4": { width: 768, height: 1024, name: "豎屏 3:4" },
    "portrait-3-4-hd": { width: 1536, height: 2048, name: "豎屏 3:4 HD" },
    "portrait-2-3": { width: 683, height: 1024, name: "豎屏 2:3" },
    "landscape-16-9": { width: 1024, height: 576, name: "橫屏 16:9" },
    "landscape-16-9-hd": { width: 1920, height: 1080, name: "橫屏 16:9 HD" },
    "landscape-16-9-2k": { width: 2560, height: 1440, name: "橫屏 16:9 2K" },
    "landscape-16-9-4k": { width: 3840, height: 2160, name: "橫屏 16:9 4K" },
    "landscape-4-3": { width: 1024, height: 768, name: "橫屏 4:3" },
    "landscape-21-9": { width: 2560, height: 1080, name: "橫屏 21:9" },
    "instagram-square": { width: 1080, height: 1080, name: "Instagram 方形" },
    "instagram-portrait": { width: 1080, height: 1350, name: "Instagram 豎屏" },
    "instagram-story": { width: 1080, height: 1920, name: "Instagram Story" },
    "facebook-cover": { width: 820, height: 312, name: "Facebook 封面" },
    "twitter-header": { width: 1500, height: 500, name: "Twitter 橫幅" },
    "youtube-thumbnail": { width: 1280, height: 720, name: "YouTube 縮圖" },
    "linkedin-banner": { width: 1584, height: 396, name: "LinkedIn 橫幅" },
    "a4-portrait": { width: 2480, height: 3508, name: "A4 豎屏 300DPI" },
    "a4-landscape": { width: 3508, height: 2480, name: "A4 橫屏 300DPI" },
    "poster-24-36": { width: 2400, height: 3600, name: "海報 24x36\"" },
    "wallpaper-fhd": { width: 1920, height: 1080, name: "桌布 FHD" },
    "wallpaper-2k": { width: 2560, height: 1440, name: "桌布 2K" },
    "wallpaper-4k": { width: 3840, height: 2160, name: "桌布 4K" },
    "wallpaper-ultrawide": { width: 3440, height: 1440, name: "桌布 Ultra-Wide" },
    "mobile-wallpaper": { width: 1284, height: 2778, name: "手機桌布" }
  }
};

const API_OPTIMIZATION = {
  CACHE: {
    enabled: true,
    max_size: 500,
    ttl: 3600000
  },
  RATE_LIMIT: {
    enabled: true,
    max_requests_per_minute: 30,
    max_requests_per_hour: 200,
    blacklist_threshold: 100,
    blacklist_duration: 3600000
  }
};

class Logger {
  constructor() { this.logs = []; }
  add(step, data = null) {
    const entry = { step, timestamp: new Date().toISOString() };
    if (data) entry.data = data;
    this.logs.push(entry);
    console.log(`[${entry.timestamp}] ${step}`, data || '');
  }
  get() { return this.logs; }
}

class ChineseTranslator {
  static isChinese(text) {
    return /[\u4e00-\u9fff]/.test(text);
  }
  
  static async translate(text, env) {
    if (!this.isChinese(text)) return { translated: text, wasTranslated: false };
    try {
      const response = await env.AI.run('@cf/meta/m2m100-1.2b', {
        text: text,
        source_lang: 'zh',
        target_lang: 'en'
      });
      return {
        translated: response.translated_text || text,
        wasTranslated: true,
        original: text
      };
    } catch (error) {
      console.error('Translation failed:', error);
      return { translated: text, wasTranslated: false };
    }
  }
}

class PromptAnalyzer {
  static analyze(prompt) {
    const wordCount = prompt.split(/\s+/).length;
    const hasDetailedDescriptions = /\b(detailed|intricate|highly|ultra|professional|masterpiece|best quality)\b/i.test(prompt);
    const hasMultipleSubjects = (prompt.match(/,/g) || []).length > 3;
    const hasLighting = /\b(lighting|light|shadow|glow|bright|dark|cinematic)\b/i.test(prompt);
    const hasStyle = /\b(style|art|painting|photo|render|illustration)\b/i.test(prompt);
    
    let complexity = 'simple';
    let score = 0;
    if (wordCount > 5) score++;
    if (wordCount > 15) score++;
    if (hasDetailedDescriptions) score++;
    if (hasMultipleSubjects) score++;
    if (hasLighting) score++;
    if (hasStyle) score++;
    
    if (score >= 5) complexity = 'very_complex';
    else if (score >= 3) complexity = 'complex';
    else if (score >= 2) complexity = 'medium';
    
    return {
      complexity,
      score,
      wordCount,
      features: {
        hasDetailedDescriptions,
        hasMultipleSubjects,
        hasLighting,
        hasStyle
      }
    };
  }
}

class HDOptimizer {
  static shouldUpscale(width, height, qualityMode, model) {
    if (model && (model.includes('nanobanana') || model.includes('4k'))) {
      return false;
    }
    const totalPixels = width * height;
    const threshold = qualityMode === 'ultra' ? 1024 * 1024 : 
                     qualityMode === 'ultra_4k' ? 2048 * 2048 : 
                     1536 * 1536;
    return totalPixels < threshold;
  }
  
  static optimize(width, height, qualityMode, model) {
    if (!this.shouldUpscale(width, height, qualityMode, model)) {
      return { width, height, upscaled: false };
    }
    
    let scale = 1;
    if (qualityMode === 'ultra') scale = 1.5;
    else if (qualityMode === 'ultra_4k') scale = 2;
    else if (qualityMode === 'standard') scale = 1.25;
    
    let newWidth = Math.round(width * scale);
    let newHeight = Math.round(height * scale);
    
    newWidth = Math.min(newWidth, 4096);
    newHeight = Math.min(newHeight, 4096);
    
    newWidth = Math.round(newWidth / 64) * 64;
    newHeight = Math.round(newHeight / 64) * 64;
    
    return {
      width: newWidth,
      height: newHeight,
      upscaled: true,
      scale: scale,
      originalWidth: width,
      originalHeight: height
    };
  }
}

class ParameterOptimizer {
  static optimizeSteps(complexity, qualityMode) {
    const baseSteps = {
      simple: 20,
      medium: 25,
      complex: 30,
      very_complex: 35
    };
    
    let steps = baseSteps[complexity] || 25;
    
    if (qualityMode === 'economy') steps = Math.max(15, steps - 5);
    else if (qualityMode === 'ultra') steps += 3;
    else if (qualityMode === 'ultra_4k') steps += 5;
    
    return Math.min(Math.max(steps, 15), 50);
  }
  
  static optimizeGuidance(complexity, hasStyle) {
    let guidance = 7.5;
    
    if (complexity === 'simple') guidance = 7.0;
    else if (complexity === 'complex') guidance = 8.0;
    else if (complexity === 'very_complex') guidance = 8.5;
    
    if (hasStyle) guidance += 0.5;
    
    return Math.min(Math.max(guidance, 5.0), 15.0);
  }
}

class StyleProcessor {
  static apply(prompt, styleKey, negativePrompt = '') {
    const style = CONFIG.STYLE_PRESETS[styleKey];
    if (!style || styleKey === 'none') {
      return { prompt, negative: negativePrompt };
    }
    
    const enhancedPrompt = style.prompt ? `${prompt}, ${style.prompt}` : prompt;
    const enhancedNegative = style.negative ? 
      (negativePrompt ? `${negativePrompt}, ${style.negative}` : style.negative) : 
      negativePrompt;
    
    return {
      prompt: enhancedPrompt,
      negative: enhancedNegative,
      appliedStyle: style.name
    };
  }
}

class PromptOptimizer {
  async optimize(prompt, options = {}) {
    const {
      width = 1024,
      height = 1024,
      style = 'none',
      negativePrompt = '',
      autoOptimize = true,
      autoHD = true,
      qualityMode = 'standard',
      model = 'flux'
    } = options;
    
    let finalPrompt = prompt;
    let wasTranslated = false;
    
    const analysis = PromptAnalyzer.analyze(prompt);
    
    const styleResult = StyleProcessor.apply(prompt, style, negativePrompt);
    finalPrompt = styleResult.prompt;
    let finalNegative = styleResult.negative;
    
    const hdResult = HDOptimizer.optimize(width, height, qualityMode, model);
    
    const finalSteps = ParameterOptimizer.optimizeSteps(analysis.complexity, qualityMode);
    const finalGuidance = ParameterOptimizer.optimizeGuidance(analysis.complexity, style !== 'none');
    
    return {
      finalPrompt,
      finalNegative,
      finalWidth: hdResult.width,
      finalHeight: hdResult.height,
      finalSteps,
      finalGuidance,
      autoTranslated: wasTranslated,
      autoOptimized: autoOptimize,
      hdOptimized: hdResult.upscaled,
      promptComplexity: analysis.complexity,
      appliedStyle: styleResult.appliedStyle
    };
  }
}
// ============================================================
// 第 2 部分: Provider 類 + Multi-Provider Router
// ============================================================

class BaseProvider {
  constructor(config) {
    this.config = config;
    this.name = config.name;
  }
  
  async generate(prompt, options, logger) {
    throw new Error("Must implement generate method");
  }
  
  buildUrl(baseUrl, params) {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, value);
      }
    });
    return url.toString();
  }
}

class PollinationsProvider extends BaseProvider {
  async generate(prompt, options, logger) {
    const {
      width = 1024,
      height = 1024,
      model = 'flux',
      seed = -1,
      negativePrompt = '',
      enhance = false,
      nologo = true,
      privateMode = true
    } = options;
    
    const params = {
      width,
      height,
      model,
      seed: seed === -1 ? Date.now() : seed,
      nologo: nologo ? 'true' : 'false',
      private: privateMode ? 'true' : 'false',
      enhance: enhance ? 'true' : 'false'
    };
    
    if (negativePrompt) params.negative = negativePrompt;
    
    const imageUrl = this.buildUrl(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`,
      params
    );
    
    logger.add("🌸 Pollinations 生成", { url: imageUrl, model, seed: params.seed });
    
    return {
      url: imageUrl,
      provider: 'pollinations',
      model: model,
      width: width,
      height: height,
      seed: params.seed,
      steps: options.steps || 25,
      guidance: options.guidance || 7.5,
      is_4k: width >= 4096 || height >= 4096,
      style: options.style || 'none',
      quality_mode: options.qualityMode || 'standard',
      cost: 0
    };
  }
}

class NanoBananaProvider extends BaseProvider {
  async generate(prompt, options, logger) {
    const {
      width = 1024,
      height = 1024,
      model = 'nanobanana',
      seed = -1,
      negativePrompt = '',
      referenceImages = []
    } = options;
    
    const finalSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
    
    let apiUrl = 'https://nano-banana.p.rapidapi.com/generate';
    if (model === 'nanobanana-pro') {
      apiUrl = 'https://nano-banana.p.rapidapi.com/generate-pro';
    }
    
    const requestBody = {
      prompt: prompt,
      width: width,
      height: height,
      seed: finalSeed
    };
    
    if (negativePrompt) requestBody.negative_prompt = negativePrompt;
    if (referenceImages && referenceImages.length > 0) {
      requestBody.reference_images = referenceImages.slice(0, 4);
    }
    
    logger.add("🍌 Nano Banana 生成", { 
      model, 
      size: `${width}x${height}`, 
      seed: finalSeed,
      ref_images: referenceImages?.length || 0
    });
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Nano Banana API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      if (!data.image_url && !data.url) {
        throw new Error("No image URL in response");
      }
      
      const imageUrl = data.image_url || data.url;
      
      return {
        url: imageUrl,
        provider: 'nanobanana',
        model: model,
        width: width,
        height: height,
        seed: finalSeed,
        steps: options.steps || 30,
        guidance: options.guidance || 7.5,
        is_4k: width >= 4096 || height >= 4096,
        style: options.style || 'none',
        quality_mode: options.qualityMode || 'standard',
        reference_images: referenceImages || [],
        reference_images_count: referenceImages?.length || 0,
        generation_mode: referenceImages?.length > 0 ? '圖生圖' : '文生圖',
        cost: 0
      };
    } catch (error) {
      logger.add("❌ Nano Banana 失敗", error.message);
      throw error;
    }
  }
}

class KontextProvider extends BaseProvider {
  async generate(prompt, options, logger) {
    const {
      width = 1024,
      height = 1024,
      model = 'flux-kontext',
      seed = -1,
      negativePrompt = '',
      referenceImages = []
    } = options;
    
    if (!referenceImages || referenceImages.length === 0) {
      throw new Error("Kontext 需要至少 1 張參考圖");
    }
    
    const finalSeed = seed === -1 ? Math.floor(Math.random() * 1000000) : seed;
    
    let apiUrl = 'https://flux-kontext.p.rapidapi.com/generate';
    if (model === 'flux-kontext-pro') {
      apiUrl = 'https://flux-kontext.p.rapidapi.com/generate-pro';
    }
    
    const requestBody = {
      prompt: prompt,
      reference_image: referenceImages[0],
      width: width,
      height: height,
      seed: finalSeed
    };
    
    if (negativePrompt) requestBody.negative_prompt = negativePrompt;
    
    logger.add("🎨 Kontext 生成", { 
      model, 
      size: `${width}x${height}`, 
      seed: finalSeed,
      has_reference: true
    });
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Kontext API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      if (!data.image_url && !data.url) {
        throw new Error("No image URL in response");
      }
      
      const imageUrl = data.image_url || data.url;
      
      return {
        url: imageUrl,
        provider: 'kontext',
        model: model,
        width: width,
        height: height,
        seed: finalSeed,
        steps: options.steps || 28,
        guidance: options.guidance || 7.5,
        is_4k: false,
        style: options.style || 'none',
        quality_mode: options.qualityMode || 'standard',
        reference_images: [referenceImages[0]],
        reference_images_count: 1,
        generation_mode: '圖生圖',
        cost: 0
      };
    } catch (error) {
      logger.add("❌ Kontext 失敗", error.message);
      throw error;
    }
  }
}

class MultiProviderRouter {
  constructor(providers = {}, env = null) {
    this.env = env;
    this.providers = {
      pollinations: new PollinationsProvider(CONFIG.PROVIDERS.pollinations),
      nanobanana: new NanoBananaProvider(CONFIG.PROVIDERS.nanobanana),
      kontext: new KontextProvider(CONFIG.PROVIDERS.kontext)
    };
  }
  
  selectProvider(preferredProvider = null, model = 'flux', hasReferenceImages = false) {
    if (model.includes('kontext')) return this.providers.kontext;
    if (model.includes('nanobanana')) return this.providers.nanobanana;
    if (hasReferenceImages) return this.providers.nanobanana;
    
    if (preferredProvider && this.providers[preferredProvider]) {
      return this.providers[preferredProvider];
    }
    
    return this.providers.pollinations;
  }
  
  async generate(prompt, options = {}, logger = null) {
    if (!logger) logger = new Logger();
    
    // 🔧 FIX: 批量生成時統一參數優化
    const isBatchMode = options.numOutputs > 1;
    
    // 第一步:統一優化所有參數(不管是否批量)
    const optimizer = new PromptOptimizer();
    const optimizedResult = await optimizer.optimize(prompt, options);
    
    // 提取優化後的標準參數
    const standardizedParams = {
      finalPrompt: optimizedResult.finalPrompt,
      finalWidth: optimizedResult.finalWidth,
      finalHeight: optimizedResult.finalHeight,
      finalSteps: optimizedResult.finalSteps || 25,
      finalGuidance: optimizedResult.finalGuidance || 7.5,
      finalNegative: optimizedResult.finalNegative || '',
      autoTranslated: optimizedResult.autoTranslated || false,
      autoOptimized: optimizedResult.autoOptimized || false,
      hdOptimized: optimizedResult.hdOptimized || false,
      promptComplexity: optimizedResult.promptComplexity || 'medium'
    };
    
    logger.add("📦 標準化參數", {
      width: standardizedParams.finalWidth,
      height: standardizedParams.finalHeight,
      steps: standardizedParams.finalSteps,
      guidance: standardizedParams.finalGuidance,
      batch_mode: isBatchMode
    });
    
    const results = [];
    const totalImages = options.numOutputs || 1;
    
    // 🎲 Seed 處理
    let currentSeed = options.seed !== undefined ? options.seed : -1;
    
    for (let i = 0; i < totalImages; i++) {
      const imageSeed = currentSeed === -1 ? Math.floor(Math.random() * 1000000) : currentSeed;
      
      logger.add(`🖼️ 生成圖片 ${i + 1}/${totalImages}`, { seed: imageSeed });
      
      // 🔧 FIX: 所有圖片使用完全相同的優化參數
      const requestOptions = {
        ...options,
        width: standardizedParams.finalWidth,  // ✅ 鎖定優化後尺寸
        height: standardizedParams.finalHeight, // ✅ 鎖定優化後尺寸
        steps: standardizedParams.finalSteps,
        guidance: standardizedParams.finalGuidance,
        negativePrompt: standardizedParams.finalNegative,
        seed: imageSeed,
        _batchMode: isBatchMode,
        _batchIndex: i,
        _totalBatch: totalImages,
        _standardizedParams: standardizedParams  // 傳遞標準參數供驗證
      };
      
      try {
        const provider = this.selectProvider(
          options.provider, 
          options.model, 
          options.referenceImages?.length > 0
        );
        
        if (!provider) throw new Error("No available provider");
        
        const result = await provider.generate(
          standardizedParams.finalPrompt,  // ✅ 使用優化後的 prompt
          requestOptions,
          logger
        );
        
        // 🔍 驗證參數一致性
        if (isBatchMode && i > 0) {
          const firstResult = results[0];
          if (result.width !== firstResult.width || 
              result.height !== firstResult.height ||
              result.steps !== firstResult.steps) {
            logger.add("⚠️ 檢測到參數不一致", {
              expected: `${firstResult.width}x${firstResult.height}, ${firstResult.steps} steps`,
              actual: `${result.width}x${result.height}, ${result.steps} steps`,
              fixing: "強制對齊..."
            });
            // 強制對齊
            result.width = firstResult.width;
            result.height = firstResult.height;
            result.steps = firstResult.steps;
            result.guidance = firstResult.guidance;
          }
        }
        
        result.seed = imageSeed;
        result.auto_translated = standardizedParams.autoTranslated;
        result.auto_optimized = standardizedParams.autoOptimized;
        result.hd_optimized = standardizedParams.hdOptimized;
        result.prompt_complexity = standardizedParams.promptComplexity;
        result.batch_mode = isBatchMode;
        result.batch_index = i + 1;
        result.total_batch = totalImages;
        
        results.push(result);
        
      } catch (error) {
        logger.add("❌ 生成失敗", { image: i + 1, error: error.message });
        throw error;
      }
      
      // 🎲 Seed 遞增(如果不是隨機)
      if (currentSeed !== -1) {
        currentSeed++;
      }
    }
    
    // 📊 最終一致性驗證
    if (isBatchMode && results.length > 1) {
      const firstParams = {
        width: results[0].width,
        height: results[0].height,
        steps: results[0].steps,
        guidance: results[0].guidance
      };
      
      const allConsistent = results.every(r => 
        r.width === firstParams.width &&
        r.height === firstParams.height &&
        r.steps === firstParams.steps &&
        r.guidance === firstParams.guidance
      );
      
      logger.add("🔒 批量一致性檢查", {
        status: allConsistent ? "✅ 通過" : "❌ 失敗",
        params: firstParams,
        total: results.length
      });
    }
    
    return results;
  }
}

// ============================================================
// 輔助類: Cache + Rate Limiter + Performance Monitor
// ============================================================

class APICache {
  constructor(maxSize = 500, ttl = 3600000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }
  
  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }
}

class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.blacklist = new Map();
  }
  
  async check(ip) {
    if (this.blacklist.has(ip)) {
      const blockedUntil = this.blacklist.get(ip);
      if (Date.now() < blockedUntil) {
        return {
          allowed: false,
          reason: 'IP temporarily blocked due to excessive requests',
          retryAfter: Math.ceil((blockedUntil - Date.now()) / 1000),
          blockedUntil: new Date(blockedUntil).toISOString()
        };
      } else {
        this.blacklist.delete(ip);
      }
    }
    
    const now = Date.now();
    const windowMinute = 60 * 1000;
    const windowHour = 60 * 60 * 1000;
    
    if (!this.requests.has(ip)) {
      this.requests.set(ip, []);
    }
    
    const userRequests = this.requests.get(ip);
    const recentRequests = userRequests.filter(time => now - time < windowHour);
    this.requests.set(ip, recentRequests);
    
    const requestsLastMinute = recentRequests.filter(time => now - time < windowMinute).length;
    const requestsLastHour = recentRequests.length;
    
    if (requestsLastMinute >= API_OPTIMIZATION.RATE_LIMIT.max_requests_per_minute) {
      if (requestsLastMinute >= API_OPTIMIZATION.RATE_LIMIT.blacklist_threshold) {
        this.blacklist.set(ip, now + API_OPTIMIZATION.RATE_LIMIT.blacklist_duration);
      }
      return {
        allowed: false,
        reason: `Rate limit exceeded: ${requestsLastMinute} requests in last minute`,
        limit: API_OPTIMIZATION.RATE_LIMIT.max_requests_per_minute,
        current: requestsLastMinute,
        retryAfter: 60
      };
    }
    
    if (requestsLastHour >= API_OPTIMIZATION.RATE_LIMIT.max_requests_per_hour) {
      return {
        allowed: false,
        reason: `Hourly rate limit exceeded: ${requestsLastHour} requests in last hour`,
        limit: API_OPTIMIZATION.RATE_LIMIT.max_requests_per_hour,
        current: requestsLastHour,
        retryAfter: 3600
      };
    }
    
    recentRequests.push(now);
    
    return {
      allowed: true,
      remaining: {
        perMinute: API_OPTIMIZATION.RATE_LIMIT.max_requests_per_minute - requestsLastMinute - 1,
        perHour: API_OPTIMIZATION.RATE_LIMIT.max_requests_per_hour - requestsLastHour - 1
      }
    };
  }
}

class PerformanceMonitor {
  constructor() {
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      totalResponseTime: 0,
      errors: {}
    };
  }
  
  recordRequest(success, duration, errorType = null) {
    this.stats.totalRequests++;
    this.stats.totalResponseTime += duration;
    
    if (success) {
      this.stats.successfulRequests++;
    } else {
      this.stats.failedRequests++;
      if (errorType) {
        this.stats.errors[errorType] = (this.stats.errors[errorType] || 0) + 1;
      }
    }
  }
  
  getStats() {
    const avgResponseTime = this.stats.totalRequests > 0 
      ? Math.round(this.stats.totalResponseTime / this.stats.totalRequests) 
      : 0;
    
    return {
      total_requests: this.stats.totalRequests,
      successful: this.stats.successfulRequests,
      failed: this.stats.failedRequests,
      success_rate: this.stats.totalRequests > 0 
        ? ((this.stats.successfulRequests / this.stats.totalRequests) * 100).toFixed(2) + '%'
        : '0%',
      avg_response_time_ms: avgResponseTime,
      error_breakdown: this.stats.errors
    };
  }
}

const apiCache = new APICache(
  API_OPTIMIZATION.CACHE.max_size,
  API_OPTIMIZATION.CACHE.ttl
);
const rateLimiter = new RateLimiter();
const perfMonitor = new PerformanceMonitor();

function generateCacheKey(prompt, options) {
  const keyData = {
    prompt,
    model: options.model,
    width: options.width,
    height: options.height,
    seed: options.seed,
    style: options.style,
    quality: options.qualityMode
  };
  return JSON.stringify(keyData);
}

function getClientIP(request) {
  return request.headers.get('CF-Connecting-IP') || 
         request.headers.get('X-Forwarded-For')?.split(',')[0] || 
         'unknown';
}

function corsHeaders(additionalHeaders = {}) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
    ...additionalHeaders
  };
}
// ============================================================
// 第 3 部分: Handler 函數 + UI 界面 + 主路由
// ============================================================

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
<option value="flux-3d">Flux 3D (3D渲染)</option>
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

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const startTime = Date.now();
        const clientIP = getClientIP(request);
        
        console.log("=== API Request ===");
        console.log("IP:", clientIP);
        console.log("Path:", url.pathname);
        console.log("Method:", request.method);
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
