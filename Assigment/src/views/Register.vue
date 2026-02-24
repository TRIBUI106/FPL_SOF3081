<template>
  <div class="auth-container">
    <div class="auth-left">
      <div class="auth-illustration">
        <h1 class="bold-text">Tạo Tài Khoản Mới</h1>
        <p>Tham gia cộng đồng của chúng tôi ngay hôm nay</p>
      </div>
    </div>

    <div class="auth-right">
      <div class="auth-form-container">
        <h2 class="form-title">Đăng ký tài khoản</h2>
        <p class="form-subtitle">
          Đã có tài khoản?
          <router-link to="/login" class="text-link">Đăng nhập</router-link>
        </p>

        <div
          v-if="message"
          :class="[
            'alert',
            messageType === 'error' ? 'alert-error' : 'alert-success',
          ]"
        >
          {{ message }}
        </div>

        <form @submit.prevent="handleRegister" novalidate>
          <div class="form-group">
            <label for="name">Họ và Tên</label>
            <input
              id="name"
              v-model="user.name"
              type="text"
              placeholder="Nhập họ và tên"
              class="input"
              required
            />
            <small v-if="errors.name" class="error-text">{{
              errors.name
            }}</small>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="user.email"
              type="email"
              placeholder="example@email.com"
              class="input"
              required
            />
            <small v-if="errors.email" class="error-text">{{
              errors.email
            }}</small>
          </div>

          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <div class="password-input">
              <input
                id="password"
                v-model="user.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Tối thiểu 8 ký tự"
                class="input"
                required
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                <svg
                  v-if="showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon-sm"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon-sm"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                  ></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
            <small v-if="errors.password" class="error-text">{{
              errors.password
            }}</small>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu</label>
            <input
              id="confirmPassword"
              v-model="user.confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              class="input"
              required
            />
            <small v-if="errors.confirmPassword" class="error-text">{{
              errors.confirmPassword
            }}</small>
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
              Tôi đồng ý với
              <a href="#" class="text-link">Điều khoản dịch vụ</a> và
              <a href="#" class="text-link">Chính sách bảo mật</a>
            </label>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-block"
            :disabled="isLoading || !agreeTerms"
          >
            {{ isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản" }}
          </button>
        </form>

        <div class="social-login">
          <button type="button" class="social-btn">Google</button>
          <button type="button" class="social-btn">GitHub</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref({ name: "", email: "", password: "", confirmPassword: "" });
const agreeTerms = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const message = ref("");
const messageType = ref("");
const errors = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
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
  const labels = ["Rất yếu", "Yếu", "Trung bình", "Mạnh", "Rất mạnh"];
  return labels[Math.min(strength, 4)] || "Rất yếu";
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleRegister = async () => {
  // Reset errors
  errors.value = { name: "", email: "", password: "", confirmPassword: "" };
  message.value = "";

  // Validation
  if (!user.value.name.trim()) {
    errors.value.name = "Vui lòng nhập họ và tên";
    return;
  }

  if (!user.value.email.trim()) {
    errors.value.email = "Vui lòng nhập email";
    return;
  }

  if (!validateEmail(user.value.email)) {
    errors.value.email = "Email không hợp lệ";
    return;
  }

  if (!user.value.password) {
    errors.value.password = "Vui lòng nhập mật khẩu";
    return;
  }

  if (user.value.password.length < 8) {
    errors.value.password = "Mật khẩu phải có ít nhất 8 ký tự";
    return;
  }

  if (user.value.password !== user.value.confirmPassword) {
    errors.value.confirmPassword = "Mật khẩu xác nhận không khớp";
    return;
  }

  if (!agreeTerms.value) {
    message.value = "Vui lòng đồng ý với điều khoản dịch vụ";
    messageType.value = "error";
    return;
  }

  isLoading.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Check if email already exists
  const existingAccount = localStorage.getItem("userAccount");
  if (existingAccount) {
    const existing = JSON.parse(existingAccount);
    if (existing.email === user.value.email) {
      message.value =
        "Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập.";
      messageType.value = "error";
      isLoading.value = false;
      return;
    }
  }

  const newAccount = {
    name: user.value.name,
    email: user.value.email,
    password: user.value.password,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem("userAccount", JSON.stringify(newAccount));
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userName", user.value.name);

  message.value = "✅ Tài khoản tạo thành công! Chuyển hướng...";
  messageType.value = "success";

  setTimeout(() => {
    router.push("/profile");
  }, 1500);
};
</script>

<style scoped>
.auth-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  background: white;
}

.auth-left {
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px;
}

.auth-illustration {
  max-width: 400px;
}

.bold-text {
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 24px;
}

.auth-illustration p {
  font-size: 1.5rem;
  opacity: 0.9;
}

.auth-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px;
  overflow-y: auto;
}

.auth-form-container {
  width: 100%;
  max-width: 400px;
}

.form-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--color-text);
  margin-bottom: 8px;
}

.form-subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 48px;
}

.text-link {
  color: var(--color-primary);
  font-weight: 700;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
  color: var(--color-text);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
}

.icon-sm {
  width: 20px;
  height: 20px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 32px;
  margin-bottom: 32px;
}

.checkbox-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #64748b;
}

.btn-block {
  padding: 16px;
  font-size: 1.1rem;
  font-weight: 900;
  border-radius: 12px;
  margin-bottom: 24px;
}

.social-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.social-btn {
  padding: 12px;
  border: 1px solid var(--border);
  background: white;
  border-radius: 12px;
  font-weight: 700;
  color: var(--color-text);
  transition: var(--transition);
}

.social-btn:hover {
  background: #f8fafc;
  border-color: var(--color-primary);
}

.error-text {
  font-size: 0.85rem;
  color: #dc3545;
  margin-top: 4px;
  font-weight: 600;
}

@media (max-width: 900px) {
  .auth-container {
    grid-template-columns: 1fr;
  }
  .auth-left {
    display: none;
  }
  .auth-right {
    padding: 40px 24px;
  }
}
</style>
