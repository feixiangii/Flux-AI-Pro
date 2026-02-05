/**
 * 影片生成 UI 模板
 * Video Generation UI Templates
 */

export const VideoTemplates = {
  // 主頁面模板
  mainPage: `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>影片生成 - Flux AI Pro</title>
  <style>
    :root {
      --primary-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
      --secondary-gradient: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
      --glass-bg: rgba(255, 255, 255, 0.08);
      --glass-border: rgba(255, 255, 255, 0.12);
      --text-primary: #ffffff;
      --text-secondary: rgba(255, 255, 255, 0.7);
      --text-muted: rgba(255, 255, 255, 0.5);
      --success: #10b981;
      --warning: #f59e0b;
      --error: #ef4444;
      --radius-lg: 20px;
      --radius-md: 14px;
      --radius-sm: 10px;
      --shadow-glow: 0 0 40px rgba(139, 92, 246, 0.3);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #252550 50%, #1a1a3e 75%, #0f0f23 100%);
      background-size: 400% 400%;
      animation: gradientShift 15s ease infinite;
      min-height: 100vh;
      color: var(--text-primary);
      overflow-x: hidden;
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    /* 背景粒子效果 */
    .particles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    }

    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(139, 92, 246, 0.5);
      border-radius: 50%;
      animation: float 20s infinite;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(720deg);
        opacity: 0;
      }
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
      position: relative;
      z-index: 1;
    }

    /* Header */
    .header {
      text-align: center;
      padding: 40px 0 30px;
      position: relative;
    }

    .header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 2px;
      background: var(--primary-gradient);
      border-radius: 2px;
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 20px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 50px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 20px;
      backdrop-filter: blur(10px);
    }

    .header-badge .dot {
      width: 8px;
      height: 8px;
      background: var(--success);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.2); }
    }

    .header h1 {
      font-size: 3rem;
      font-weight: 800;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 12px;
      letter-spacing: -1px;
    }

    .header p {
      color: var(--text-secondary);
      font-size: 1.15rem;
      max-width: 500px;
      margin: 0 auto;
    }

    /* Main Content */
    .main-content {
      display: grid;
      grid-template-columns: 420px 1fr;
      gap: 32px;
      margin-top: 40px;
    }

    @media (max-width: 1024px) {
      .main-content {
        grid-template-columns: 1fr;
      }
    }

    /* Panel */
    .panel {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-lg);
      padding: 28px;
      backdrop-filter: blur(20px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .panel:hover {
      box-shadow: var(--shadow-glow);
    }

    .panel-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--glass-border);
    }

    .panel-icon {
      width: 44px;
      height: 44px;
      background: var(--primary-gradient);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
    }

    .panel-title {
      font-size: 1.25rem;
      font-weight: 700;
    }

    /* Form Groups */
    .form-group {
      margin-bottom: 22px;
    }

    .form-label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--text-primary);
    }

    .form-label .icon {
      font-size: 1rem;
    }

    .form-input,
    .form-select,
    .form-textarea {
      width: 100%;
      padding: 14px 18px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 0.95rem;
      transition: all 0.3s ease;
      font-family: inherit;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #8b5cf6;
      background: rgba(139, 92, 246, 0.1);
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
    }

    .form-textarea {
      min-height: 120px;
      resize: vertical;
      line-height: 1.6;
    }

    .form-input::placeholder,
    .form-textarea::placeholder {
      color: var(--text-muted);
    }

    /* Upload Area */
    .upload-area {
      border: 2px dashed var(--glass-border);
      border-radius: var(--radius-md);
      padding: 32px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.02);
    }

    .upload-area:hover {
      border-color: #8b5cf6;
      background: rgba(139, 92, 246, 0.08);
      transform: translateY(-2px);
    }

    .upload-area.dragover {
      border-color: #8b5cf6;
      background: rgba(139, 92, 246, 0.15);
      transform: scale(1.02);
    }

    .upload-icon {
      font-size: 3rem;
      margin-bottom: 12px;
      display: block;
    }

    .upload-text {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    .upload-hint {
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-top: 6px;
    }

    .upload-preview {
      margin-top: 16px;
      display: none;
      position: relative;
    }

    .upload-preview.active {
      display: block;
    }

    .upload-preview img {
      width: 100%;
      max-height: 200px;
      object-fit: contain;
      border-radius: var(--radius-md);
      border: 2px solid var(--glass-border);
    }

    .upload-preview .remove-btn {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 32px;
      height: 32px;
      background: var(--error);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      transition: transform 0.2s;
    }

    .upload-preview .remove-btn:hover {
      transform: scale(1.1);
    }

    /* Slider */
    .slider-group {
      background: rgba(255, 255, 255, 0.04);
      border-radius: var(--radius-md);
      padding: 18px;
    }

    .slider-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }

    .slider-label {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .slider-value {
      background: var(--primary-gradient);
      padding: 4px 14px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.9rem;
      min-width: 50px;
      text-align: center;
    }

    .slider {
      width: 100%;
      -webkit-appearance: none;
      height: 6px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
      outline: none;
      cursor: pointer;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 22px;
      height: 22px;
      background: var(--primary-gradient);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(139, 92, 246, 0.5);
      transition: transform 0.2s;
    }

    .slider::-webkit-slider-thumb:hover {
      transform: scale(1.15);
    }

    .slider::-moz-range-thumb {
      width: 22px;
      height: 22px;
      background: var(--primary-gradient);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(139, 92, 246, 0.5);
    }

    /* Quota Display */
    .quota-card {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
      border: 1px solid rgba(139, 92, 246, 0.3);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-bottom: 24px;
    }

    .quota-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }

    .quota-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .quota-value {
      font-size: 2rem;
      font-weight: 800;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .quota-bar-container {
      height: 10px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      overflow: hidden;
    }

    .quota-bar {
      height: 100%;
      background: var(--primary-gradient);
      border-radius: 5px;
      transition: width 0.5s ease;
      position: relative;
    }

    .quota-bar::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .cooldown-timer {
      display: none;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: var(--radius-sm);
      margin-top: 14px;
      font-size: 0.9rem;
      color: #fca5a5;
    }

    .cooldown-timer.active {
      display: flex;
    }

    /* Generate Button */
    .generate-btn {
      width: 100%;
      padding: 18px;
      background: var(--primary-gradient);
      border: none;
      border-radius: var(--radius-md);
      color: #fff;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
    }

    .generate-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .generate-btn:hover:not(:disabled)::before {
      left: 100%;
    }

    .generate-btn:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(139, 92, 246, 0.5);
    }

    .generate-btn:active:not(:disabled) {
      transform: translateY(-1px);
    }

    .generate-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .generate-btn .spinner {
      display: none;
      width: 22px;
      height: 22px;
      border: 3px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .generate-btn.loading .spinner {
      display: block;
    }

    .generate-btn.loading .btn-text {
      opacity: 0.8;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Progress */
    .progress-container {
      margin-top: 20px;
      display: none;
    }

    .progress-container.active {
      display: block;
    }

    .progress-bar {
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--primary-gradient);
      border-radius: 4px;
      transition: width 0.3s ease;
      animation: progressPulse 1.5s ease-in-out infinite;
    }

    @keyframes progressPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .progress-text {
      text-align: center;
      margin-top: 12px;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    /* Result Container */
    .result-container {
      display: none;
    }

    .result-container.active {
      display: block;
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .video-wrapper {
      background: #000;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    }

    .video-player video {
      width: 100%;
      display: block;
      aspect-ratio: 16/9;
    }

    .result-actions {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }

    .action-btn {
      flex: 1;
      padding: 14px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .action-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .action-btn.primary {
      background: var(--secondary-gradient);
      border-color: transparent;
    }

    .action-btn.primary:hover {
      box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 80px 40px;
      color: var(--text-muted);
    }

    .empty-state .icon {
      font-size: 5rem;
      margin-bottom: 20px;
      opacity: 0.5;
    }

    .empty-state h3 {
      font-size: 1.3rem;
      color: var(--text-secondary);
      margin-bottom: 10px;
    }

    .empty-state p {
      font-size: 0.95rem;
    }

    /* History Section */
    .history-section {
      margin-top: 32px;
    }

    .history-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
      margin-top: 20px;
    }

    .history-item {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .history-item:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      border-color: rgba(139, 92, 246, 0.5);
    }

    .history-thumbnail {
      width: 100%;
      aspect-ratio: 16/9;
      background: linear-gradient(135deg, #1a1a3e 0%, #252550 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      position: relative;
    }

    .history-thumbnail::after {
      content: '▶';
      position: absolute;
      font-size: 1.5rem;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .history-item:hover .history-thumbnail::after {
      opacity: 1;
    }

    .history-info {
      padding: 12px;
    }

    .history-prompt {
      font-size: 0.85rem;
      color: var(--text-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .history-time {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 4px;
    }

    /* Error Message */
    .error-message {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: var(--radius-md);
      padding: 16px 20px;
      margin-top: 20px;
      display: none;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .error-message.active {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .error-message .icon {
      font-size: 1.5rem;
    }

    .error-message p {
      color: #fca5a5;
      font-size: 0.95rem;
    }

    /* Back Link */
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 40px;
      padding: 12px 24px;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.3s ease;
      border-radius: var(--radius-sm);
      font-weight: 500;
    }

    .back-link:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.08);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .header h1 {
        font-size: 2rem;
      }

      .header p {
        font-size: 1rem;
      }

      .panel {
        padding: 20px;
      }

      .result-actions {
        flex-direction: column;
      }

      .history-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      }
    }
  </style>
</head>
<body>
  <!-- 背景粒子 -->
  <div class="particles" id="particles"></div>

  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="header-badge">
        <span class="dot"></span>
        <span>AI 影片生成服務</span>
      </div>
      <h1>🎬 影片生成</h1>
      <p>使用 Pollinations.ai AI 技術，將您的想像轉化為精彩影片</p>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- 左側：輸入表單 -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-icon">✨</div>
          <div class="panel-title">生成設定</div>
        </div>

        <!-- 配額顯示 -->
        <div class="quota-card">
          <div class="quota-header">
            <div class="quota-label">
              <span>⚡</span>
              <span>剩餘配額</span>
            </div>
            <div class="quota-value" id="quotaValue">--</div>
          </div>
          <div class="quota-bar-container">
            <div class="quota-bar" id="quotaProgress" style="width: 0%"></div>
          </div>
          <div class="cooldown-timer" id="cooldownTimer">
            <span>⏱️</span>
            <span>冷卻中：<span id="cooldownTime">--</span></span>
          </div>
        </div>

        <!-- 提示詞輸入 -->
        <div class="form-group">
          <label class="form-label">
            <span class="icon">💭</span>
            <span>提示詞</span>
          </label>
          <textarea class="form-textarea" id="promptInput" placeholder="描述您想要生成的影片內容，例如：一隻可愛的貓咪在花園裡玩耍，陽光灑落..."></textarea>
        </div>

        <!-- 圖片上傳 -->
        <div class="form-group">
          <label class="form-label">
            <span class="icon">📷</span>
            <span>參考圖片（可選）</span>
          </label>
          <div class="upload-area" id="uploadArea">
            <span class="upload-icon">🖼️</span>
            <div class="upload-text">拖曳圖片到這裡或點擊上傳</div>
            <div class="upload-hint">支援 JPG、PNG、WEBP 格式</div>
            <input type="file" id="imageInput" accept="image/*" style="display: none;">
          </div>
          <div class="upload-preview" id="uploadPreview">
            <img id="previewImage" src="" alt="預覽">
            <button class="remove-btn" id="removeImageBtn" title="移除圖片">✕</button>
          </div>
        </div>

        <!-- 模型選擇 -->
        <div class="form-group">
          <label class="form-label">
            <span class="icon">🤖</span>
            <span>AI 模型</span>
          </label>
          <select class="form-select" id="modelSelect">
            <option value="seedance">Seedance（預設）- 平衡品質與速度</option>
            <option value="seedance-pro">Seedance Pro - 進階品質</option>
            <option value="wan">Wan - 圖片轉影片專用</option>
          </select>
        </div>

        <!-- 尺寸選擇 -->
        <div class="form-group">
          <label class="form-label">
            <span class="icon">📐</span>
            <span>影片尺寸</span>
          </label>
          <select class="form-select" id="sizeSelect">
            <option value="1280x720">1280x720 (HD - 橫向)</option>
            <option value="1920x1080">1920x1080 (Full HD - 橫向)</option>
            <option value="720x720">720x720 (Square - 方形)</option>
            <option value="1080x1920">1080x1920 (Portrait - 直向)</option>
          </select>
        </div>

        <!-- FPS 調整 -->
        <div class="form-group">
          <div class="slider-group">
            <div class="slider-header">
              <span class="slider-label">🎞️ 幀率 (FPS)</span>
              <span class="slider-value" id="fpsValue">24</span>
            </div>
            <input type="range" class="slider" id="fpsSlider" min="24" max="60" value="24">
          </div>
        </div>

        <!-- 持續時間調整 -->
        <div class="form-group">
          <div class="slider-group">
            <div class="slider-header">
              <span class="slider-label">⏱️ 持續時間（秒）</span>
              <span class="slider-value" id="durationValue">5</span>
            </div>
            <input type="range" class="slider" id="durationSlider" min="3" max="10" value="5">
          </div>
        </div>

        <!-- 生成按鈕 -->
        <button class="generate-btn" id="generateBtn">
          <span class="spinner"></span>
          <span class="btn-text">🚀 開始生成影片</span>
        </button>

        <!-- 進度顯示 -->
        <div class="progress-container" id="progressContainer">
          <div class="progress-bar">
            <div class="progress-fill" id="progressFill" style="width: 0%"></div>
          </div>
          <div class="progress-text" id="progressText">正在生成影片，請稍候...</div>
        </div>

        <!-- 錯誤訊息 -->
        <div class="error-message" id="errorMessage">
          <span class="icon">⚠️</span>
          <p id="errorText"></p>
        </div>
      </div>

      <!-- 右側：結果顯示 -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-icon">🎥</div>
          <div class="panel-title">生成結果</div>
        </div>

        <!-- 影片播放器 -->
        <div class="result-container" id="resultContainer">
          <div class="video-wrapper">
            <video id="videoPlayer" controls loop></video>
          </div>
          <div class="result-actions">
            <button class="action-btn primary" id="downloadBtn">
              <span>⬇️</span>
              <span>下載影片</span>
            </button>
            <button class="action-btn" id="shareBtn">
              <span>🔗</span>
              <span>分享連結</span>
            </button>
            <button class="action-btn" id="regenerateBtn">
              <span>🔄</span>
              <span>重新生成</span>
            </button>
          </div>
        </div>

        <!-- 空狀態 -->
        <div class="empty-state" id="emptyState">
          <div class="icon">🎬</div>
          <h3>準備開始創作</h3>
          <p>輸入提示詞並點擊生成按鈕，AI 將為您創作精彩影片</p>
        </div>

        <!-- 歷史記錄 -->
        <div class="history-section">
          <div class="panel-header" style="margin-bottom: 16px; padding-bottom: 16px;">
            <div class="panel-icon" style="width: 36px; height: 36px; font-size: 1.1rem;">📚</div>
            <div class="panel-title" style="font-size: 1.1rem;">歷史記錄</div>
          </div>
          <div class="history-grid" id="historyGrid">
            <!-- 歷史項目將動態插入 -->
          </div>
        </div>
      </div>
    </div>

    <a href="/" class="back-link">
      <span>←</span>
      <span>返回首頁</span>
    </a>
  </div>

  <script>
    // JavaScript 將由 page-generator.js 動態生成
  </script>
</body>
</html>
  `,

  // Nano 版本模板
  nanoPage: `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>影片生成 - Flux AI Pro</title>
  <style>
    :root {
      --primary-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      --glass-bg: rgba(255, 255, 255, 0.08);
      --glass-border: rgba(255, 255, 255, 0.12);
      --text-primary: #ffffff;
      --text-secondary: rgba(255, 255, 255, 0.7);
      --text-muted: rgba(255, 255, 255, 0.5);
      --radius-lg: 16px;
      --radius-md: 12px;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%);
      min-height: 100vh;
      color: var(--text-primary);
      padding: 16px;
    }

    .container {
      max-width: 500px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      padding: 24px 0;
    }

    .header h1 {
      font-size: 1.8rem;
      font-weight: 800;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }

    .header p {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .panel {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-lg);
      padding: 20px;
      backdrop-filter: blur(10px);
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--text-primary);
    }

    .form-input,
    .form-select,
    .form-textarea {
      width: 100%;
      padding: 12px 14px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 0.9rem;
      font-family: inherit;
    }

    .form-textarea {
      min-height: 80px;
      resize: vertical;
    }

    .upload-area {
      border: 2px dashed var(--glass-border);
      border-radius: var(--radius-md);
      padding: 24px;
      text-align: center;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.02);
      transition: all 0.3s;
    }

    .upload-area:hover {
      border-color: #8b5cf6;
      background: rgba(139, 92, 246, 0.08);
    }

    .upload-preview {
      margin-top: 12px;
      display: none;
    }

    .upload-preview.active {
      display: block;
    }

    .upload-preview img {
      width: 100%;
      max-height: 150px;
      object-fit: contain;
      border-radius: var(--radius-md);
    }

    .quota-display {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
      border: 1px solid rgba(139, 92, 246, 0.3);
      border-radius: var(--radius-md);
      padding: 16px;
      margin-bottom: 20px;
      text-align: center;
    }

    .quota-value {
      font-size: 2rem;
      font-weight: 800;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .generate-btn {
      width: 100%;
      padding: 16px;
      background: var(--primary-gradient);
      border: none;
      border-radius: var(--radius-md);
      color: #fff;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .generate-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .generate-btn .spinner {
      display: none;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .generate-btn.loading .spinner {
      display: block;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .progress-container {
      margin-top: 16px;
      display: none;
    }

    .progress-container.active {
      display: block;
    }

    .progress-bar {
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--primary-gradient);
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .result-container {
      margin-top: 20px;
      display: none;
    }

    .result-container.active {
      display: block;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .video-wrapper {
      background: #000;
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .video-wrapper video {
      width: 100%;
      display: block;
    }

    .result-actions {
      display: flex;
      gap: 10px;
      margin-top: 12px;
    }

    .action-btn {
      flex: 1;
      padding: 12px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .action-btn:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .error-message {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      margin-top: 16px;
      display: none;
    }

    .error-message.active {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .error-message p {
      color: #fca5a5;
      font-size: 0.9rem;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 24px;
      padding: 10px 20px;
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: var(--radius-md);
      font-weight: 500;
      transition: all 0.3s;
    }

    .back-link:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.08);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎬 影片生成</h1>
      <p>Pollinations.ai AI 技術</p>
    </div>

    <div class="panel">
      <div class="quota-display">
        <div>剩餘配額：<span class="quota-value" id="quotaValue">--</span></div>
      </div>

      <div class="form-group">
        <label class="form-label">💭 提示詞</label>
        <textarea class="form-textarea" id="promptInput" placeholder="描述影片內容..."></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">📷 參考圖片（可選）</label>
        <div class="upload-area" id="uploadArea">
          <span>🖼️ 點擊上傳</span>
          <input type="file" id="imageInput" accept="image/*" style="display: none;">
        </div>
        <div class="upload-preview" id="uploadPreview">
          <img id="previewImage" src="" alt="預覽">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">🤖 AI 模型</label>
        <select class="form-select" id="modelSelect">
          <option value="seedance">Seedance</option>
          <option value="seedance-pro">Seedance Pro</option>
          <option value="wan">Wan</option>
        </select>
      </div>

      <button class="generate-btn" id="generateBtn">
        <span class="spinner"></span>
        <span class="btn-text">🚀 開始生成</span>
      </button>

      <div class="progress-container" id="progressContainer">
        <div class="progress-bar">
          <div class="progress-fill" id="progressFill" style="width: 0%"></div>
        </div>
      </div>

      <div class="result-container" id="resultContainer">
        <div class="video-wrapper">
          <video id="videoPlayer" controls loop></video>
        </div>
        <div class="result-actions">
          <button class="action-btn" id="downloadBtn">⬇️ 下載</button>
          <button class="action-btn" id="regenerateBtn">🔄 重新生成</button>
        </div>
      </div>

      <div class="error-message" id="errorMessage">
        <span>⚠️</span>
        <p id="errorText"></p>
      </div>
    </div>

    <a href="/" class="back-link">
      <span>←</span>
      <span>返回首頁</span>
    </a>
  </div>

  <script>
    // JavaScript 將由 page-generator.js 動態生成
  </script>
</body>
</html>
  `
};
