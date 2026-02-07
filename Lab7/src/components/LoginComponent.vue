<template>
  <div class="card shadow-sm border-0 p-4 mx-auto mt-5" style="max-width: 400px; border-radius: 20px;">
    <div class="text-center mb-4">
      <div class="icon-circle bg-primary-subtle text-primary mx-auto mb-3">
        <i class="bi bi-person-fill-lock fs-2"></i>
      </div>
      <h3 class="fw-bold">Đăng Nhập</h3>
      <p class="text-muted small">Vui lòng đăng nhập để để lại bình luận</p>
    </div>

    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label class="form-label fw-bold small">Tên đăng nhập:</label>
        <input type="text" class="form-control form-control-lg bg-light border-0 shadow-none" 
               v-model="username" placeholder="Nhập tên của bạn" required />
      </div>
      <div class="mb-4">
        <label class="form-label fw-bold small">Mật khẩu:</label>
        <input type="password" class="form-control form-control-lg bg-light border-0 shadow-none" 
               v-model="password" placeholder="Nhập mật khẩu" required />
      </div>
      <button type="submit" class="btn btn-primary btn-lg w-100 fw-bold shadow-sm">
        Đăng nhập
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const username = ref('');
const password = ref('');
const emit = defineEmits(['loggedIn']);

function handleLogin() {
  if (username.value && password.value) {
    emit('loggedIn', username.value); 
  }
}
</script>

<style scoped>
.icon-circle { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
</style>