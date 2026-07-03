# CRX 离线捕手

一键下载 Chrome 应用商店插件的离线安装包 (.crx)

## 功能

- 🎯 **自动识别**：在 Chrome 应用商店插件详情页自动提取插件 ID（32 位标识符）
- ⬇️ **一键下载**：点击按钮直接下载插件的 `.crx` 离线安装包
- 📋 **链接复制**：支持复制下载链接，方便分享或用其他工具下载

## 技术栈

- **框架**: [WXT](https://wxt.dev) — 下一代浏览器扩展开发框架
- **前端**: React 18 + TypeScript
- **样式**: Tailwind CSS
- **图标**: Emoji
- **测试**: Vitest
- **CI/CD**: GitHub Actions

## 快速开始

### 环境要求

- Node.js >= 20
- pnpm >= 9

### 开发

```bash
# 安装依赖
pnpm install

# 启动开发模式（Chrome）
pnpm dev

# 启动开发模式（Firefox）
pnpm dev:firefox
```

### 加载扩展

1. 打开 `chrome://extensions/`
2. 开启「开发者模式」
3. 点击「加载已解压的扩展程序」
4. 选择 `.output/chrome-mv3` 目录

### 构建

```bash
# 生产构建
pnpm build

# 打包为 .zip
pnpm zip
```

### 代码质量

```bash
pnpm type-check   # TypeScript 类型检查
pnpm lint         # ESLint 检查
pnpm format       # Prettier 格式化
pnpm test         # 运行测试
```

### 发布新版本

1. 切换到 main 分支并拉取最新代码
2. 打 tag：`git tag v1.0.0`
3. 推送 tag：`git push --follow-tags`
4. GitHub Actions 自动构建并发布到 Release

> Tag 版本即为扩展版本号，无需手动修改 `package.json` 或 `wxt.config.ts`。

## 项目结构

```
src/
├── entrypoints/       # WXT 入口
│   ├── popup/         # Popup 页面
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.html
│   └── background.ts  # Background Script
├── components/        # React 组件
├── assets/            # 静态资源
├── lib/               # 工具函数
└── styles/            # 全局样式
    └── globals.css
```
