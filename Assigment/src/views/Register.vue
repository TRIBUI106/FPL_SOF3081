<template>
  <div class="auth-container">
    <div class="auth-left">
      <div class="auth-illustration">
        <div class="illustration-shape"></div>
        <h2 class="auth-title">✨ Tạo Tài Khoản Mới</h2>
        <p class="auth-subtitle">Tham gia cộng đồng của chúng tôi ngay hôm nay</p>
        <div class="auth-benefits">
          <div class="benefit-item">
            <span class="benefit-icon">🚀</span>
            <span class="benefit-text">Bắt đầu nhanh chóng</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">🔐</span>
            <span class="benefit-text">Tài khoản an toàn</span>
          </div>
          <div class="benefit-item">
            <span class="benefit-icon">👥</span>
            <span class="benefit-text">Cộng đồng độc quyền</span>
          </div>
        </div>
      </div>
    </div>

    <div class="auth-right">
      <div class="auth-form-container">
        <h2 class="form-title">Đăng ký tài khoản</h2>
        <p class="form-subtitle">Đã có tài khoản? <router-link to="/login" class="text-link">Đăng nhập tại đây</router-link></p>

        <div v-if="message" :class="['alert-message', messageType === 'error' ? 'alert-error' : 'alert-success']">
          <span>{{ message }}</span>
        </div>

        <form @submit.prevent="handleRegister" novalidate>
          <!-- Full Name Field -->
          <div class="form-group">
            <label for="name">👤 Họ và Tên</label>
            <input
              id="name"
              v-model="user.name"
              type="text"
              placeholder="Nhập họ và tên"
              required
              class="form-input"
            />
            <small v-if="errors.name" class="error-text">{{ errors.name }}</small>
          </div>

          <!-- Email Field -->
          <div class="form-group">
            <label for="email">📧 Email</label>
            <input
              id="email"
              v-model="user.email"
              type="email"
              placeholder="example@email.com"
              required
              class="form-input"
            />
            <small v-if="errors.email" class="error-text">{{ errors.email }}</small>
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <label for="password">🔐 Mật khẩu</label>
            <div class="password-input-wrapper">
              <input
                id="password"
                v-model="user.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Tối thiểu 8 ký tự"
                required
                minlength="8"
                class="form-input"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <small class="password-hint">
              <span :class="{ 'text-success': passwordStrength >= 2, 'text-danger': passwordStrength < 2 }">
                💪 {{ getPasswordStrength() }}
              </span>
            </small>
            <small v-if="errors.password" class="error-text">{{ errors.password }}</small>
          </div>

          <!-- Confirm Password Field -->
          <div class="form-group">
            <label for="confirmPassword">🔐 Xác nhận mật khẩu</label>
            <input
              id="confirmPassword"
              v-model="user.confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              required
              class="form-input"
            />
            <small v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</small>
          </div>

          <!-- Terms Checkbox -->
          <div class="form-group checkbox-group">
            <input
              id="terms"
              v-model="agreeTerms"
              type="checkbox"
              class="form-checkbox"
            />
            <label for="terms" class="checkbox-label">
              Tôi đồng ý với <a href="#" class="text-link">Điều khoản dịch vụ</a> và <a href="#" class="text-link">Chính sách bảo mật</a>
            </label>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="btn-submit"
            :disabled="isLoading || !agreeTerms"
          >
            {{ isLoading ? '⏳ Đang tạo tài khoản...' : '✨ Tạo tài khoản' }}
          </button>
        </form>

        <!-- Social Registration -->
        <div class="divider">hoặc</div>
        <div class="social-buttons">
          <button type="button" class="social-btn google-btn">
            <span>🔵 Google</span>
          </button>
          <button type="button" class="social-btn github-btn">
            <span>⚫ GitHub</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref({ name: '', email: '', password: '', confirmPassword: '' });
