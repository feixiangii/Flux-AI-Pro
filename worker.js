// =================================================================================
//  項目: multi-provider-image-generator
//  版本: 8.8.1 (移除主界面中文提示相关文字)
//  版本: 8.8.2 (主页添加 Nano Banana 页面链接)
//  作者: Enhanced by AI Assistant
//  日期: 2025-12-11
// =================================================================================

const CONFIG = {
  PROJECT_NAME: "multi-provider-image-generator",
  PROJECT_VERSION: "8.8.1",
  PROJECT_VERSION: "8.8.2",
  API_MASTER_KEY: "1",

  PROVIDERS: {
@@ -547,6 +547,8 @@ export default {
    try {
      if (url.pathname === '/') {
        return handleUI(request);
      } else if (url.pathname === '/nanobanana') {
        return handleNanoBananaUI(request);
      } else if (url.pathname === '/v1/chat/completions') {
        return handleChatCompletions(request, env);
      } else if (url.pathname === '/v1/images/generations') {
@@ -560,534 +562,11 @@ export default {
      } else if (url.pathname === '/health') {
        return new Response(JSON.stringify({ status: 'ok', version: CONFIG.PROJECT_VERSION, timestamp: new Date().toISOString() }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      } else {
        return new Response(JSON.stringify({ project: CONFIG.PROJECT_NAME, version: CONFIG.PROJECT_VERSION, features: ['19 Models', '12 Styles', '3 Quality Modes', 'Smart Analysis', 'Auto HD', 'History', 'Auto Chinese Translation', 'Nano Banana Models', 'Real-time Timer'], endpoints: ['/v1/images/generations', '/v1/chat/completions', '/v1/models', '/v1/providers', '/v1/styles', '/health'] }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        return new Response(JSON.stringify({ project: CONFIG.PROJECT_NAME, version: CONFIG.PROJECT_VERSION, features: ['19 Models', '12 Styles', '3 Quality Modes', 'Smart Analysis', 'Auto HD', 'History', 'Auto Chinese Translation', 'Nano Banana Models', 'Real-time Timer'], endpoints: ['/v1/images/generations', '/v1/chat/completions', '/v1/models', '/v1/providers', '/v1/styles', '/health', '/nanobanana'] }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
      }
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: { message: error.message, type: 'worker_error' } }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
  }
};

async function handleChatCompletions(request, env) {
    const logger = new Logger();
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
        prompt = prompt.trim();
        if (!prompt) throw new Error("Empty prompt");
        const options = { provider: body.provider || null, model: body.model || "flux", width: body.width || 1024, height: body.height || 1024, numOutputs: Math.min(Math.max(body.n || 1, 1), 4), seed: body.seed !== undefined ? body.seed : -1, negativePrompt: body.negative_prompt || "", guidance: body.guidance_scale || null, steps: body.steps || null, enhance: body.enhance === true, nologo: body.nologo !== false, privateMode: body.private !== false, style: body.style || "none", autoOptimize: body.auto_optimize !== false, autoHD: body.auto_hd !== false, qualityMode: body.quality_mode || 'standard' };
        const router = new MultiProviderRouter({}, env);
        const results = await router.generate(prompt, options, logger);
        let respContent = "";
        results.forEach((result, index) => { respContent += `![Generated Image ${index + 1}](${result.url})\n`; });
        const respId = `chatcmpl-${crypto.randomUUID()}`;
        if (body.stream) {
            const { readable, writable } = new TransformStream();
            const writer = writable.getWriter();
            const encoder = new TextEncoder();
            (async () => {
                try {
                    if (isWebUI) await writer.write(encoder.encode(`data: ${JSON.stringify({ debug: logger.get() })}\n\n`));
                    const chunk = { id: respId, object: 'chat.completion.chunk', created: Math.floor(Date.now()/1000), model: options.model, choices: [{ index: 0, delta: { content: respContent }, finish_reason: null }] };
                    await writer.write(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
                    const endChunk = { id: respId, object: 'chat.completion.chunk', created: Math.floor(Date.now()/1000), model: options.model, choices: [{ index: 0, delta: {}, finish_reason: 'stop' }] };
                    await writer.write(encoder.encode(`data: ${JSON.stringify(endChunk)}\n\n`));
                    await writer.write(encoder.encode('data: [DONE]\n\n'));
                } finally {
                    await writer.close();
                }
            })();
            return new Response(readable, { headers: corsHeaders({ 'Content-Type': 'text/event-stream' }) });
        } else {
            return new Response(JSON.stringify({ id: respId, object: "chat.completion", created: Math.floor(Date.now() / 1000), model: options.model, choices: [{ index: 0, message: { role: "assistant", content: respContent }, finish_reason: "stop" }] }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
        }
    } catch (e) {
        logger.add("❌ Error", e.message);
        return new Response(JSON.stringify({ error: { message: e.message, debug_logs: logger.get() } }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
}

async function handleImageGenerations(request, env) {
    const logger = new Logger();
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
        const options = { provider: body.provider || null, model: body.model || "flux", width: Math.min(Math.max(width, 256), 2048), height: Math.min(Math.max(height, 256), 2048), numOutputs: Math.min(Math.max(body.n || 1, 1), 4), seed: body.seed !== undefined ? body.seed : -1, negativePrompt: body.negative_prompt || "", guidance: body.guidance_scale || null, steps: body.steps || null, enhance: body.enhance === true, nologo: body.nologo !== false, privateMode: body.private !== false, style: body.style || "none", autoOptimize: body.auto_optimize !== false, autoHD: body.auto_hd !== false, qualityMode: body.quality_mode || 'standard' };
        const router = new MultiProviderRouter({}, env);
        const results = await router.generate(prompt, options, logger);
        return new Response(JSON.stringify({ created: Math.floor(Date.now() / 1000), data: results.map(r => ({ url: r.url, provider: r.provider, model: r.model, seed: r.seed, width: r.width, height: r.height, style: r.style, quality_mode: r.quality_mode, prompt_complexity: r.prompt_complexity, steps: r.steps, guidance: r.guidance, auto_optimized: r.auto_optimized, hd_optimized: r.hd_optimized, auto_translated: r.auto_translated, cost: r.cost })) }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    } catch (e) {
        logger.add("❌ Error", e.message);
        return new Response(JSON.stringify({ error: { message: e.message, debug_logs: logger.get() } }), { status: 500, headers: corsHeaders({ 'Content-Type': 'application/json' }) });
    }
}

function handleModelsRequest() {
    const models = [];
    for (const [providerKey, providerConfig] of Object.entries(CONFIG.PROVIDERS)) {
        if (providerConfig.enabled && providerConfig.models) {
            for (const model of providerConfig.models) {
                models.push({ id: model.id, object: 'model', name: model.name, provider: providerKey, category: model.category, confirmed: model.confirmed || false, experimental: model.experimental || false, description: model.description });
            }
        }
    }
    return new Response(JSON.stringify({ object: 'list', data: models, total: models.length }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
}

function handleProvidersRequest() {
    const providers = {};
    for (const [key, config] of Object.entries(CONFIG.PROVIDERS)) {
        providers[key] = { name: config.name, endpoint: config.endpoint, auth_mode: config.auth_mode, enabled: config.enabled, features: config.features };
    }
    return new Response(JSON.stringify({ object: 'list', data: providers }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
}

function handleStylesRequest() {
    const styles = Object.entries(CONFIG.STYLE_PRESETS).map(([key, value]) => ({ id: key, name: value.name, prompt_addition: value.prompt, negative_addition: value.negative }));
    return new Response(JSON.stringify({ object: 'list', data: styles }), { headers: corsHeaders({ 'Content-Type': 'application/json' }) });
}

function handleUI() {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 100%);color:#fff;padding:20px;min-height:100vh}.container{max-width:1400px;margin:0 auto}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:15px}
.header-left{flex:1}
h1{color:#f59e0b;margin:0;font-size:36px;font-weight:800;text-shadow:0 0 30px rgba(245,158,11,0.6)}
.badge{background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:6px 14px;border-radius:20px;font-size:14px;margin-left:10px}
.subtitle{color:#9ca3af;margin-top:8px;font-size:15px}
.history-btn{background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);color:#fff;border:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all 0.3s;position:relative}
.history-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(139,92,246,0.4)}
.history-badge{position:absolute;top:-8px;right:-8px;background:#ef4444;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700}
.history-panel{position:fixed;top:0;right:0;width:400px;max-width:90vw;height:100vh;background:rgba(26,26,26,0.98);backdrop-filter:blur(10px);box-shadow:-4px 0 20px rgba(0,0,0,0.5);z-index:1000;overflow-y:auto;display:none;animation:slideIn 0.3s ease}
@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
.history-header{position:sticky;top:0;background:rgba(15,15,15,0.95);backdrop-filter:blur(10px);padding:20px;border-bottom:1px solid rgba(255,255,255,0.1);z-index:10}
.history-header h2{color:#f59e0b;font-size:20px;margin-bottom:15px}
.history-actions{display:flex;gap:10px}
.btn-clear{flex:1;padding:10px;background:rgba(239,68,68,0.2);border:1px solid #ef4444;color:#ef4444;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.3s}
.btn-clear:hover{background:rgba(239,68,68,0.3)}
.btn-close{flex:1;padding:10px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.3s}
.btn-close:hover{background:rgba(255,255,255,0.15)}
.history-list{padding:15px}
.history-item{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:15px;margin-bottom:15px;transition:all 0.3s}
.history-item:hover{background:rgba(255,255,255,0.08);border-color:rgba(245,158,11,0.5)}
.history-item img{width:100%;border-radius:8px;margin-bottom:12px;cursor:pointer;transition:transform 0.3s}
.history-item img:hover{transform:scale(1.02)}
.history-info{font-size:13px}
.history-prompt{color:#e5e7eb;margin-bottom:8px;line-height:1.5;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.history-meta{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:8px}
.history-meta span{color:#9ca3af;font-size:12px;background:rgba(255,255,255,0.05);padding:4px 8px;border-radius:6px}
.history-time{color:#6b7280;font-size:11px;margin-bottom:10px}
.history-actions-item{display:flex;gap:8px}
.history-actions-item button{flex:1;padding:8px;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.3s}
.btn-load{background:rgba(139,92,246,0.2);border:1px solid #8b5cf6;color:#a78bfa}
.btn-load:hover{background:rgba(139,92,246,0.3)}
.btn-delete{background:rgba(239,68,68,0.2);border:1px solid #ef4444;color:#ef4444}
.btn-delete:hover{background:rgba(239,68,68,0.3)}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0}@media (max-width:768px){.grid{grid-template-columns:1fr}.history-panel{width:100vw}}
.box{background:rgba(26,26,26,0.95);padding:24px;border-radius:16px;border:1px solid rgba(255,255,255,0.1)}h3{color:#f59e0b;margin-bottom:18px;font-size:18px;font-weight:700}label{display:block;margin:16px 0 8px 0;color:#e5e7eb;font-weight:600;font-size:13px}
.prompt-actions{display:flex;gap:8px;margin-bottom:12px}
.btn-example{flex:1;padding:8px;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.3);color:#a78bfa;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.3s}
.btn-example:hover{background:rgba(139,92,246,0.2);border-color:#8b5cf6}
select,textarea,input{width:100%;padding:12px;margin:0;background:#2a2a2a;border:1px solid #444;color:#fff;border-radius:10px;font-size:14px;font-family:inherit;transition:all 0.3s}select:focus,textarea:focus,input:focus{outline:none;border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.15)}textarea{resize:vertical;min-height:90px}
.quality-mode-selector{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:12px 0}.quality-option input[type="radio"]{position:absolute;opacity:0}.quality-label{display:block;padding:16px 12px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);border-radius:12px;text-align:center;cursor:pointer;transition:all 0.3s}.quality-label:hover{background:rgba(255,255,255,0.08);border-color:rgba(245,158,11,0.5)}.quality-option input[type="radio"]:checked + .quality-label{background:rgba(245,158,11,0.2);border-color:#f59e0b}.quality-name{font-size:14px;font-weight:600;color:#e5e7eb;margin-bottom:4px}.quality-desc{font-size:11px;color:#9ca3af}
button{width:100%;padding:16px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;margin-top:20px;transition:all 0.3s;box-shadow:0 4px 15px rgba(245,158,11,0.4)}button:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(245,158,11,0.6)}button:disabled{background:#555;cursor:not-allowed;transform:none;box-shadow:none}#result{margin-top:20px}.result-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-top:20px}.result img{width:100%;border-radius:12px;cursor:pointer;transition:transform 0.3s}.result img:hover{transform:scale(1.02)}
.success{background:rgba(16,185,129,0.15);border:1px solid #10b981;padding:16px;border-radius:12px;color:#10b981}
.timer{margin-top:10px;font-size:16px;font-weight:600;color:#10b981;animation:pulse 1.5s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}
.error{background:rgba(239,68,68,0.15);border:1px solid #ef4444;padding:16px;border-radius:12px;color:#ef4444}.checkbox-group{display:flex;align-items:center;gap:10px;margin:12px 0}.checkbox-group input[type="checkbox"]{width:auto;margin:0}
</style>
</head>
<body>
<div class="container">
<div class="header">
<div class="header-left">
<h1>🎨 Flux AI Pro<span class="badge">v${CONFIG.PROJECT_VERSION}</span></h1>
<p class="subtitle">19個模型 · 12種風格 · 3檔質量 · 智能HD優化 · 🍌 Nano Banana</p>
</div>
<button onclick="toggleHistory()" class="history-btn">
📜 歷史紀錄
<span id="historyBadge" class="history-badge" style="display:none">0</span>
</button>
</div>

<div id="historyPanel" class="history-panel">
<div class="history-header">
<h2>📸 圖片歷史</h2>
<div class="history-actions">
<button onclick="clearAllHistory()" class="btn-clear">🗑️ 清空</button>
<button onclick="toggleHistory()" class="btn-close">✕ 關閉</button>
</div>
</div>
<div id="historyList" class="history-list"></div>
</div>

<div class="grid">
<div class="box">
<h3>📝 生成設置</h3>
<label>提示詞 *</label>
<div class="prompt-actions">
<button type="button" onclick="fillExample('zh')" class="btn-example">中文示例</button>
<button type="button" onclick="fillExample('en')" class="btn-example">英文示例</button>
<button type="button" onclick="fillExample('mix')" class="btn-example">混合示例</button>
</div>
<textarea id="prompt" placeholder="Describe your image...&#10;A beautiful sunset over mountains with vibrant colors"></textarea>
<label>負面提示詞</label>
<textarea id="negativePrompt" placeholder="low quality, blurry, distorted"></textarea>
<label>AI 模型</label>
<select id="model">
<optgroup label="⚡ Flux 系列">
<option value="flux">Flux (均衡)</option>
<option value="flux-realism">Flux Realism (超寫實)</option>
<option value="flux-anime">Flux Anime (動漫)</option>
<option value="flux-3d">Flux 3D (3D渲染)</option>
<option value="flux-pro">Flux Pro (專業版)</option>
<option value="any-dark">Any Dark (暗黑)</option>
<option value="turbo">Turbo (極速)</option>
</optgroup>
<optgroup label="🔥 Flux 高級版">
<option value="flux-1.1-pro">Flux 1.1 Pro 🔥</option>
<option value="flux-kontext">Flux Kontext 🎨</option>
<option value="flux-kontext-pro">Flux Kontext Pro 💎</option>
</optgroup>
<optgroup label="🍌 Google Gemini (Nano Banana)">
<option value="nanobanana">Nano Banana 🍌 (快速版)</option>
<option value="nanobanana-pro">Nano Banana Pro 🍌💎 (4K+繁中文字)</option>
</optgroup>
<optgroup label="🌟 Stable Diffusion">
<option value="sd3">SD 3 ⚡</option>
<option value="sd3.5-large">SD 3.5 Large 🔥</option>
<option value="sd3.5-turbo">SD 3.5 Turbo ⚡</option>
<option value="sdxl">SDXL 📐</option>
<option value="sdxl-lightning">SDXL Lightning ⚡</option>
</optgroup>
</select>
<label>藝術風格</label>
<select id="style">
${Object.entries(CONFIG.STYLE_PRESETS).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join('')}
</select>
<label>質量模式</label>
<div class="quality-mode-selector">
<div class="quality-option">
<input type="radio" name="quality" value="economy" id="q-economy">
<label for="q-economy" class="quality-label"><div class="quality-name">⚡ 經濟</div><div class="quality-desc">快速測試</div></label>
</div>
<div class="quality-option">
<input type="radio" name="quality" value="standard" id="q-standard" checked>
<label for="q-standard" class="quality-label"><div class="quality-name">⭐ 標準</div><div class="quality-desc">平衡質速</div></label>
</div>
<div class="quality-option">
<input type="radio" name="quality" value="ultra" id="q-ultra">
<label for="q-ultra" class="quality-label"><div class="quality-name">💎 超高清</div><div class="quality-desc">極致質量</div></label>
</div>
</div>
<div class="checkbox-group">
<input type="checkbox" id="autoOptimize" checked>
<label for="autoOptimize" style="margin:0">🎯 自動優化參數</label>
</div>
<div class="checkbox-group">
<input type="checkbox" id="autoHD" checked>
<label for="autoHD" style="margin:0">✨ 智能HD增強</label>
</div>
</div>
<div class="box">
<h3>🎨 圖像參數</h3>
<label>尺寸預設</label>
<select id="sizePreset">
${Object.entries(CONFIG.PRESET_SIZES).map(([k,v])=>`<option value="${k}" ${k==='square'?'selected':''}>${v.name} (${v.width}x${v.height})</option>`).join('')}
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
const STORAGE_KEY='flux_ai_history';
const MAX_HISTORY=100;

let generationTimer=null;
let startTime=0;

function updateTimer(){
const elapsed=((Date.now()-startTime)/1000).toFixed(1);
const resultDiv=document.getElementById('result');
const timerElement=resultDiv.querySelector('.timer');
if(timerElement){
timerElement.textContent=\`⏱️ 已耗時: \${elapsed} 秒\`;
}
}

const EXAMPLES={
zh:'一個穿著中國傳統漢服的少女，站在盛開的櫻花樹下，溫柔的微笑，細膩的畫面，柔和的光線',
en:'A beautiful girl in traditional Chinese hanfu dress, standing under blooming cherry blossom trees, gentle smile, delicate artwork, soft lighting',
mix:'賽博朋克風格的中國龍 cyberpunk style, neon lights, futuristic Chinese dragon, detailed scales, glowing eyes'
};

function fillExample(type){
document.getElementById('prompt').value=EXAMPLES[type];
}

class HistoryManager{
static save(record){
try{
let history=this.getAll();
record.id=Date.now();
record.timestamp=new Date().toISOString();
history.unshift(record);
if(history.length>MAX_HISTORY)history=history.slice(0,MAX_HISTORY);
localStorage.setItem(STORAGE_KEY,JSON.stringify(history));
this.updateBadge();
return true;
}catch(e){
console.error('儲存失敗:',e);
return false;
}
}
static getAll(){
try{
const data=localStorage.getItem(STORAGE_KEY);
return data?JSON.parse(data):[];
}catch(e){
console.error('讀取失敗:',e);
return[];
}
}
static delete(id){
try{
let history=this.getAll();
history=history.filter(item=>item.id!==id);
localStorage.setItem(STORAGE_KEY,JSON.stringify(history));
this.updateBadge();
return true;
}catch(e){
console.error('刪除失敗:',e);
return false;
}
}
static clear(){
try{
localStorage.removeItem(STORAGE_KEY);
this.updateBadge();
return true;
}catch(e){
console.error('清空失敗:',e);
return false;
}
}
static updateBadge(){
const count=this.getAll().length;
const badge=document.getElementById('historyBadge');
if(badge){
badge.textContent=count;
badge.style.display=count>0?'inline-block':'none';
}
}
static loadParams(record){
document.getElementById('prompt').value=record.prompt||'';
document.getElementById('negativePrompt').value=record.negativePrompt||'';
document.getElementById('model').value=record.model||'flux';
document.getElementById('style').value=record.style||'none';
document.getElementById('width').value=record.width||1024;
document.getElementById('height').value=record.height||1024;
document.getElementById('widthValue').textContent=record.width||1024;
document.getElementById('heightValue').textContent=record.height||1024;
document.getElementById('seed').value=record.seed||-1;
const qualityRadio=document.querySelector(\`input[name="quality"][value="\${record.qualityMode||'standard'}"]\`);
if(qualityRadio)qualityRadio.checked=true;
toggleHistory();
alert('✅ 參數已載入!');
}
}

function toggleHistory(){
const panel=document.getElementById('historyPanel');
if(panel.style.display==='none'||!panel.style.display){
showHistory();
panel.style.display='block';
}else{
panel.style.display='none';
}
}

function showHistory(){
const history=HistoryManager.getAll();
const container=document.getElementById('historyList');
if(history.length===0){
container.innerHTML='<div style="text-align:center;padding:40px;color:#9ca3af">📭 暫無歷史紀錄</div>';
return;
}
container.innerHTML=history.map(item=>\`
<div class="history-item">
<img src="\${item.url}" alt="歷史圖片" onclick="window.open('\${item.url}')">
<div class="history-info">
<div class="history-prompt">\${(item.prompt||'').substring(0,60)}\${(item.prompt||'').length>60?'...':''}</div>
<div class="history-meta">
<span>🎨 \${item.model}</span>
<span>📐 \${item.width}x\${item.height}</span>
<span>⭐ \${item.qualityMode||'standard'}</span>
</div>
<div class="history-time">\${formatTime(item.timestamp)}</div>
<div class="history-actions-item">
<button onclick='HistoryManager.loadParams(\${JSON.stringify(item).replace(/'/g,"\\\\'")})' class="btn-load">🔄 載入</button>
<button onclick="deleteHistoryItem(\${item.id})" class="btn-delete">🗑️ 刪除</button>
</div>
</div>
</div>
\`).join('');
}

function deleteHistoryItem(id){
if(confirm('確定刪除這條紀錄嗎？')){
HistoryManager.delete(id);
showHistory();
}
}

function clearAllHistory(){
if(confirm('確定清空所有歷史紀錄嗎？此操作不可復原！')){
HistoryManager.clear();
showHistory();
}
}

function formatTime(timestamp){
const date=new Date(timestamp);
const now=new Date();
const diff=now-date;
if(diff<60000)return'剛剛';
if(diff<3600000)return\`\${Math.floor(diff/60000)}分鐘前\`;
if(diff<86400000)return\`\${Math.floor(diff/3600000)}小時前\`;
if(diff<604800000)return\`\${Math.floor(diff/86400000)}天前\`;
return date.toLocaleDateString('zh-TW',{month:'2-digit',day:'2-digit'});
}

const widthSlider=document.getElementById('width');
const heightSlider=document.getElementById('height');
const widthValue=document.getElementById('widthValue');
const heightValue=document.getElementById('heightValue');
const sizePreset=document.getElementById('sizePreset');

widthSlider.oninput=()=>widthValue.textContent=widthSlider.value;
heightSlider.oninput=()=>heightValue.textContent=heightSlider.value;
sizePreset.onchange=()=>{
const preset=${JSON.stringify(CONFIG.PRESET_SIZES)}[sizePreset.value];
if(preset&&sizePreset.value!=='custom'){
widthSlider.value=preset.width;
heightSlider.value=preset.height;
widthValue.textContent=preset.width;
heightValue.textContent=preset.height;
}
};

async function generate(){
const prompt=document.getElementById('prompt').value.trim();
if(!prompt){alert('請輸入提示詞');return;}
const resultDiv=document.getElementById('result');
const button=document.querySelector('button[onclick="generate()"]');
button.disabled=true;
button.textContent='生成中...';

startTime=Date.now();
resultDiv.innerHTML='<div class="success"><strong>⏳ 正在生成圖像，請稍候...</strong><div class="timer">⏱️ 已耗時: 0.0 秒</div></div>';

generationTimer=setInterval(updateTimer,100);

const qualityMode=document.querySelector('input[name="quality"]:checked').value;
const params={
prompt:prompt,
negative_prompt:document.getElementById('negativePrompt').value,
model:document.getElementById('model').value,
style:document.getElementById('style').value,
width:parseInt(widthSlider.value),
height:parseInt(heightSlider.value),
n:parseInt(document.getElementById('numOutputs').value),
seed:parseInt(document.getElementById('seed').value),
auto_optimize:document.getElementById('autoOptimize').checked,
auto_hd:document.getElementById('autoHD').checked,
quality_mode:qualityMode
};

try{
const response=await fetch('/v1/images/generations',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(params)
});
const data=await response.json();
if(!response.ok)throw new Error(data.error?.message||'生成失敗');

clearInterval(generationTimer);
const totalTime=((Date.now()-startTime)/1000).toFixed(1);

resultDiv.innerHTML=\`<div class="success"><strong>✅ 生成成功!</strong> <span style="color:#10b981;font-weight:600">總耗時: \${totalTime} 秒</span></div>\`;
resultDiv.innerHTML+='<div class="result-grid">';
data.data.forEach((item,index)=>{
HistoryManager.save({
url:item.url,
prompt:params.prompt,
negativePrompt:params.negative_prompt,
model:item.model,
style:item.style,
width:item.width,
height:item.height,
qualityMode:item.quality_mode,
seed:item.seed
});
resultDiv.innerHTML+=\`<div class="result"><img src="\${item.url}" alt="Generated \${index+1}" onclick="window.open('\${item.url}')"><p style="margin-top:12px;font-size:13px;color:#9ca3af">\${item.model} | \${item.width}x\${item.height} | \${item.quality_mode}\${item.auto_translated?' | 🌐 已翻譯':''}</p></div>\`;
});
resultDiv.innerHTML+='</div>';
}catch(error){
clearInterval(generationTimer);
resultDiv.innerHTML=\`<div class="error"><strong>❌ 錯誤</strong><p style="margin-top:12px">\${error.message}</p></div>\`;
}finally{
button.disabled=false;
button.textContent='🚀 開始生成';
}
}

document.addEventListener('DOMContentLoaded',()=>{
HistoryManager.updateBadge();
});
</script>
</body>
</html>`;
  return new Response(html, { headers: corsHeaders({ 'Content-Type': 'text/html; charset=utf-8' }) });
}
};
