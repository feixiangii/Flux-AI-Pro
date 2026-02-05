/**
 * 影片生成 UI 組件 JavaScript
 * Video Generation UI Components JavaScript
 */

export const VideoUIComponents = {
  // 主頁面 JavaScript
  mainPageScript: `
    // 狀態管理
    const state = {
      quota: 5,
      maxQuota: 5,
      cooldown: 0,
      isGenerating: false,
      uploadedImage: null,
      currentVideo: null,
      history: []
    };

    // DOM 元素（在 DOM 加載後初始化）
    let elements = {};

    // 初始化 DOM 元素
    function initElements() {
      elements = {
        promptInput: document.getElementById('promptInput'),
        imageInput: document.getElementById('imageInput'),
        uploadArea: document.getElementById('uploadArea'),
        uploadPreview: document.getElementById('uploadPreview'),
        previewImage: document.getElementById('previewImage'),
        removeImageBtn: document.getElementById('removeImageBtn'),
        modelSelect: document.getElementById('modelSelect'),
        sizeSelect: document.getElementById('sizeSelect'),
        fpsSlider: document.getElementById('fpsSlider'),
        fpsValue: document.getElementById('fpsValue'),
        durationSlider: document.getElementById('durationSlider'),
        durationValue: document.getElementById('durationValue'),
        generateBtn: document.getElementById('generateBtn'),
        progressContainer: document.getElementById('progressContainer'),
        progressFill: document.getElementById('progressFill'),
        progressText: document.getElementById('progressText'),
        resultContainer: document.getElementById('resultContainer'),
        videoPlayer: document.getElementById('videoPlayer'),
        downloadBtn: document.getElementById('downloadBtn'),
        shareBtn: document.getElementById('shareBtn'),
        regenerateBtn: document.getElementById('regenerateBtn'),
        emptyState: document.getElementById('emptyState'),
        historyGrid: document.getElementById('historyGrid'),
        quotaValue: document.getElementById('quotaValue'),
        quotaProgress: document.getElementById('quotaProgress'),
        cooldownTimer: document.getElementById('cooldownTimer'),
        cooldownTime: document.getElementById('cooldownTime'),
        errorMessage: document.getElementById('errorMessage'),
        errorText: document.getElementById('errorText'),
        particles: document.getElementById('particles')
      };
    }

    // 初始化
    async function init() {
      initElements();
      createParticles();
      await loadQuota();
      loadHistory();
      setupEventListeners();
      startCooldownCheck();
    }

    // 創建背景粒子效果
    function createParticles() {
      if (!elements.particles) return;
      
      const particleCount = 30;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        elements.particles.appendChild(particle);
      }
    }

    // 載入配額
    async function loadQuota() {
      try {
        const response = await fetch('/api/video/quota');
        const data = await response.json();
        state.quota = data.remaining || 0;
        state.maxQuota = data.limit || 5;
        state.cooldown = data.cooldownRemaining || 0;
        updateQuotaDisplay();
      } catch (error) {
        console.error('載入配額失敗:', error);
        // 使用預設值
        state.quota = 5;
        state.maxQuota = 5;
        updateQuotaDisplay();
      }
    }

    // 更新配額顯示
    function updateQuotaDisplay() {
      elements.quotaValue.textContent = state.quota;
      const percentage = (state.quota / state.maxQuota) * 100;
      elements.quotaProgress.style.width = percentage + '%';
      
      if (state.cooldown > 0) {
        elements.cooldownTimer.classList.add('active');
        elements.generateBtn.disabled = true;
      } else {
        elements.cooldownTimer.classList.remove('active');
        elements.generateBtn.disabled = state.quota <= 0 || state.isGenerating;
      }
    }

    // 冷卻檢查
    function startCooldownCheck() {
      setInterval(async () => {
        if (state.cooldown > 0) {
          state.cooldown--;
          elements.cooldownTime.textContent = formatTime(state.cooldown);
          if (state.cooldown <= 0) {
            await loadQuota();
          }
        }
      }, 1000);
    }

    // 格式化時間
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return mins > 0 ? mins + '分' + secs + '秒' : secs + '秒';
    }

    // 設置事件監聽器
    function setupEventListeners() {
      // 圖片上傳
      elements.uploadArea.addEventListener('click', () => elements.imageInput.click());
      elements.uploadArea.addEventListener('dragover', handleDragOver);
      elements.uploadArea.addEventListener('dragleave', handleDragLeave);
      elements.uploadArea.addEventListener('drop', handleDrop);
      elements.imageInput.addEventListener('change', handleImageSelect);
      
      // 移除圖片按鈕
      if (elements.removeImageBtn) {
        elements.removeImageBtn.addEventListener('click', removeUploadedImage);
      }

      // 滑桿
      elements.fpsSlider.addEventListener('input', (e) => {
        elements.fpsValue.textContent = e.target.value;
      });
      elements.durationSlider.addEventListener('input', (e) => {
        elements.durationValue.textContent = e.target.value;
      });

      // 生成按鈕
      elements.generateBtn.addEventListener('click', handleGenerate);

      // 結果操作
      elements.downloadBtn.addEventListener('click', handleDownload);
      elements.shareBtn.addEventListener('click', handleShare);
      elements.regenerateBtn.addEventListener('click', handleRegenerate);
    }

    // 拖曳處理
    function handleDragOver(e) {
      e.preventDefault();
      elements.uploadArea.classList.add('dragover');
    }

    function handleDragLeave(e) {
      e.preventDefault();
      elements.uploadArea.classList.remove('dragover');
    }

    function handleDrop(e) {
      e.preventDefault();
      elements.uploadArea.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        processImage(file);
      }
    }

    // 圖片選擇
    function handleImageSelect(e) {
      const file = e.target.files[0];
      if (file) {
        processImage(file);
      }
    }

    // 處理圖片
    function processImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        state.uploadedImage = e.target.result;
        elements.previewImage.src = e.target.result;
        elements.uploadPreview.classList.add('active');
      };
      reader.readAsDataURL(file);
    }

    // 移除上傳的圖片
    function removeUploadedImage(e) {
      e.stopPropagation();
      state.uploadedImage = null;
      elements.previewImage.src = '';
      elements.uploadPreview.classList.remove('active');
      elements.imageInput.value = '';
    }

    // 生成影片
    async function handleGenerate() {
      const prompt = elements.promptInput.value.trim();
      
      if (!prompt && !state.uploadedImage) {
        showError('請輸入提示詞或上傳參考圖片');
        return;
      }

      if (state.quota <= 0) {
        showError('配額已用完，請稍後再試');
        return;
      }

      state.isGenerating = true;
      elements.generateBtn.classList.add('loading');
      elements.generateBtn.disabled = true;
      elements.progressContainer.classList.add('active');
      elements.errorMessage.classList.remove('active');
      
      // 模擬進度動畫
      simulateProgress();

      try {
        const [width, height] = elements.sizeSelect.value.split('x').map(Number);
        
        const requestBody = {
          prompt: prompt,
          model: elements.modelSelect.value,
          width: width,
          height: height,
          fps: parseInt(elements.fpsSlider.value),
          duration: parseInt(elements.durationSlider.value)
        };

        if (state.uploadedImage) {
          requestBody.referenceImage = state.uploadedImage;
        }

        const response = await fetch('/api/video/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || '生成失敗');
        }

        // 顯示結果
        state.currentVideo = data;
        displayVideo(data.video);
        
        // 更新配額
        state.quota--;
        updateQuotaDisplay();
        
        // 加入歷史記錄
        addToHistory(data);
        
        // 隱藏空狀態
        elements.emptyState.style.display = 'none';

      } catch (error) {
        showError(error.message);
      } finally {
        state.isGenerating = false;
        elements.generateBtn.classList.remove('loading');
        elements.progressContainer.classList.remove('active');
        updateQuotaDisplay();
      }
    }

    // 模擬進度動畫
    function simulateProgress() {
      let progress = 0;
      const interval = setInterval(() => {
        if (!state.isGenerating) {
          clearInterval(interval);
          return;
        }
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        elements.progressFill.style.width = progress + '%';
        
        // 更新進度文字
        if (progress < 30) {
          elements.progressText.textContent = '正在分析提示詞...';
        } else if (progress < 60) {
          elements.progressText.textContent = 'AI 正在生成影片...';
        } else {
          elements.progressText.textContent = '即將完成...';
        }
      }, 500);
    }

    // 顯示影片
    function displayVideo(videoData) {
      elements.resultContainer.classList.add('active');
      elements.videoPlayer.src = videoData;
      elements.videoPlayer.load();
      elements.videoPlayer.play().catch(e => {
        console.log('自動播放被阻止，需要用戶互動');
      });
    }

    // 下載影片
    function handleDownload() {
      if (!state.currentVideo) return;
      
      const link = document.createElement('a');
      link.href = state.currentVideo.video;
      link.download = 'flux-video-' + Date.now() + '.mp4';
      link.click();
    }

    // 分享影片
    function handleShare() {
      if (!state.currentVideo) return;
      
      if (navigator.share) {
        navigator.share({
          title: 'Flux AI Pro 影片',
          text: '查看我使用 AI 生成的影片！',
          url: state.currentVideo.video
        }).catch(err => {
          console.log('分享失敗:', err);
          copyToClipboard(state.currentVideo.video);
        });
      } else {
        copyToClipboard(state.currentVideo.video);
      }
    }

    // 複製到剪貼簿
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        showNotification('影片連結已複製到剪貼簿');
      }).catch(() => {
        showNotification('複製失敗，請手動複製連結');
      });
    }

    // 顯示通知
    function showNotification(message) {
      const notification = document.createElement('div');
      notification.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
      \`;
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }

    // 重新生成
    function handleRegenerate() {
      handleGenerate();
    }

    // 顯示錯誤
    function showError(message) {
      elements.errorText.textContent = message;
      elements.errorMessage.classList.add('active');
      setTimeout(() => {
        elements.errorMessage.classList.remove('active');
      }, 5000);
    }

    // 加入歷史記錄
    function addToHistory(videoData) {
      const historyItem = {
        id: Date.now(),
        prompt: elements.promptInput.value || '圖片生成',
        video: videoData.video,
        timestamp: new Date().toISOString()
      };
      
      state.history.unshift(historyItem);
      if (state.history.length > 10) {
        state.history.pop();
      }
      
      saveHistory();
      renderHistory();
    }

    // 載入歷史記錄
    function loadHistory() {
      const saved = localStorage.getItem('videoHistory');
      if (saved) {
        try {
          state.history = JSON.parse(saved);
          renderHistory();
        } catch (e) {
          console.error('載入歷史記錄失敗:', e);
        }
      }
    }

    // 儲存歷史記錄
    function saveHistory() {
      localStorage.setItem('videoHistory', JSON.stringify(state.history));
    }

    // 渲染歷史記錄
    function renderHistory() {
      if (state.history.length === 0) {
        elements.historyGrid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 20px;">暫無歷史記錄</p>';
        return;
      }

      elements.historyGrid.innerHTML = state.history.map(item => \`
        <div class="history-item" data-id="\${item.id}">
          <div class="history-thumbnail">🎬</div>
          <div class="history-info">
            <div class="history-prompt">\${escapeHtml(item.prompt)}</div>
            <div class="history-time">\${formatTimestamp(item.timestamp)}</div>
          </div>
        </div>
      \`).join('');

      // 點擊歷史項目
      document.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = parseInt(item.dataset.id);
          const historyItem = state.history.find(h => h.id === id);
          if (historyItem) {
            displayVideo({ video: historyItem.video });
            elements.emptyState.style.display = 'none';
            // 滾動到影片播放器
            elements.resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      });
    }

    // 轉義 HTML
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // 格式化時間戳
    function formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;
      
      if (diff < 60000) return '剛剛';
      if (diff < 3600000) return Math.floor(diff / 60000) + '分鐘前';
      if (diff < 86400000) return Math.floor(diff / 3600000) + '小時前';
      return date.toLocaleDateString('zh-TW');
    }

    // 添加 CSS 動畫
    const style = document.createElement('style');
    style.textContent = \`
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(100%); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes slideOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
      }
    \`;
    document.head.appendChild(style);

    // 啟動 - 等待 DOM 完全加載
    document.addEventListener('DOMContentLoaded', init);
  `,

  // Nano 版本 JavaScript
  nanoPageScript: `
    // 狀態管理
    const state = {
      quota: 5,
      isGenerating: false,
      uploadedImage: null,
      currentVideo: null
    };

    // DOM 元素（在 DOM 加載後初始化）
    let elements = {};

    // 初始化 DOM 元素
    function initElements() {
      elements = {
        promptInput: document.getElementById('promptInput'),
        imageInput: document.getElementById('imageInput'),
        uploadArea: document.getElementById('uploadArea'),
        uploadPreview: document.getElementById('uploadPreview'),
        previewImage: document.getElementById('previewImage'),
        modelSelect: document.getElementById('modelSelect'),
        generateBtn: document.getElementById('generateBtn'),
        progressContainer: document.getElementById('progressContainer'),
        progressFill: document.getElementById('progressFill'),
        resultContainer: document.getElementById('resultContainer'),
        videoPlayer: document.getElementById('videoPlayer'),
        downloadBtn: document.getElementById('downloadBtn'),
        regenerateBtn: document.getElementById('regenerateBtn'),
        quotaValue: document.getElementById('quotaValue'),
        errorMessage: document.getElementById('errorMessage'),
        errorText: document.getElementById('errorText')
      };
    }

    // 初始化
    async function init() {
      initElements();
      await loadQuota();
      setupEventListeners();
    }

    // 載入配額
    async function loadQuota() {
      try {
        const response = await fetch('/api/video/quota');
        const data = await response.json();
        state.quota = data.remaining || 0;
        elements.quotaValue.textContent = state.quota;
        elements.generateBtn.disabled = state.quota <= 0;
      } catch (error) {
        console.error('載入配額失敗:', error);
        state.quota = 5;
        elements.quotaValue.textContent = state.quota;
      }
    }

    // 設置事件監聽器
    function setupEventListeners() {
      elements.uploadArea.addEventListener('click', () => elements.imageInput.click());
      elements.imageInput.addEventListener('change', handleImageSelect);
      elements.generateBtn.addEventListener('click', handleGenerate);
      elements.downloadBtn.addEventListener('click', handleDownload);
      elements.regenerateBtn.addEventListener('click', handleGenerate);
    }

    // 圖片選擇
    function handleImageSelect(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          state.uploadedImage = e.target.result;
          elements.previewImage.src = e.target.result;
          elements.uploadPreview.classList.add('active');
        };
        reader.readAsDataURL(file);
      }
    }

    // 生成影片
    async function handleGenerate() {
      const prompt = elements.promptInput.value.trim();
      
      if (!prompt && !state.uploadedImage) {
        showError('請輸入提示詞或上傳參考圖片');
        return;
      }

      if (state.quota <= 0) {
        showError('配額已用完');
        return;
      }

      state.isGenerating = true;
      elements.generateBtn.disabled = true;
      elements.generateBtn.classList.add('loading');
      elements.progressContainer.classList.add('active');
      elements.errorMessage.classList.remove('active');

      try {
        const requestBody = {
          prompt: prompt,
          model: elements.modelSelect.value,
          width: 1280,
          height: 720,
          fps: 24,
          duration: 5
        };

        if (state.uploadedImage) {
          requestBody.referenceImage = state.uploadedImage;
        }

        const response = await fetch('/api/video/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || '生成失敗');
        }

        state.currentVideo = data;
        elements.resultContainer.classList.add('active');
        elements.videoPlayer.src = data.video;
        elements.videoPlayer.load();
        elements.videoPlayer.play().catch(() => {});
        
        state.quota--;
        elements.quotaValue.textContent = state.quota;

      } catch (error) {
        showError(error.message);
      } finally {
        state.isGenerating = false;
        elements.generateBtn.classList.remove('loading');
        elements.generateBtn.disabled = state.quota <= 0;
        elements.progressContainer.classList.remove('active');
      }
    }

    // 下載影片
    function handleDownload() {
      if (!state.currentVideo) return;
      
      const link = document.createElement('a');
      link.href = state.currentVideo.video;
      link.download = 'flux-video-' + Date.now() + '.mp4';
      link.click();
    }

    // 顯示錯誤
    function showError(message) {
      elements.errorText.textContent = message;
      elements.errorMessage.classList.add('active');
      setTimeout(() => {
        elements.errorMessage.classList.remove('active');
      }, 3000);
    }

    // 啟動 - 等待 DOM 完全加載
    document.addEventListener('DOMContentLoaded', init);
  `
};
