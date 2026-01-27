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
* {
  box-sizing: border-box;
}

.profile-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
  background: #f5f7fa;
  min-height: calc(100vh - 80px);
}

.profile-header {
  background: white;
  margin-top: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-cover {
  height: 200px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  position: relative;
  overflow: hidden;
}

.profile-cover::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -50px;
  right: -50px;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.profile-top {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  margin-top: -80px;
  position: relative;
  z-index: 1;
}

.avatar-container {
  position: relative;
  flex-shrink: 0;
}

.avatar-img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.avatar-img:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.avatar-upload-label {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(42, 82, 152, 0.3);
}

.avatar-upload-label:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(42, 82, 152, 0.4);
}

.profile-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.profile-name {
  font-size: 2rem;
  font-weight: 700;
  color: #1e3c72;
  margin: 0;
}

.profile-email {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.profile-member {
  font-size: 0.9rem;
  color: #999;
  margin: 0;
}

/* Tabs Container */
.tabs-container {
  background: white;
  margin-top: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tabs-nav {
  display: flex;
  gap: 0;
  border-bottom: 2px solid #e0e0e0;
  background: #f8f9fa;
}

.tab-btn {
  flex: 1;
  padding: 1.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  position: relative;
  margin-bottom: -2px;
}

.tab-btn:hover {
  color: #2a5298;
  background: #f0f4fa;
}

.tab-btn.tab-active {
  color: #2a5298;
  border-bottom-color: #2a5298;
}

.alert-message {
  margin: 1.5rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
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

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  padding: 0 0.5rem;
}

.close-btn:hover {
  opacity: 1;
}

/* Tab Content */
.tab-content {
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.profile-form {
  max-width: 600px;
}

.form-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e3c72;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e3c72;
  margin: 1.5rem 0 1rem;
}

.required {
  color: #dc3545;
  font-weight: 700;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
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
  font-family: inherit;
  transition: all 0.3s ease;
  color: #333;
}

.form-input:focus {
  outline: none;
  border-color: #2a5298;
  box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
}

.form-input::placeholder {
  color: #aaa;
}

.form-input.textarea {
  resize: vertical;
  min-height: 100px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.hint-text {
  font-size: 0.85rem;
  color: #999;
  margin-top: 0.25rem;
}

.error-text {
  font-size: 0.85rem;
  color: #dc3545;
  margin-top: 0.25rem;
}

/* Password Input */
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
  padding: 0.5rem;
  transition: opacity 0.3s ease;
}

.password-toggle:hover {
  opacity: 0.7;
}

/* Submit Button */
.btn-submit {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(42, 82, 152, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Security Info */
.security-info {
  padding: 1rem;
  background: #f0f4fa;
  border-left: 4px solid #2a5298;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.security-info p {
  margin: 0.5rem 0;
  color: #333;
  font-size: 0.95rem;
}

.text-secondary {
  color: #999 !important;
}

/* Divider Line */
.divider-line {
  height: 1px;
  background: #e0e0e0;
  margin: 2rem 0;
}

/* Settings Group */
.settings-group {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  transition: background 0.3s ease;
}

.setting-item:hover {
  background: #f8f9fa;
}

.setting-item.danger-zone {
  background: #fff5f5;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info h4 {
  margin: 0 0 0.5rem 0;
  color: #1e3c72;
  font-size: 1rem;
  font-weight: 600;
}

.setting-info p {
  margin: 0;
  color: #999;
  font-size: 0.9rem;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 28px;
}

.toggle-slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #2a5298;
}

input:checked + .toggle-slider:before {
  transform: translateX(22px);
}

/* Danger Button */
.btn-danger {
  padding: 0.6rem 1.2rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
}

.modal-content h3 {
  color: #dc3545;
  margin-top: 0;
  margin-bottom: 1rem;
}

.modal-content p {
  color: #666;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.btn-cancel {
  flex: 1;
  padding: 0.75rem;
  background: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel:hover {
  background: #d0d0d0;
}

.modal-actions .btn-danger {
  flex: 1;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-top {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem 1rem;
    margin-top: -60px;
  }

  .avatar-img {
    width: 120px;
    height: 120px;
  }

  .profile-name {
    font-size: 1.5rem;
  }

  .tabs-nav {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .tab-btn {
    white-space: nowrap;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .tab-content {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 640px) {
  .profile-header {
    margin-top: 1rem;
    border-radius: 8px;
  }

  .profile-cover {
    height: 120px;
  }

  .avatar-img {
    width: 100px;
    height: 100px;
  }

  .form-title {
    font-size: 1.2rem;
  }

  .tabs-nav {
    flex-wrap: wrap;
  }

  .tab-btn {
    flex: 0 1 auto;
    padding: 1rem 0.75rem;
    font-size: 0.9rem;
  }
}
</style>