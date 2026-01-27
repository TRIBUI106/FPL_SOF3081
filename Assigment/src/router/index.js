import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/register', component: () => import('../views/Register.vue') },
  { path: '/profile', component: () => import('../views/Profile.vue') },
  { path: '/post', component: () => import('../views/PostDetail.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;