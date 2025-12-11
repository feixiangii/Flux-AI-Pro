// =================================================================================
//  項目: multi-provider-image-generator (優化版)
//  版本: 9.0.0 (架構重構 + 性能優化)
//  作者: Enhanced by AI Assistant
//  日期: 2025-12-11
//  優化: 模塊化架構、性能提升、錯誤處理改進
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "multi-provider-image-generator",
  PROJECT_VERSION: "9.0.0",
  API_MASTER_KEY: "1",
  
  MODELS: {
    "flux": { id: "flux", name: "Flux", category: "flux", confirmed: true, description: "均衡速度與質量", optimization: { steps: { min: 15, optimal: 20, max: 30 }, guidance: 7.5 } },
    "flux-realism": { id: "flux-realism", name: "Flux Realism", category: "flux", confirmed: true, description: "超寫實風格", optimization: { steps: { min: 20, optimal: 28, max: 40 }, guidance: 8.5 } },
    "flux-anime": { id: "flux-anime", name: "Flux Anime", category: "flux", confirmed: true, description: "日系動漫風格", optimization: { steps: { min: 15, optimal: 20, max: 30 }, guidance: 7.0 } },
    "flux-3d": { id: "flux-3d", name: "Flux 3D", category: "flux", confirmed: true, description: "3D 渲染風格", optimization: { steps: { min: 15, optimal: 22, max: 35 }, guidance: 7.5 } },
    "flux-pro": { id: "flux-pro", name: "Flux Pro", category: "flux", confirmed: true, description: "專業版最高質量", optimization: { steps: { min: 25, optimal: 32, max: 45 }, guidance: 8.0 } },
    "any-dark": { id: "any-dark", name: "Any Dark", category: "flux", confirmed: true, description: "暗黑風格", optimization: { steps: { min: 18, optimal: 24, max: 35 }, guidance: 7.5 } },
    "turbo": { id: "turbo", name: "Turbo", category: "flux", confirmed: true, description: "極速生成", optimization: { steps: { min: 4, optimal: 8, max: 12 }, guidance: 2.5 } },
    "flux-1.1-pro": { id: "flux-1.1-pro", name: "Flux 1.1 Pro 🔥", category: "flux-advanced", confirmed: false, experimental: true, fallback: ["flux-pro", "flux-realism"], description: "最新 Flux 1.1", optimization: { steps: { min: 20, optimal: 28, max: 40 }, guidance: 8.0 } },
    "flux-kontext": { id: "flux-kontext", name: "Flux Kontext 🎨", category: "flux-advanced", confirmed: false, experimental: true, fallback: ["flux-pro", "flux-realism"], description: "圖像編輯標準版", optimization: { steps: { min: 22, optimal: 30, max: 40 }, guidance: 7.5 } },
    "flux-kontext-pro": { id: "flux-kontext-pro", name: "Flux Kontext Pro 💎", category: "flux-advanced", confirmed: false, experimental: true, fallback: ["flux-kontext", "flux-pro", "flux-realism"], description: "圖像編輯專業版", optimization: { steps: { min: 25, optimal: 35, max: 45 }, guidance: 8.0 } },
    "nanobanana": { id: "nanobanana", name: "Nano Banana 🍌", category: "gemini", confirmed: true, description: "Google Gemini 2.5 Flash 圖像生成 (快速版)", optimization: { steps: { min: 15, optimal: 20, max: 30 }, guidance: 7.0 } },
    "nanobanana-pro": { id: "nanobanana-pro", name: "Nano Banana Pro 🍌💎", category: "gemini", confirmed: true, description: "Google Gemini 3 Pro 圖像生成 (支持4K、繁中文字、14圖融合)", optimization: { steps: { min: 20, optimal: 28, max: 40 }, guidance: 8.0 } },
    "sd3": { id: "sd3", name: "Stable Diffusion 3 ⚡", category: "stable-diffusion", confirmed: false, experimental: true, fallback: ["flux-realism", "flux"], description: "SD3 標準版", optimization: { steps: { min: 18, optimal: 25, max: 35 }, guidance: 7.5 } },
    "sd3.5-large": { id: "sd3.5-large", name: "SD 3.5 Large 🔥", category: "stable-diffusion", confirmed: false, experimental: true, fallback: ["sd3", "flux-realism", "flux"], description: "SD 3.5 大模型", optimization: { steps: { min: 25, optimal: 35, max: 50 }, guidance: 8.0 } },
    "sd3.5-turbo": { id: "sd3.5-turbo", name: "SD 3.5 Turbo ⚡", category: "stable-diffusion", confirmed: false, experimental: true, fallback: ["turbo", "flux"], description: "SD 3.5 快速版", optimization: { steps: { min: 8, optimal: 12, max: 20 }, guidance: 3.0 } },
    "sdxl": { id: "sdxl", name: "SDXL 📐", category: "stable-diffusion", confirmed: false, experimental: true, fallback: ["flux-realism", "flux"], description: "經典 SDXL", optimization: { steps: { min: 20, optimal: 28, max: 40 }, guidance: 7.5 } },
    "sdxl-lightning": { id: "sdxl-lightning", name: "SDXL Lightning ⚡", category: "stable-diffusion", confirmed: false, experimental: true, fallback: ["turbo", "flux"], description: "SDXL 極速版", optimization: { steps: { min: 4, optimal: 6, max: 10 }, guidance: 2.0 } }
  },

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
        auto_translate: true
      }
    }
  },

  DEFAULT_PROVIDER: "pollinations",

  STYLE_PRESETS: {
    none: { name: "無 (使用原始提示詞)", prompt: "", negative: "" },
    "japanese-manga": { name: "日本漫畫 🇯🇵", prompt: "Japanese manga style, manga art, black and white manga, detailed linework, screentone, manga panel", negative: "photograph, realistic, 3d render, western comic" },
    "anime": { name: "動漫風格 ✨", prompt: "anime style, anime art, vibrant colors, anime character, detailed anime", negative: "realistic, photograph, 3d, ugly" },
    "vector": { name: "矢量圖 📐", prompt: "vector art, flat design, clean lines, minimalist, geometric shapes, vector illustration", negative: "photograph, realistic, textured, noisy" },
    "oil-painting": { name: "油畫 🎨", prompt: "oil painting, classical oil painting style, visible brushstrokes, rich colors, artistic", negative: "photograph, digital art, anime" },
    "watercolor": { name: "水彩畫 💧", prompt: "watercolor painting, soft colors, watercolor texture, artistic, hand-painted", negative: "photograph, digital, sharp edges" },
    "pixel-art": { name: "像素藝術 👾", prompt: "pixel art, 8-bit style, retro pixel graphics, pixelated", negative: "high resolution, smooth, realistic" },
    "cyberpunk": { name: "賽博朋克 🌃", prompt: "cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high-tech low-life", negative: "natural, rustic, medieval" },
    "fantasy": { name: "奇幻風格 🐉", prompt: "fantasy art, magical, epic fantasy, detailed fantasy illustration", negative: "modern, realistic, mundane" },
    "photorealistic": { name: "寫實照片 📷", prompt: "photorealistic, ultra realistic, 8k uhd, professional photography, detailed, sharp focus", negative: "anime, cartoon, illustration, painting" },
    "studio-ghibli": { name: "吉卜力風格 🌿", prompt: "Studio Ghibli style, Ghibli art, Hayao Miyazaki style, whimsical, detailed background", negative: "dark, gritty, realistic" },
    "comic-book": { name: "美式漫畫 💥", prompt: "comic book style, American comic art, bold lines, vibrant colors, superhero comic", negative: "photograph, manga, realistic" },
    "sketch": { name: "素描 ✏️", prompt: "pencil sketch, hand-drawn, sketch art, graphite drawing, artistic sketch", negative: "colored, painted, digital" }
  },

  QUALITY_MODES: {
    economy: { name: "經濟模式", description: "快速出圖，適合測試", min_resolution: 1024, steps_multiplier: 0.85, guidance_multiplier: 0.9, hd_level: "basic" },
    standard: { name: "標準模式", description: "平衡質量與速度", min_resolution: 1280, steps_multiplier: 1.0, guidance_multiplier: 1.0, hd_level: "enhanced" },
    ultra: { name: "超高清模式", description: "極致質量，耗時較長", min_resolution: 1536, steps_multiplier: 1.35, guidance_multiplier: 1.15, hd_level: "maximum", force_upscale: true }
  },

  HD_PROMPTS: {
    basic: "high quality, detailed, sharp",
    enhanced: "high quality, extremely detailed, sharp focus, crisp, clear, professional, 8k uhd, masterpiece, fine details",
    maximum: "ultra high quality, extremely detailed, razor sharp focus, crystal clear, professional grade, 8k uhd resolution, masterpiece quality, fine details, intricate details, perfect clarity"
  },

  HD_NEGATIVE: "low quality, blurry, pixelated, low resolution, jpeg artifacts, compression artifacts, bad quality, distorted, noisy, grainy, poor details, soft focus, out of focus",

  PRESET_SIZES: {
    "square": { width: 1024, height: 1024, name: "方形 1:1" },
    "portrait": { width: 768, height: 1344, name: "豎屏 9:16" },
    "landscape": { width: 1344, height: 768, name: "橫屏 16:9" },
    "standard-portrait": { width: 768, height: 1024, name: "標準豎屏 3:4" },
    "standard-landscape": { width: 1024, height: 768, name: "標準橫屏 4:3" },
    "ultrawide": { width: 1536, height: 640, name: "超寬屏 21:9" },
    "ultrawide-portrait": { width: 640, height: 1536, name: "超豎屏 9:21" },
    "custom": { width: 1024, height: 1024, name: "自定義" }
  },

  FETCH_TIMEOUT: 60000,
  MAX_RETRIES: 3,
  HISTORY: { MAX_ITEMS: 100, STORAGE_KEY: "flux_ai_history" }
};

