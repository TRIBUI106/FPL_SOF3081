<template>
  <div class="auth-page">
    <div class="auth-left">
      <div class="auth-illustration">
        <h1 class="bold-text">Chào mừng trở lại!</h1>
        <p>Kết nối với cộng đồng developer hàng đầu</p>
      </div>
    </div>

    <div class="auth-right">
      <form @submit.prevent="handleLogin" class="login-form" novalidate>
        <div class="form-header">
          <h2>Đăng nhập</h2>
          <p>Vào tài khoản của bạn để tiếp tục</p>
        </div>

        <div
          v-if="message"
          :class="[
            'alert',
            messageType === 'error' ? 'alert-danger' : 'alert-success',
          ]"
        >
          {{ message }}
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="loginData.email"
            type="email"
            class="input"
            placeholder="your@email.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <div class="password-input">
            <input
              id="password"
              v-model="loginData.password"
              :type="showPassword ? 'text' : 'password'"
              class="input"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
              :title="showPassword ? 'Ẩn' : 'Hiện'"
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
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="rememberMe" />
            <span>Nhớ tôi</span>
          </label>
          <a href="#" class="forgot-password">Quên mật khẩu?</a>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-block"
          :disabled="isLoading"
        >
          {{ isLoading ? "Đang đăng nhập..." : "Đăng nhập" }}
        </button>

        <div class="social-login">
          <button type="button" class="social-btn">Google</button>
          <button type="button" class="social-btn">GitHub</button>
        </div>

        <p class="text-center mt-4 text-secondary">
          Chưa có tài khoản?
          <router-link to="/register" class="text-primary fw-bold"
            >Đăng ký ngay</router-link
          >
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
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loginData = ref({ email: "", password: "" });
const showPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);
const message = ref("");
const messageType = ref("");

const handleLogin = async () => {
  message.value = "";
  isLoading.value = true;

  if (!loginData.value.email || !loginData.value.password) {
    message.value = "Vui lòng nhập email và mật khẩu";
    messageType.value = "error";
    isLoading.value = false;
    return;
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Demo account check
  if (
    loginData.value.email === "demo@example.com" &&
    loginData.value.password === "demo123"
  ) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "userAccount",
      JSON.stringify({
        name: "Demo User",
        email: loginData.value.email,
        password: loginData.value.password,
      }),
    );
    message.value = "✅ Đăng nhập thành công!";
    messageType.value = "success";
    setTimeout(() => router.push("/profile"), 500);
  } else {
    const savedAccount = JSON.parse(
      localStorage.getItem("userAccount") || "null",
    );
    if (
      savedAccount &&
      savedAccount.email === loginData.value.email &&
      savedAccount.password === loginData.value.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      message.value = "✅ Đăng nhập thành công!";
      messageType.value = "success";
      setTimeout(() => router.push("/profile"), 500);
    } else {
      message.value = "❌ Email hoặc mật khẩu không chính xác";
      messageType.value = "error";
    }
  }
  isLoading.value = false;
};
</script>

<style scoped>
.auth-page {
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
}

.login-form {
  width: 100%;
  max-width: 400px;
}

.form-header {
  margin-bottom: 48px;
}

.form-header h2 {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--color-text);
  margin-bottom: 8px;
}

.form-header p {
  color: #64748b;
  font-size: 1.1rem;
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
  align-items: center;
}

.icon-sm {
  width: 20px;
  height: 20px;
}

.checkbox-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 32px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
}

.forgot-password {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.9rem;
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

.demo-info {
  margin-top: 48px;
  padding: 24px;
  background: var(--color-background);
  border-radius: 12px;
}

.demo-title {
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--color-text);
}

.demo-text {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.8;
}

@media (max-width: 900px) {
  .auth-page {
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
