import { setupRouter } from '@/route/index';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { createApp } from 'vue';
import App from './App.vue';
import './mock/index';
import './tailwind.css';
const app = createApp(App);

(async function setup() {
  /** 引入 Arco Design */
  app.use(ArcoVue);
  app.use(ArcoVueIcon);
  await setupRouter(app);
  app.mount('#app');
})();
