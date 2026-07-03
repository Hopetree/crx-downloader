/**
 * Chrome 应用商店详情页 URL 模式
 * 当前格式: https://chromewebstore.google.com/detail/{name}/{extension_id}
 */
const CHROME_STORE_PATTERN =
  /^https:\/\/chromewebstore\.google\.com\/detail\/[^/]+\/([a-z]{32})/;

/**
 * 从 URL 中提取 Chrome 扩展 ID
 * Chrome 扩展 ID 是 32 位小写字母组成的字符串
 *
 * @param url - 当前标签页的完整 URL
 * @returns 提取到的扩展 ID，如果不是应用商店页面则返回 null
 */
export function extractExtensionId(url: string): string | null {
  const match = url.match(CHROME_STORE_PATTERN);
  return match ? match[1] : null;
}

/**
 * 判断当前 URL 是否为 Chrome 应用商店插件详情页
 */
export function isChromeStorePage(url: string): boolean {
  return CHROME_STORE_PATTERN.test(url);
}

/**
 * 根据扩展 ID 生成 Chrome 官方离线 CRX 下载链接
 *
 * 使用 Chrome 官方的 update2 API 端点：
 * https://clients2.google.com/service/update2/crx
 *
 * @param extensionId - 32 位扩展 ID
 * @param chromeVersion - Chrome 浏览器版本号，默认为通用的高版本
 * @returns CRX 文件下载直链
 */
export function generateDownloadUrl(
  extensionId: string,
  chromeVersion = '130.0.0.0',
): string {
  const params = new URLSearchParams({
    response: 'redirect',
    prodversion: chromeVersion,
    acceptformat: 'crx2,crx3',
    x: `id=${extensionId}&uc`,
  });
  return `https://clients2.google.com/service/update2/crx?${params.toString()}`;
}
