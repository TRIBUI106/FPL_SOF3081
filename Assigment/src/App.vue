<template>
  <nav class="nav-main">
    <div class="container">
      <div class="nav-logo">
        <router-link to="/" class="nav-brand">
          <span class="logo-text">TechBlog</span>
        </router-link>
      </div>

      <div class="nav-center">
        <div class="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            v-model="searchQuery"
            @keyup.enter="performSearch"
          />
          <button @click="performSearch" class="search-submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon-nav"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="nav-links">
        <router-link v-if="!isLoggedIn" to="/login" class="nav-link">
          Đăng nhập
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/register"
          class="nav-link btn-signup"
        >
          Đăng ký
        </router-link>

        <div v-if="isLoggedIn" class="user-menu">
          <button class="user-avatar-btn" @click="toggleUserMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon-nav"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="username">{{ userName }}</span>
          </button>

          <div v-if="showUserMenu" class="dropdown-menu">
            <router-link to="/profile" class="dropdown-item">
              Hồ sơ
            </router-link>
            <router-link to="/my-posts" class="dropdown-item">
              Bài viết của tôi
            </router-link>
            <button @click="handleLogout" class="dropdown-item logout-btn">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <button class="nav-toggle" @click="showMobileMenu = !showMobileMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon-nav"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="showMobileMenu" class="mobile-menu">
      <div class="search-bar mb-3">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm..."
          v-model="searchQuery"
          @keyup.enter="performSearch"
        />
        <button @click="performSearch" class="search-submit">🔍</button>
      </div>
      <router-link to="/" class="mobile-link" @click="showMobileMenu = false"
        >Trang chủ</router-link
      >
      <router-link
        v-if="!isLoggedIn"
        to="/login"
        class="mobile-link"
        @click="showMobileMenu = false"
        >Đăng nhập</router-link
      >
      <router-link
        v-if="!isLoggedIn"
        to="/register"
        class="mobile-link"
        @click="showMobileMenu = false"
        >Đăng ký</router-link
      >
      <router-link
        v-if="isLoggedIn"
        to="/profile"
        class="mobile-link"
        @click="showMobileMenu = false"
        >Hồ sơ</router-link
      >
      <button
        v-if="isLoggedIn"
        @click="handleLogout"
        class="mobile-link logout-btn"
      >
        Đăng xuất
      </button>
    </div>
  </nav>

  <main class="main-content">
    <router-view></router-view>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);
const userName = ref("User");
const showUserMenu = ref(false);
const showMobileMenu = ref(false);
const searchQuery = ref("");

onMounted(() => {
  checkLoginStatus();
});

const checkLoginStatus = () => {
  const logged = localStorage.getItem("isLoggedIn") === "true";
  isLoggedIn.value = logged;

  if (logged) {
    const userAccount = JSON.parse(localStorage.getItem("userAccount") || "{}");
    userName.value = userAccount.name || "User";
  }
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userAccount");
  isLoggedIn.value = false;
  showUserMenu.value = false;
  showMobileMenu.value = false;
  router.push("/");
};

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push("/search");
  }
};

// Close user menu when clicking outside
if (typeof window !== "undefined") {
  window.addEventListener("click", (e) => {
    const userMenu = document.querySelector(".user-menu");
    if (userMenu && !userMenu.contains(e.target)) {
      showUserMenu.value = false;
    }
  });
}
</script>

<style>
/* Global resets for the new design system */
body {
  margin: 0;
  padding: 0;
  background: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-sans);
}

.main-content {
  min-height: calc(100vh - 80px);
}
</style>

<style scoped>
.nav-main {
  background: white;
  color: var(--color-text);
  padding: 12px 0;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--border);
}

.nav-main .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--color-primary);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.nav-center {
  flex: 1;
  max-width: 500px;
  margin: 0 48px;
}

.search-bar {
  display: flex;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 4px 12px;
  transition: var(--transition);
}

.search-bar:focus-within {
  background: white;
  box-shadow: 0 0 0 2px var(--color-primary);
}

.search-bar input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 8px;
  font-size: 0.9rem;
  color: var(--color-text);
}

.search-bar input:focus {
  outline: none;
}

.search-submit {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 16px;
  align-items: center;
}

.nav-link {
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.9rem;
  transition: var(--transition);
}

.nav-link:hover {
  color: var(--color-primary);
}

.btn-signup {
  background: var(--color-primary);
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
}

.btn-signup:hover {
  opacity: 0.9;
}

.user-menu {
  position: relative;
}

.user-avatar-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f1f5f9;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  color: var(--color-text);
}

.icon-nav {
  width: 20px;
  height: 20px;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  min-width: 220px;
  border: 1px solid var(--border);
  overflow: hidden;
}

.dropdown-item {
  display: block;
  padding: 12px 20px;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
}

.dropdown-item:hover {
  background: var(--color-background);
  color: var(--color-primary);
}

.logout-btn {
  width: 100%;
  border: none;
  text-align: left;
  border-top: 1px solid var(--border);
  color: #ef4444;
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
}

@media (max-width: 900px) {
  .nav-center,
  .nav-links {
    display: none;
  }
  .nav-toggle {
    display: block;
  }
}
</style>
