<template>
  <div class="register-wrapper">
    <form @submit.prevent="handleRegister" class="register-form" novalidate>
      <h2>Create Account</h2>
      <p class="text-secondary">Join us today and start sharing.</p>

      <div v-if="message" :class="['alert', messageType === 'error' ? 'alert-danger' : 'alert-success']">
        {{ message }}
      </div>

      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          id="name"
          v-model="user.name"
          type="text"
          placeholder="John Doe"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          id="email"
          v-model="user.email"
          type="email"
          placeholder="your@email.com"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="user.password"
          type="password"
          placeholder="••••••••"
          required
          minlength="6"
        />
        <small class="text-secondary">Minimum 6 characters</small>
      </div>

      <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
        {{ isLoading ? 'Creating account...' : 'Create Account' }}
      </button>

      <p class="text-center mt-3 text-secondary">
        Already have an account?
        <router-link to="/login" class="text-primary">Sign in here</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref({ name: '', email: '', password: '' });
const isLoading = ref(false);
const message = ref('');
const messageType = ref('');

const handleRegister = async () => {
  if (!user.value.name || !user.value.email || !user.value.password) {
    message.value = 'Please fill in all fields.';
    messageType.value = 'error';
    return;
  }

  if (user.value.password.length < 6) {
    message.value = 'Password must be at least 6 characters.';
    messageType.value = 'error';
    return;
  }

  isLoading.value = true;

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  localStorage.setItem('userAccount', JSON.stringify(user.value));
  message.value = 'Account created successfully!';
  messageType.value = 'success';
  
  setTimeout(() => router.push('/login'), 500);
};
</script>

<style scoped>
.register-wrapper {
  max-width: 400px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.register-form {
  background: white;
  padding: 2.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
}

.register-form h2 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.register-form > p {
  text-align: center;
  margin-bottom: 2rem;
}

small {
  display: block;
  margin-top: 0.5rem;
}

@media (max-width: 640px) {
  .register-form {
    padding: 1.5rem;
  }

  .register-form h2 {
    font-size: 1.5rem;
  }
}
</style>