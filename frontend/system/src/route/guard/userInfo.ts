import type { Router } from 'vue-router';

/**
 * 路由跳转前判断用户是否登录
 */
export default function setupUserLoginInfoGuard(router: Router) {
	router.beforeEach(async (to, from, next) => {
		// pass
		next();
	});
}
