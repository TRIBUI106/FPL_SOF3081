<template>
  <div class="profile-wrapper">
    <!-- Header Section -->
    <div class="profile-header">
      <div class="profile-cover"></div>
      <div class="profile-top">
        <div class="avatar-container">
          <img :src="userForm.avatar || defaultAvatar" :alt="userForm.name" class="avatar-img" />
          <label class="avatar-upload-label" for="avatar-upload" title="Thay đổi ảnh đại diện">
            📷 Chỉnh sửa
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            class="d-none"
            @change="handleAvatarChange"
          />
        </div>
        <div class="profile-info">
          <h2 class="profile-name">{{ userForm.name }}</h2>
          <p class="profile-email">{{ userForm.email }}</p>
          <p class="profile-member">Thành viên từ {{ memberSince }}</p>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="tabs-container">
      <div class="tabs-nav">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="tab-btn"
          :class="{ 'tab-active': activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ getTabIcon(tab) }} {{ getTabLabel(tab) }}
        </button>
      </div>

      <!-- Messages -->
      <div v-if="message" :class="['alert-message', messageType === 'error' ? 'alert-error' : 'alert-success']">
        <span>{{ message }}</span>
        <button class="close-btn" @click="message = ''">×</button>
      </div>

      <!-- Tab Content: Profile Info -->
      <div v-if="activeTab === 'info'" class="tab-content">
        <form @submit.prevent="handleUpdateProfile" novalidate class="profile-form">
          <h3 class="form-title">🧑 Thông tin cá nhân</h3>

          <div class="form-group">
            <label for="name">Họ và Tên <span class="required">*</span></label>
            <input
              id="name"
              v-model="userForm.name"
              type="text"
              placeholder="Nhập họ và tên"
              required
              class="form-input"
            />
            <small v-if="errors.name" class="error-text">{{ errors.name }}</small>
          </div>

          <div class="form-group">
            <label for="bio">Tiểu sử (Bio)</label>
            <textarea
              id="bio"
              v-model="userForm.bio"
              placeholder="Giới thiệu về bản thân bạn..."
              rows="4"
              class="form-input textarea"
            ></textarea>
            <small class="hint-text">Tối đa 200 ký tự</small>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="location">📍 Địa điểm</label>
              <input
                id="location"
                v-model="userForm.location"
                type="text"
                placeholder="Thành phố, Quốc gia"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="website">🔗 Website</label>
              <input
                id="website"
                v-model="userForm.website"
                type="url"
                placeholder="https://example.com"
                class="form-input"
              />
            </div>
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            {{ isLoading ? '⏳ Đang cập nhật...' : '💾 Lưu thay đổi' }}
          </button>
        </form>
      </div>

      <!-- Tab Content: Security -->
      <div v-if="activeTab === 'security'" class="tab-content">
        <form @submit.prevent="handleChangePassword" novalidate class="profile-form">
          <h3 class="form-title">🔐 Bảo mật</h3>

          <div class="security-info">
            <p>📧 Email: <strong>{{ userForm.email }}</strong></p>
            <p class="text-secondary">Email không thể thay đổi</p>
          </div>

          <div class="divider-line"></div>

          <h4 class="section-title">Đổi mật khẩu</h4>

          <div class="form-group">
            <label for="current-password">🔓 Mật khẩu hiện tại</label>
            <div class="password-input-wrapper">
              <input
                id="current-password"
                v-model="passwordForm.current"
                :type="showCurrentPassword ? 'text' : 'password'"
                placeholder="Nhập mật khẩu hiện tại"
                class="form-input"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showCurrentPassword = !showCurrentPassword"
              >
                {{ showCurrentPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <small v-if="errors.current" class="error-text">{{ errors.current }}</small>
          </div>

          <div class="form-group">
            <label for="new-password">🔐 Mật khẩu mới</label>
            <div class="password-input-wrapper">
              <input
                id="new-password"
                v-model="passwordForm.new"
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="Nhập mật khẩu mới"
                class="form-input"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showNewPassword = !showNewPassword"
              >
                {{ showNewPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <small class="hint-text">Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số</small>
            <small v-if="errors.new" class="error-text">{{ errors.new }}</small>
          </div>

          <div class="form-group">
            <label for="confirm-password">🔐 Xác nhận mật khẩu</label>
            <div class="password-input-wrapper">
              <input
                id="confirm-password"
                v-model="passwordForm.confirm"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Nhập lại mật khẩu mới"
                class="form-input"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <small v-if="errors.confirm" class="error-text">{{ errors.confirm }}</small>
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            {{ isLoading ? '⏳ Đang cập nhật...' : '🔄 Đổi mật khẩu' }}
          </button>
        </form>
      </div>

      <!-- Tab Content: Settings -->
      <div v-if="activeTab === 'settings'" class="tab-content">
        <div class="profile-form">
          <h3 class="form-title">⚙️ Cài đặt tài khoản</h3>

          <div class="settings-group">
            <div class="setting-item">
              <div class="setting-info">
                <h4>📬 Thông báo qua Email</h4>
                <p class="text-secondary">Nhận thông báo về bài viết và hoạt động mới</p>
              </div>
              <label class="toggle-switch">
                <input v-model="settings.emailNotifications" type="checkbox" />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h4>🌙 Chế độ tối</h4>
                <p class="text-secondary">Sử dụng giao diện tối để dễ nhìn hơn</p>
              </div>
              <label class="toggle-switch">
                <input v-model="settings.darkMode" type="checkbox" />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h4>🔒 Hiển thị công khai</h4>
                <p class="text-secondary">Cho phép người khác xem hồ sơ của bạn</p>
              </div>
              <label class="toggle-switch">
                <input v-model="settings.publicProfile" type="checkbox" />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="divider-line"></div>

            <div class="setting-item danger-zone">
              <div class="setting-info">
                <h4>🗑️ Xóa tài khoản</h4>
                <p class="text-secondary">Hành động này không thể hoàn tác</p>
              </div>
              <button class="btn-danger" @click="confirmDelete = true">
                Xóa
              </button>
            </div>
          </div>

          <button class="btn-submit" @click="handleSaveSettings">
            💾 Lưu cài đặt
          </button>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="confirmDelete" class="modal-overlay" @click="confirmDelete = false">
          <div class="modal-content" @click.stop>
            <h3>⚠️ Xác nhận xóa tài khoản</h3>
            <p>Bạn chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác.</p>
            <div class="modal-actions">
              <button class="btn-cancel" @click="confirmDelete = false">Hủy</button>
              <button class="btn-danger" @click="handleDeleteAccount">Xóa tài khoản</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(false);
const message = ref('');
const messageType = ref('');
const activeTab = ref('info');
const confirmDelete = ref(false);
const tabs = ['info', 'security', 'settings'];

const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=user';

const userForm = ref({
  name: '',
  email: '',
  bio: '',
  location: '',
  website: '',
  avatar: defaultAvatar,
});

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
});

const errors = ref({
  name: '',
  current: '',
  new: '',
  confirm: ''
});

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const settings = ref({
  emailNotifications: true,
  darkMode: false,
  publicProfile: true
});

const memberSince = computed(() => {
  const account = JSON.parse(localStorage.getItem('userAccount') || '{}');
  if (account.createdAt) {
    return new Date(account.createdAt).toLocaleDateString('vi-VN');
  }
  return 'Gần đây';
});

onMounted(() => {
  const savedUser = JSON.parse(localStorage.getItem('userAccount'));
  if (!localStorage.getItem('isLoggedIn') || !savedUser) {
    router.push('/login');
    return;
  }

  userForm.value = {
    name: savedUser.name || '',
    email: savedUser.email || '',
    bio: savedUser.bio || '',
    location: savedUser.location || '',
    website: savedUser.website || '',
    avatar: savedUser.avatar || defaultAvatar,
  };

  // Load settings from localStorage
  const savedSettings = localStorage.getItem('userSettings');
  if (savedSettings) {
    settings.value = JSON.parse(savedSettings);
  }
});

const getTabIcon = (tab) => {
  const icons = { info: '👤', security: '🔐', settings: '⚙️' };
  return icons[tab] || '';
};

const getTabLabel = (tab) => {
  const labels = {
    info: 'Thông tin cá nhân',
    security: 'Bảo mật',
    settings: 'Cài đặt'
  };
  return labels[tab] || '';
};

const handleAvatarChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      message.value = 'Ảnh phải nhỏ hơn 5MB';
      messageType.value = 'error';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      userForm.value.avatar = event.target?.result || defaultAvatar;
    };
    reader.readAsDataURL(file);
  }
};

