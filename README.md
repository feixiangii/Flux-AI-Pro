功能特點
🎨 4 個官方模型

Z-Image Turbo ⚡ - 6B 參數，極速生成
Flux 標準版 - 平衡速度與質量
Flux Turbo ⚡ - 超快速生成
Kontext 🎨 - 支持圖生圖
🌐 完整的 Web UI 界面

三欄式佈局（參數 | 結果 | 提示詞）
實時配置預覽
歷史記錄管理
響應式設計
🚀 智能優化

自動中文翻譯（支持 Cloudflare Workers AI）
HD 高清增強（3 種質量模式）
智能參數優化
複雜度分析
🎯 風格預設

8+ 種藝術風格
自定義風格組合
正面/負面提示詞
🖼️ 圖生圖支持

Kontext 模型支持參考圖像
多張圖片輸入
URL 方式上傳
💾 本地歷史記錄

自動保存生成記錄
重用參數功能
導出/清空記錄
最多保存 100 條
🔐 可選認證

支持官方 API Key
匿名模式可用
環境變量配置
🆕 圖片字節返回 (v9.5.2-bytes)

直接返回圖片二進制數據
不暴露 Pollinations URL
支持單張/批量生成
HTTP Headers 傳遞元數據
📦 技術棧
運行環境: Cloudflare Workers
AI 翻譯: Cloudflare Workers AI
前端: 原生 HTML/CSS/JavaScript
API: Pollinations.ai Official API
存儲: localStorage（客戶端）
🚀 快速開始
1. 克隆項目
git clone https://github.com/yourusername/flux-ai-pro.git cd flux-ai-pro

text

2. 安裝 Wrangler
npm install -g wrangler

text

3. 登錄 Cloudflare
wrangler login

text

4. 配置環境變量（可選）
如果需要使用官方 API Key 認證：

wrangler secret put POLLINATIONS_API_KEY

輸入你的 API Key: pol_xxxxxxxxxx text

5. 部署
wrangler deploy

text

6. 訪問
部署成功後，訪問你的 Worker URL： https://flux-ai-pro.your-subdomain.workers.dev

text

⚙️ 配置說明
wrangler.toml 基本配置
name = "flux-ai-pro" main = "worker.js" compatibility_date = "2024-12-17"

[ai] binding = "AI"

compatibility_flags = ["nodejs_compat"]

text

環境變量
變量名	說明	必需
POLLINATIONS_API_KEY	Pollinations.ai API Key	是
🎨 使用方法
1. 基本生成
輸入提示詞（支持中文）
選擇模型和尺寸
選擇風格（可選）
點擊「開始生成」
2. 進階選項
Seed: 設置隨機種子（-1 為隨機）
生成數量: 1-4 張
自動優化: 智能調整參數
HD 增強: 自動提升質量
3. 圖生圖（Kontext）
選擇 Kontext 模型
在「參考圖像 URL」中輸入圖片地址
輸入提示詞描述變化
生成
4. 歷史記錄
自動保存所有生成記錄
點擊「重用」快速復用參數
點擊圖片查看大圖
下載圖片到本地
📊 模型對比
模型	速度	質量	參數量	價格*	特點
Z-Image Turbo	⚡⚡⚡	⭐⭐⭐	6B	0.0002	極速生成
Flux 標準版	⚡⚡	⭐⭐⭐⭐	-	0.00012	平衡
Flux Turbo	⚡⚡⚡	⭐⭐⭐	-	0.0003	快速
Kontext	⚡	⭐⭐⭐⭐⭐	-	0.04	圖生圖
*價格單位: Pollen credits

🎯 質量模式
模式	最小分辨率	Steps 倍率	適用場景
經濟模式	1024px	0.85x	快速預覽
標準模式	1280px	1.0x	日常使用
超高清模式	1536px	1.35x	高質量輸出
🎨 內置風格
動漫風格 ✨
寫實照片 📷
油畫 🎨
水彩畫 💧
賽博朋克 🌃
奇幻風格 🐉
吉卜力風格 🍃
📐 尺寸預設
方形: 1024x1024, 1536x1536, 2048x2048
豎屏: 1080x1920 (9:16)
橫屏: 1920x1080 (16:9)
Instagram: 1080x1080
桌布: 1920x1080 (Full HD)
🔧 開發
本地開發
啟動開發服務器 wrangler dev

