<template>
  <div class="profile-wrapper">
    <!-- Header Section -->
    <div class="profile-header">
      <div class="profile-cover"></div>
      <div class="profile-top">
        <div class="avatar-container">
          <img
            :src="userForm.avatar || defaultAvatar"
            :alt="userForm.name"
            class="avatar-img"
          />
          <label
            class="avatar-upload-label"
            for="avatar-upload"
            title="Thay đổi ảnh đại diện"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            Thay đổi
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
      <div class="tabs-nav box">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="tab-btn"
          :class="{ 'tab-active': activeTab === tab }"
          @click="activeTab = tab"
        >
          <span v-html="getTabIcon(tab)" class="tab-icon"></span>
          {{ getTabLabel(tab) }}
        </button>
      </div>

      <!-- Messages -->
      <div
        v-if="message"
        :class="[
          'alert-message',
          messageType === 'error' ? 'alert-error' : 'alert-success',
        ]"
      >
        <span>{{ message }}</span>
        <button class="close-btn" @click="message = ''">×</button>
      </div>

      <!-- Tab Content: Profile Info -->
      <div v-if="activeTab === 'info'" class="tab-content card">
        <form @submit.prevent="handleUpdateProfile" novalidate class="profile-form">
          <h3 class="form-title">Thông tin cá nhân</h3>

          <div class="form-group">
            <label for="name">Họ và Tên</label>
            <input
              id="name"
              v-model="userForm.name"
              type="text"
              placeholder="Nhập họ và tên"
              required
              class="input"
            />
            <small v-if="errors.name" class="error-text">{{ errors.name }}</small>
          </div>

          <div class="form-group">
            <label for="bio">Tiểu sử</label>
            <textarea
              id="bio"
              v-model="userForm.bio"
              placeholder="Giới thiệu về bản thân bạn..."
              rows="4"
              class="input"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="location">Địa điểm</label>
              <input
                id="location"
                v-model="userForm.location"
                type="text"
                placeholder="Thành phố, Quốc gia"
                class="input"
              />
            </div>
            <div class="form-group">
              <label for="website">Website</label>
              <input
                id="website"
                v-model="userForm.website"
                type="url"
                placeholder="https://example.com"
                class="input"
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? "Đang cập nhật..." : "Lưu thay đổi" }}
          </button>
        </form>
      </div>

      <!-- Tab Content: Security -->
      <div v-if="activeTab === 'security'" class="tab-content card">
        <form @submit.prevent="handleChangePassword" novalidate class="profile-form">
          <h3 class="form-title">Bảo mật</h3>

          <div class="security-email-box">
            <span class="label">Email tài khoản</span>
            <span class="value">{{ userForm.email }}</span>
          </div>

          <div class="divider"></div>

          <h4 class="form-subtitle">Đổi mật khẩu</h4>

          <div class="form-group">
            <label for="current-password">Mật khẩu hiện tại</label>
            <div class="password-wrapper">
              <input
                id="current-password"
                v-model="passwordForm.current"
                :type="showCurrentPassword ? 'text' : 'password'"
                placeholder="Nhập mật khẩu hiện tại"
                class="input"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showCurrentPassword = !showCurrentPassword"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path v-if="!showCurrentPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle v-if="!showCurrentPassword" cx="12" cy="12" r="3"></circle>
                  <line v-if="showCurrentPassword" x1="1" y1="1" x2="23" y2="23"></line>
                  <path v-if="showCurrentPassword" d="M9 9a3 3 0 1 1 6 6"></path>
                  <path v-if="showCurrentPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                </svg>
              </button>
            </div>
            <small v-if="errors.current" class="error-text">{{ errors.current }}</small>
          </div>

          <div class="form-group">
            <label for="new-password">Mật khẩu mới</label>
            <div class="password-wrapper">
              <input
                id="new-password"
                v-model="passwordForm.new"
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="Nhập mật khẩu mới"
                class="input"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showNewPassword = !showNewPassword"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path v-if="!showNewPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle v-if="!showNewPassword" cx="12" cy="12" r="3"></circle>
                  <line v-if="showNewPassword" x1="1" y1="1" x2="23" y2="23"></line>
                  <path v-if="showNewPassword" d="M9 9a3 3 0 1 1 6 6"></path>
                  <path v-if="showNewPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                </svg>
              </button>
            </div>
            <small v-if="errors.new" class="error-text">{{ errors.new }}</small>
          </div>

          <div class="form-group">
            <label for="confirm-password">Xác nhận mật khẩu mới</label>
            <div class="password-wrapper">
              <input
                id="confirm-password"
                v-model="passwordForm.confirm"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Xác nhận mật khẩu mới"
                class="input"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path v-if="!showConfirmPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle v-if="!showConfirmPassword" cx="12" cy="12" r="3"></circle>
                  <line v-if="showConfirmPassword" x1="1" y1="1" x2="23" y2="23"></line>
                  <path v-if="showConfirmPassword" d="M9 9a3 3 0 1 1 6 6"></path>
                  <path v-if="showConfirmPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                </svg>
              </button>
            </div>
            <small v-if="errors.confirm" class="error-text">{{ errors.confirm }}</small>
          </div>

          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? "Đang xử lý..." : "Cập nhật mật khẩu" }}
          </button>
        </form>
      </div>

      <!-- Tab Content: Settings -->
      <div v-if="activeTab === 'settings'" class="tab-content card">
        <div class="profile-form">
          <h3 class="form-title">Cài đặt</h3>

          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-text">
                <h4>Thông báo qua Email</h4>
                <p>Nhận cập nhật về bài viết và hoạt động mới</p>
              </div>
              <label class="switch">
                <input v-model="settings.emailNotifications" type="checkbox" />
                <span class="slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-text">
                <h4>Chế độ tối</h4>
                <p>Chuyển giao diện sang tông màu tối</p>
              </div>
              <label class="switch">
                <input v-model="settings.darkMode" type="checkbox" />
                <span class="slider"></span>
              </label>
            </div>

            <div class="setting-item danger">
              <div class="setting-text">
                <h4>Xóa tài khoản</h4>
                <p>Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn</p>
              </div>
              <button class="btn btn-danger-link" @click="confirmDelete = true">
                Xóa ngay
              </button>
            </div>
          </div>

          <button class="btn btn-primary" @click="handleSaveSettings" :disabled="isLoading">
            Lưu cài đặt
          </button>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="confirmDelete" class="modal-overlay" @click="confirmDelete = false">
          <div class="modal-content" @click.stop>
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác.</p>
            <div class="modal-actions">
              <button class="btn btn-secondary" @click="confirmDelete = false">Hủy</button>
              <button class="btn btn-danger" @click="handleDeleteAccount">Xóa vĩnh viễn</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoading = ref(false);