// 日誌系統
class StructuredLogger {
  constructor(requestId = null) {
    this.requestId = requestId || this.generateRequestId();
    this.logs = [];
    this.startTime = Date.now();
  }

  generateRequestId() {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  add(step, data = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      requestId: this.requestId,
      step,
      data,
      elapsed: Date.now() - this.startTime
    };
    
    this.logs.push(entry);
    console.log(`[${step}]`, JSON.stringify({ ...entry, data }));
  }

  info(message, data = {}) { this.add(`ℹ️ ${message}`, data); }
  success(message, data = {}) { this.add(`✅ ${message}`, data); }
  error(message, error = null) { this.add(`❌ ${message}`, { error: error?.message, stack: error?.stack?.split('\n').slice(0, 3) }); }
  warn(message, data = {}) { this.add(`⚠️ ${message}`, data); }
  get() { return this.logs; }
  getSummary() { return { requestId: this.requestId, totalTime: Date.now() - this.startTime, steps: this.logs.length, errors: this.logs.filter(log => log.step.includes('❌')).length }; }
}

// 性能監控
class PerformanceMonitor {
  static startTimer(name, logger = null) {
    return {
      name, start: Date.now(), logger,
      end() {
        const duration = Date.now() - this.start;
        const message = `${this.name}: ${duration}ms`;
        if (this.logger) { this.logger.add(`⏱️ ${message}`); } else { console.log(`⏱️ ${message}`); }
        return duration;
      }
    };
  }
}

