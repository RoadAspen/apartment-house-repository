import { createApp } from 'vue';
import './tailwind.css';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { setupRouter } from '@/route/index';
const app = createApp(App);

(async function setup() {
	/** 引入 Arco Design */
	app.use(ArcoVue);
	app.use(ArcoVueIcon);
	await setupRouter(app);
	app.mount('#app');
})();