const agreeTerms = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const message = ref('');
const messageType = ref('');
const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// Calculate password strength
const passwordStrength = computed(() => {
  const pwd = user.value.password;
  let strength = 0;
  
  if (pwd.length >= 8) strength++;
  if (pwd.length >= 12) strength++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
  if (/\d/.test(pwd)) strength++;
  if (/[!@#$%^&*]/.test(pwd)) strength++;
  
  return strength;
});

const getPasswordStrength = () => {
  const strength = passwordStrength.value;
  const labels = ['Rất yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];
  return labels[Math.min(strength, 4)] || 'Rất yếu';
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleRegister = async () => {
  // Reset errors
  errors.value = { name: '', email: '', password: '', confirmPassword: '' };
  message.value = '';

  // Validation
  if (!user.value.name.trim()) {
    errors.value.name = 'Vui lòng nhập họ và tên';
    return;
  }

  if (!user.value.email.trim()) {
    errors.value.email = 'Vui lòng nhập email';
    return;
  }

  if (!validateEmail(user.value.email)) {
    errors.value.email = 'Email không hợp lệ';
    return;
  }

  if (!user.value.password) {
    errors.value.password = 'Vui lòng nhập mật khẩu';
    return;
  }

  if (user.value.password.length < 8) {
    errors.value.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    return;
  }

  if (user.value.password !== user.value.confirmPassword) {
    errors.value.confirmPassword = 'Mật khẩu xác nhận không khớp';
    return;
  }

  if (!agreeTerms.value) {
    message.value = 'Vui lòng đồng ý với điều khoản dịch vụ';
    messageType.value = 'error';
    return;
  }

  isLoading.value = true;

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));

  // Check if email already exists
  const existingAccount = localStorage.getItem('userAccount');
  if (existingAccount) {
    const existing = JSON.parse(existingAccount);
    if (existing.email === user.value.email) {
      message.value = 'Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập.';
      messageType.value = 'error';
      isLoading.value = false;
      return;
    }
  }

  const newAccount = {
    name: user.value.name,
    email: user.value.email,
    password: user.value.password,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem('userAccount', JSON.stringify(newAccount));
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userName', user.value.name);

  message.value = '✅ Tài khoản tạo thành công! Chuyển hướng...';
  messageType.value = 'success';
  
  setTimeout(() => {
    router.push('/profile');
  }, 1500);
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.auth-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.auth-left {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
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
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -100px;
  right: -100px;
  animation: float 6s ease-in-out infinite;
}

.auth-left::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  bottom: -50px;
  left: -50px;
  animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
}

.illustration-shape {
  position: absolute;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
  border-radius: 30px;
  animation: float 10s ease-in-out infinite;
}

.auth-illustration {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  max-width: 300px;
}

.auth-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 2rem 0 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.auth-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 3rem;
}

.auth-benefits {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  opacity: 0.95;
  transition: transform 0.3s ease;
}

.benefit-item:hover {
  transform: translateX(10px);
}

.benefit-icon {
  font-size: 1.8rem;
  display: block;
}

.benefit-text {
  text-align: left;
}

.auth-right {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
}

.auth-form-container {
  width: 100%;
  max-width: 400px;
  animation: slideInRight 0.5s ease;
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

.form-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e3c72;
  margin-bottom: 0.5rem;
  text-align: center;
}

.form-subtitle {
  text-align: center;
  color: #6c757d;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.text-link {
  color: #2a5298;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.text-link:hover {
  color: #1e3c72;
  text-decoration: underline;
}

.alert-message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  animation: slideInDown 0.3s ease;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-success {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.alert-error {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #1e3c72;
  font-size: 0.95rem;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #2a5298;
  box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
}

.form-input::placeholder {
  color: #aaa;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input-wrapper .form-input {
  width: 100%;
  padding-right: 2.5rem;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: opacity 0.3s ease;
  padding: 0.5rem;
}

.password-toggle:hover {
  opacity: 0.7;
}

.password-hint {
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.25rem;
}

.text-success {
  color: #28a745;
  font-weight: 600;
}

.text-danger {
  color: #dc3545;
  font-weight: 600;
}

.error-text {
  font-size: 0.85rem;
  color: #dc3545;
  margin-top: 0.25rem;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  flex-direction: row;
  margin: 1rem 0;
}

.form-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-top: 2px;
  accent-color: #2a5298;
}

.checkbox-label {
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  line-height: 1.4;
  font-weight: normal;
}

.checkbox-label a {
  color: #2a5298;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.checkbox-label a:hover {
  color: #1e3c72;
  text-decoration: underline;
}

.btn-submit {
  padding: 1rem;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: none;
  margin-top: 0.5rem;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(42, 82, 152, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.divider {
  text-align: center;
  color: #999;
  margin: 1.5rem 0;
  position: relative;
  font-size: 0.9rem;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background: #ddd;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.social-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.social-btn {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  color: #333;
}

.social-btn:hover {
  border-color: #2a5298;
  background: #f8f9fa;
  transform: translateY(-2px);
}

.google-btn:hover {
  background: rgba(66, 133, 244, 0.05);
}

.github-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* Responsive Design */
@media (max-width: 900px) {
  .auth-container {
    grid-template-columns: 1fr;
  }

  .auth-left {
    display: none;
  }

  .auth-right {
    justify-content: flex-start;
    padding-top: 2rem;
  }
}

@media (max-width: 640px) {
  .auth-right {
    padding: 1rem;
  }

  .auth-form-container {
    max-width: 100%;
  }

  .form-title {
    font-size: 1.5rem;
  }

  .social-buttons {
    grid-template-columns: 1fr;
  }
}
</style>