// 參數驗證
class ParameterValidator {
  static validateImageOptions(options) {
    const errors = [];
    if (!options.width || options.width < 256 || options.width > 2048) errors.push("寬度必須在 256-2048 之間");
    if (!options.height || options.height < 256 || options.height > 2048) errors.push("高度必須在 256-2048 之間");
    if (options.model && !CONFIG.MODELS[options.model]) errors.push(`不支持的模型: ${options.model}`);
    if (options.style && !CONFIG.STYLE_PRESETS[options.style]) errors.push(`不支持的風格: ${options.style}`);
    if (options.qualityMode && !CONFIG.QUALITY_MODES[options.qualityMode]) errors.push(`不支持的質量模式: ${options.qualityMode}`);
    if (options.numOutputs && (options.numOutputs < 1 || options.numOutputs > 4)) errors.push("生成數量必須在 1-4 之間");
    if (errors.length > 0) throw new Error(`參數驗證失敗: ${errors.join(", ")}`);
    return true;
  }

  static sanitizePrompt(prompt) {
    if (!prompt || typeof prompt !== 'string') throw new Error("提示詞不能為空");
    return prompt.trim().substring(0, 2000);
  }
}

// HTTP 工具
class HttpUtils {
  static async fetchWithTimeout(url, options = {}, timeout = CONFIG.FETCH_TIMEOUT) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') throw new Error(`請求超時 (${timeout}ms)`);
      throw error;
    }
  }

  static getCORSHeaders(additionalHeaders = {}) {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
      ...additionalHeaders
    };
  }

  static createJSONResponse(data, status = 200, additionalHeaders = {}) {
    return new Response(JSON.stringify(data), {
      status,
      headers: this.getCORSHeaders({ 'Content-Type': 'application/json', ...additionalHeaders })
    });
  }

  static createErrorResponse(message, status = 500, details = {}) {
    return this.createJSONResponse({
      error: { message, type: 'api_error', timestamp: new Date().toISOString(), ...details }
    }, status);
  }
}

// 翻譯服務
async function translateToEnglish(text, env) {
  try {
    const hasChinese = /[\u4e00-\u9fa5]/.test(text);
    if (!hasChinese) return { text: text, translated: false };

    if (env?.AI) {
      const response = await env.AI.run("@cf/meta/m2m100-1.2b", {
        text: text, source_lang: "chinese", target_lang: "english"
      });
      return { text: response.translated_text || text, translated: true, original: text };
    }

    return { text: text, translated: false };
  } catch (e) {
    console.error("Translation error:", e);
    return { text: text, translated: false, error: e.message };
  }
}

// 提示詞分析
class PromptAnalyzer {
  static analyzeComplexity(prompt) {
    const complexKeywords = ['detailed', 'intricate', 'complex', 'elaborate', 'realistic', 'photorealistic', 'hyperrealistic', 'architecture', 'cityscape', 'landscape', 'portrait', 'face', 'eyes', 'hair', 'texture', 'material', 'fabric', 'skin', 'lighting', 'shadows', 'reflections', 'fine details', 'high detail', 'ultra detailed'];
    
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
    const modelConfig = CONFIG.MODELS[model];
    
    if (modelConfig?.category === 'gemini' && model.includes('pro')) return 'ultra';
    if (complexity > 0.7) return 'ultra';
    if (complexity > 0.4) return 'standard';
    return 'economy';
  }
}

// HD 優化器
class HDOptimizer {
  static optimize(prompt, negativePrompt, model, width, height, qualityMode = 'standard', autoHD = true) {
    if (!autoHD) return { prompt: prompt, negativePrompt: negativePrompt, width: width, height: height, optimized: false };

    const modeConfig = CONFIG.QUALITY_MODES[qualityMode];
    const optimizations = [];

    let enhancedPrompt = prompt;
    let enhancedNegative = negativePrompt || "";
    let finalWidth = width;
    let finalHeight = height;

    if (modeConfig?.hd_level && CONFIG.HD_PROMPTS[modeConfig.hd_level]) {
      const hdBoost = CONFIG.HD_PROMPTS[modeConfig.hd_level];
      enhancedPrompt = `${prompt}, ${hdBoost}`;
      optimizations.push(`HD增強: ${modeConfig.hd_level}`);
    }

    if (qualityMode !== 'economy') {
      enhancedNegative = enhancedNegative ? `${enhancedNegative}, ${CONFIG.HD_NEGATIVE}` : CONFIG.HD_NEGATIVE;
      optimizations.push("負面提示詞: 高清過濾");
    }

    const minRes = modeConfig?.min_resolution || 1024;
    const currentRes = Math.min(width, height);
    let sizeUpscaled = false;

    if (currentRes < minRes || modeConfig?.force_upscale) {
      const scale = minRes / currentRes;
      finalWidth = Math.min(Math.round(width * scale / 64) * 64, 2048);
      finalHeight = Math.min(Math.round(height * scale / 64) * 64, 2048);
      sizeUpscaled = true;
      optimizations.push(`尺寸優化: ${width}x${height} → ${finalWidth}x${finalHeight}`);
    }

    return {
      prompt: enhancedPrompt, negativePrompt: enhancedNegative, width: finalWidth, height: finalHeight,
      optimized: true, quality_mode: qualityMode, hd_level: modeConfig?.hd_level,
      optimizations: optimizations, size_upscaled: sizeUpscaled
    };
  }
}