查看日誌 wrangler tail

查看部署列表 wrangler deployments list

text

文件結構
flux-ai-pro/ ├── worker.js # 主程序 ├── wrangler.toml # Cloudflare 配置 ├── README.md # 說明文檔 ├── CHANGELOG.md # 更新記錄 └── package.json # 依賴配置（可選）

text

🐛 常見問題
Q: 圖片生成失敗？
A: 檢查網絡連接，確保提示詞不為空，嘗試更換模型。

Q: 中文翻譯不工作？
A: 確保 wrangler.toml 中已綁定 Workers AI： [ai] binding = "AI"

text

Q: 如何使用 API Key？
A: 運行以下命令設置： wrangler secret put POLLINATIONS_API_KEY

text

Q: 歷史記錄丟失？
A: 歷史記錄保存在瀏覽器 localStorage，清除瀏覽器數據會丟失。

Q: 免費計劃 CPU 限制錯誤？
A: 移除 wrangler.toml 中的 [limits] 配置段，或升級到付費計劃。

📜 更新記錄
v9.5.2-bytes (2025-12-17) 🎉 最新
🎯 重大更新

✅ 返回圖片字節數據：不再返回 Pollinations URL，直接返回圖片二進制數據
✅ 雙響應模式：
單張圖片：直接返回圖片字節（Content-Type: image/png）
多張圖片：返回 JSON 格式（包含 base64 編碼）
🔧 技術改進

添加圖片 Blob 和 ArrayBuffer 處理
HTTP Headers 傳遞元數據（模型、種子、尺寸等）
Base64 編碼支持批量生成
ObjectURL 本地緩存優化
📦 新增功能

圖片字節流式傳輸
自定義文件名下載
Content-Disposition 頭部設置
前端 Blob 轉換處理
🐛 修復問題

修復歷史記錄存儲 Blob URL
優化內存釋放機制
改進錯誤處理邏輯
v9.5.1-fixed (2025-12-17)
✅ Bug 修復

✅ 修復 CSP 內聯事件錯誤（移除所有 onclick 等內聯事件）
✅ 添加 Favicon（避免 404 錯誤）
✅ 修復生成結果不顯示問題
✅ 優化歷史記錄顯示邏輯
🎨 UI 改進

改進生成結果展示動畫
添加"剛剛生成"標籤
優化成功提示樣式
改進錯誤提示顯示
🔧 代碼優化

移除所有內聯 JavaScript
改進事件監聽器綁定
優化 CSS 樣式結構
清理冗餘代碼
v9.5.0 (2025-12-16)
🎉 首次發布

核心功能

支持 4 個官方模型（Z-Image Turbo、Flux、Flux Turbo、Kontext）
完整的 Web UI 界面（三欄式佈局）
智能參數優化系統
HD 高清增強功能
8+ 種藝術風格預設
多語言支持

自動中文翻譯（基於 Cloudflare Workers AI）
中英雙語界面
支持中文提示詞輸入
圖像處理

文生圖功能
圖生圖功能（Kontext 模型）
多張參考圖像支持
自定義尺寸預設
本地存儲

歷史記錄自動保存（localStorage）
最多保存 100 條記錄
導出/導入功能
一鍵清空
進階功能

自動參數優化
複雜度分析
質量模式選擇（經濟/標準/超高清）
Seed 控制
批量生成（1-4 張）
安全性

可選 API Key 認證
匿名模式支持
環境變量安全配置
CORS 跨域支持
部署

Cloudflare Workers 部署
全球邊緣網絡加速
免費額度支持
自定義域名
🔮 未來計劃
v10.0 (計劃中)
 更多模型支持（SDXL、DALL-E 3）
 批量下載功能
 圖片編輯工具
 自定義風格訓練
 團隊協作功能
v10.1 (規劃中)
 視頻生成支持
 3D 模型生成
 AI 圖片放大
 移動端優化
v11.0 (遠期)
 API 接口開放
 插件系統
 雲端同步
 多用戶支持
查看完整更新記錄

📊 版本對比
版本	發布日期	主要特性	破壞性更改
9.5.2-bytes	2025-12-17	返回圖片字節	✅ 是
9.5.1-fixed	2025-12-17	修復 CSP 錯誤	❌ 否
9.5.0	2025-12-16	首次發布	-
📄 許可證
MIT License

