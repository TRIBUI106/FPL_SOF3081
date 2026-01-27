<template>
  <div class="login-wrapper">
    <form @submit.prevent="handleLogin" class="login-form" novalidate>
      <h2>Sign In</h2>
      <p class="text-secondary">Access your account to continue.</p>

      <div v-if="message" :class="['alert', messageType === 'error' ? 'alert-danger' : 'alert-success']">
        {{ message }}
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="loginData.email"
          type="email"
          placeholder="your@email.com"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-input">
          <input
            id="password"
            v-model="loginData.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            required
          />
          <button type="button" class="toggle-password" @click="showPassword = !showPassword" :title="showPassword ? 'Hide' : 'Show'">
            {{ showPassword ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
      </div>

      <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </button>

      <p class="text-center mt-3 text-secondary">
        Don't have an account?
        <router-link to="/register" class="text-primary">Sign up here</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loginData = ref({ email: '', password: '' });
const showPassword = ref(false);
const isLoading = ref(false);
const message = ref('');
const messageType = ref('');

const handleLogin = async () => {
  message.value = '';
  isLoading.value = true;

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  const savedAccount = JSON.parse(localStorage.getItem('userAccount'));
  if (savedAccount && savedAccount.email === loginData.value.email && savedAccount.password === loginData.value.password) {
    localStorage.setItem('isLoggedIn', 'true');
    message.value = 'Login successful!';
    messageType.value = 'success';
    setTimeout(() => router.push('/profile'), 500);
  } else {
    message.value = 'Invalid email or password.';
    messageType.value = 'error';
  }
  isLoading.value = false;
};
</script>

<style scoped>
.login-wrapper {
  max-width: 400px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.login-form {
  background: white;
  padding: 2.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
}

.login-form h2 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.login-form > p {
  text-align: center;
  margin-bottom: 2rem;
}

.password-input {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input input {
  padding-right: 45px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity var(--transition);
}

.toggle-password:hover {
  opacity: 0.7;
}

@media (max-width: 640px) {
  .login-form {
    padding: 1.5rem;
  }

  .login-form h2 {
    font-size: 1.5rem;
  }
}
</style>