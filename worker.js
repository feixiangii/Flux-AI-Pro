// =================================================================================
//  項目: Flux AI Pro - Ultimate Edition (v9.9.0)
//  功能: 全功能 UI + IndexedDB 永久存檔 (解決死圖) + 雙引擎架構
//  配置: 45+ 藝術風格完整版
// =================================================================================

const CONFIG = {
  PROJECT_VERSION: "9.9.0-pro",
  FETCH_TIMEOUT: 120000,
  MAX_RETRIES: 3,
  
  POLLINATIONS_AUTH: {
    enabled: true,
    token: "", // 將從 env 讀取
    method: "header"
  },
  
  PRESET_SIZES: {
    "square-1k": { name: "方形 1024x1024", width: 1024, height: 1024 },
    "square-1.5k": { name: "方形 1536x1536", width: 1536, height: 1536 },
    "square-2k": { name: "方形 2048x2048", width: 2048, height: 2048 },
    "portrait-9-16-hd": { name: "豎屏 9:16 HD", width: 1080, height: 1920 },
    "landscape-16-9-hd": { name: "橫屏 16:9 HD", width: 1920, height: 1080 },
    "instagram-square": { name: "IG 方形", width: 1080, height: 1080 },
    "wallpaper-fhd": { name: "桌布 Full HD", width: 1920, height: 1080 }
  },
  
  PROVIDERS: {
    pollinations: {
      endpoint: "https://gen.pollinations.ai",
      models: [
        { id: "gptimage", name: "GPT-Image 🎨", category: "gptimage", supports_reference_images: false },
        { id: "gptimage-large", name: "GPT-Image Large 🌟", category: "gptimage", supports_reference_images: false },
        { id: "zimage", name: "Z-Image Turbo ⚡", category: "zimage", supports_reference_images: false },
        { id: "flux", name: "Flux Standard", category: "flux", supports_reference_images: false },
        { id: "turbo", name: "Flux Turbo ⚡", category: "flux", supports_reference_images: false },
        { id: "kontext", name: "Kontext 🎨 (圖生圖)", category: "kontext", supports_reference_images: true, max_reference_images: 1 }
      ]
    }
  },
  
  DEFAULT_PROVIDER: "pollinations",
  
  STYLE_CATEGORIES: {
    'photorealism': { name: '攝影寫實', icon: '📷', order: 1 },
    'artistic': { name: '藝術繪畫', icon: '🎨', order: 2 },
    'digital': { name: '數位創作', icon: '💻', order: 3 },
    'anime': { name: '動漫插畫', icon: '🌸', order: 4 },
    'special': { name: '特殊風格', icon: '✨', order: 5 }
  },

  STYLE_PRESETS: {
    // === 0. 基礎 ===
    none: { name: "無風格 (Raw)", prompt: "", negative: "", category: "photorealism", icon: "⚡" },
    
    // === 1. 攝影寫實 (Photorealism) ===
    photorealistic: { name: "極致寫實", prompt: "photorealistic, 8k uhd, high quality, masterpiece, sharp focus, detailed texture", negative: "illustration, painting, cartoon, low quality", category: "photorealism", icon: "📸" },
    cinematic: { name: "電影質感", prompt: "cinematic lighting, movie scene, dramatic atmosphere, color graded, anamorphic lens, shallow depth of field", category: "photorealism", icon: "🎬" },
    analog: { name: "底片膠卷", prompt: "analog film, grain, vintage photography, kodak portra 400, film texture, nostalgic", category: "photorealism", icon: "🎞️" },
    polaroid: { name: "拍立得", prompt: "polaroid photo, vintage instant photo, flash photography, candid, soft focus, vignette", category: "photorealism", icon: "📷" },
    studio: { name: "攝影棚人像", prompt: "studio lighting, professional portrait, rim light, softbox, high detail skin texture, 8k", category: "photorealism", icon: "💡" },
    macro: { name: "微距攝影", prompt: "macro photography, extreme close-up, intricate details, shallow depth of field, bokeh", category: "photorealism", icon: "🔍" },
    monochrome: { name: "黑白攝影", prompt: "black and white photography, monochrome, high contrast, dramatic shadows, noir style", category: "photorealism", icon: "⚫" },
    drone: { name: "空拍視角", prompt: "aerial photography, drone shot, bird's eye view, wide angle, epic scale", category: "photorealism", icon: "🚁" },
    
    // === 2. 藝術繪畫 (Artistic) ===
    oil: { name: "經典油畫", prompt: "oil painting, canvas texture, impasto, visible brushstrokes, classical art", category: "artistic", icon: "🖼️" },
    watercolor: { name: "清新水彩", prompt: "watercolor painting, wet on wet, soft edges, paper texture, dripping paint, artistic", category: "artistic", icon: "💧" },
    impressionism: { name: "印象派", prompt: "impressionist painting, monet style, loose brushwork, vibrant light and color", category: "artistic", icon: "🌻" },
    surrealism: { name: "超現實主義", prompt: "surrealism, dali style, dreamlike, impossible physics, melting objects, weird", category: "artistic", icon: "🕰️" },
    popart: { name: "普普藝術", prompt: "pop art, warhol style, bold colors, halftone dots, comic style, poster art", category: "artistic", icon: "🥫" },
    ukiyo: { name: "浮世繪", prompt: "ukiyo-e style, japanese woodblock print, flat colors, outlines, traditional japanese art", category: "artistic", icon: "🌊" },
    ink: { name: "水墨畫", prompt: "chinese ink wash painting, sumi-e, brush strokes, black ink, negative space", category: "artistic", icon: "🖌️" },
    renaissance: { name: "文藝復興", prompt: "renaissance art, michelangelo style, classical anatomy, dramatic lighting, religious art style", category: "artistic", icon: "🏛️" },
    sketch: { name: "素描手繪", prompt: "pencil sketch, charcoal drawing, rough lines, hand drawn, graphite texture", category: "artistic", icon: "✏️" },
    
    // === 3. 數位創作 (Digital) ===
    cyberpunk: { name: "賽博朋克", prompt: "cyberpunk, neon lights, high-tech low-life, futuristic city, glowing, blue and pink", category: "digital", icon: "🌃" },
    steampunk: { name: "蒸汽龐克", prompt: "steampunk, brass, gears, victorian industrial, copper, steam engine aesthetic", category: "digital", icon: "⚙️" },
    render3d: { name: "3D 渲染", prompt: "3d render, blender, unreal engine 5, ray tracing, global illumination, octane render", category: "digital", icon: "🧊" },
    lowpoly: { name: "Low Poly", prompt: "low poly art, geometric shapes, sharp edges, minimalist, polygon mesh", category: "digital", icon: "🔷" },
    voxel: { name: "體素藝術", prompt: "voxel art, minecraft style, blocky, isometric view, 3d pixels", category: "digital", icon: "🧱" },
    pixel: { name: "像素藝術", prompt: "pixel art, 16-bit, retro game, sprite, limited palette", category: "digital", icon: "👾" },
    synthwave: { name: "合成波 80s", prompt: "synthwave, retrowave, 80s aesthetic, neon grid, sunset, retro futuristic", category: "digital", icon: "🌅" },
    glitch: { name: "故障藝術", prompt: "glitch art, datamosh, digital distortion, vhs glitch, chromatic aberration", category: "digital", icon: "📺" },
    
    // === 4. 動漫插畫 (Anime) ===
    anime: { name: "日系動漫", prompt: "anime style, vibrant colors, cel shading, high quality anime art, detailed", category: "anime", icon: "🌸" },
    manga: { name: "黑白漫畫", prompt: "manga style, black and white, screen tones, comic panel, detailed lines", category: "anime", icon: "📖" },
    ghibli: { name: "吉卜力", prompt: "studio ghibli style, hayao miyazaki, hand painted background, lush nature, detailed food", category: "anime", icon: "🍃" },
    chibi: { name: "Q版角色", prompt: "chibi style, cute, big head, small body, kawaii, simple details", category: "anime", icon: "🧸" },
    comic: { name: "美漫風格", prompt: "comic book style, marvel style, bold outlines, dynamic action, text bubbles", category: "anime", icon: "🦸" },
    vector: { name: "向量插畫", prompt: "vector art, flat illustration, clean lines, minimalist, adobe illustrator", category: "anime", icon: "✒️" },
    makoto: { name: "新海誠", prompt: "makoto shinkai style, stunning clouds, lens flare, emotional lighting, hyper detailed backgrounds", category: "anime", icon: "☁️" },
    
    // === 5. 特殊風格 (Special) ===
    origami: { name: "摺紙藝術", prompt: "origami style, paper craft, folded paper, paper texture, geometric", category: "special", icon: "🦢" },
    stainedglass: { name: "彩繪玻璃", prompt: "stained glass, vibrant colors, black outlines, church window style, light passing through", category: "special", icon: "🌈" },
    papercut: { name: "剪紙藝術", prompt: "paper cutout art, layered paper, shadow box, depth, craft style", category: "special", icon: "✂️" },
    graffiti: { name: "街頭塗鴉", prompt: "graffiti art, street art, spray paint, wall mural, urban style, vibrant", category: "special", icon: "🛹" },
    neon: { name: "霓虹黑幫", prompt: "neon noir, dark atmosphere, glowing neon signs, rain reflections, moody", category: "special", icon: "👠" },
    horror: { name: "恐怖風格", prompt: "horror theme, creepy, eerie, dark atmosphere, unsettling, nightmare", category: "special", icon: "👻" },
    fantasy: { name: "史詩奇幻", prompt: "epic fantasy, dungeons and dragons style, magic, armor, glowing effects, detailed background", category: "special", icon: "🐉" },
    clay: { name: "黏土動畫", prompt: "claymation, plasticine, stop motion style, aardman style, fingerprint texture", category: "special", icon: "🏺" },
    lego: { name: "樂高風格", prompt: "lego bricks, plastic texture, toy photography, built with legos", category: "special", icon: "🧩" }
  },
  
  HD_OPTIMIZATION: {
    enabled: true,
    QUALITY_MODES: {
      economy: { name: "經濟模式", steps_multiplier: 0.85, guidance_multiplier: 0.9, hd_level: "basic" },
      standard: { name: "標準模式", steps_multiplier: 1.0, guidance_multiplier: 1.0, hd_level: "enhanced" },
      ultra: { name: "超高清模式", steps_multiplier: 1.35, guidance_multiplier: 1.15, hd_level: "maximum", force_upscale: true }
    },
    HD_PROMPTS: { basic: "high quality", enhanced: "high quality, highly detailed, 8k uhd", maximum: "masterpiece, best quality, ultra detailed, 8k uhd, HDR" },
    HD_NEGATIVE: "blurry, low quality, distorted, ugly, bad anatomy, pixelated"
  }
};

