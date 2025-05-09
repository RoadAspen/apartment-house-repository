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
|    |   index.d.ts //
|    +---constants // 定义常量
|    |   |   route.ts // 路由常量
|    +---api // 定义接口目录
|    |   |   login.ts // 登录相关接口
|    +---assets // 静态资源目录
|    |   +---images // 图片资源
|    +---components // 全局组件目录
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
|    |   +---home // 首页
|    |   |   +---components // 首页组件
|    |   |   index.tsx // 首页
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

## 技术栈

- Vue3 框架
- Vue-router 路由
- JSX 语法
- Pinia 状态管理
- Axios 网络请求
- Typescript 类型系统
- ant-design-vue 组件库
- Eslint 代码规范
- Stylelint CSS 规范
- Prettier 代码格式化
- Commitlint 提交规范
- Tailwindcss CSS 框架
- Postcss 插件
- Vite 构建工具
- Pnpm 包管理工具
