import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'CRX 离线捕手',
    description: '一键下载 Chrome 应用商店插件的离线安装包 (.crx)',
    permissions: ['activeTab', 'downloads'],
    host_permissions: [],
  },
});