// 參數優化器
class ParameterOptimizer {
  static optimizeSteps(model, width, height, style = 'none', qualityMode = 'standard', userSteps = null) {
    if (userSteps !== null && userSteps !== -1) {
      const suggestion = this.calculateOptimalSteps(model, width, height, style, qualityMode);
      return { steps: userSteps, optimized: false, suggested: suggestion.steps, reasoning: suggestion.reasoning, user_override: true };
    }
    return this.calculateOptimalSteps(model, width, height, style, qualityMode);
  }

  static calculateOptimalSteps(model, width, height, style, qualityMode) {
    const modelConfig = CONFIG.MODELS[model];
    const modeConfig = CONFIG.QUALITY_MODES[qualityMode];
    
    if (!modelConfig?.optimization) return { steps: 20, optimized: false, reasoning: "使用默認步數" };

    const baseSteps = modelConfig.optimization.steps.optimal;
    const reasoning = [`${model}: ${baseSteps}步`];

    const totalPixels = width * height;
    let sizeMultiplier = 1.0;
    
    if (totalPixels <= 512 * 512) {
      sizeMultiplier = 0.8;
    } else if (totalPixels >= 1536 * 1536) {
      sizeMultiplier = 1.15;
      reasoning.push(`大尺寸 x${sizeMultiplier}`);
    } else if (totalPixels >= 2048 * 2048) {
      sizeMultiplier = 1.3;
      reasoning.push(`超大 x${sizeMultiplier}`);
    }

    const qualityMultiplier = modeConfig?.steps_multiplier || 1.0;
    if (qualityMultiplier !== 1.0) reasoning.push(`${modeConfig.name} x${qualityMultiplier}`);

    const styleMultipliers = { "photorealistic": 1.1, "oil-painting": 1.05, "watercolor": 0.95, "pixel-art": 0.85, "sketch": 0.9, "vector": 0.85 };
    const styleMultiplier = styleMultipliers[style] || 1.0;

    let optimizedSteps = Math.round(baseSteps * sizeMultiplier * qualityMultiplier * styleMultiplier);
    
    const minSteps = modelConfig.optimization.steps.min;
    const maxSteps = modelConfig.optimization.steps.max;
    optimizedSteps = Math.max(minSteps, Math.min(optimizedSteps, maxSteps));

    reasoning.push(`→ ${optimizedSteps}步`);

    return { steps: optimizedSteps, optimized: true, reasoning: reasoning.join(' ') };
  }

  static optimizeGuidance(model, style, qualityMode = 'standard') {
    const modelConfig = CONFIG.MODELS[model];
    const modeConfig = CONFIG.QUALITY_MODES[qualityMode];
    
    let baseGuidance = modelConfig?.optimization?.guidance || 7.5;
    
    if (model.includes('turbo') || model.includes('lightning')) {
      baseGuidance = style === 'photorealistic' ? 3.0 : 2.5;
    } else if (style === 'photorealistic') {
      baseGuidance = 8.5;
    } else if (['oil-painting', 'watercolor', 'sketch'].includes(style)) {
      baseGuidance = 6.5;
    }

    const qualityBoost = modeConfig?.guidance_multiplier || 1.0;
    return Math.round(baseGuidance * qualityBoost * 10) / 10;
  }
}

// 風格處理器
class StyleProcessor {
  static applyStyle(prompt, style, negativePrompt) {
    const styleConfig = CONFIG.STYLE_PRESETS[style];
    
    if (!styleConfig || style === 'none') {
      return { enhancedPrompt: prompt, enhancedNegative: negativePrompt };
    }

    let enhancedPrompt = prompt;
    if (styleConfig.prompt) enhancedPrompt = `${prompt}, ${styleConfig.prompt}`;

    let enhancedNegative = negativePrompt || "";
    if (styleConfig.negative) {
      enhancedNegative = enhancedNegative ? `${enhancedNegative}, ${styleConfig.negative}` : styleConfig.negative;
    }

    return { enhancedPrompt, enhancedNegative };
  }
}

// Pollinations 提供商
class PollinationsProvider {
  constructor(config, env) {
    this.config = config;
    this.env = env;
    this.name = config.name;
  }

