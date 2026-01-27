<template>
  <div class="profile-wrapper">
    <form @submit.prevent="handleUpdateProfile" class="profile-form" novalidate>
      <h2>Your Profile</h2>
      <p class="text-secondary">Manage your account information</p>

      <div v-if="message" :class="['alert', messageType === 'error' ? 'alert-danger' : 'alert-success']">
        {{ message }}
      </div>

      <!-- Avatar Section -->
      <div class="avatar-section">
        <img :src="userForm.avatar || defaultAvatar" :alt="userForm.name" class="avatar-img" />
        <label class="avatar-upload-label" for="avatar-upload">
          Change
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          class="d-none"
          @change="handleAvatarChange"
        />
      </div>

      <!-- Form Fields -->
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          id="name"
          v-model="userForm.name"
          type="text"
          placeholder="Your name"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          id="email"
          v-model="userForm.email"
          type="email"
          disabled
        />
        <small class="text-secondary">Cannot be changed</small>
      </div>

      <div class="form-group">
        <label for="new-password">New Password (optional)</label>
        <input
          id="new-password"
          v-model="userForm.newPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
        />
        <small class="text-secondary">Leave empty to keep current password</small>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          {{ isLoading ? 'Updating...' : 'Update Profile' }}
        </button>
        <router-link to="/" class="btn btn-outline-secondary">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(false);
const showPassword = ref(false);
const message = ref('');
const messageType = ref('');
const defaultAvatar = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22system-ui%22 fill=%22%23999%22%3EAvatar%3C/text%3E%3C/svg%3E';

const userForm = ref({
  name: '',
  email: '',
  newPassword: '',
  avatar: defaultAvatar,
});

onMounted(() => {
  const savedUser = JSON.parse(localStorage.getItem('userAccount'));
  if (savedUser) {
    userForm.value = {
      name: savedUser.name || '',
      email: savedUser.email || '',
      newPassword: '',
      avatar: savedUser.avatar || defaultAvatar,
    };
  } else {
    router.push('/login');
  }
});

const handleAvatarChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      userForm.value.avatar = event.target?.result || defaultAvatar;
    };
    reader.readAsDataURL(file);
  }
};

const handleUpdateProfile = async () => {
  if (!userForm.value.name.trim()) {
    message.value = 'Please enter your name.';
    messageType.value = 'error';
    return;
  }

  isLoading.value = true;
  message.value = '';

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  const savedUser = JSON.parse(localStorage.getItem('userAccount'));
  const updatedUser = {
    ...savedUser,
    name: userForm.value.name,
    avatar: userForm.value.avatar,
    password: userForm.value.newPassword || savedUser.password,
  };

  localStorage.setItem('userAccount', JSON.stringify(updatedUser));
  message.value = 'Profile updated successfully!';
  messageType.value = 'success';
  userForm.value.newPassword = '';

  isLoading.value = false;
};
</script>

<style scoped>
.profile-wrapper {
  max-width: 500px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.profile-form {
  background: white;
  padding: 2.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
}

.profile-form h2 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.profile-form > p {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar-section {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--border);
  transition: transform var(--transition);
}

.avatar-img:hover {
  transform: scale(1.05);
}

.avatar-upload-label {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background: var(--light);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background var(--transition);
}

.avatar-upload-label:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.form-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
}

small {
  display: block;
  margin-top: 0.5rem;
}

@media (max-width: 640px) {
  .profile-form {
    padding: 1.5rem;
  }

  .profile-form h2 {
    font-size: 1.5rem;
  }

  .form-actions {
    grid-template-columns: 1fr;
  }

  .avatar-img {
    width: 100px;
    height: 100px;
  }
}
</style>