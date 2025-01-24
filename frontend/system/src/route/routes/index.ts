import type { RouteRecordRaw } from 'vue-router';

const whiteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/moms',
    name: 'Moms',
    redirect: '/moms/audioList',
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: '/moms/audioList',
        name: 'MomsAudioList',
        component: () => import('@/views/moms')
      }
    ]
  }
];

const permissionRoutes: RouteRecordRaw[] = [];

const routes = [...whiteRoutes, ...permissionRoutes];

export default routes;