const validateForm = () => {
  errors.value = { name: '', current: '', new: '', confirm: '' };

  if (!userForm.value.name.trim()) {
    errors.value.name = 'Vui lòng nhập họ và tên';
    return false;
  }

  if (userForm.value.bio && userForm.value.bio.length > 200) {
    message.value = 'Tiểu sử không được vượt quá 200 ký tự';
    messageType.value = 'error';
    return false;
  }

  return true;
};

const handleUpdateProfile = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  message.value = '';

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));

  const savedUser = JSON.parse(localStorage.getItem('userAccount'));
  const updatedUser = {
    ...savedUser,
    name: userForm.value.name,
    bio: userForm.value.bio,
    location: userForm.value.location,
    website: userForm.value.website,
    avatar: userForm.value.avatar,
  };

  localStorage.setItem('userAccount', JSON.stringify(updatedUser));
  localStorage.setItem('userName', userForm.value.name);

  message.value = '✅ Cập nhật hồ sơ thành công!';
  messageType.value = 'success';
  isLoading.value = false;

  setTimeout(() => {
    message.value = '';
  }, 3000);
};

const validatePassword = () => {
  errors.value.current = '';
  errors.value.new = '';
  errors.value.confirm = '';

  if (!passwordForm.value.current) {
    errors.value.current = 'Vui lòng nhập mật khẩu hiện tại';
    return false;
  }

  const savedUser = JSON.parse(localStorage.getItem('userAccount'));
  if (passwordForm.value.current !== savedUser.password) {
    errors.value.current = 'Mật khẩu hiện tại không chính xác';
    return false;
  }

  if (!passwordForm.value.new) {
    errors.value.new = 'Vui lòng nhập mật khẩu mới';
    return false;
  }

  if (passwordForm.value.new.length < 8) {
    errors.value.new = 'Mật khẩu phải có ít nhất 8 ký tự';
    return false;
  }

  if (passwordForm.value.new !== passwordForm.value.confirm) {
    errors.value.confirm = 'Mật khẩu xác nhận không khớp';
    return false;
  }

  if (passwordForm.value.new === passwordForm.value.current) {
    errors.value.new = 'Mật khẩu mới phải khác với mật khẩu cũ';
    return false;
  }

  return true;
};

