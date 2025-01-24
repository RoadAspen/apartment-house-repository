# 须知

## 目录

```js
system
|
+---.vscode //vscode 配置文件
+---config // vite 配置文件
|       constants.ts   // 项目常量
|       vite.config.base.ts  // vite 基础配置
|       vite.config.dev.ts  // vite 开发环境配置
|       vite.config.prod.ts   // vite 生产环境配置
+---public // 公共资源
|       favicon.ico // 网站图标
|       logo.svg // logo 图标
+---src // 源码目录
|    |   App.vue // 主页面，router-view
|    |   main.ts // 入口文件
|    |   tailwind.css // tailwindcss reset css文件
|    |   vite-env.d.ts // vite 全局类型
|    |
|    +---api // 定义接口目录
|    +---assets // 静态资源目录
|    |   +---images // 图片资源
|    +---components // 组件目录
|    +---directive // vue 自定义指令
|    +---hooks // hooks
|    +---layout // 布局目录
|    |   |   index.tsx
|    |   |   pageLayout.tsx
|    |   +---aside // 侧边栏
|    |   |       index.tsx
|    |   +---header // 头部
|    |           index.tsx
|    |   notFound.tsx // 404页面
|    |   notPremission.tsx // 404页面
|    +---locales // 国际化目录
|    +---mock // mock 目录
|    +---route // 路由目录
|    |   |   constant.ts
|    |   |   index.ts
|    |   |   types.ts
|    |   +---guard // 路由守卫
|    |   |   premission.ts // 权限守卫
|    |   |   user.ts // 用户信息守卫
|    |   +---routes // 路由配置
|    |       index.ts
|    |       whiteList.ts // 白名单
|    |
|    +---stores // 状态管理 vuex、pinia
|    +---types // 页面类型定义
|    +---utils // 工具类
|    +---views // 页面
|   .env.development // 开发环境 环境变量 配置
|   .env.production // 生产环境 环境变量 配置
|   .eslintignore // eslint 忽略文件
|   .eslintrc.js // eslint 配置
|   .gitignore // git忽略文件
|   .prettierignore // prettier 忽略文件
|   .prettierrc // prettier 配置
|   .stylelintrc.js // stylelint 配置
|   commitlint.config.js // commitlint 配置
|   index.html // 入口html
|   package.json // 依赖包
|   pnpm-lock.yaml // pnpm 锁定文件
|   postcss.config.js // postcss 配置
|   README.md // 自述文件
|   tailwind.config.js // tailwindcss 配置
|   tsconfig.json // tsconfig 配置
```

- Vue
- Vue-router
- JSX
- Pinia
- Axios
- Typescript
- ant-design-vue
- Eslint
- Stylelint
- Prettier
- Commitlint
- Tailwindcss
- Postcss
- Vite
- Pnpm