  async generate(prompt, options, logger) {
    try {
      ParameterValidator.validateImageOptions(options);
      
      const complexity = PromptAnalyzer.analyzeComplexity(prompt);
      const recommendedQuality = PromptAnalyzer.recommendQualityMode(prompt, options.model);
      
      logger.add("🧠 Prompt Analysis", {
        complexity: (complexity * 100).toFixed(1) + '%',
        recommended_quality: recommendedQuality,
        selected_quality: options.qualityMode
      });

      let finalPrompt = prompt;
      let finalNegativePrompt = options.negativePrompt;
      let finalWidth = options.width;
      let finalHeight = options.height;
      let finalSteps = options.steps;
      let finalGuidance = options.guidance;

      if (options.autoHD) {
        const hdResult = HDOptimizer.optimize(prompt, options.negativePrompt, options.model, options.width, options.height, options.qualityMode, options.autoHD);
        finalPrompt = hdResult.prompt;
        finalNegativePrompt = hdResult.negativePrompt;
        finalWidth = hdResult.width;
        finalHeight = hdResult.height;
        
        if (hdResult.optimized) {
          logger.add("🎨 HD Optimization", {
            mode: options.qualityMode, hd_level: hdResult.hd_level,
            original: `${options.width}x${options.height}`, optimized: `${hdResult.width}x${hdResult.height}`,
            upscaled: hdResult.size_upscaled, details: hdResult.optimizations
          });
        }
      }

      if (options.autoOptimize) {
        const stepsResult = ParameterOptimizer.optimizeSteps(options.model, finalWidth, finalHeight, options.style, options.qualityMode, options.steps);
        finalSteps = stepsResult.steps;
        logger.add("🎯 Steps Optimization", { steps: stepsResult.steps, reasoning: stepsResult.reasoning });

        if (options.guidance === null) {
          finalGuidance = ParameterOptimizer.optimizeGuidance(options.model, options.style, options.qualityMode);
        }
      } else {
        finalSteps = options.steps || 20;
        finalGuidance = options.guidance || 7.5;
      }

      const { enhancedPrompt, enhancedNegative } = StyleProcessor.applyStyle(finalPrompt, options.style, finalNegativePrompt);
      const translation = await translateToEnglish(enhancedPrompt, this.env);
      const finalPromptForAPI = translation.text;

      if (translation.translated) {
        logger.add("🌐 Auto Translation", {
          original_zh: translation.original,
          translated_en: finalPromptForAPI,
          success: true
        });
      }

      const modelConfig = CONFIG.MODELS[options.model];
      const modelsToTry = [options.model];
      if (modelConfig?.experimental && modelConfig?.fallback) {
        modelsToTry.push(...modelConfig.fallback);
      }

      logger.add("🎨 Generation Config", {
        provider: this.name, model: options.model, dimensions: `${finalWidth}x${finalHeight}`,
        quality_mode: options.qualityMode, hd_optimized: options.autoHD,
        auto_translated: translation.translated, steps: finalSteps, guidance: finalGuidance
      });

      const currentSeed = options.seed === -1 ? Math.floor(Math.random() * 1000000) : options.seed;
      let fullPrompt = finalPromptForAPI;
      if (enhancedNegative && enhancedNegative.trim()) {
        fullPrompt = `${finalPromptForAPI} [negative: ${enhancedNegative}]`;
      }

      for (const tryModel of modelsToTry) {
        for (let retry = 0; retry < CONFIG.MAX_RETRIES; retry++) {
          try {
            const encodedPrompt = encodeURIComponent(fullPrompt);
            let url = `${this.config.endpoint}/prompt/${encodedPrompt}`;
            
            const params = new URLSearchParams({
              model: tryModel,
              width: finalWidth.toString(),
              height: finalHeight.toString(),
              seed: currentSeed.toString(),
              nologo: (options.nologo !== false).toString(),
              enhance: (options.enhance === true).toString(),
              private: (options.privateMode !== false).toString()
            });

            if (finalGuidance && finalGuidance !== 7.5) params.append('guidance', finalGuidance.toString());
            if (finalSteps && finalSteps !== 20) params.append('steps', finalSteps.toString());

            url += '?' + params.toString();

            const response = await HttpUtils.fetchWithTimeout(url, {
              method: 'GET',
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'image/*,*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Referer': 'https://pollinations.ai/'
              }
            }, 45000);

            if (response.ok) {
              const contentType = response.headers.get('content-type');
              if (contentType && contentType.startsWith('image/')) {
                logger.add("✅ Success", {
                  url: response.url, used_model: tryModel, final_size: `${finalWidth}x${finalHeight}`,
                  quality_mode: options.qualityMode, seed: currentSeed
                });

                return {
                  url: response.url, provider: this.name, model: tryModel, requested_model: options.model,
                  seed: currentSeed, style: options.style, steps: finalSteps, guidance: finalGuidance,
                  width: finalWidth, height: finalHeight, quality_mode: options.qualityMode,
                  prompt_complexity: complexity, hd_optimized: options.autoHD,
                  auto_translated: translation.translated, cost: "FREE",
                  fallback_used: tryModel !== options.model, auto_optimized: options.autoOptimize
                };
              } else {
                throw new Error(`Invalid content type: ${contentType}`);
              }
            } else {
              throw new Error(`HTTP ${response.status}`);
            }
          } catch (e) {
            if (retry < CONFIG.MAX_RETRIES - 1) {
              await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
            }
          }
        }
      }

      throw new Error("All models failed");
    } catch (error) {
      logger.error("生成失敗", error);
      throw error;
    }
  }
}

// 多提供商路由器
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
    
    logger.info("Router initialized", { provider: providerName, outputs: numOutputs });

    const results = [];
    
    for (let i = 0; i < numOutputs; i++) {
      const currentOptions = { ...options, seed: options.seed === -1 ? -1 : options.seed + i };
      const result = await provider.generate(prompt, currentOptions, logger);
      results.push(result);
    }

    return results;
  }
}