const handleChangePassword = async () => {
  if (!validatePassword()) return;

  isLoading.value = true;
  message.value = '';

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));

  const savedUser = JSON.parse(localStorage.getItem('userAccount'));
  const updatedUser = {
    ...savedUser,
    password: passwordForm.value.new
  };

  localStorage.setItem('userAccount', JSON.stringify(updatedUser));

  message.value = '✅ Đổi mật khẩu thành công!';
  messageType.value = 'success';

  passwordForm.value = { current: '', new: '', confirm: '' };
  isLoading.value = false;

  setTimeout(() => {
    message.value = '';
  }, 3000);
};

const handleSaveSettings = async () => {
  isLoading.value = true;
  message.value = '';

  await new Promise(resolve => setTimeout(resolve, 600));

  localStorage.setItem('userSettings', JSON.stringify(settings.value));

  message.value = '✅ Cài đặt đã được lưu!';
  messageType.value = 'success';
  isLoading.value = false;

  setTimeout(() => {
    message.value = '';
  }, 3000);
};

const handleDeleteAccount = async () => {
  isLoading.value = true;

  await new Promise(resolve => setTimeout(resolve, 600));

  localStorage.clear();
  message.value = '✅ Tài khoản đã xóa. Chuyển hướng...';
  messageType.value = 'success';

  setTimeout(() => {
    router.push('/login');
  }, 1500);
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