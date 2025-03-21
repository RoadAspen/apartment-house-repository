import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: 'moms',
    name: 'Moms',
    redirect: 'audioList',
    meta: {
      requiresAuth: false,
      name: '智能会议纪要'
    },
    children: [
      {
        path: 'audioList',
        name: 'MomsAudioList',
        component: () => import('@/views/moms'),
        meta: {
          name: '智能会议纪要'
        }
      }
    ]
  },
  {
    path: 'icoder',
    name: 'ICoder',
    redirect: 'dashboard',
    meta: {
      requiresAuth: false,
      name: 'ICoder'
    },
    children: [
      {
        path: 'dashboard',
        name: 'ICoderDashboard',
        component: () => import('@/views/icoder/userList'),
        meta: {
          name: '使用数据'
        }
      },
      {
        path: 'userList',
        name: 'ICoderUserList',
        component: () => import('@/views/icoder/userList'),
        meta: {
          name: '用户管理'
        }
      }
    ]
  }
];

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
    path: '/admin',
    name: 'Admin',
    meta: {
      requiresAuth: false
    },
    component: () => import('@/layout/pageLayout'),
    children: adminRoutes
  }
];

const permissionRoutes: RouteRecordRaw[] = [];

const routes = [...whiteRoutes, ...permissionRoutes];

export default routes;
