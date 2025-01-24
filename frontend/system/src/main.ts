import { setupRouter } from '@/route/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue';
import App from './App.vue';
import './mock/index';
import './tailwind.css';
const app = createApp(App);

(async function setup() {
  /** 引入 antd Design vue */
  // 开发环境加载 Mock.js
  if (import.meta.env.DEV) {
    import('./mock');
  }
  app.use(Antd);
  await setupRouter(app);
  app.mount('#app');
})();
