<template>
  <div class="min-vh-100 bg-light py-4">
    <template v-if="!isLoggedIn">
      <LoginComponent @loggedIn="handleLoginSuccess" /> 
    </template>
    <template v-else>
      <div class="anim-fade-in"> 
        <div class="container d-flex justify-content-between align-items-center mb-4 py-2 border-bottom">
          <div class="text-primary fw-bold">
            <i class="bi bi-circle-fill me-2 small"></i> Đang hoạt động: {{ loggedInUser }}
          </div>
          <button @click="isLoggedIn = false" class="btn btn-sm btn-outline-danger px-3">
            <i class="bi bi-power me-1"></i> Đăng xuất
          </button>
        </div>
        <CommentComponent :username="loggedInUser" /> 
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import LoginComponent from '../components/LoginComponent.vue';
import CommentComponent from '../components/CommentComponent.vue';

const isLoggedIn = ref(false);
const loggedInUser = ref('');

function handleLoginSuccess(username) {
  loggedInUser.value = username;
  isLoggedIn.value = true;
}

function handleLogout() {
  isLoggedIn.value = false;
  loggedInUser.value = '';
}
</script>