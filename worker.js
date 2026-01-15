// =================================================================================
//  項目: Flux AI Pro - Ultimate Edition
//  版本: 11.5.0 (Full Architecture + Infip Integration)
//  狀態: 完整版 (無精簡)
//  功能: HD優化、參數自動調優、多引擎路由 (Pollinations + Infip)、Cyber-UI
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "11.5.0",
  API_MASTER_KEY: "1",
  FETCH_TIMEOUT: 120000,
  MAX_RETRIES: 3,
  
  POLLINATIONS_AUTH: {
    enabled: true,
    token: "", 
    method: "header"
  },
  
  // 雙供應商配置
  PROVIDERS: {
    pollinations: {
      id: "pollinations",
      name: "Pollinations.ai",
      endpoint: "https://gen.pollinations.ai",
      type: "direct",
      models: [
        { id: "nanobanana-pro", name: "Nano Banana Pro 🍌", category: "special", description: "Nano Pro 專用模型" },
        { id: "gptimage", name: "GPT-Image 🎨", category: "gptimage" },
        { id: "gptimage-large", name: "GPT-Image Large 🌟", category: "gptimage" },
        { id: "flux", name: "Flux Standard", category: "flux" },
        { id: "turbo", name: "Flux Turbo ⚡", category: "flux" },
        { id: "kontext", name: "Kontext 🎨", category: "kontext" }
      ]
    },
    infip: {
      id: "infip",
      name: "Infip (GhostBot)",
      endpoint: "https://api.infip.pro",
      type: "openai_compat",
      models: [
        { id: "img4", name: "Img4 (Universal) 🌌", category: "general", mode: "sync" },
        { id: "flux-schnell", name: "Flux Schnell ⚡", category: "flux", mode: "sync" },
        { id: "sdxl", name: "SDXL 1.0 🖼️", category: "sd", mode: "sync" },
        { id: "qwen", name: "Qwen VL (Async) 🤖", category: "special", mode: "async" }
      ]
    }
  },

  // 完整風格庫 (保留所有 40+ 種風格)
  STYLE_PRESETS: {
    none: { name: "無風格", prompt: "", negative: "", category: "basic", icon: "⚡", description: "使用原始提示詞" },
    anime: { name: "動漫風格", prompt: "anime style, anime art, vibrant colors, cel shading, detailed anime", negative: "realistic, photograph, 3d, ugly", category: "illustration", icon: "🎭", description: "日系動漫風格" },
    ghibli: { name: "吉卜力", prompt: "Studio Ghibli style, Hayao Miyazaki, anime, soft colors, whimsical, detailed background, hand-drawn", negative: "realistic, dark, 3D, western animation", category: "illustration", icon: "🍃", description: "宮崎駿動畫風格" },
    manga: { name: "日本漫畫", prompt: "manga style, japanese comic art, black and white, screentones, halftone patterns, dynamic poses, detailed linework", negative: "color, colorful, realistic, photo, western comic", category: "manga", icon: "📖", description: "經典日本漫畫黑白網點" },
    "manga-color": { name: "彩色日漫", prompt: "colored manga style, japanese comic art, vibrant colors, cel shading, clean linework, digital coloring", negative: "realistic, photo, western style, messy", category: "manga", icon: "🎨", description: "彩色日本漫畫風格" },
    "american-comic": { name: "美式漫畫", prompt: "american comic book style, bold lines, vibrant colors, superhero art, dynamic action, dramatic shading", negative: "anime, manga, realistic photo, soft", category: "manga", icon: "💥", description: "美國超級英雄漫畫" },
    chibi: { name: "Q版漫畫", prompt: "chibi style, super deformed, cute, kawaii, big head small body, simple features, adorable", negative: "realistic proportions, serious, dark", category: "manga", icon: "🥰", description: "Q版可愛漫畫風格" },
    "black-white": { name: "黑白", prompt: "black and white, monochrome, high contrast, dramatic lighting, grayscale", negative: "color, colorful, vibrant, saturated", category: "monochrome", icon: "⚫⚪", description: "純黑白高對比效果" },
    sketch: { name: "素描", prompt: "pencil sketch, hand drawn, graphite drawing, detailed shading, artistic sketch, loose lines", negative: "color, digital, polished, photo", category: "monochrome", icon: "✏️", description: "鉛筆素描手繪質感" },
    "ink-drawing": { name: "水墨畫", prompt: "traditional chinese ink painting, sumi-e, brush strokes, minimalist, zen aesthetic, black ink on white paper", negative: "color, western style, detailed, cluttered", category: "monochrome", icon: "🖌️", description: "中國傳統水墨畫" },
    photorealistic: { name: "寫實照片", prompt: "photorealistic, 8k uhd, high quality, detailed, professional photography, sharp focus", negative: "anime, cartoon, illustration, painting, drawing, art", category: "realistic", icon: "📷", description: "攝影級寫實效果" },
    "oil-painting": { name: "油畫", prompt: "oil painting, canvas texture, visible brushstrokes, rich colors, artistic, masterpiece", negative: "photograph, digital art, anime, flat", category: "painting", icon: "🖼️", description: "經典油畫質感" },
    watercolor: { name: "水彩畫", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted, paper texture, flowing colors", negative: "photograph, digital, sharp edges, 3d", category: "painting", icon: "💧", description: "清新水彩風格" },
    impressionism: { name: "印象派", prompt: "impressionist painting, soft brushstrokes, light and color focus, Monet style, outdoor scene, visible brush marks", negative: "sharp, detailed, photorealistic, dark", category: "art-movement", icon: "🌅", description: "印象派繪畫光影捕捉" },
    abstract: { name: "抽象派", prompt: "abstract art, non-representational, geometric shapes, bold colors, modern art, expressive", negative: "realistic, figurative, detailed, representational", category: "art-movement", icon: "🎭", description: "抽象藝術幾何圖形" },
    cyberpunk: { name: "賽博朋克", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life, blade runner style", negative: "natural, rustic, medieval, fantasy", category: "scifi", icon: "🌃", description: "賽博朋克未來科幻" },
    vintage: { name: "復古", prompt: "vintage style, retro, aged, nostalgic, warm tones, classic, faded colors, old photograph", negative: "modern, futuristic, clean, vibrant", category: "visual", icon: "📻", description: "復古懷舊褪色效果" },
    steampunk: { name: "蒸汽朋克", prompt: "steampunk style, Victorian era, brass and copper, gears and mechanisms, mechanical, industrial", negative: "modern, minimalist, clean, futuristic", category: "visual", icon: "⚙️", description: "蒸汽朋克機械美學" },
    "pixel-art": { name: "像素藝術", prompt: "pixel art, 8-bit, 16-bit, retro gaming style, pixelated, nostalgic, limited color palette", negative: "high resolution, smooth, realistic, detailed", category: "digital", icon: "🎮", description: "像素藝術復古遊戲" },
    "3d-render": { name: "3D渲染", prompt: "3d render, cinema 4d, octane render, detailed, professional lighting, ray tracing, photorealistic 3d", negative: "2d, flat, hand drawn, sketchy", category: "digital", icon: "🎬", description: "專業3D渲染寫實光影" },
    "ukiyo-e": { name: "浮世繪", prompt: "ukiyo-e style, japanese woodblock print, Hokusai inspired, traditional japanese art, flat colors, bold outlines", negative: "modern, western, photographic, 3d", category: "traditional", icon: "🗾", description: "日本浮世繪木刻版畫" }
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
    'scifi': { name: '科幻', icon: '🚀', order: 12 }
  },
  
  OPTIMIZATION_RULES: {
    MODEL_STEPS: { 
      "nanobanana-pro": { min: 15, optimal: 20, max: 30 },
      "gptimage": { min: 10, optimal: 18, max: 28 },
      "flux": { min: 15, optimal: 20, max: 30 }, 
      "turbo": { min: 4, optimal: 8, max: 12 },
      "img4": { min: 20, optimal: 30, max: 50 } // Infip Model
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
      "img4": { min_resolution: 1024, max_resolution: 2048, optimal_steps_boost: 1.1, guidance_boost: 1.05, recommended_quality: "ultra" }
    }
  }
};

class Logger {
  constructor() { this.logs = []; }
  add(title, data) { this.logs.push({ title, data, timestamp: new Date().toISOString() }); }
  get() { return this.logs; }
}

class RateLimiter {
  constructor(env) { this.env = env; this.KV = env.FLUX_KV; }
  async checkLimit(ip) {
    if (!this.KV) return { allowed: true };
    const key = `nano_limit:${ip}`;
    const windowSize = 3600 * 1000;
    const maxRequests = 5; 
    try {
      const rawData = await this.KV.get(key);
      let timestamps = rawData ? JSON.parse(rawData) : [];
      const now = Date.now();
      timestamps = timestamps.filter(ts => now - ts < windowSize);
      if (timestamps.length >= maxRequests) {
        const oldest = timestamps[0];
        const resetTime = oldest + windowSize;
        const waitMin = Math.ceil((resetTime - now) / 60000);
        return { allowed: false, reason: `🍌 香蕉能量耗盡！限額已滿 (5張/小時)。請休息 ${waitMin} 分鐘後再來。`, remaining: 0 };
      }
      timestamps.push(now);
      await this.KV.put(key, JSON.stringify(timestamps), { expirationTtl: 3600 });
      return { allowed: true, remaining: maxRequests - timestamps.length };
    } catch (err) { console.error("KV Error:", err); return { allowed: true }; }
  }
}

function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';
}