const message = ref("");
const messageType = ref("");
const activeTab = ref("info");
const confirmDelete = ref(false);
const tabs = ["info", "security", "settings"];

const defaultAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=user";

const userForm = ref({
  name: "",
  email: "",
  bio: "",
  location: "",
  website: "",
  avatar: defaultAvatar,
});

const passwordForm = ref({
  current: "",
  new: "",
  confirm: "",
});

const errors = ref({
  name: "",
  current: "",
  new: "",
  confirm: "",
});

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const settings = ref({
  emailNotifications: true,
  darkMode: false,
  publicProfile: true,
});

const memberSince = computed(() => {
  const account = JSON.parse(localStorage.getItem("userAccount") || "{}");
  if (account.createdAt) {
    return new Date(account.createdAt).toLocaleDateString("vi-VN");
  }
  return "Gần đây";
});

onMounted(() => {
  const savedUser = JSON.parse(localStorage.getItem("userAccount"));
  if (!localStorage.getItem("isLoggedIn") || !savedUser) {
    router.push("/login");
    return;
  }

  userForm.value = {
    name: savedUser.name || "",
    email: savedUser.email || "",
    bio: savedUser.bio || "",
    location: savedUser.location || "",
    website: savedUser.website || "",
    avatar: savedUser.avatar || defaultAvatar,
  };

  const savedSettings = localStorage.getItem("userSettings");
  if (savedSettings) {
    settings.value = JSON.parse(savedSettings);
  }
});

const getTabIcon = (tab) => {
  const icons = {
    info: '<svg xmlns="http://www.w3.org/2000/svg" class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    security: '<svg xmlns="http://www.w3.org/2000/svg" class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
    settings: '<svg xmlns="http://www.w3.org/2000/svg" class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
  };
  return icons[tab] || "";
};

const getTabLabel = (tab) => {
  const labels = {
    info: "Cá nhân",
    security: "Bảo mật",
    settings: "Cài đặt",
  };
  return labels[tab] || "";
};

const handleAvatarChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      message.value = "Ảnh phải nhỏ hơn 5MB";
      messageType.value = "error";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      userForm.value.avatar = event.target?.result || defaultAvatar;
    };
    reader.readAsDataURL(file);
  }
};

