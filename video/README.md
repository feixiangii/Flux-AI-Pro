# 影片生成模組 - 簡化版

## 概述

這是 Flux AI Pro 的簡化版影片生成模組，僅支援 Pollinations.ai 供應商。模組採用模組化架構設計，提供完整的 RESTful API 端點供外部呼叫。

## 架構

```
video/
├── config/
│   └── pollinations.config.js    # Pollinations 配置
├── core/
│   ├── video-service.js          # 影片服務核心
│   └── rate-limiter.js           # 限流器
├── providers/
│   └── pollinations-provider.js  # Pollinations 供應商
├── utils/
│   └── logger.js                 # 日誌工具
├── api/
│   └── handlers.js               # API 處理器
└── index.js                      # 模組入口
```

## API 端點

| 端點 | 方法 | 說明 |
|------|------|------|
| `/api/video/generate` | POST | 生成影片 |
| `/api/video/models` | GET | 獲取模型列表 |
| `/api/video/styles` | GET | 獲取樣式列表 |
| `/api/video/sizes` | GET | 獲取尺寸列表 |
| `/api/video/quota` | GET | 獲取配額資訊 |
| `/api/video/config` | GET | 獲取完整配置 |

## 使用範例

### 生成影片（文字轉影片）

```bash
curl -X POST https://your-worker.workers.dev/api/video/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A beautiful sunset over mountains",
    "model": "flux-video",
    "width": 1280,
    "height": 720,
    "fps": 24,
    "duration": 5
  }'
```

### 生成影片（圖片轉影片）

```bash
curl -X POST https://your-worker.workers.dev/api/video/generate \
  -H "Content-Type: application/json" \
  -d '{
    "referenceImage": "https://example.com/image.jpg",
    "model": "flux-video",
    "duration": 5
  }'
```

### 獲取模型列表

```bash
curl https://your-worker.workers.dev/api/video/models
```

### 獲取配額資訊

```bash
curl https://your-worker.workers.dev/api/video/quota
```

## 限流配置

- **每小時限制**: 5 個影片
- **冷卻時間**: 180 秒
- **KV 命名空間**: `FLUX_KV`

## 環境變數

| 變數名稱 | 說明 |
|----------|------|
| `POLLINATIONS_VIDEO_API_KEY` | Pollinations 影片生成 API Key（可選） |

## 支援的模型

| 模型 ID | 名稱 | 說明 |
|---------|------|------|
| `flux-video` | Flux Video | 預設模型，高品質影片生成 |
| `turbo` | Turbo | 快速生成模式 |

## 支援的尺寸

| 比例 | 寬度 | 高度 | 標籤 |
|------|------|------|------|
| 16:9 | 1280 | 720 | 橫向 (16:9) |
| 9:16 | 720 | 1280 | 直向 (9:16) |
| 1:1 | 1024 | 1024 | 方形 (1:1) |

## 遷移說明

從舊版 `video-integration.js` 遷移到新模組：

### 1. 舊的 import
```javascript
import { handleVideoAPI, handleVideoPage, handleVideoNanoPage } from './video-integration.js';
```

### 2. 新的 import
```javascript
import { handleVideoAPI } from './video/index.js';
```

### 3. 移除的供應商
- Runway
- Pika
- Luma
- Kling

### 4. 保留的功能
- Pollinations.ai 文字轉影片
- Pollinations.ai 圖片轉影片
- IP 限流
- 冷卻機制

### 5. 移除的功能
- `/video` 和 `/video/nano` UI 頁面（改為 API 文件頁面）
- 多供應商支援
- 風格預設
- 本地歷史記錄

## 模組說明

### config/pollinations.config.js
Pollinations 供應商的配置文件，包含：
- API 端點設定
- 支援的模型列表
- 預設尺寸選項
- 限流設定
- 預設參數

### core/video-service.js
影片服務核心，提供：
- 影片生成服務
- 模型列表查詢
- 樣式列表查詢
- 尺寸列表查詢

### core/rate-limiter.js
限流器，提供：
- IP 限流功能
- 冷卻時間管理
- KV 存儲整合

### providers/pollinations-provider.js
Pollinations 供應商實作，提供：
- 文字轉影片功能
- 圖片轉影片功能
- API 請求處理
- 響應處理

### utils/logger.js
日誌工具，提供：
- 結構化日誌記錄
- 日誌輸出格式化

### api/handlers.js
API 處理器，提供：
- 請求路由
- 參數驗證
- 響應格式化
- 錯誤處理

### index.js
模組入口，導出：
- `handleVideoAPI` - API 處理函數
- `VideoService` - 影片服務類
- `RateLimiter` - 限流器類
- `PollinationsProvider` - Pollinations 供應商類
