/**
 * Background Script
 *
 * 扩展的后台脚本，运行在独立的 Service Worker 上下文中。
 * 用于处理扩展生命周期、事件监听、跨页面通信等。
 *
 * 使用示例：
 *
 * // 监听扩展安装
 * browser.runtime.onInstalled.addListener((details) => {
 *   if (details.reason === 'install') {
 *     console.log('扩展已安装');
 *   }
 * });
 *
 * // 监听来自 popup/content script 的消息
 * browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
 *   console.log('收到消息:', message);
 *   sendResponse({ ok: true });
 * });
 */

export default defineBackground(() => {
  console.log('Background script started', { id: browser.runtime.id });
});
