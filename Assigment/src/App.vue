<template>
  <nav class="nav-main">
    <div class="container">
      <div class="nav-logo">
        <router-link to="/" class="nav-brand">
          <span class="logo-icon">📚</span>
          <span class="logo-text">TechBlog</span>
        </router-link>
      </div>
      
      <div class="nav-center">
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="🔍 Tìm kiếm bài viết..."
            @input="searchQuery = $event.target.value"
          >
        </div>
      </div>

      <div class="nav-links">
        <router-link 
          v-if="!isLoggedIn"
          to="/login" 
          class="nav-link"
        >
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
            <span class="avatar">👤</span>
            <span class="username">{{ userName }}</span>
            <span class="dropdown-arrow">▼</span>
          </button>
          
          <div v-if="showUserMenu" class="dropdown-menu">
            <router-link to="/profile" class="dropdown-item">
              👤 Hồ sơ
            </router-link>
            <router-link to="/my-posts" class="dropdown-item">
              📝 Bài viết của tôi
            </router-link>
            <button @click="handleLogout" class="dropdown-item logout-btn">
              🚪 Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <button class="nav-toggle" @click="showMobileMenu = !showMobileMenu">
        ☰
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="showMobileMenu" class="mobile-menu">
      <div class="search-bar mb-3">
        <input 
          type="text" 
          placeholder="🔍 Tìm kiếm..."
          @input="searchQuery = $event.target.value"
        >
      </div>
      <router-link to="/" class="mobile-link" @click="showMobileMenu = false">Trang chủ</router-link>
      <router-link v-if="!isLoggedIn" to="/login" class="mobile-link" @click="showMobileMenu = false">Đăng nhập</router-link>
      <router-link v-if="!isLoggedIn" to="/register" class="mobile-link" @click="showMobileMenu = false">Đăng ký</router-link>
      <router-link v-if="isLoggedIn" to="/profile" class="mobile-link" @click="showMobileMenu = false">Hồ sơ</router-link>
      <button v-if="isLoggedIn" @click="handleLogout" class="mobile-link logout-btn">Đăng xuất</button>
    </div>
  </nav>

  <main class="main-content">
    <router-view></router-view>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);
const userName = ref('User');
const showUserMenu = ref(false);
const showMobileMenu = ref(false);
const searchQuery = ref('');

onMounted(() => {
  checkLoginStatus();
});

const checkLoginStatus = () => {
  const logged = localStorage.getItem('isLoggedIn') === 'true';
  isLoggedIn.value = logged;
  
  if (logged) {
    const userAccount = JSON.parse(localStorage.getItem('userAccount') || '{}');
    userName.value = userAccount.name || 'User';
  }
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userAccount');
  isLoggedIn.value = false;
  showUserMenu.value = false;
  showMobileMenu.value = false;
  router.push('/');
};

// Close user menu when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    const userMenu = document.querySelector('.user-menu');
    if (userMenu && !userMenu.contains(e.target)) {
      showUserMenu.value = false;
    }
  });
}
</script>

<style scoped>
.nav-main {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 0.75rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-main .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem 1rem;
}

.nav-logo {
  flex-shrink: 0;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  transition: all var(--transition);
  cursor: pointer;
}

.logo-icon {
  font-size: 1.6rem;
  display: inline-block;
  animation: bounce 2s infinite;
}

.logo-text {
  background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-brand:hover {
  transform: scale(1.05);
}

.nav-brand:hover .logo-icon {
  animation: bounce 0.6s;
}

.nav-center {
  flex: 1;
  max-width: 400px;
}

.search-bar {
  position: relative;
}

.search-bar input {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  transition: all var(--transition);
}

.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-bar input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-shrink: 0;
}

.nav-link {
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  text-decoration: none;
  transition: all var(--transition);
  font-weight: 500;
  font-size: 0.9rem;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.btn-signup {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white !important;
  font-weight: 600;
}

.btn-signup:hover {
  background: linear-gradient(135deg, #ff5555 0%, #dd4560 100%);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.user-menu {
  position: relative;
}

.user-avatar-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all var(--transition);
  font-weight: 500;
  font-size: 0.9rem;
}

.user-avatar-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.avatar {
  font-size: 1.2rem;
  display: inline-block;
}

.dropdown-arrow {
  font-size: 0.6rem;
  transition: transform var(--transition);
}

.user-avatar-btn:hover .dropdown-arrow {
  transform: translateY(-2px);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  overflow: hidden;
  animation: slideDown 150ms ease;
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

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1.25rem;
  text-align: left;
  background: none;
  border: none;
  color: var(--dark);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition);
  font-size: 0.95rem;
  border-bottom: 1px solid var(--border);
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: var(--light);
  padding-left: 1.5rem;
}

.logout-btn {
  color: var(--danger);
  font-weight: 600;
}

.logout-btn:hover {
  background: rgba(220, 53, 69, 0.05);
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform var(--transition);
}

.nav-toggle:hover {
  transform: scale(1.1);
}

.mobile-menu {
  display: none;
  background: rgba(0, 0, 0, 0.95);
  padding: 1rem;
  animation: slideDown 200ms ease;
}

.mobile-link {
  display: block;
  color: white;
  padding: 0.75rem 1rem;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: background var(--transition);
}

.mobile-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.main-content {
  padding-top: 1rem;
  padding-bottom: 2rem;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@media (max-width: 900px) {
  .nav-center {
    display: none;
  }

  .nav-links {
    gap: 0.5rem;
  }
}

@media (max-width: 640px) {
  .nav-main .container {
    padding: 0.5rem;
  }

  .nav-logo {
    flex: 1;
  }

  .nav-link {
    display: none;
  }

  .nav-toggle {
    display: block;
  }

  .nav-links {
    display: none;
  }

  .mobile-menu {
    display: block;
  }

  .logo-text {
    display: none;
  }

  .nav-brand {
    font-size: 1.2rem;
  }
}
</style>