import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/bai1.vue')
    },
    {
      path: '/bai1',
      name: 'bai1',
      component: () => import('../views/bai1.vue')
    },
    {
      path: '/bai2',
      name: 'bai2',
      component: () => import('../views/bai2.vue')
    },
    {
      path: '/bai3',
      name: 'bai3',
      component: () => import('../views/bai3.vue')
    },
    {
      path: '/bai4',
      name: 'bai4',
      component: () => import('../views/bai4.vue')
    },
  ],
})

export default router