// 工具類：日誌記錄
class Logger {
  constructor() { this.logs = []; }
  add(title, data) { this.logs.push({ title, data, timestamp: new Date().toISOString() }); }
  get() { return this.logs; }
}

// 工具類：Google 翻譯
async function translateToEnglish(text, env) {
  try {
    const hasChinese = /[\u4e00-\u9fa5]/.test(text);
    if (!hasChinese) return { text: text, translated: false };
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" + encodeURIComponent(text);
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await response.json();
    let translatedText = "";
    if (data && data[0]) data[0].forEach(s => { if (s && s[0]) translatedText += s[0]; });
    return { text: translatedText.trim(), translated: true };
  } catch (error) {
    return { text: text, translated: false, error: error.message };
  }
}

// 工具類：參數優化器
class ParameterOptimizer {
  static optimize(options) {
    const { model, width, height, style, qualityMode, autoHD, autoOptimize } = options;
    if (!autoOptimize && !autoHD) return options;

    let steps = options.steps || 20;
    let guidance = options.guidance || 7.5;
    let prompt = options.prompt;
    let negative = options.negativePrompt;
    
    // HD 優化
    if (autoHD) {
      const hdConfig = CONFIG.HD_OPTIMIZATION.QUALITY_MODES[qualityMode] || CONFIG.HD_OPTIMIZATION.QUALITY_MODES.standard;
      const hdPrompt = CONFIG.HD_OPTIMIZATION.HD_PROMPTS[hdConfig.hd_level];
      prompt = `${prompt}, ${hdPrompt}`;
      negative = negative ? `${negative}, ${CONFIG.HD_OPTIMIZATION.HD_NEGATIVE}` : CONFIG.HD_OPTIMIZATION.HD_NEGATIVE;
      steps = Math.round(steps * hdConfig.steps_multiplier);
      guidance = guidance * hdConfig.guidance_multiplier;
    }

    // 風格應用
    if (style && CONFIG.STYLE_PRESETS[style]) {
      const s = CONFIG.STYLE_PRESETS[style];
      if (s.prompt) prompt += `, ${s.prompt}`;
      if (s.negative) negative += `, ${s.negative}`;
    }

    // 模型特定優化
    if (model === 'turbo') steps = Math.min(steps, 8); // Turbo 不需要多步
    if (model === 'gptimage-large') steps = Math.max(steps, 30);

    return { ...options, prompt, negativePrompt: negative, steps, guidance };
  }
}

