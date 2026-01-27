<template>
  <div class="auth-page">
    <div class="auth-left">
      <div class="auth-illustration">
        <h1>🚀 Chào mừng trở lại!</h1>
        <p>Kết nối với cộng đồng developer hàng đầu</p>
        <div class="illustration-items">
          <div class="item">💡 Chia sẻ kiến thức</div>
          <div class="item">🤝 Kết nối developer</div>
          <div class="item">📚 Học hỏi liên tục</div>
        </div>
      </div>
    </div>

    <div class="auth-right">
      <form @submit.prevent="handleLogin" class="login-form" novalidate>
        <div class="form-header">
          <h2>Đăng nhập</h2>
          <p>Vào tài khoản của bạn để tiếp tục</p>
        </div>

        <div v-if="message" :class="['alert', messageType === 'error' ? 'alert-danger' : 'alert-success']">
          {{ message }}
        </div>

        <div class="form-group">
          <label for="email">📧 Email</label>
          <input
            id="email"
            v-model="loginData.email"
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">🔐 Mật khẩu</label>
          <div class="password-input">
            <input
              id="password"
              v-model="loginData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              required
            />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword" :title="showPassword ? 'Ẩn' : 'Hiện'">
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>

        <div class="form-group checkbox-group">
          <label>
            <input type="checkbox" v-model="rememberMe" />
            <span>Nhớ tôi lần sau</span>
          </label>
          <a href="#" class="forgot-password">Quên mật khẩu?</a>
        </div>

        <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
          {{ isLoading ? '⏳ Đang đăng nhập...' : '🔓 Đăng nhập' }}
        </button>

        <div class="divider">
          <span>hoặc</span>
        </div>

        <div class="social-login">
          <button type="button" class="social-btn google-btn">Google</button>
          <button type="button" class="social-btn github-btn">GitHub</button>
        </div>

        <p class="text-center mt-4 text-secondary">
          Chưa có tài khoản?
          <router-link to="/register" class="text-primary fw-bold">Đăng ký ngay</router-link>
        </p>

        <div class="demo-info">
          <p class="demo-title">💡 Tài khoản demo:</p>
          <p class="demo-text">Email: <code>demo@example.com</code></p>
          <p class="demo-text">Password: <code>demo123</code></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loginData = ref({ email: '', password: '' });
const showPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);
const message = ref('');
const messageType = ref('');

const handleLogin = async () => {
  message.value = '';
  isLoading.value = true;

  if (!loginData.value.email || !loginData.value.password) {
    message.value = 'Vui lòng nhập email và mật khẩu';
    messageType.value = 'error';
    isLoading.value = false;
    return;
  }

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  // Demo account check
  if (loginData.value.email === 'demo@example.com' && loginData.value.password === 'demo123') {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userAccount', JSON.stringify({
      name: 'Demo User',
      email: loginData.value.email,
      password: loginData.value.password
    }));
    message.value = '✅ Đăng nhập thành công!';
    messageType.value = 'success';
    setTimeout(() => router.push('/profile'), 500);
  } else {
    const savedAccount = JSON.parse(localStorage.getItem('userAccount') || 'null');
    if (savedAccount && savedAccount.email === loginData.value.email && savedAccount.password === loginData.value.password) {
      localStorage.setItem('isLoggedIn', 'true');
      message.value = '✅ Đăng nhập thành công!';
      messageType.value = 'success';
      setTimeout(() => router.push('/profile'), 500);
    } else {
      message.value = '❌ Email hoặc mật khẩu không chính xác';
      messageType.value = 'error';
    }
  }
  isLoading.value = false;
};
</script>

<style scoped>
.auth-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 100px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.auth-left {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.auth-left::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -30%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%);
  animation: float 6s ease-in-out infinite;
}

.auth-left::after {
  content: '';
  position: absolute;
  bottom: -20%;
  right: -20%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100, 200, 255, 0.1) 0%, transparent 70%);
  animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(30px); }
}

.auth-illustration {
  position: relative;
  z-index: 2;
  text-align: center;
}

.auth-illustration h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
}

.auth-illustration p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
}

.illustration-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.item {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border-left: 4px solid rgba(255, 255, 255, 0.5);
  transition: all var(--transition);
}

.item:hover {
  background: rgba(255, 255, 255, 0.15);
  border-left-color: var(--primary);
  transform: translateX(10px);
}

.auth-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-form {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  animation: slideInRight 500ms ease;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.form-header {
  margin-bottom: 2rem;
  text-align: center;
}

.form-header h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.form-header p {
  color: var(--secondary);
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--dark);
  font-size: 0.95rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all var(--transition);
  background: white;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
}

.password-input {
  position: relative;
}

.password-input input {
  padding-right: 45px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  transition: all var(--transition);
}

.toggle-password:hover {
  opacity: 0.7;
  transform: translateY(-50%) scale(1.1);
}

.checkbox-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-weight: 500;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--primary);
}

.forgot-password {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition);
}

.forgot-password:hover {
  color: #0a58ca;
  text-decoration: underline;
}

.btn-block {
  width: 100%;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.85rem 1rem;
}

.divider {
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: var(--secondary);
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.divider span {
  padding: 0 1rem;
  font-size: 0.9rem;
}

.social-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-btn {
  padding: 0.75rem 1rem;
  border: 2px solid var(--border);
  background: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition);
  font-size: 0.95rem;
}

.social-btn:hover {
  background: var(--light);
  transform: translateY(-2px);
}

.google-btn {
  border-color: #ea4335;
  color: #ea4335;
}

.google-btn:hover {
  background: rgba(234, 67, 53, 0.05);
}

.github-btn {
  border-color: #333;
  color: #333;
}

.github-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 1.5rem;
}

.text-primary {
  color: var(--primary);
}

.fw-bold {
  font-weight: 700;
}

.demo-info {
  background: #f0f8ff;
  border-left: 4px solid var(--primary);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.demo-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.demo-text {
  font-size: 0.9rem;
  color: var(--secondary);
  margin-bottom: 0.25rem;
}

.demo-text code {
  background: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  color: var(--primary);
  font-weight: 600;
}

@media (max-width: 900px) {
  .auth-page {
    grid-template-columns: 1fr;
  }

  .auth-left {
    min-height: 200px;
    padding: 1.5rem;
  }

  .auth-illustration h1 {
    font-size: 1.8rem;
  }

  .auth-illustration p {
    font-size: 1rem;
  }

  .item {
    font-size: 1rem;
  }

  .login-form {
    padding: 2rem;
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .auth-page {
    min-height: auto;
  }

  .auth-left {
    display: none;
  }

  .auth-right {
    padding: 1rem;
    min-height: auto;
  }

  .login-form {
    padding: 1.5rem;
  }

  .form-header h2 {
    font-size: 1.5rem;
  }

  .checkbox-group {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .social-login {
    grid-template-columns: 1fr;
  }
}
</style>