// 處理器
async function handleImageGenerations(request, env) {
  const logger = new StructuredLogger();
  
  try {
    const body = await request.json();
    logger.info("Request received", { 
      prompt_length: body.prompt?.length, model: body.model,
      size: body.size || `${body.width}x${body.height}`
    });

    const prompt = ParameterValidator.sanitizePrompt(body.prompt);
    
    let width = 1024, height = 1024;
    if (body.size) {
      const [w, h] = body.size.split('x').map(Number);
      if (w && h) { width = w; height = h; }
    }
    if (body.width) width = body.width;
    if (body.height) height = body.height;

    const options = {
      provider: body.provider || null, model: body.model || "flux",
      width: Math.min(Math.max(width, 256), 2048), height: Math.min(Math.max(height, 256), 2048),
      numOutputs: Math.min(Math.max(body.n || 1, 1), 4), seed: body.seed !== undefined ? body.seed : -1,
      negativePrompt: body.negative_prompt || "", guidance: body.guidance_scale || null,
      steps: body.steps || null, enhance: body.enhance === true, nologo: body.nologo !== false,
      privateMode: body.private !== false, style: body.style || "none",
      autoOptimize: body.auto_optimize !== false, autoHD: body.auto_hd !== false,
      qualityMode: body.quality_mode || 'standard'
    };

    const router = new MultiProviderRouter({}, env);
    const results = await router.generate(prompt, options, logger);
    
    logger.success("Request completed", { results_count: results.length });

    return HttpUtils.createJSONResponse({
      created: Math.floor(Date.now() / 1000),
      data: results.map(r => ({
        url: r.url, provider: r.provider, model: r.model, seed: r.seed,
        width: r.width, height: r.height, style: r.style, quality_mode: r.quality_mode,
        prompt_complexity: r.prompt_complexity, steps: r.steps, guidance: r.guidance,
        auto_optimized: r.auto_optimized, hd_optimized: r.hd_optimized,
        auto_translated: r.auto_translated, cost: r.cost
      }))
    });

  } catch (error) {
    logger.error("Request failed", error);
    return HttpUtils.createErrorResponse(error.message, 500, { debug_logs: logger.get() });
  }
}

async function handleChatCompletions(request, env) {
  const logger = new StructuredLogger();
  
  try {
    const body = await request.json();
    const isWebUI = body.is_web_ui === true;
    
    const messages = body.messages || [];
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg) throw new Error("No messages found");

    let prompt = "";
    if (typeof lastMsg.content === 'string') {
      prompt = lastMsg.content;
    } else if (Array.isArray(lastMsg.content)) {
      for (const part of lastMsg.content) {
        if (part.type === 'text') prompt += part.text + " ";
      }
    }

    prompt = ParameterValidator.sanitizePrompt(prompt);

    const options = {
      provider: body.provider || null, model: body.model || "flux",
      width: body.width || 1024, height: body.height || 1024,
      numOutputs: Math.min(Math.max(body.n || 1, 1), 4), seed: body.seed !== undefined ? body.seed : -1,
      negativePrompt: body.negative_prompt || "", guidance: body.guidance_scale || null,
      steps: body.steps || null, enhance: body.enhance === true, nologo: body.nologo !== false,
      privateMode: body.private !== false, style: body.style || "none",
      autoOptimize: body.auto_optimize !== false, autoHD: body.auto_hd !== false,
      qualityMode: body.quality_mode || 'standard'
    };

    const router = new MultiProviderRouter({}, env);
    const results = await router.generate(prompt, options, logger);

    let respContent = "";
    results.forEach((result, index) => {
      respContent += `![Generated Image ${index + 1}](${result.url})\n`;
    });

    const respId = `chatcmpl-${crypto.randomUUID()}`;

    if (body.stream) {
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      const encoder = new TextEncoder();

      (async () => {
        try {
          if (isWebUI) {
            await writer.write(encoder.encode(`data: ${JSON.stringify({ debug: logger.get() })}\n\n`));
          }

          const chunk = {
            id: respId, object: 'chat.completion.chunk', created: Math.floor(Date.now() / 1000),
            model: options.model, choices: [{ index: 0, delta: { content: respContent }, finish_reason: null }]
          };
          
          await writer.write(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));

          const endChunk = {
            id: respId, object: 'chat.completion.chunk', created: Math.floor(Date.now() / 1000),
            model: options.model, choices: [{ index: 0, delta: {}, finish_reason: 'stop' }]
          };
          
          await writer.write(encoder.encode(`data: ${JSON.stringify(endChunk)}\n\n`));
          await writer.write(encoder.encode('data: [DONE]\n\n'));
          
        } finally {
          await writer.close();
        }
      })();

      return new Response(readable, {
        headers: HttpUtils.getCORSHeaders({ 'Content-Type': 'text/event-stream' })
      });
    } else {
      return HttpUtils.createJSONResponse({
        id: respId, object: "chat.completion", created: Math.floor(Date.now() / 1000),
        model: options.model, choices: [{
          index: 0, message: { role: "assistant", content: respContent }, finish_reason: "stop"
        }]
      });
    }

  } catch (error) {
    logger.error("Chat completion failed", error);
    return HttpUtils.createErrorResponse(error.message, 500, { debug_logs: logger.get() });
  }
}

function handleModelsRequest() {
  const models = [];
  
  for (const [providerKey, providerConfig] of Object.entries(CONFIG.PROVIDERS)) {
    if (providerConfig.enabled) {
      for (const [modelId, modelConfig] of Object.entries(CONFIG.MODELS)) {
        models.push({
          id: modelConfig.id, object: 'model', name: modelConfig.name,
          provider: providerKey, category: modelConfig.category,
          confirmed: modelConfig.confirmed || false, experimental: modelConfig.experimental || false,
          description: modelConfig.description
        });
      }
    }
  }

  return HttpUtils.createJSONResponse({ object: 'list', data: models, total: models.length });
}

