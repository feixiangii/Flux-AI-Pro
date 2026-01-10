// 🔥 Nano Pro 頁面：包含 60 秒冷卻倒數計時
function handleNanoPage(request) {
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>🍌 NanoBanana Pro - 控制台</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍌</text></svg>">
<style>
/* CSS 與之前相同，為節省空間已隱藏，請使用原版 CSS 或從 handleUI 中提取 */
:root { --primary: #FACC15; --primary-dim: #cca400; --bg-dark: #0f0f11; --panel-bg: rgba(30, 30, 35, 0.7); --border: rgba(255, 255, 255, 0.1); --text: #ffffff; --text-muted: #9ca3af; --glass: blur(20px) saturate(180%); }
* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
body { font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: var(--bg-dark); background-image: radial-gradient(circle at 10% 20%, rgba(250, 204, 21, 0.05) 0%, transparent 40%); color: var(--text); height: 100vh; overflow: hidden; display: flex; }
.app-container { display: flex; width: 100%; height: 100%; }
.sidebar { width: 380px; background: var(--panel-bg); backdrop-filter: var(--glass); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 24px; overflow-y: auto; z-index: 10; position: relative; }
.main-stage { flex: 1; position: relative; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at center, #1a1a1d 0%, #000 100%); overflow: hidden; }
.logo-area { display: flex; align-items: center; gap: 12px; margin-bottom: 30px; }
.logo-icon { font-size: 28px; animation: float 3s ease-in-out infinite; }
.logo-text h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
.logo-text .badge { background: var(--primary); color: #000; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 6px; vertical-align: top; }
.control-group { margin-bottom: 24px; }
.label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
label { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
textarea, input[type="text"], input[type="number"] { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 12px; padding: 14px; color: #fff; font-size: 14px; transition: 0.2s; font-family: inherit; resize: none; }
textarea:focus, input:focus { border-color: var(--primary); outline: none; background: rgba(0,0,0,0.5); }
.ratio-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
.ratio-item { background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; position: relative; }
.ratio-item:hover { background: rgba(255,255,255,0.1); }
.ratio-item.active { border-color: var(--primary); background: rgba(250, 204, 21, 0.1); color: var(--primary); }
.ratio-shape { border: 2px solid currentColor; opacity: 0.7; }
select { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border); padding: 12px; border-radius: 12px; color: white; appearance: none; cursor: pointer; }
.gen-btn { width: 100%; background: var(--primary); color: #000; border: none; padding: 16px; border-radius: 14px; font-size: 16px; font-weight: 800; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 20px rgba(250, 204, 21, 0.2); position: relative; overflow: hidden; }
.gen-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(250, 204, 21, 0.4); }
.gen-btn:active { transform: scale(0.98); }
.gen-btn:disabled { opacity: 0.7; cursor: not-allowed; filter: grayscale(1); }
.tool-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: 0.2s; font-size: 14px; }
.tool-btn:hover { color: var(--primary); }
.tool-btn.active { color: var(--primary); }
.quota-box { margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border); }
.quota-info { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 8px; }
.quota-bar { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; }
.quota-fill { height: 100%; background: var(--primary); width: 100%; transition: width 0.5s ease; }
.quota-text { font-weight: bold; color: var(--primary); }
#resultImg { max-width: 90%; max-height: 85%; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); display: none; object-fit: contain; transition: 0.3s; cursor: zoom-in; }
.placeholder-text { color: rgba(255,255,255,0.1); font-size: 80px; font-weight: 900; user-select: none; }
.history-dock { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(20, 20, 23, 0.8); backdrop-filter: blur(15px); border: 1px solid var(--border); padding: 10px; border-radius: 20px; display: flex; gap: 10px; max-width: 90%; overflow-x: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 20; }
.history-item { width: 50px; height: 50px; border-radius: 10px; overflow: hidden; cursor: pointer; border: 2px solid transparent; transition: 0.2s; flex-shrink: 0; }
.history-item img { width: 100%; height: 100%; object-fit: cover; }
.history-item:hover { transform: scale(1.1); z-index: 10; }
.history-item.active { border-color: var(--primary); }
.lightbox { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 1000; display: none; flex-direction: column; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s; }
.lightbox.show { display: flex; opacity: 1; }
.lightbox img { max-width: 95%; max-height: 85vh; border-radius: 8px; box-shadow: 0 0 50px rgba(0,0,0,0.8); }
.lightbox-close { position: absolute; top: 20px; right: 30px; color: #fff; font-size: 40px; cursor: pointer; opacity: 0.7; transition: 0.2s; }
.lightbox-close:hover { opacity: 1; color: var(--primary); }
.lightbox-actions { margin-top: 20px; display: flex; gap: 15px; }
.action-btn { padding: 10px 20px; border-radius: 8px; border: 1px solid var(--border); background: rgba(255,255,255,0.1); color: #fff; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 600; text-decoration: none; transition: 0.2s; }
.action-btn:hover { background: var(--primary); color: #000; border-color: var(--primary); }
.loading-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); display: none; flex-direction: column; align-items: center; justify-content: center; z-index: 50; }
.banana-loader { font-size: 60px; animation: spin-bounce 1.5s infinite; margin-bottom: 20px; }
.loading-text { color: var(--primary); font-weight: bold; letter-spacing: 2px; text-transform: uppercase; font-size: 14px; }
@media (max-width: 900px) { body { flex-direction: column; overflow-y: auto; height: auto; } .sidebar { width: 100%; height: auto; padding-bottom: 100px; border-right: none; } .main-stage { height: 50vh; order: -1; border-bottom: 1px solid var(--border); } #resultImg { max-height: 90%; } .history-dock { bottom: 10px; } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes spin-bounce { 0% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.2) rotate(10deg); } 100% { transform: scale(1) rotate(0deg); } }
.toast { position: fixed; top: 20px; right: 20px; background: #333; border-left: 4px solid var(--primary); color: #fff; padding: 15px 25px; border-radius: 8px; display: none; z-index: 100; box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-size: 14px; animation: slideIn 0.3s forwards; }
@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
</style>
</head>
<body>
    <div id="toast" class="toast"></div>

    <div class="app-container">
        <!-- Sidebar Controls -->
        <div class="sidebar">
            <div class="logo-area">
                <div class="logo-icon">🍌</div>
                <div class="logo-text">
                    <h1>Nano Pro <span class="badge">V10.6</span></h1>
                    <p style="color:#666; font-size:12px">Flux Engine • Pro Model</p>
                </div>
            </div>

            <div class="control-group">
                <div class="label-row">
                    <label>Prompt</label>
                    <button class="tool-btn" id="randomBtn" title="隨機靈感">🎲 靈感骰子</button>
                </div>
                <textarea id="prompt" rows="4" placeholder="描述你想像中的畫面... (支援中文)"></textarea>
            </div>

            <div class="control-group">
                <label style="margin-bottom:10px; display:block">畫布比例</label>
                <div class="ratio-grid">
                    <div class="ratio-item active" data-w="1024" data-h="1024" title="1:1 方形">
                        <div class="ratio-shape" style="width:14px; height:14px;"></div>
                    </div>
                    <div class="ratio-item" data-w="1080" data-h="1350" title="4:5 IG">
                        <div class="ratio-shape" style="width:12px; height:15px;"></div>
                    </div>
                    <div class="ratio-item" data-w="1080" data-h="1920" title="9:16 限動">
                        <div class="ratio-shape" style="width:9px; height:16px;"></div>
                    </div>
                    <div class="ratio-item" data-w="1920" data-h="1080" title="16:9 桌布">
                        <div class="ratio-shape" style="width:16px; height:9px;"></div>
                    </div>
                    <div class="ratio-item" data-w="2048" data-h="858" title="21:9 電影">
                        <div class="ratio-shape" style="width:18px; height:7px;"></div>
                    </div>
                </div>
                <input type="hidden" id="width" value="1024">
                <input type="hidden" id="height" value="1024">
            </div>

            <div class="control-group">
                <div class="label-row">
                    <label>風格 & 設定</label>
                </div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <select id="style">
                        <option value="none">✨ 智能無風格</option>
                        <option value="photorealistic">📷 寫實照片</option>
                        <option value="anime">🌸 日系動漫</option>
                        <option value="3d-render">🧊 3D 渲染</option>
                        <option value="cyberpunk">🌃 賽博龐克</option>
                        <option value="manga">📖 黑白漫畫</option>
                        <option value="oil-painting">🎨 古典油畫</option>
                    </select>
                    <div style="position:relative">
                         <input type="number" id="seed" placeholder="Seed" value="-1" disabled style="padding-right:30px">
                         <button id="lockSeedBtn" class="tool-btn" style="position:absolute; right:10px; top:50%; transform:translateY(-50%)">🎲</button>
                    </div>
                </div>
            </div>

            <div class="control-group">
                <label>排除 (Negative)</label>
                <input type="text" id="negative" value="nsfw, ugly, text, watermark, low quality, bad anatomy" style="font-size:12px; color:#aaa">
            </div>

            <button id="genBtn" class="gen-btn">
                <span>生成圖像</span>
                <span style="font-size:12px; opacity:0.6; font-weight:400; display:block; margin-top:4px">消耗 1 香蕉能量 🍌</span>
            </button>
            
            <div class="quota-box">
                <div class="quota-info">
                    <span>每小時能量</span>
                    <span id="quotaText" class="quota-text">5 / 5</span>
                </div>
                <div class="quota-bar">
                    <div id="quotaFill" class="quota-fill"></div>
                </div>
            </div>
        </div>

        <div class="main-stage">
            <div class="placeholder-text">NANOPRO</div>
            <img id="resultImg" alt="Generated Image" title="點擊放大">
            
            <div class="loading-overlay">
                <div class="banana-loader">🍌</div>
                <div class="loading-text">正在注入 AI 能量...</div>
            </div>

            <div class="history-dock" id="historyStrip">
                <!-- History Items -->
            </div>
        </div>
    </div>
    
    <div class="lightbox" id="lightbox">
        <div class="lightbox-close" id="lbClose">×</div>
        <img id="lbImg" src="">
        <div class="lightbox-actions">
            <a id="lbDownload" class="action-btn" download="nano-banana-art.png" href="#">
                📥 保存圖片
            </a>
            <button class="action-btn" onclick="document.getElementById('lbClose').click()">
                ❌ 關閉
            </button>
        </div>
    </div>

<script>
    const els = {
        prompt: document.getElementById('prompt'),
        negative: document.getElementById('negative'),
        style: document.getElementById('style'),
        seed: document.getElementById('seed'),
        width: document.getElementById('width'),
        height: document.getElementById('height'),
        genBtn: document.getElementById('genBtn'),
        img: document.getElementById('resultImg'),
        loader: document.querySelector('.loading-overlay'),
        history: document.getElementById('historyStrip'),
        lockSeed: document.getElementById('lockSeedBtn'),
        randomBtn: document.getElementById('randomBtn'),
        ratios: document.querySelectorAll('.ratio-item'),
        quotaText: document.getElementById('quotaText'),
        quotaFill: document.getElementById('quotaFill'),
        lightbox: document.getElementById('lightbox'),
        lbImg: document.getElementById('lbImg'),
        lbClose: document.getElementById('lbClose'),
        lbDownload: document.getElementById('lbDownload')
    };
    
    let currentQuota = 5;
    const maxQuota = 5;
    
    const now = new Date();
    const currentHourStr = now.toDateString() + '-' + now.getHours();
    const stored = localStorage.getItem('nano_quota_hourly_v2'); 
    
    if(stored) {
        const data = JSON.parse(stored);
        if(data.hour === currentHourStr) {
            currentQuota = data.val;
        } else {
            localStorage.setItem('nano_quota_hourly_v2', JSON.stringify({hour: currentHourStr, val: maxQuota}));
            currentQuota = maxQuota;
        }
    } else {
        localStorage.setItem('nano_quota_hourly_v2', JSON.stringify({hour: currentHourStr, val: maxQuota}));
    }
    updateQuotaUI();
    
    function updateQuotaUI() {
        els.quotaText.textContent = \`\${currentQuota} / \${maxQuota}\`;
        const pct = (currentQuota / maxQuota) * 100;
        els.quotaFill.style.width = pct + '%';
        if(currentQuota <= 0) {
            els.quotaFill.style.background = '#ef4444';
            els.genBtn.disabled = true;
            els.genBtn.innerHTML = '<span>本小時能量已耗盡</span><span style="display:block;font-size:12px;font-weight:400;margin-top:4px">請稍後再來</span>';
        }
    }
    
    function consumeQuota() {
        if(currentQuota > 0) {
            currentQuota--;
            const n = new Date();
            const h = n.toDateString() + '-' + n.getHours();
            localStorage.setItem('nano_quota_hourly_v2', JSON.stringify({hour: h, val: currentQuota}));
            updateQuotaUI();
        }
    }

    els.ratios.forEach(r => {
        r.onclick = () => {
            els.ratios.forEach(i => i.classList.remove('active'));
            r.classList.add('active');
            els.width.value = r.dataset.w;
            els.height.value = r.dataset.h;
        }
    });

    let isSeedRandom = true;
    els.lockSeed.onclick = () => {
        isSeedRandom = !isSeedRandom;
        if(isSeedRandom) {
            els.seed.value = '-1';
            els.seed.disabled = true;
            els.lockSeed.textContent = '🎲';
            els.lockSeed.classList.remove('active');
        } else {
            if(els.seed.value == '-1') els.seed.value = Math.floor(Math.random() * 1000000);
            els.seed.disabled = false;
            els.lockSeed.textContent = '🔒';
            els.lockSeed.classList.add('active');
        }
    };

    const prompts = [
        "Cyberpunk street vendor making noodles, neon rain, detailed, 8k",
        "A translucent glass banana floating in space, nebula background",
        "Cute isometric room, gaming setup, pastel colors, 3d render",
        "Portrait of a futuristic warrior, gold and black armor, cinematic lighting",
        "Traditional Japanese village in winter, snow, ukiyo-e style",
        "Macro shot of a mechanical eye, gears, steampunk"
    ];
    els.randomBtn.onclick = () => {
        els.prompt.value = prompts[Math.floor(Math.random() * prompts.length)];
        els.prompt.focus();
    };
    
    function openLightbox(url) {
        els.lbImg.src = url;
        els.lbDownload.href = url;
        els.lightbox.classList.add('show');
    }
    els.lbClose.onclick = () => els.lightbox.classList.remove('show');
    els.img.onclick = () => { if(els.img.src) openLightbox(els.img.src); };

    function toast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.style.display = 'block';
        setTimeout(() => t.style.display = 'none', 3000);
    }

    function addHistory(url) {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = \`<img src="\${url}">\`;
        div.onclick = () => {
            els.img.src = url;
            document.querySelectorAll('.history-item').forEach(i => i.classList.remove('active'));
            div.classList.add('active');
        };
        els.history.prepend(div);
        if(els.history.children.length > 10) els.history.lastChild.remove();
        document.querySelectorAll('.history-item').forEach(i => i.classList.remove('active'));
        div.classList.add('active');
    }

    // ====== 新增：按鈕冷卻倒數機制 ======
    function startButtonCooldown() {
        let timeLeft = 60;
        els.genBtn.disabled = true;
        const originalText = '生成圖像';
        
        // 立即更新狀態
        els.genBtn.innerHTML = \`<span>冷卻中 (\${timeLeft}s)</span><span style="font-size:12px;opacity:0.6;display:block">請稍候...</span>\`;
        
        const timer = setInterval(() => {
            timeLeft--;
            if(timeLeft < 0) {
                clearInterval(timer);
                if(currentQuota > 0) {
                    els.genBtn.disabled = false;
                    els.genBtn.innerHTML = \`<span>\${originalText}</span><span style="font-size:12px;opacity:0.6;display:block;margin-top:4px">消耗 1 香蕉能量 🍌</span>\`;
                } else {
                    // 如果在冷卻期間額度也沒了 (應該不會發生，除非邏輯錯誤，但保持同步)
                    updateQuotaUI();
                }
            } else {
                els.genBtn.innerHTML = \`<span>冷卻中 (\${timeLeft}s)</span><span style="font-size:12px;opacity:0.6;display:block">請稍候...</span>\`;
            }
        }, 1000);
    }

    els.genBtn.onclick = async () => {
        const p = els.prompt.value.trim();
        if(!p) return toast("⚠️ 請輸入提示詞");
        if(currentQuota <= 0) return toast("🚫 本小時能量已耗盡，請稍後再來！");

        els.genBtn.disabled = true;
        els.loader.style.display = 'flex';
        els.img.style.opacity = '0.5';

        try {
            const res = await fetch('/_internal/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Source': 'nano-page' },
                body: JSON.stringify({
                    prompt: p,
                    negative_prompt: els.negative.value,
                    model: 'nanobanana-pro',
                    width: parseInt(els.width.value),
                    height: parseInt(els.height.value),
                    style: els.style.value,
                    seed: parseInt(els.seed.value),
                    n: 1,
                    nologo: true
                })
            });

            if(res.status === 429) {
                const err = await res.json();
                currentQuota = 0;
                const n = new Date();
                const h = n.toDateString() + '-' + n.getHours();
                localStorage.setItem('nano_quota_hourly_v2', JSON.stringify({hour: h, val: 0}));
                updateQuotaUI();
                throw new Error(err.error?.message || '限額已滿');
            }

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
            
            const realSeed = res.headers.get('X-Seed');
            if(!isSeedRandom) els.seed.value = realSeed;

            addHistory(url);
            consumeQuota();
            
            // 成功後啟動冷卻
            startButtonCooldown();

        } catch(e) {
            toast("❌ " + e.message);
            // 失敗時不冷卻，恢復按鈕
            if(currentQuota > 0) els.genBtn.disabled = false;
        } finally {
            els.loader.style.display = 'none';
        }
    };
</script>
</body>
</html>`;
  
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
  
  // 完整版 UI HTML (略為簡化以適應長度，保留功能核心)
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flux AI Pro v${CONFIG.PROJECT_VERSION}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>">
<style>
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

const PRESET_SIZES=${JSON.stringify(CONFIG.PRESET_SIZES)};
const STYLE_PRESETS=${JSON.stringify(CONFIG.STYLE_PRESETS)};

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
        d.innerHTML=`<img src="${imgSrc}" loading="lazy"><div class="gallery-info"><div class="gallery-meta"><span class="model-badge">${item.model}</span><span class="seed-badge">#${item.seed}</span></div><div class="gallery-actions"><button class="action-btn reuse-btn">${I18N[curLang].btn_reuse}</button><button class="action-btn download-btn">${I18N[curLang].btn_dl}</button><button class="action-btn delete delete-btn">🗑️</button></div></div>`;
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
        d.innerHTML=`<img src="${item.image||item.url}" onclick="openModal(this.src)">`;
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
</html>`;
  
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8', ...corsHeaders() } });
}