function corsHeaders() {
  return { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': '*' };
}
// =================================================================================
//  第二段: 後端核心邏輯 (API & Worker Handler)
// =================================================================================

class PollinationsProvider {
  constructor(config) { this.config = config; }
  
  async generate(prompt, options, logger) {
    // 1. 翻譯處理
    const trans = await translateToEnglish(prompt);
    let finalPrompt = trans.text;
    if(trans.translated) logger.add("Translation", { original: prompt, translated: finalPrompt });

    // 2. 參數優化
    const optimized = ParameterOptimizer.optimize({ ...options, prompt: finalPrompt });
    logger.add("Optimization", optimized);

    // 3. 構建 API 參數
    const params = new URLSearchParams();
    params.append('model', optimized.model);
    params.append('width', optimized.width);
    params.append('height', optimized.height);
    params.append('seed', optimized.seed === -1 ? Math.floor(Math.random()*1e6) : optimized.seed);
    params.append('nologo', 'true');
    params.append('enhance', optimized.enhance || false);
    if(optimized.steps) params.append('steps', optimized.steps);
    if(optimized.guidance) params.append('guidance', optimized.guidance);
    if(optimized.referenceImages && optimized.referenceImages.length > 0) {
        params.append('image', optimized.referenceImages[0]); // Pollinations 僅支持單張參考圖
    }

    // 組合 Prompt (含負面提示)
    let fullPrompt = optimized.prompt;
    if(optimized.negativePrompt) fullPrompt += ` [negative: ${optimized.negativePrompt}]`;
    
    // Pollinations 的 API URL 結構
    const url = `${this.config.endpoint}/prompt/${encodeURIComponent(fullPrompt)}?${params.toString()}`;
    
    // 4. 發送請求
    const headers = { 'User-Agent': 'FluxAI-Worker/9.9' };
    if(CONFIG.POLLINATIONS_AUTH.token) headers['Authorization'] = `Bearer ${CONFIG.POLLINATIONS_AUTH.token}`;

    logger.add("API Request", { url: url.substring(0, 100) + '...' });

    // 重試機制
    let response;
    let lastError;
    for (let i = 0; i < CONFIG.MAX_RETRIES; i++) {
        try {
            response = await fetch(url, { headers });
            if (response.ok) break;
            lastError = `HTTP ${response.status}: ${await response.text()}`;
        } catch (e) {
            lastError = e.message;
        }
        await new Promise(r => setTimeout(r, 1000)); // 等待 1 秒重試
    }

    if (!response || !response.ok) throw new Error(`Generation failed: ${lastError}`);
    
    const contentType = response.headers.get('content-type');
    const arrayBuffer = await response.arrayBuffer();
    
    return {
      imageData: arrayBuffer,
      contentType: contentType,
      model: optimized.model,
      seed: params.get('seed'),
      width: optimized.width,
      height: optimized.height,
      style: options.style
    };
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 從環境變數加載 API Key
    if (env.POLLINATIONS_API_KEY) CONFIG.POLLINATIONS_AUTH.token = env.POLLINATIONS_API_KEY;
    
    // 處理 CORS 預檢請求
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders() });

    try {
      if (url.pathname === '/') return handleUI(); // 返回前端頁面
      if (url.pathname === '/_internal/generate') return await handleGenerate(request); // 處理生成請求
      
      // 健康檢查接口
      if (url.pathname === '/health') return new Response(JSON.stringify({ status: 'ok', version: CONFIG.PROJECT_VERSION }), { headers: corsHeaders() });
      
      return new Response('Not Found', { status: 404 });
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify({ error: { message: e.message } }), { status: 500, headers: corsHeaders() });
    }
  }
};

