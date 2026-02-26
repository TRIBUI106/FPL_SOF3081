import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import PostDetail from '../views/PostDetail.vue';
import Search from '../views/Search.vue';

import MyPosts from '../views/MyPosts.vue';
import PostEditor from '../views/PostEditor.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile },
  { path: '/post/:id', component: PostDetail },
  { path: '/search', component: Search },
  { path: '/my-posts', component: MyPosts },
  { path: '/create-post', component: PostEditor },
  { path: '/edit-post/:id', component: PostEditor },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;