<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-5">
        <div class="card border-0 shadow-lg custom-card overflow-hidden">
          
          <div v-if="!isLoggedIn" class="login-section">
            <div class="card-header bg-primary text-white text-center py-5 border-0">
              <i class="bi bi-person-circle display-4 mb-2"></i>
              <h2 class="fw-bold mb-0 text-uppercase tracking-wider">Đăng Nhập</h2>
              <p class="mb-0 opacity-75 small">Vui lòng nhập tài khoản để tiếp tục</p>
            </div>

            <div class="card-body p-4 p-md-5 bg-white">
              <form @submit.prevent="login">
                <div class="mb-4">
                  <label class="form-label fw-bold text-secondary small">Email của bạn</label>
                  <div class="input-group custom-input-group shadow-sm">
                    <span class="input-group-text bg-light border-0"><i class="bi bi-envelope-at"></i></span>
                    <input 
                      type="email" 
                      class="form-control border-0 py-3 shadow-none" 
                      v-model="email" 
                      placeholder="email@example.com"
                    >
                  </div>
                  <p v-if="emailError" class="text-danger small mt-2 ms-1 anim-fade-in">
                    <i class="bi bi-exclamation-circle me-1"></i> {{ emailError }}
                  </p>
                </div>

                <div class="mb-4">
                  <label class="form-label fw-bold text-secondary small">Mật khẩu</label>
                  <div class="input-group custom-input-group shadow-sm">
                    <span class="input-group-text bg-light border-0"><i class="bi bi-key"></i></span>
                    <input 
                      type="password" 
                      class="form-control border-0 py-3 shadow-none" 
                      v-model="password" 
                      placeholder="••••••••"
                    >
                  </div>
                  <p v-if="passwordError" class="text-danger small mt-2 ms-1 anim-fade-in">
                    <i class="bi bi-exclamation-circle me-1"></i> {{ passwordError }}
                  </p>
                </div>

                <button type="submit" class="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm mt-2 transition-all">
                  Đăng nhập ngay <i class="bi bi-arrow-right-short ms-1"></i>
                </button>
              </form>
            </div>
          </div>

          <div v-else class="welcome-section text-center py-5 px-4 bg-white anim-fade-in">
            <div class="mb-4 mt-3">
              <div class="success-icon-box mx-auto shadow-sm">
                <i class="bi bi-check-lg text-white fs-1"></i>
              </div>
            </div>
            <h3 class="fw-bold mb-2">Chào mừng quay trở lại!</h3>
            <p class="text-muted mb-4 fs-5">{{ email }}</p> [cite: 342]
            
            <div class="divider mb-4"></div>
            
            <button @click="logout" class="btn btn-outline-danger px-5 py-2 rounded-pill fw-bold transition-all">
              <i class="bi bi-box-arrow-right me-2"></i> Đăng xuất
            </button> [cite: 343, 378]
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(false);
const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const login = () => {
    emailError.value = '';
    passwordError.value = '';

    if (!email.value) {
        emailError.value = 'Email là bắt buộc.';
    } else if (!emailRegex.test(email.value)) {
        emailError.value = 'Vui lòng nhập email hợp lệ.';
    }

    if (!password.value) {
        passwordError.value = 'Mật khẩu là bắt buộc.';
    }

    if (!emailError.value && !passwordError.value) {
        isLoggedIn.value = true;
    }
}

const logout = () => {
    isLoggedIn.value = false;
    email.value = '';
    password.value = '';
    emailError.value = '';
    passwordError.value = '';
}
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css");

.custom-card {
  border-radius: 1.5rem;
}

.custom-input-group {
  border: 1px solid #e9ecef;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.custom-input-group:focus-within {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1) !important;
}

.success-icon-box {
  width: 80px;
  height: 80px;
  background: #198754;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider {
  height: 1px;
  background: #eee;
  width: 60%;
  margin: 0 auto;
}

.tracking-wider {
  letter-spacing: 1.5px;
}

.transition-all {
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3) !important;
}

.anim-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>