// 處理生成請求的函數
async function handleGenerate(request) {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  
  const body = await request.json();
  const logger = new Logger();
  const provider = new PollinationsProvider(CONFIG.PROVIDERS.pollinations);
  
  const results = [];
  const count = Math.min(Math.max(body.n || 1, 1), 4); // 限制 1-4 張
  
  // 並行生成多張圖片
  const promises = [];
  for(let i=0; i<count; i++) {
    const seed = body.seed === -1 ? -1 : (parseInt(body.seed) + i);
    promises.push(provider.generate(body.prompt, { ...body, seed }, logger));
  }
  
  const generationResults = await Promise.all(promises);

  // 轉換結果
  for (const result of generationResults) {
    // 將二進制圖像轉為 Base64 字符串，以便前端直接顯示和存儲
    const base64 = btoa(String.fromCharCode(...new Uint8Array(result.imageData)));
    results.push({
      image: `data:${result.contentType};base64,${base64}`,
      ...result,
      imageData: undefined // 移除原始二進制數據以減小 JSON 大小
    });
  }
  
  return new Response(JSON.stringify({ data: results, logs: logger.get() }), { 
    headers: { 'Content-Type': 'application/json', ...corsHeaders() } 
  });
}
// =================================================================================
//  第三段: 前端 Web UI (含 IndexedDB 永久存檔)
// =================================================================================

