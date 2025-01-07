import type { RouteRecordRaw } from 'vue-router';

const whiteRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login'),
		meta: {
			requiresAuth: false,
		},
	},
];

const permissionRoutes: RouteRecordRaw[] = [];

const routes = [...whiteRoutes, ...permissionRoutes];

export default routes;