function handleProvidersRequest() {
  const providers = {};
  
  for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
    providers[key] = {
      name: config.name, endpoint: config.endpoint, auth_mode: config.auth_mode,
      enabled: config.enabled, features: config.features
    };
  }

  return HttpUtils.createJSONResponse({ object: 'list', data: providers });
}

function handleStylesRequest() {
  const styles = Object.entries(CONFIG.STYLE_PRESETS).map(([key, value]) => ({
    id: key, name: value.name, prompt_addition: value.prompt, negative_addition: value.negative
  }));

  return HttpUtils.createJSONResponse({ object: 'list', data: styles });
}

function handleUI() {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); color: #fff; padding: 20px; min-height: 100vh; }
        .container { max-width: 1400px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 15px; }
        h1 { color: #f59e0b; margin: 0; font-size: 36px; font-weight: 800; text-shadow: 0 0 30px rgba(245, 158, 11, 0.6); }
        .badge { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 6px 14px; border-radius: 20px; font-size: 14px; margin-left: 10px; }
        .subtitle { color: #9ca3af; margin-top: 8px; font-size: 15px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
        .box { background: rgba(26, 26, 26, 0.95); padding: 24px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); }
        h3 { color: #f59e0b; margin-bottom: 18px; font-size: 18px; font-weight: 700; }
        label { display: block; margin: 16px 0 8px 0; color: #e5e7eb; font-weight: 600; font-size: 13px; }
        select, textarea, input { width: 100%; padding: 12px; margin: 0; background: #2a2a2a; border: 1px solid #444; color: #fff; border-radius: 10px; font-size: 14px; font-family: inherit; transition: all 0.3s; }
        select:focus, textarea:focus, input:focus { outline: none; border-color: #f59e0b; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15); }
        textarea { resize: vertical; min-height: 90px; }
        button { width: 100%; padding: 16px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #fff; border: none; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; margin-top: 20px; transition: all 0.3s; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4); }
        button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(245, 158, 11, 0.6); }
        button:disabled { background: #555; cursor: not-allowed; transform: none; box-shadow: none; }
        #result { margin-top: 20px; }
        .success { background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; padding: 16px; border-radius: 12px; color: #10b981; }
        .error { background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; padding: 16px; border-radius: 12px; color: #ef4444; }
        .timer { margin-top: 10px; font-size: 16px; font-weight: 600; color: #10b981; animation: pulse 1.5s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        .result-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px; }
        .result img { width: 100%; border-radius: 12px; cursor: pointer; transition: transform 0.3s; }
        .result img:hover { transform: scale(1.02); }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div>
                <h1>🎨 Flux AI Pro<span class="badge">v${CONFIG.PROJECT_VERSION}</span></h1>
                <p class="subtitle">19個模型 · 12種風格 · 3檔質量 · 智能HD優化 · 🍌 Nano Banana · 性能監控</p>
            </div>
        </div>
        
        <div class="grid">
            <div class="box">
                <h3>📝 生成設置</h3>
                <label>提示詞 *</label>
                <textarea id="prompt" placeholder="Describe your image..."></textarea>
                
                <label>負面提示詞</label>
                <textarea id="negativePrompt" placeholder="low quality, blurry, distorted"></textarea>
                
                <label>AI 模型</label>
                <select id="model">
                    ${Object.entries(CONFIG.MODELS).map(([id, model]) => 
                        `<option value="${id}">${model.name}</option>`
                    ).join('')}
                </select>
                
                <label>藝術風格</label>
                <select id="style">
                    ${Object.entries(CONFIG.STYLE_PRESETS).map(([k, v]) => 
                        `<option value="${k}">${v.name}</option>`
                    ).join('')}
                </select>
                
                <label>質量模式</label>
                <select id="qualityMode">
                    ${Object.entries(CONFIG.QUALITY_MODES).map(([k, v]) => 
                        `<option value="${k}">${v.name} - ${v.description}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div class="box">
                <h3>🎨 圖像參數</h3>
                <label>尺寸預設</label>
                <select id="sizePreset">
                    ${Object.entries(CONFIG.PRESET_SIZES).map(([k, v]) => 
                        `<option value="${k}" ${k === 'square' ? 'selected' : ''}>${v.name} (${v.width}x${v.height})</option>`
                    ).join('')}
                </select>
                
                <label>寬度: <span id="widthValue">1024</span>px</label>
                <input type="range" id="width" min="256" max="2048" step="64" value="1024">
                
                <label>高度: <span id="heightValue">1024</span>px</label>
                <input type="range" id="height" min="256" max="2048" step="64" value="1024">
                
                <label>生成數量</label>
                <select id="numOutputs">
                    <option value="1" selected>1 張</option>
                    <option value="2">2 張</option>
                    <option value="3">3 張</option>
                    <option value="4">4 張</option>
                </select>
                
                <label>隨機種子 (-1 = 隨機)</label>
                <input type="number" id="seed" value="-1" min="-1" max="1000000">
                
                <button onclick="generate()">🚀 開始生成</button>
            </div>
        </div>
        
        <div id="result"></div>
    </div>
    
    <script>
        let generationTimer = null;
        let startTime = 0;
        
        function updateTimer() {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            const resultDiv = document.getElementById('result');
            const timerElement = resultDiv.querySelector('.timer');
            if (timerElement) {
                timerElement.textContent = \`⏱️ 已耗時: \${elapsed} 秒\`;
            }
        }
        
        const widthSlider = document.getElementById('width');
        const heightSlider = document.getElementById('height');
        const widthValue = document.getElementById('widthValue');
        const heightValue = document.getElementById('heightValue');
        const sizePreset = document.getElementById('sizePreset');
        
        widthSlider.oninput = () => widthValue.textContent = widthSlider.value;
        heightSlider.oninput = () => heightValue.textContent = heightSlider.value;
        
        sizePreset.onchange = () => {
            const preset = ${JSON.stringify(CONFIG.PRESET_SIZES)}[sizePreset.value];
            if (preset && sizePreset.value !== 'custom') {
                widthSlider.value = preset.width;
                heightSlider.value = preset.height;
                widthValue.textContent = preset.width;
                heightValue.textContent = preset.height;
            }
        };
        
        async function generate() {
            const prompt = document.getElementById('prompt').value.trim();
            if (!prompt) {
                alert('請輸入提示詞');
                return;
            }
            
            const resultDiv = document.getElementById('result');
            const button = document.querySelector('button[onclick="generate()"]');
            
            button.disabled = true;
            button.textContent = '生成中...';
            startTime = Date.now();
            
            resultDiv.innerHTML = '<div class="success"><strong>⏳ 正在生成圖像，請稍候...</strong><div class="timer">⏱️ 已耗時: 0.0 秒</div></div>';
            generationTimer = setInterval(updateTimer, 100);
            
            const params = {
                prompt: prompt,
                negative_prompt: document.getElementById('negativePrompt').value,
                model: document.getElementById('model').value,
                style: document.getElementById('style').value,
                width: parseInt(widthSlider.value),
                height: parseInt(heightSlider.value),
                n: parseInt(document.getElementById('numOutputs').value),
                seed: parseInt(document.getElementById('seed').value),
                quality_mode: document.getElementById('qualityMode').value,
                auto_optimize: true,
                auto_hd: true
            };
            
            try {
                const response = await fetch('/v1/images/generations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(params)
                });
                
                const data = await response.json();
                
                if (!response.ok) throw new Error(data.error?.message || '生成失敗');
                
                clearInterval(generationTimer);
                const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
                
                resultDiv.innerHTML = \`<div class="success"><strong>✅ 生成成功!</strong> <span style="color:#10b981;font-weight:600">總耗時: \${totalTime} 秒</span></div>\`;
                resultDiv.innerHTML += '<div class="result-grid">';
                
                data.data.forEach((item, index) => {
                    resultDiv.innerHTML += \`<div class="result"><img src="\${item.url}" alt="Generated \${index+1}" onclick="window.open('\${item.url}')"><p style="margin-top:12px;font-size:13px;color:#9ca3af">\${item.model} | \${item.width}x\${item.height} | \${item.quality_mode}\${item.auto_translated?' | 🌐 已翻譯':''}</p></div>\`;
                });
                
                resultDiv.innerHTML += '</div>';
                
            } catch (error) {
                clearInterval(generationTimer);
                resultDiv.innerHTML = \`<div class="error"><strong>❌ 錯誤</strong><p style="margin-top:12px">\${error.message}</p></div>\`;
            } finally {
                button.disabled = false;
                button.textContent = '🚀 開始生成';
            }
        }
    </script>
</body>
</html>`;

  return new Response(html, {
    headers: HttpUtils.getCORSHeaders({ 'Content-Type': 'text/html; charset=utf-8' })
  });
}

// 主入口
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: HttpUtils.getCORSHeaders() });
    }

    try {
      if (url.pathname === '/') {
        return handleUI();
      } else if (url.pathname === '/v1/chat/completions') {
        return handleChatCompletions(request, env);
      } else if (url.pathname === '/v1/images/generations') {
        return handleImageGenerations(request, env);
      } else if (url.pathname === '/v1/models') {
        return handleModelsRequest();
      } else if (url.pathname === '/v1/providers') {
        return handleProvidersRequest();
      } else if (url.pathname === '/v1/styles') {
        return handleStylesRequest();
      } else if (url.pathname === '/health') {
        return HttpUtils.createJSONResponse({
          status: 'ok', version: CONFIG.PROJECT_VERSION, timestamp: new Date().toISOString(),
          features: ['19 Models', '12 Styles', '3 Quality Modes', 'Smart Analysis', 'Auto HD', 'History', 'Auto Chinese Translation', 'Nano Banana Models', 'Real-time Timer', 'Performance Monitoring']
        });
      } else {
        return HttpUtils.createJSONResponse({
          project: CONFIG.PROJECT_NAME, version: CONFIG.PROJECT_VERSION,
          features: ['19 Models', '12 Styles', '3 Quality Modes', 'Smart Analysis', 'Auto HD', 'History', 'Auto Chinese Translation', 'Nano Banana Models', 'Real-time Timer', 'Performance Monitoring'],
          endpoints: ['/v1/images/generations', '/v1/chat/completions', '/v1/models', '/v1/providers', '/v1/styles', '/health']
        });
      }
    } catch (error) {
      console.error('Worker error:', error);
      return HttpUtils.createErrorResponse(error.message, 500);
    }
  }
};
