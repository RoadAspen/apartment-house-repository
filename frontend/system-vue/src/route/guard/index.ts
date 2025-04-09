/**
 * 路由守卫
 */
import type { Router } from 'vue-router';
import setupPermissionGuard from './permission';
import setupUserLoginInfoGuard from './userInfo';

/** 路由跳转钩子 */
function setupPageGuard(router: Router) {
	router.beforeEach(async (to, from, next) => {
		// emit route change
		// setRouteEmitter(to);
		next();
	});
}

export default function createRouteGuard(router: Router) {
	setupPageGuard(router);
	setupUserLoginInfoGuard(router);
	setupPermissionGuard(router);
}