function handleUI() {
  // 生成風格選項的 HTML
  let styleOptions = '';
  const categories = CONFIG.STYLE_CATEGORIES;
  const presets = CONFIG.STYLE_PRESETS;
  
  // 按類別分組顯示
  const sortedCats = Object.entries(categories).sort((a,b) => a[1].order - b[1].order);
  
  for (const [catKey, catMeta] of sortedCats) {
    styleOptions += `<optgroup label="${catMeta.icon} ${catMeta.name}">`;
    Object.entries(presets).filter(([k, v]) => v.category === catKey).forEach(([k, v]) => {
        styleOptions += `<option value="${k}">${v.icon} ${v.name}</option>`;
    });
    styleOptions += `</optgroup>`;
  }
  
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<style>
/* === 完整 CSS 樣式 === */
:root{--primary:#f59e0b;--bg:#0f172a;--panel:#1e293b;--text:#f1f5f9;--border:rgba(255,255,255,0.1)}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);height:100vh;overflow:hidden;display:flex;flex-direction:column}

/* 導航欄 */
.navbar{height:60px;background:var(--panel);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;justify-content:space-between;flex-shrink:0}
.brand{font-size:20px;font-weight:bold;color:var(--primary);display:flex;align-items:center;gap:10px}
.nav-tabs{display:flex;gap:10px;background:rgba(0,0,0,0.2);padding:4px;border-radius:8px}
.tab-btn{padding:8px 16px;border:none;background:transparent;color:#94a3b8;cursor:pointer;border-radius:6px;font-size:14px;transition:0.2s}
.tab-btn.active{background:var(--primary);color:#fff}

/* 主內容區 */
.main{flex:1;display:flex;overflow:hidden}
.panel{padding:20px;overflow-y:auto;scrollbar-width:thin}
.sidebar{width:320px;background:rgba(255,255,255,0.02);border-right:1px solid var(--border)}
.content{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px}
.settings{width:300px;background:rgba(255,255,255,0.02);border-left:1px solid var(--border)}

/* 響應式 */
@media(max-width: 1024px) {
    .main { flex-direction: column; overflow-y: auto; }
    .sidebar, .settings, .content { width: 100%; border: none; height: auto; flex: none; }
    .content { min-height: 500px; }
}

/* 表單控件 */
.form-group{margin-bottom:15px}
label{display:block;font-size:12px;color:#94a3b8;margin-bottom:5px;font-weight:600}
input,select,textarea{width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--border);color:#fff;padding:10px;border-radius:6px;font-size:13px}
input:focus,select:focus,textarea:focus{border-color:var(--primary);outline:none}
textarea{resize:vertical;min-height:80px}

/* 按鈕 */
button.btn-primary{width:100%;padding:12px;background:var(--primary);border:none;border-radius:6px;color:#fff;font-weight:bold;cursor:pointer;transition:0.2s;box-shadow:0 4px 12px rgba(245,158,11,0.3)}
button.btn-primary:hover{transform:translateY(-2px)}
button.btn-primary:disabled{opacity:0.6;cursor:not-allowed;transform:none}
.btn-sm{padding:4px 8px;border:1px solid var(--border);background:rgba(255,255,255,0.05);color:#fff;border-radius:4px;cursor:pointer;flex:1;font-size:12px}
.btn-sm:hover{background:rgba(255,255,255,0.1)}

/* 畫廊網格 */
.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:15px;width:100%}
.card{background:var(--panel);border-radius:10px;overflow:hidden;border:1px solid var(--border);transition:0.2s;position:relative}
.card:hover{transform:translateY(-5px)}
.card img{width:100%;aspect-ratio:1;object-fit:cover;cursor:pointer;background:#000}
.card-info{padding:10px;font-size:12px}
.card-actions{display:flex;gap:5px;margin-top:5px}

/* 統計欄 */
.history-stats{display:flex;justify-content:space-between;padding:15px;background:var(--panel);border-radius:8px;margin-bottom:20px}
.stat-box{text-align:center}
.stat-val{font-size:18px;font-weight:bold;color:var(--primary)}
.stat-label{font-size:11px;color:#94a3b8}

/* Modal */
.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:999;justify-content:center;align-items:center}
.modal img{max-height:90vh;max-width:90vw;border-radius:8px;box-shadow:0 0 30px rgba(0,0,0,0.5)}
.modal-close{position:absolute;top:20px;right:30px;font-size:40px;color:#fff;cursor:pointer}

/* Loading 動畫 */
.loader{width:40px;height:40px;border:4px solid #fff;border-top-color:var(--primary);border-radius:50%;animation:spin 1s linear infinite;margin:50px auto}
@keyframes spin{to{transform:rotate(360deg)}}
</style>
</head>
<body>

<div class="navbar">
  <div class="brand">🎨 Flux AI Pro <span style="font-size:12px;background:rgba(16,185,129,0.2);color:#10b981;padding:2px 8px;border-radius:10px;margin-left:5px">v${CONFIG.PROJECT_VERSION}</span></div>
  <div class="nav-tabs">
    <button class="tab-btn active" onclick="switchPage('generate')">🎨 生成模式</button>
    <button class="tab-btn" onclick="switchPage('history')">📚 歷史記錄</button>
  </div>
</div>

<!-- 生成頁面 -->
<div class="main" id="page-generate">
  <div class="panel sidebar">
    <div class="form-group"><label>提示詞 (Prompt)</label><textarea id="prompt" rows="5" placeholder="描述你想要的畫面... (支援中文自動翻譯)"></textarea></div>
    <div class="form-group"><label>負面提示詞 (Negative)</label><textarea id="negative" rows="3" placeholder="不希望出現的元素... (如: ugly, blurry)"></textarea></div>
    <div class="form-group"><label>參考圖 URL (僅 Kontext)</label><input type="text" id="refImage" placeholder="https://..."></div>
    <button class="btn-primary" id="genBtn" onclick="generate()">🚀 開始生成</button>
  </div>
  
  <div class="panel content" id="resultArea">
    <div style="color:#64748b;margin-top:100px;text-align:center">
      <div style="font-size:48px;margin-bottom:20px">🎨</div>
      <p>配置參數並點擊生成<br>生成的圖片將永久保存在瀏覽器中</p>
    </div>
  </div>

  <div class="panel settings">
    <div class="form-group"><label>模型 (Model)</label><select id="model">
      <option value="gptimage">GPT-Image (通用)</option>
      <option value="gptimage-large">GPT-Image Large (高畫質)</option>
      <option value="flux">Flux Standard</option>
      <option value="turbo">Flux Turbo (極速)</option>
      <option value="kontext">Kontext (圖生圖)</option>
      <option value="zimage">Z-Image (實驗性)</option>
    </select></div>
    <div class="form-group"><label>風格 (Style)</label><select id="style">${styleOptions}</select></div>
    <div class="form-group"><label>尺寸 (Size)</label><select id="size">
      <option value="square-1k">1024x1024 (1:1)</option>
      <option value="square-1.5k">1536x1536 (1:1+)</option>
      <option value="portrait-9-16-hd">1080x1920 (9:16)</option>
      <option value="landscape-16-9-hd">1920x1080 (16:9)</option>
      <option value="instagram-square">1080x1080 (IG)</option>
    </select></div>
    <div class="form-group"><label>畫質模式</label><select id="quality"><option value="standard">標準</option><option value="ultra">Ultra HD</option><option value="economy">極速 (Economy)</option></select></div>
    <div class="form-group"><label>數量 (Batch Size)</label><input type="number" id="count" value="1" min="1" max="4"></div>
  </div>
</div>

<!-- 歷史記錄頁面 -->
<div class="main" id="page-history" style="display:none;flex-direction:column;padding:20px">
  <div class="history-stats">
    <div class="stat-box"><div class="stat-val" id="stat-count">0</div><div class="stat-label">總圖片數</div></div>
    <div class="stat-box"><div class="stat-val" id="stat-size">0 MB</div><div class="stat-label">永久存儲佔用</div></div>
    <div style="display:flex;gap:10px;align-items:center">
      <button class="btn-sm" style="background:#ef4444;border-color:#ef4444" onclick="clearDB()">🗑️ 清空所有</button>
      <button class="btn-sm" style="background:#3b82f6;border-color:#3b82f6" onclick="exportData()">📥 導出備份</button>
    </div>
  </div>
  <div id="historyGrid" class="gallery"></div>
</div>

<!-- 圖片預覽 Modal -->
<div class="modal" id="imgModal" onclick="this.style.display='none'">
  <span class="modal-close">&times;</span>
  <img id="modalImg" src="">
</div>

<script>
// === 核心: IndexedDB 管理 (解決死圖) ===
const DB_CONFIG = { name: 'FluxProDB', version: 1, store: 'images' };

// 打開數據庫
function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(DB_CONFIG.store)) {
                db.createObjectStore(DB_CONFIG.store, { keyPath: 'id' });
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

// 存入數據 (Base64)
async function saveImage(item) {
    const db = await openDB();
    const tx = db.transaction(DB_CONFIG.store, 'readwrite');
    tx.objectStore(DB_CONFIG.store).put(item);
    return new Promise(resolve => tx.oncomplete = resolve);
}

// 讀取所有數據
async function getHistory() {
    const db = await openDB();
    return new Promise(resolve => {
        const tx = db.transaction(DB_CONFIG.store, 'readonly');
        const req = tx.objectStore(DB_CONFIG.store).getAll();
        req.onsuccess = () => resolve(req.result.sort((a,b) => b.timestamp - a.timestamp));
    });
}

// 刪除單條
async function deleteImage(id) {
    const db = await openDB();
    const tx = db.transaction(DB_CONFIG.store, 'readwrite');
    tx.objectStore(DB_CONFIG.store).delete(id);
    await new Promise(resolve => tx.oncomplete = resolve);
    loadHistory();
}

// 清空所有
async function clearDB() {
    if(!confirm('確定要刪除所有歷史記錄嗎？此操作不可恢復！')) return;
    const db = await openDB();
    const tx = db.transaction(DB_CONFIG.store, 'readwrite');
    tx.objectStore(DB_CONFIG.store).clear();
    await new Promise(resolve => tx.oncomplete = resolve);
    loadHistory();
}

// === 業務邏輯 ===

// 生成函數
async function generate() {
    const prompt = document.getElementById('prompt').value;
    if(!prompt) return alert('請輸入提示詞');
    
    const btn = document.getElementById('genBtn');
    const resultArea = document.getElementById('resultArea');
    const sizeVal = document.getElementById('size').value;
    const sizes = ${JSON.stringify(CONFIG.PRESET_SIZES)};
    const size = sizes[sizeVal];

    btn.disabled = true;
    btn.innerHTML = '⏳ 生成中...';
    resultArea.innerHTML = '<div class="loader"></div><p style="text-align:center;color:#94a3b8">AI 正在繪製中，請稍候...</p>';

    try {
        const res = await fetch('/_internal/generate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                prompt: prompt,
                negative_prompt: document.getElementById('negative').value,
                model: document.getElementById('model').value,
                style: document.getElementById('style').value,
                width: size.width,
                height: size.height,
                quality_mode: document.getElementById('quality').value,
                n: parseInt(document.getElementById('count').value),
                reference_images: [document.getElementById('refImage').value].filter(Boolean)
            })
        });

        const data = await res.json();
        if(data.error) throw new Error(data.error.message);

        // 處理結果並存入 DB
        resultArea.innerHTML = '<div class="gallery" id="newGallery"></div>';
        const gallery = document.getElementById('newGallery');

        for (const item of data.data) {
            // 構建存檔對象
            const record = {
                id: Date.now() + Math.random(),
                timestamp: Date.now(),
                base64: item.image, // API 返回的已經是 Base64
                prompt: prompt,
                model: item.model,
                style: document.getElementById('style').value,
                seed: item.seed
            };
            
            await saveImage(record); // 永久存檔
            
            // 顯示
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = \`<img src="\${record.base64}" onclick="showModal(this.src)">
                <div class="card-info">
                    <div>Model: \${record.model}</div>
                    <div class="card-actions">
                        <button class="btn-sm" onclick="downloadImg('\${record.base64}')">下載</button>
                    </div>
                </div>\`;
            gallery.appendChild(div);
        }
    } catch (e) {
        resultArea.innerHTML = \`<div style="color:#ef4444;text-align:center;margin-top:50px">
            <h3>❌ 生成失敗</h3>
            <p>\${e.message}</p>
        </div>\`;
    } finally {
        btn.disabled = false;
        btn.innerHTML = '🚀 開始生成';
    }
}

// 加載歷史記錄
async function loadHistory() {
    const list = await getHistory();
    const grid = document.getElementById('historyGrid');
    grid.innerHTML = '';
    
    // 更新統計
    document.getElementById('stat-count').innerText = list.length;
    const sizeBytes = JSON.stringify(list).length;
    document.getElementById('stat-size').innerText = (sizeBytes / 1024 / 1024).toFixed(2) + ' MB';

    if(list.length === 0) {
        grid.innerHTML = '<div style="text-align:center;width:100%;color:#64748b;grid-column:1/-1">暫無歷史記錄</div>';
        return;
    }

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = \`<img src="\${item.base64}" loading="lazy" onclick="showModal(this.src)">
            <div class="card-info">
                <div>Model: \${item.model}</div>
                <div style="color:#94a3b8;font-size:10px">\${new Date(item.timestamp).toLocaleString()}</div>
                <div class="card-actions">
                    <button class="btn-sm" onclick="reuse('\${item.prompt}')">重用</button>
                    <button class="btn-sm" onclick="downloadImg('\${item.base64}')">下載</button>
                    <button class="btn-sm" style="color:#ef4444;border-color:#ef4444" onclick="deleteImage(\${item.id})">刪除</button>
                </div>
            </div>\`;
        grid.appendChild(div);
    });
}

// 輔助功能
function switchPage(page) {
    document.querySelectorAll('.main').forEach(el => el.style.display = 'none');
    document.getElementById('page-' + page).style.display = page === 'generate' ? 'flex' : 'flex';
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    if(page === 'history') loadHistory();
}

function showModal(src) {
    document.getElementById('modalImg').src = src;
    document.getElementById('imgModal').style.display = 'flex';
}

function downloadImg(base64) {
    const a = document.createElement('a');
    a.href = base64;
    a.download = 'flux-' + Date.now() + '.png';
    a.click();
}

function reuse(prompt) {
    document.getElementById('prompt').value = prompt;
    switchPage('generate');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
    document.querySelectorAll('.tab-btn')[1].classList.remove('active');
}

async function exportData() {
    const list = await getHistory();
    const blob = new Blob([JSON.stringify(list)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flux-history-backup.json';
    a.click();
}

// 初始化
window.onload = () => {
    loadHistory();
};

</script>
</body>
</html>`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}
