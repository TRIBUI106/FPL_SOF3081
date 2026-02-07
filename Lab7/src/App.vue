<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold text-gradient mb-2">Lab 7: Event & Form Handling</h1>
      <p class="text-muted">Hệ thống bài tập thực hành Vue.js</p>
      <div class="header-underline mx-auto"></div>
    </div>

    <div class="nav-container shadow-sm p-2 mb-5 rounded-pill bg-white border">
      <ul class="nav nav-pills nav-justified gap-2">
        <li class="nav-item">
          <router-link to="/bai1" class="nav-link rounded-pill px-4 py-2 transition-all" active-class="active shadow-sm">
            <i class="bi bi-list-task me-2"></i>Bài 1
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/bai2" class="nav-link rounded-pill px-4 py-2 transition-all" active-class="active shadow-sm">
            <i class="bi bi-shield-lock me-2"></i>Bài 2
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/bai3" class="nav-link rounded-pill px-4 py-2 transition-all" active-class="active shadow-sm">
            <i class="bi bi-person-plus me-2"></i>Bài 3
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/bai4" class="nav-link rounded-pill px-4 py-2 transition-all" active-class="active shadow-sm">
            <i class="bi bi-chat-left-text me-2"></i>Bài 4
          </router-link>
        </li>
      </ul>
    </div>

    <div class="content-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
/* Import Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css");

/* Màu chữ Gradient */
.text-gradient {
  background: linear-gradient(45deg, #0d6efd, #0dcaf0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Đường gạch chân trang trí */
.header-underline {
  width: 80px;
  height: 5px;
  background: #0d6efd;
  border-radius: 10px;
}

/* Tùy chỉnh thanh điều hướng */
.nav-container {
  max-width: 800px;
  margin: 0 auto;
}

.nav-link {
  color: #6c757d;
  font-weight: 600;
  border: 1px solid transparent;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #0d6efd;
}

.nav-link.active {
  background-color: #0d6efd !important;
  color: white !important;
}

.transition-all {
  transition: all 0.3s ease;
}

/* Hiệu ứng chuyển cảnh giữa các bài (Transition) */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.content-wrapper {
  min-height: 400px;
}
</style>