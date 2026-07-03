// 图标方案：Emoji — 适合简单插件
// 不要额外引入图标库，统一使用 emoji 作为图标元素

import { useEffect, useState } from 'react';
import { extractExtensionId, generateDownloadUrl } from '@/src/lib/utils';

type PageState =
  | { status: 'loading' }
  | { status: 'store'; extensionId: string }
  | { status: 'not-store' };

export default function App() {
  const [pageState, setPageState] = useState<PageState>({ status: 'loading' });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs) => {
        const url = tabs[0]?.url ?? '';
        const extId = extractExtensionId(url);
        if (extId) {
          setPageState({ status: 'store', extensionId: extId });
        } else {
          setPageState({ status: 'not-store' });
        }
      })
      .catch(() => {
        setPageState({ status: 'not-store' });
      });
  }, []);

  const handleDownload = async () => {
    if (pageState.status !== 'store') return;
    const downloadUrl = generateDownloadUrl(pageState.extensionId);
    await browser.downloads.download({
      url: downloadUrl,
      filename: `${pageState.extensionId}.crx`,
      saveAs: false,
    });
  };

  const handleCopyLink = async () => {
    if (pageState.status !== 'store') return;
    const downloadUrl = generateDownloadUrl(pageState.extensionId);
    try {
      await navigator.clipboard.writeText(downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 降级：通过 textarea 复制
      const textarea = document.createElement('textarea');
      textarea.value = downloadUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 加载中
  if (pageState.status === 'loading') {
    return (
      <div className="w-80 min-h-48 p-5 bg-white flex items-center justify-center">
        <p className="text-sm text-gray-400 animate-pulse">正在识别当前页面...</p>
      </div>
    );
  }

  // 非应用商店页面
  if (pageState.status === 'not-store') {
    return (
      <div className="w-80 min-h-48 p-5 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl" role="img" aria-label="logo">
            🎯
          </span>
          <h1 className="text-lg font-semibold text-gray-900">CRX 离线捕手</h1>
        </div>
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 mb-4">
          <p className="text-sm text-amber-700 leading-relaxed">
            ⚠️ 当前不是 Chrome 应用商店页面，请在插件详情页使用我。
          </p>
        </div>
        <button
          disabled
          className="w-full py-2.5 rounded-lg bg-gray-200 text-gray-400 text-sm font-medium cursor-not-allowed transition-colors"
        >
          一键下载 CRX
        </button>
        <button
          disabled
          className="w-full mt-2 py-2.5 rounded-lg bg-gray-100 text-gray-300 text-sm font-medium cursor-not-allowed transition-colors"
        >
          复制下载链接
        </button>
      </div>
    );
  }

  // 应用商店页面
  const downloadUrl = generateDownloadUrl(pageState.extensionId);

  return (
    <div className="w-80 min-h-48 p-5 bg-white">
      {/* 头部 */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl" role="img" aria-label="logo">
          🎯
        </span>
        <h1 className="text-lg font-semibold text-gray-900">CRX 离线捕手</h1>
      </div>

      {/* 插件 ID 展示 */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 mb-3">
        <p className="text-xs text-blue-500 mb-1 font-medium">插件 ID</p>
        <p className="text-sm font-mono text-blue-800 break-all select-all">
          {pageState.extensionId}
        </p>
      </div>

      {/* 下载链接预览 */}
      <details className="mb-3">
        <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-500 transition-colors">
          查看下载链接
        </summary>
        <p className="mt-1 text-xs text-gray-500 break-all font-mono bg-gray-50 p-2 rounded border border-gray-100">
          {downloadUrl}
        </p>
      </details>

      {/* 一键下载按钮 */}
      <button
        onClick={handleDownload}
        className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold transition-colors shadow-sm"
      >
        ⬇️ 一键下载 CRX
      </button>

      {/* 复制下载链接 */}
      <button
        onClick={handleCopyLink}
        className="w-full mt-2 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 text-sm font-medium transition-colors"
      >
        {copied ? '✅ 已复制!' : '📋 复制下载链接'}
      </button>
    </div>
  );
}
