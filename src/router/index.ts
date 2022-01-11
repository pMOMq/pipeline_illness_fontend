import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/login/index.vue'

import { Layout } from '@/layouts'

export const routes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)*',
        component: (): any => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/404',
    hidden: true,
    component: (): any => import('@/views/exception/404.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: Login,
  },
  {
    path: '/personal',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'Personal',
        component: (): any => import('@/views/personal/index.vue'),
        meta: {
          title: '个人中心',
        },
      },
    ],
  },
  {
    path: '/query',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'query',
        name: 'query',
        component: () => import('@/views/params/query.vue'),
        meta: {
          title: 'query参数',
        },
      },
    ],
  },
  {
    path: '/',
    redirect: '/index/system-info',
    hidden: true,
  },
  {
    path: '/index',
    name: 'root',
    component: Layout,
    meta: {
      title: '系统概述',
      icon: 'HouseIcon',
    },
    children: [
      {
        path: 'system-info',
        name: 'SystemInfo',
        component: (): any => import('@/views/index/main.vue'),
        meta: {
          title: '系统概述',
          affix: true,
          cacheable: true,
        },
      },
      {
        path: 'poi-distribution',
        name: 'PoiDistribution',
        component: (): any => import('@/views/map/gaode.vue'),
        meta: {
          title: '监控点分布',
          affix: false,
          cacheable: false,
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
