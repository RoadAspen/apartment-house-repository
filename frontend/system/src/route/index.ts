import { createRouter, createWebHistory } from 'vue-router';
import createRouterGuards from './guard';
import routes from './routes';
import type { App } from 'vue';

const router = createRouter({
	history: createWebHistory(),
	routes,
});
/** 添加路由守卫 */

export async function setupRouter(app: App<Element>) {
	createRouterGuards(router);
	app.use(router);
	await router.isReady();
}
