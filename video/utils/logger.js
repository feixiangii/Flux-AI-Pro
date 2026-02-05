/**
 * 日誌工具類
 */

export class Logger {
  constructor() {
    this.logs = [];
  }

  /**
   * 添加日誌
   * @param {string} message - 日誌訊息
   * @param {Object} data - 附加數據
   */
  add(message, data = {}) {
    const log = {
      timestamp: new Date().toISOString(),
      message,
      data
    };
    this.logs.push(log);
    
    // 在開發環境輸出到控制台
    if (typeof console !== 'undefined') {
      console.log(`[${log.timestamp}] ${message}`, data);
    }
  }

  /**
   * 獲取所有日誌
   * @returns {Array} 日誌陣列
   */
  getLogs() {
    return this.logs;
  }

  /**
   * 清空日誌
   */
  clear() {
    this.logs = [];
  }

  /**
   * 獲取最後一條日誌
   * @returns {Object|null} 最後一條日誌
   */
  getLastLog() {
    return this.logs.length > 0 ? this.logs[this.logs.length - 1] : null;
  }

  /**
   * 格式化日誌為字串
   * @returns {string} 格式化的日誌字串
   */
  format() {
    return this.logs.map(log => {
      const dataStr = Object.keys(log.data).length > 0 
        ? ` ${JSON.stringify(log.data)}` 
        : '';
      return `[${log.timestamp}] ${log.message}${dataStr}`;
    }).join('\n');
  }
}