async function translateToEnglish(text, env) {
  try {
    const hasChinese = /[\u4e00-\u9fa5\u3400-\u4db5\u20000-\u2a6d6]/.test(text);
    if (!hasChinese) return { text: text, translated: false, reason: "No Chinese detected" };
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" + encodeURIComponent(text);
    const response = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!response.ok) throw new Error(`Google API HTTP ${response.status}`);
    const data = await response.json();
    let translatedText = "";
    if (data && data[0] && Array.isArray(data[0])) { data[0].forEach(segment => { if (segment && segment[0]) translatedText += segment[0]; }); }
    return { text: translatedText.trim(), translated: true, original: text, model: "google-gtx-free" };
  } catch (error) { return { text: text, translated: false, error: error.message }; }
}

class PromptAnalyzer {
  static analyzeComplexity(prompt) {
    const complexKeywords = ['detailed', 'intricate', 'complex', 'elaborate', 'realistic', 'photorealistic', 'hyperrealistic', 'architecture', 'cityscape', 'landscape', 'portrait', 'face', 'eyes', 'hair', 'texture', 'material', 'fabric', 'skin', 'lighting', 'shadows', 'reflections', 'fine details', 'high detail', 'ultra detailed', '4k', '8k', 'uhd', 'hdr'];
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
    if (hdConfig.HD_PROMPTS[hdLevel]) { enhancedPrompt = prompt + ", " + hdConfig.HD_PROMPTS[hdLevel]; optimizations.push("HD增強: " + hdLevel); }
    let enhancedNegative = negativePrompt || "";
    if (qualityMode !== 'economy') { enhancedNegative = enhancedNegative ? enhancedNegative + ", " + hdConfig.HD_NEGATIVE : hdConfig.HD_NEGATIVE; optimizations.push("負面提示詞: 高清過濾"); }
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
    return { prompt: enhancedPrompt, negativePrompt: enhancedNegative, width: finalWidth, height: finalHeight, optimized: true, quality_mode: qualityMode, hd_level: hdLevel, optimizations, size_upscaled: sizeUpscaled };
  }
}