🤝 貢獻
歡迎提交 Issue 和 Pull Request！

貢獻指南

Fork 本項目
創建 feature 分支 (git checkout -b feature/AmazingFeature)
提交更改 (git commit -m 'Add some AmazingFeature')
推送到分支 (git push origin feature/AmazingFeature)
開啟 Pull Request
🔗 相關鏈接
Pollinations.ai
Cloudflare Workers
項目主頁
完整更新記錄
問題反饋
English
✨ Features
🎨 4 Official Models

Z-Image Turbo ⚡ - 6B parameters, lightning fast
Flux Standard - Balanced speed and quality
Flux Turbo ⚡ - Ultra-fast generation
Kontext 🎨 - Supports image-to-image
🌐 Complete Web UI

Three-column layout (Parameters | Results | Prompts)
Real-time configuration preview
History management
Responsive design
🚀 Smart Optimization

Auto Chinese translation (powered by Cloudflare Workers AI)
HD enhancement (3 quality modes)
Intelligent parameter optimization
Complexity analysis
🎯 Style Presets

8+ artistic styles
Custom style combinations
Positive/negative prompts
🖼️ Image-to-Image Support

Kontext model supports reference images
Multiple image inputs
URL-based upload
💾 Local History

Auto-save generation records
Reuse parameters feature
Export/clear records
Up to 100 records
🔐 Optional Authentication

Official API Key support
Anonymous mode available
Environment variable configuration
🆕 Image Bytes Return (v9.5.2-bytes)

Direct binary data response
No exposed Pollinations URL
Single/batch generation support
Metadata via HTTP Headers
📦 Tech Stack
Runtime: Cloudflare Workers
AI Translation: Cloudflare Workers AI
Frontend: Native HTML/CSS/JavaScript
API: Pollinations.ai Official API
Storage: localStorage (client-side)
🚀 Quick Start
1. Clone Repository
git clone https://github.com/yourusername/flux-ai-pro.git cd flux-ai-pro

text

2. Install Wrangler
npm install -g wrangler

text

3. Login to Cloudflare
wrangler login

text

4. Configure Environment Variables (Optional)
To use official API Key authentication:

wrangler secret put POLLINATIONS_API_KEY

Enter your API Key: pol_xxxxxxxxxx text

5. Deploy
wrangler deploy

text

6. Visit
After successful deployment, visit your Worker URL: https://flux-ai-pro.your-subdomain.workers.dev

text

📜 Changelog
v9.5.2-bytes (2025-12-17) 🎉 Latest
✅ Image bytes response: Returns binary data instead of URLs
✅ Dual response mode: Single image / Batch generation
✅ HTTP Headers metadata transmission
✅ Base64 encoding support
✅ Optimized memory handling
v9.5.1-fixed (2025-12-17)
✅ Fixed CSP inline event errors
✅ Added Favicon (avoid 404)
✅ Fixed generation result display
✅ Improved history display
v9.5.0 (2025-12-16)
🎉 Initial release
🎨 4 official model support
🌐 Complete Web UI interface
🚀 Smart parameter optimization
View Full Changelog

📄 License
MIT License

🤝 Contributing
Issues and Pull Requests are welcome!

🔗 Links
Pollinations.ai
Cloudflare Workers
Project Homepage
Full Changelog
Made with ❤️ by the community

⭐ Star this repo if you find it helpful!

Report Bug · Request Feature · Discussions

🎯 主要改動 ✅ 新增內容 頂部添加版本標籤
顯示當前版本號

標注最新更新特性

更新記錄章節

詳細的版本歷史

每個版本的主要特性

分類清晰（Bug 修復、新功能、技術改進）

版本對比表格

一目了然的版本對比

標注破壞性更改

未來計劃

Roadmap 路線圖

讓用戶了解項目方向

相關鏈接

添加 CHANGELOG.md 鏈接

便於查看完整更新記錄

📝 結構優化 更新記錄放在「常見問題」之後

中英文版本都包含更新記錄

保持格式統一，易於閱讀

這樣用戶可以在 README 中直接看到最近的更新，同時可以點擊查看完整的 CHANGELOG.md！🚀
