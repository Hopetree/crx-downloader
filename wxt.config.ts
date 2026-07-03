import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  outDir: 'dist',
  outDirTemplate: 'crx-catcher',
  manifest: {
    name: 'CRX 离线捕手',
    description: '一键下载 Chrome 应用商店插件的离线安装包 (.crx)',
    permissions: ['activeTab', 'downloads'],
    host_permissions: [],
    icons: {
      16: 'icons/icon-16.png',
      48: 'icons/icon-48.png',
      128: 'icons/icon-128.png',
    },
  },
});