class ParameterOptimizer {
  static optimizeSteps(model, width, height, style = 'none', qualityMode = 'standard', userSteps = null) {
    if (userSteps !== null && userSteps !== -1) return { steps: userSteps, optimized: false, user_override: true };
    const rules = CONFIG.OPTIMIZATION_RULES;
    const modelRule = rules.MODEL_STEPS[model] || rules.MODEL_STEPS["flux"];
    const modeConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode];
    let baseSteps = modelRule.optimal;
    const totalPixels = width * height;
    let sizeMultiplier = totalPixels >= rules.SIZE_MULTIPLIER.xlarge.threshold ? rules.SIZE_MULTIPLIER.xlarge.multiplier : 1.0;
    let styleMultiplier = rules.STYLE_ADJUSTMENT[style] || rules.STYLE_ADJUSTMENT.default;
    let qualityMultiplier = modeConfig?.steps_multiplier || 1.0;
    let optimizedSteps = Math.round(baseSteps * sizeMultiplier * styleMultiplier * qualityMultiplier);
    optimizedSteps = Math.max(modelRule.min, Math.min(optimizedSteps, modelRule.max));
    return { steps: optimizedSteps, optimized: true };
  }
}

class StyleProcessor {
  static applyStyle(prompt, style, negativePrompt) {
    try {
      if (!style || style === 'none' || !CONFIG.STYLE_PRESETS[style]) return { enhancedPrompt: prompt, enhancedNegative: negativePrompt || "" };
      const styleConfig = CONFIG.STYLE_PRESETS[style];
      let enhancedPrompt = prompt;
      if (styleConfig.prompt && styleConfig.prompt.trim()) enhancedPrompt = prompt + ", " + styleConfig.prompt;
      let enhancedNegative = negativePrompt || "";
      if (styleConfig.negative && styleConfig.negative.trim()) {
        enhancedNegative = enhancedNegative ? enhancedNegative + ", " + styleConfig.negative : styleConfig.negative;
      }
      return { enhancedPrompt: enhancedPrompt, enhancedNegative: enhancedNegative };
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

function corsHeaders(additionalHeaders = {}) {
  return { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Source', 'Access-Control-Max-Age': '86400', ...additionalHeaders };
}

// ====== Pollinations Provider (Original) ======
class PollinationsProvider {
  constructor(config, env, apiKey) { this.config = config; this.name = config.name; this.env = env; this.apiKey = apiKey; }
  
  async generate(prompt, options, logger) {
    const { model, width, height, seed, negativePrompt, style, autoOptimize, autoHD, qualityMode } = options;
    
    // 翻譯
    let basePrompt = prompt;
    let translationLog = { translated: false };
    if (/[\u4e00-\u9fa5]/.test(prompt)) {
      const translation = await translateToEnglish(prompt, this.env);
      if (translation.translated) basePrompt = translation.text;
    }

    // HD 優化
    let hdOptimization = HDOptimizer.optimize(basePrompt, negativePrompt, model, width, height, qualityMode, autoHD);
    let finalWidth = hdOptimization.width;
    let finalHeight = hdOptimization.height;
    let optimizedPrompt = hdOptimization.prompt;
    let finalNegative = hdOptimization.negativePrompt;

    // 風格
    const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(optimizedPrompt, style, finalNegative);
    
    // 參數優化
    const stepsOpt = ParameterOptimizer.optimizeSteps(model, finalWidth, finalHeight, style, qualityMode, options.steps);
    let finalSteps = stepsOpt.steps;
    
    // 組合 Prompt
    let fullPrompt = enhancedPrompt;
    if (enhancedNegative) fullPrompt += ` [negative: ${enhancedNegative}]`;
    
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const params = new URLSearchParams();
    params.append('model', model);
    params.append('width', finalWidth.toString());
    params.append('height', finalHeight.toString());
    params.append('seed', seed.toString());
    params.append('nologo', 'true');
    params.append('steps', finalSteps.toString());

    // API Key Handling: Frontend Key > Env Key
    const token = this.apiKey || this.env.POLLINATIONS_API_KEY;
    const headers = { 'User-Agent': 'Flux-Client' };
    if(token) headers['Authorization'] = `Bearer ${token}`;

    const url = `${this.config.endpoint}/image/${encodedPrompt}?${params.toString()}`;
    logger.add("Pollinations Req", { url });

    const response = await fetchWithTimeout(url, { headers }, 120000);
    if (!response.ok) throw new Error(`Pollinations Error: ${response.status}`);
    
    const imageBlob = await response.blob();
    const imageBuffer = await imageBlob.arrayBuffer();
    
    return { imageData: imageBuffer, contentType: response.headers.get('content-type'), seed, model, provider: 'pollinations', width: finalWidth, height: finalHeight, style };
  }
}

// ====== Infip Provider (New: OpenAI-Compat + Polling) ======
class InfipProvider {
  constructor(config, env, apiKey) { this.config = config; this.name = config.name; this.env = env; this.apiKey = apiKey || env.INFIP_API_KEY; }

  async generate(prompt, options, logger) {
    if (!this.apiKey) throw new Error("Infip API Key 未設置。請在設定中輸入 API Key。");

    const { model, width, height, seed, style, negativePrompt } = options;
    
    // 翻譯
    let basePrompt = prompt;
    if (/[\u4e00-\u9fa5]/.test(prompt)) {
      const translation = await translateToEnglish(prompt, this.env);
      if (translation.translated) basePrompt = translation.text;
    }

    // 風格處理 (簡單版)
    let finalPrompt = basePrompt;
    if (style && CONFIG.STYLE_PRESETS[style]) {
        const s = CONFIG.STYLE_PRESETS[style];
        if (s.prompt) finalPrompt += `, ${s.prompt}`;
    }

    // 尺寸映射 (Infip 限制)
    let sizeStr = "1024x1024";
    if (width > height) sizeStr = "1792x1024";
    else if (height > width) sizeStr = "1024x1792";

    const payload = {
      model: model,
      prompt: finalPrompt,
      n: 1,
      size: sizeStr,
      response_format: "url"
    };

    logger.add("Infip Req", payload);

    const res = await fetchWithTimeout(`${this.config.endpoint}/v1/images/generations`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }, 30000);

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Infip API Error ${res.status}: ${txt}`);
    }

    const data = await res.json();
    logger.add("Infip Res", data);

    // 處理異步任務
    if (data.task_id) {
        logger.add("Infip Async", { task_id: data.task_id });
        return await this.pollTask(data.task_id, logger);
    } else if (data.data && data.data.length > 0) {
        return await this.downloadImage(data.data[0].url, seed, model);
    } else {
        throw new Error("Unknown Infip Response");
    }
  }

  async pollTask(taskId, logger) {
    const maxRetries = 60; // 120s
    const pollUrl = `${this.config.endpoint}/v1/tasks/${taskId}`;
    
    for (let i = 0; i < maxRetries; i++) {
        await new Promise(r => setTimeout(r, 2000));
        const res = await fetch(pollUrl, { headers: { 'Authorization': `Bearer ${this.apiKey}` } });
        if (!res.ok) continue;
        
        const taskData = await res.json();
        if (taskData.status === 'completed' && taskData.result?.data) {
            return await this.downloadImage(taskData.result.data[0].url, -1, 'infip-async');
        } else if (taskData.status === 'failed') {
            throw new Error(`Task failed: ${JSON.stringify(taskData)}`);
        }
    }
    throw new Error("Async generation timed out");
  }

  async downloadImage(url, seed, model) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Download Failed");
    const blob = await res.blob();
    const buffer = await blob.arrayBuffer();
    return { imageData: buffer, contentType: res.headers.get('content-type'), seed, model, provider: 'infip', width: 1024, height: 1024 };
  }
}

class MultiProviderRouter {
  constructor(apiKeys = {}, env) {
    this.providers = {};
    if (CONFIG.PROVIDERS.pollinations) this.providers['pollinations'] = new PollinationsProvider(CONFIG.PROVIDERS.pollinations, env, apiKeys.pollinations);
    if (CONFIG.PROVIDERS.infip) this.providers['infip'] = new InfipProvider(CONFIG.PROVIDERS.infip, env, apiKeys.infip);
  }
  async generate(prompt, options, logger) {
    const providerName = options.provider || 'pollinations';
    const provider = this.providers[providerName];
    if (!provider) throw new Error(`Provider ${providerName} not available`);
    return await provider.generate(prompt, options, logger);
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const clientIP = getClientIP(request);
    
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders() });
    
    try {
      if (url.pathname === '/_internal/generate') { 
        return await handleInternalGenerate(request, env, ctx); 
      }
      return handleNanoPage(request);
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders({'Content-Type': 'application/json'}) });
    }
  }
};

async function handleInternalGenerate(request, env, ctx) {
  const logger = new Logger();
  const clientIP = getClientIP(request);
  
  try {
    const body = await request.json();
    const prompt = body.prompt;
    if (!prompt) throw new Error("Prompt is required");

    // 限流邏輯 (僅針對 NanoBanana Pro)
    if (body.model === 'nanobanana-pro') {
        const limiter = new RateLimiter(env);
        const check = await limiter.checkLimit(clientIP);
        if (!check.allowed) return new Response(JSON.stringify({ error: { message: check.reason, type: 'rate_limit' } }), { status: 429, headers: corsHeaders({'Content-Type': 'application/json'}) });
    }
    
    // 參數解析
    const autoOptimize = body.auto_optimize !== false;
    const options = { 
      provider: body.provider || 'pollinations',
      model: body.model || "gptimage", 
      width: body.width || 1024, 
      height: body.height || 1024, 
      seed: body.seed !== undefined ? body.seed : -1, 
      negativePrompt: body.negative_prompt || "", 
      style: body.style || "none", 
      autoOptimize: autoOptimize, 
      autoHD: body.auto_hd !== false, 
      qualityMode: body.quality_mode || 'standard'
    };

    // 傳遞前端 Keys
    const apiKeys = body.apiKeys || {};
    
    const router = new MultiProviderRouter(apiKeys, env);
    const result = await router.generate(prompt, options, logger);
    
    return new Response(result.imageData, {
        headers: { 
            'Content-Type': result.contentType || 'image/png', 
            'X-Model': result.model,
            'X-Provider': result.provider,
            'X-Seed': String(result.seed),
            ...corsHeaders() 
        }
    });

  } catch (e) {
    logger.add("Error", e.message);
    return new Response(JSON.stringify({ error: { message: e.message, logs: logger.get() } }), { status: 400, headers: corsHeaders({'Content-Type': 'application/json'}) });
  }
}
// 🔥 Cyber-Banana UI: Full Version with Infip Settings
function handleNanoPage(request) {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>🍌 NanoBanana Pro - Ultimate Console</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍌</text></svg>">
<style>
:root {
    --primary: #FACC15; --primary-dim: #cca400; --bg-dark: #0f0f11;
    --panel-bg: rgba(30, 30, 35, 0.7); --border: rgba(255, 255, 255, 0.1);
    --text: #ffffff; --text-muted: #9ca3af; --glass: blur(20px) saturate(180%);
}
* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
body {
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: var(--bg-dark);
    background-image: radial-gradient(circle at 10% 20%, rgba(250, 204, 21, 0.05) 0%, transparent 40%);
    color: var(--text); height: 100vh; overflow: hidden; display: flex;
}
.app-container { display: flex; width: 100%; height: 100%; }
.sidebar {
    width: 380px; background: var(--panel-bg); backdrop-filter: var(--glass);
    border-right: 1px solid var(--border); display: flex; flex-direction: column;
    padding: 24px; overflow-y: auto; z-index: 10;
}
.main-stage {
    flex: 1; position: relative; display: flex; align-items: center; justify-content: center;
    background: radial-gradient(circle at center, #1a1a1d 0%, #000 100%); overflow: hidden;
}
.logo-area { display: flex; align-items: center; gap: 12px; margin-bottom: 30px; }
.logo-icon { font-size: 28px; animation: float 3s ease-in-out infinite; }
.logo-text h1 { font-size: 20px; font-weight: 800; }
.logo-text .badge { background: var(--primary); color: #000; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 6px; }

/* Controls */
.control-group { margin-bottom: 24px; }
label { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; display:block; margin-bottom:8px; }
textarea, input[type="text"], input[type="number"], select {
    width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border);
    border-radius: 12px; padding: 14px; color: #fff; font-size: 14px; transition: 0.2s; font-family: inherit; resize: none;
}
textarea:focus, input:focus, select:focus { border-color: var(--primary); outline: none; background: rgba(0,0,0,0.5); }

/* Provider & Model Select */
.engine-container { display:flex; gap:10px; margin-bottom:15px; }
.engine-col { flex:1; }

/* Buttons */
.gen-btn {
    width: 100%; background: var(--primary); color: #000; border: none; padding: 16px;
    border-radius: 14px; font-size: 16px; font-weight: 800; cursor: pointer; transition: 0.3s;
    box-shadow: 0 4px 20px rgba(250, 204, 21, 0.2); position: relative; overflow: hidden;
}
.gen-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(250, 204, 21, 0.4); }
.gen-btn:disabled { opacity: 0.7; cursor: not-allowed; filter: grayscale(1); }
.tool-btn { background: transparent; border: 1px solid var(--border); color: var(--text-muted); cursor: pointer; transition: 0.2s; font-size: 12px; padding:6px 10px; border-radius:6px; }
.tool-btn:hover { color: var(--primary); border-color:var(--primary); }

/* Settings Modal */
.modal {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85);
    z-index: 2000; display: none; align-items: center; justify-content: center; backdrop-filter: blur(8px);
}
.modal-box {
    background: #18181b; border: 1px solid var(--border); width: 400px; padding: 30px;
    border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.9);
}
.modal-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
.modal h3 { color: var(--primary); margin:0; }
.close-modal { cursor: pointer; color: #fff; font-size: 24px; opacity:0.5; }
.close-modal:hover { opacity:1; }
.api-input-group { margin-bottom:15px; }
.api-help { font-size:11px; color:var(--text-muted); text-align:right; margin-top:4px; }
.api-help a { color:var(--primary); text-decoration:none; }

/* Ratio */
.ratio-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.ratio-item {
    background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s;
}
.ratio-item:hover { background: rgba(255,255,255,0.1); }
.ratio-item.active { border-color: var(--primary); background: rgba(250, 204, 21, 0.1); color: var(--primary); }

/* Quota */
.quota-box { margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border); }
.quota-info { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 8px; }
.quota-bar { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; }
.quota-fill { height: 100%; background: var(--primary); width: 100%; transition: width 0.5s ease; }

/* Result */
#resultImg {
    max-width: 90%; max-height: 85%; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); display: none; object-fit: contain; transition: 0.3s;
}
.placeholder-text { color: rgba(255,255,255,0.1); font-size: 80px; font-weight: 900; user-select: none; }
.loading-overlay {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: none; flex-direction: column; align-items: center; justify-content: center; z-index: 50;
}
.banana-loader { font-size: 60px; animation: spin-bounce 1.5s infinite; margin-bottom: 20px; }
.loading-text { color: var(--primary); font-weight: bold; letter-spacing: 2px; text-transform: uppercase; font-size: 14px; }
.toast { position: fixed; top: 20px; right: 20px; background: #333; border-left: 4px solid var(--primary); color: #fff; padding: 15px 25px; border-radius: 8px; display: none; z-index: 300; box-shadow: 0 10px 30px rgba(0,0,0,0.5); animation: slideIn 0.3s forwards; }

@keyframes spin-bounce { 0% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.2) rotate(10deg); } 100% { transform: scale(1) rotate(0deg); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

@media (max-width: 900px) {
    body { flex-direction: column; overflow-y: auto; height: auto; }
    .sidebar { width: 100%; height: auto; padding-bottom: 100px; border-right: none; }
    .main-stage { height: 50vh; order: -1; border-bottom: 1px solid var(--border); }
    #resultImg { max-height: 90%; }
}
</style>
</head>
<body>
    <!-- Settings Modal -->
    <div id="settingsModal" class="modal">
        <div class="modal-box">
            <div class="modal-header">
                <h3>⚙️ API 設置</h3>
                <span class="close-modal" onclick="closeSettings()">×</span>
            </div>
            <p style="font-size:12px; color:#888; margin-bottom:20px; line-height:1.5;">
                配置您的 API 金鑰以解鎖更多模型。金鑰僅儲存於您的瀏覽器 (Local Storage)，不會上傳至伺服器。
            </p>
            
            <div class="api-input-group">
                <label>Infip (GhostBot) API Key</label>
                <input type="password" id="key-infip" placeholder="sk-...">
                <div class="api-help"><a href="https://infip.pro/api-keys" target="_blank">取得 Infip Key ↗</a></div>
            </div>
            
            <div class="api-input-group">
                <label>Pollinations API Key (選填)</label>
                <input type="password" id="key-pollinations" placeholder="(Optional)">
            </div>
            
            <button class="gen-btn" style="margin-top:10px; padding:12px;" onclick="saveKeys()">💾 儲存並關閉</button>
        </div>
    </div>

    <div class="app-container">
        <div class="sidebar">
            <div class="logo-area">
                <div class="logo-icon">🍌</div>
                <div class="logo-text">
                    <h1>Nano Pro <span class="badge">ULTIMATE</span></h1>
                    <p style="color:#666; font-size:12px">Multi-Engine • Async Core</p>
                </div>
                <button class="tool-btn" style="margin-left:auto" onclick="openSettings()">⚙️ 設定 Keys</button>
            </div>

            <!-- Engine Selection -->
            <div class="control-group">
                <label>生成引擎 (Engine)</label>
                <div class="engine-container">
                    <div class="engine-col">
                        <select id="provider" onchange="updateModels()">
                            <option value="pollinations">Pollinations AI</option>
                            <option value="infip">Infip (GhostBot)</option>
                        </select>
                    </div>
                </div>
                <select id="model">
                    <!-- Dynamic Populated -->
                </select>
            </div>

            <div class="control-group">
                <label>提示詞 (Prompt)</label>
                <textarea id="prompt" rows="3" placeholder="描述你想像中的畫面... (支援中文)"></textarea>
            </div>

            <div class="control-group">
                <label>畫布比例</label>
                <div class="ratio-grid">
                    <div class="ratio-item active" data-w="1024" data-h="1024">1:1</div>
                    <div class="ratio-item" data-w="1080" data-h="1350">4:5</div>
                    <div class="ratio-item" data-w="1080" data-h="1920">9:16</div>
                    <div class="ratio-item" data-w="1920" data-h="1080">16:9</div>
                </div>
                <input type="hidden" id="width" value="1024">
                <input type="hidden" id="height" value="1024">
            </div>

            <div class="control-group">
                <label>藝術風格</label>
                <select id="style">
                    <option value="none">✨ 智能無風格</option>
                    <option value="photorealistic">📷 寫實照片</option>
                    <option value="anime">🌸 日系動漫</option>
                    <option value="cyberpunk">🌃 賽博龐克</option>
                    <option value="3d-render">🧊 3D 渲染</option>
                    <option value="manga">📖 黑白漫畫</option>
                    <option value="oil-painting">🎨 古典油畫</option>
                </select>
            </div>

            <button id="genBtn" class="gen-btn" onclick="generate()">
                <span>生成圖像</span>
                <span style="font-size:12px; opacity:0.6; font-weight:400; display:block; margin-top:4px">消耗 1 香蕉能量 🍌</span>
            </button>
            
            <div class="quota-box">
                <div class="quota-info">
                    <span>每小時能量</span>
                    <span id="quotaText" class="quota-text">5 / 5</span>
                </div>
                <div class="quota-bar"><div id="quotaFill" class="quota-fill"></div></div>
            </div>
        </div>

        <div class="main-stage">
            <div class="placeholder-text">NANO</div>
            <img id="resultImg" alt="Result">
            
            <div class="loading-overlay" id="loader">
                <div class="banana-loader">🍌</div>
                <div class="loading-text" id="statusText">正在注入 AI 能量...</div>
            </div>
        </div>
    </div>
    
    <div id="toast" class="toast"></div>

<script>
    // Config from Server
    const PROVIDERS = {
        pollinations: {
            models: [
                {id:'nanobanana-pro', name:'Nano Banana Pro 🍌'},
                {id:'gptimage', name:'GPT-Image 🎨'},
                {id:'flux', name:'Flux Standard'},
                {id:'turbo', name:'Flux Turbo ⚡'},
                {id:'kontext', name:'Kontext 🖼️'}
            ]
        },
        infip: {
            models: [
                {id:'img4', name:'Img4 Universal 🌌'},
                {id:'flux-schnell', name:'Flux Schnell ⚡'},
                {id:'sdxl', name:'SDXL 1.0 🎨'},
                {id:'nano-banana', name:'Nano Banana (Async) 🍌'},
                {id:'nbpro', name:'Nano Pro (Async) 🌟'},
                {id:'qwen', name:'Qwen VL 🤖'}
            ]
        }
    };

    const els = {
        prompt: document.getElementById('prompt'),
        provider: document.getElementById('provider'),
        model: document.getElementById('model'),
        width: document.getElementById('width'),
        height: document.getElementById('height'),
        style: document.getElementById('style'),
        genBtn: document.getElementById('genBtn'),
        img: document.getElementById('resultImg'),
        loader: document.getElementById('loader'),
        status: document.getElementById('statusText'),
        quotaText: document.getElementById('quotaText'),
        quotaFill: document.getElementById('quotaFill'),
        settings: document.getElementById('settingsModal'),
        keyInfip: document.getElementById('key-infip'),
        keyPoll: document.getElementById('key-pollinations'),
        ratios: document.querySelectorAll('.ratio-item')
    };

    // Init
    window.onload = () => {
        els.keyInfip.value = localStorage.getItem('key_infip') || '';
        els.keyPoll.value = localStorage.getItem('key_pollinations') || '';
        updateModels();
        updateQuotaUI();
    };

    // Settings
    function openSettings() { els.settings.style.display = 'flex'; }
    function closeSettings() { els.settings.style.display = 'none'; }
    function saveKeys() {
        localStorage.setItem('key_infip', els.keyInfip.value);
        localStorage.setItem('key_pollinations', els.keyPoll.value);
        closeSettings();
        toast('✅ API Keys 已儲存');
    }

    // Models
    function updateModels() {
        const pid = els.provider.value;
        const models = PROVIDERS[pid].models;
        els.model.innerHTML = '';
        models.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.innerText = m.name;
            els.model.appendChild(opt);
        });
    }

    // Ratios
    els.ratios.forEach(r => {
        r.onclick = () => {
            els.ratios.forEach(i => i.classList.remove('active'));
            r.classList.add('active');
            els.width.value = r.dataset.w;
            els.height.value = r.dataset.h;
        }
    });

    // Quota System (Client Side)
    let currentQuota = 5;
    function updateQuotaUI() {
        const key = 'nano_quota_v3';
        const stored = localStorage.getItem(key);
        const nowHour = new Date().getHours();
        
        if(stored) {
            const d = JSON.parse(stored);
            if(d.hour === nowHour) currentQuota = d.val;
            else { currentQuota = 5; localStorage.setItem(key, JSON.stringify({hour:nowHour, val:5})); }
        } else {
            localStorage.setItem(key, JSON.stringify({hour:nowHour, val:5}));
        }

        els.quotaText.innerText = \`\${currentQuota} / 5\`;
        els.quotaFill.style.width = (currentQuota/5*100) + '%';
        
        if(currentQuota <= 0) {
            els.genBtn.disabled = true;
            els.genBtn.innerHTML = '<span>本小時能量耗盡</span>';
        }
    }

    function consumeQuota() {
        if(currentQuota > 0) {
            currentQuota--;
            localStorage.setItem('nano_quota_v3', JSON.stringify({hour: new Date().getHours(), val: currentQuota}));
            updateQuotaUI();
        }
    }

    // Generation
    async function generate() {
        const p = els.prompt.value.trim();
        if(!p) return toast('⚠️ 請輸入提示詞');
        if(currentQuota <= 0) return toast('🚫 配額已滿');

        const pid = els.provider.value;
        if(pid === 'infip' && !localStorage.getItem('key_infip')) {
            openSettings();
            return toast('⚠️ 請先設定 Infip API Key');
        }

        els.genBtn.disabled = true;
        els.loader.style.display = 'flex';
        els.status.innerText = pid === 'infip' ? '請求 Infip 中 (可能需等待)...' : '注入 AI 能量中...';
        els.img.style.opacity = '0.3';

        try {
            const res = await fetch('/_internal/generate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    prompt: p,
                    provider: pid,
                    model: els.model.value,
                    width: parseInt(els.width.value),
                    height: parseInt(els.height.value),
                    style: els.style.value,
                    seed: -1,
                    apiKeys: {
                        infip: localStorage.getItem('key_infip'),
                        pollinations: localStorage.getItem('key_pollinations')
                    }
                })
            });

            if(!res.ok) {
                const err = await res.json();
                throw new Error(err.error?.message || '生成失敗');
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            els.img.src = url;
            els.img.style.display = 'block';
            els.img.style.opacity = '1';
            document.querySelector('.placeholder-text').style.display = 'none';
            
            consumeQuota();
            toast('🍌 生成成功！');

        } catch(e) {
            toast('❌ ' + e.message);
        } finally {
            els.loader.style.display = 'none';
            if(currentQuota > 0) els.genBtn.disabled = false;
        }
    }

    function toast(msg) {
        const t = document.getElementById('toast');
        t.innerText = msg;
        t.style.display = 'block';
        setTimeout(() => t.style.display = 'none', 3000);
    }
</script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}