const handleUpdateProfile = async () => {
  errors.value = { name: "" };
  if (!userForm.value.name.trim()) {
    errors.value.name = "Vui lòng nhập họ và tên";
    return;
  }

  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));

  const savedUser = JSON.parse(localStorage.getItem("userAccount"));
  const updatedUser = {
    ...savedUser,
    ...userForm.value,
  };

  localStorage.setItem("userAccount", JSON.stringify(updatedUser));
  message.value = "Hồ sơ đã được cập nhật thành công";
  messageType.value = "success";
  isLoading.value = false;

  setTimeout(() => (message.value = ""), 3000);
};

const handleChangePassword = async () => {
  errors.value = { current: "", new: "", confirm: "" };
  const savedUser = JSON.parse(localStorage.getItem("userAccount"));

  if (passwordForm.value.current !== savedUser.password) {
    errors.value.current = "Mật khẩu hiện tại không đúng";
    return;
  }
  if (passwordForm.value.new.length < 8) {
    errors.value.new = "Mật khẩu mới phải có ít nhất 8 ký tự";
    return;
  }
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    errors.value.confirm = "Mật khẩu xác nhận không khớp";
    return;
  }

  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));

  savedUser.password = passwordForm.value.new;
  localStorage.setItem("userAccount", JSON.stringify(savedUser));
  
  message.value = "Mật khẩu đã được thay đổi thành công";
  messageType.value = "success";
  isLoading.value = false;
  passwordForm.value = { current: "", new: "", confirm: "" };

  setTimeout(() => (message.value = ""), 3000);
};

const handleSaveSettings = async () => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 600));
  localStorage.setItem("userSettings", JSON.stringify(settings.value));
  message.value = "Cài đặt đã được lưu";
  messageType.value = "success";
  isLoading.value = false;
  setTimeout(() => (message.value = ""), 3000);
};

const handleDeleteAccount = async () => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  localStorage.clear();
  router.push("/login");
};
</script>

<style scoped>
.profile-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px;
}

.profile-header {
  margin-bottom: 48px;
}

.profile-cover {
  height: 160px;
  background: var(--color-primary);
  border-radius: 24px 24px 0 0;
}

.profile-top {
  display: flex;
  align-items: flex-end;
  gap: 24px;
  margin-top: -60px;
  padding: 0 40px;
}

.avatar-container {
  position: relative;
  width: 140px;
  height: 140px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 32px;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: var(--shadow-lg);
}

.avatar-upload-label {
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: white;
  padding: 8px 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

.avatar-upload-label:hover {
  transform: translateY(-2px);
  color: var(--color-primary);
}

.profile-name {
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 4px;
}

.profile-email {
  color: #64748b;
  font-weight: 600;
}

.profile-member {
  font-size: 0.875rem;
  color: #94a3b8;
  margin-top: 4px;
}

.tabs-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.tabs-nav {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: white;
  border-radius: 20px;
  border: 1px solid var(--border);
  width: fit-content;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 14px;
  border: none;
  background: transparent;
  font-weight: 800;
  color: #64748b;
  cursor: pointer;
  transition: var(--transition);
}

.tab-btn:hover {
  color: var(--color-primary);
  background: var(--color-background);
}

.tab-active {
  background: var(--color-primary) !important;
  color: white !important;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid var(--border);
}

.form-title {
  margin-bottom: 32px;
  font-size: 1.5rem;
  font-weight: 900;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 8px;
  letter-spacing: 0.05em;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.security-email-box {
  background: var(--color-background);
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.security-email-box .label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-primary);
}

.security-email-box .value {
  font-weight: 700;
  font-size: 1.1rem;
}

.divider {
  height: 1px;
  background: var(--border);
  margin: 40px 0;
}

.password-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 40px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-text h4 {
  font-weight: 800;
  margin-bottom: 4px;
}

.setting-text p {
  font-size: 0.875rem;
  color: #64748b;
}

/* Switch UI */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 32px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e2e8f0;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--color-primary);
}

input:checked + .slider:before {
  transform: translateX(28px);
}

.btn-danger-link {
  color: var(--danger);
  font-weight: 800;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 24px;
  max-width: 400px;
  text-align: center;
}

.modal-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}

.icon-sm { width: 20px; height: 20px; }

@media (max-width: 640px) {
  .profile-top { flex-direction: column; align-items: center; padding: 0; }
  .form-row { grid-template-columns: 1fr; }
  .card { padding: 24px; }
}
</style>
