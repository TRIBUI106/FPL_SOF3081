<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Khám phá Thế giới Công nghệ</h1>
        <p class="hero-subtitle">
          Cộng đồng chia sẻ kiến thức về lập trình, web development và công nghệ
          hiện đại
        </p>
        <div class="hero-buttons">
          <router-link to="/register" class="btn btn-primary btn-lg"
            >Bắt đầu ngay</router-link
          >
          <a href="#posts" class="btn btn-secondary btn-lg">Khám phá</a>
        </div>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="filter-section">
      <div class="container text-center">
        <h3 class="mb-4">Danh mục</h3>
        <div class="category-tags">
          <button
            v-for="category in categories"
            :key="category"
            @click="
              selectedCategory = selectedCategory === category ? '' : category
            "
            :class="['tag', { 'tag-active': selectedCategory === category }]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stat-item">
          <div class="stat-number">{{ allPosts.length }}+</div>
          <div class="stat-label">Bài viết</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">
            {{ Math.floor(Math.random() * 5000) + 1000 }}
          </div>
          <div class="stat-label">Độc giả hàng tháng</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">
            {{ Math.floor(Math.random() * 500) + 100 }}
          </div>
          <div class="stat-label">Thành viên cộng đồng</div>
        </div>
      </div>
    </section>

    <!-- Posts Section -->
    <section class="posts-section" id="posts">
      <div class="container">
        <h2 class="section-title">Bài viết mới nhất</h2>
        <div v-if="filteredPosts.length > 0" class="row cols-3">
          <router-link
            v-for="post in filteredPosts"
            :key="post.id"
            :to="`/post/${post.id}`"
            class="post-card-link"
          >
            <article class="card post-card">
              <div class="card-image">
                <img :src="post.image" :alt="post.title" loading="lazy" />
                <span class="badge badge-primary">{{ post.category }}</span>
              </div>
              <div class="card-body">
                <h3 class="post-title">{{ post.title }}</h3>
                <p class="post-excerpt">{{ post.content.substring(0, 150) }}...</p>
                <footer class="post-footer">
                  <div class="post-meta">
                    <span class="post-date">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      {{ formatDate(post.date) }}
                    </span>
                    <span class="reading-time">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {{ estimateReadTime(post.content) }} phút
                    </span>
                  </div>
                  <span class="read-link">Đọc tiếp →</span>
                </footer>
              </div>
            </article>
          </router-link>
        </div>
        <div v-else class="no-posts">
          <div class="empty-state">
            <span class="empty-icon">📭</span>
            <p>Không có bài viết nào trong danh mục này</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2>Đăng ký nhận tin</h2>
          <p>
            Nhận các bài viết mới nhất và kiến thức hữu ích trực tiếp vào email
          </p>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <input
              v-model="emailNewsletter"
              type="email"
              class="input-newsletter"
              placeholder="Nhập email của bạn..."
              required
            />
            <button type="submit" class="btn btn-primary">Đăng ký</button>
          </form>
          <p
            v-if="newsletterMessage"
            :class="['newsletter-message', newsletterStatus]"
          >
            {{ newsletterMessage }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { posts } from "../data/posts.js";

const router = useRouter();
const selectedCategory = ref("");
const emailNewsletter = ref("");
const newsletterMessage = ref("");
const newsletterStatus = ref("");

const categories = ["Vue.js", "CSS", "JavaScript", "Web Design", "Backend"];

const allPosts = ref(posts);

const filteredPosts = computed(() => {
  if (!selectedCategory.value) {
    return allPosts.value;
  }
  return allPosts.value.filter((post) => post.category === selectedCategory.value);
});

const formatDate = (date) => {
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const estimateReadTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const subscribeNewsletter = () => {
  if (emailNewsletter.value) {
    newsletterMessage.value = "Cảm ơn bạn đã đăng ký!";
    newsletterStatus.value = "success";
    emailNewsletter.value = "";
    setTimeout(() => {
      newsletterMessage.value = "";
    }, 3000);
  }
};
</script>

<style scoped>
.hero {
  background: var(--color-primary);
  color: white;
  padding: 120px 0;
  text-align: center;
  margin-bottom: 64px;
  position: relative;
  overflow: hidden;
}

.hero::after {
  content: "";
  position: absolute;
  top: -20%;
  right: -10%;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  margin-bottom: 24px;
  color: white;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 48px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
}

.hero-buttons {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-secondary {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.btn-secondary:hover {
  background: white;
  color: var(--color-primary);
}

.filter-section {
  padding: 64px 0;
  background: white;
  border-bottom: 1px solid var(--border);
}

.category-tags {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.tag {
  padding: 12px 24px;
  border: 1px solid var(--border);
  background: white;
  border-radius: 30px;
  cursor: pointer;
  transition: var(--transition);
  font-weight: 600;
  color: var(--color-text);
}

.tag:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
}

.tag-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.stats-section {
  background: var(--color-text);
  color: white;
  padding: 80px 0;
}

.stats-section .container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 48px;
  text-align: center;
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 8px;
  color: var(--color-cta);
  line-height: 1;
}

.stat-label {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.posts-section {
  padding: 80px 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 48px;
  text-align: center;
  color: var(--color-text);
}

.post-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: var(--transition);
}

.post-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: var(--transition);
}

.post-card-link:hover .post-card {
  transform: translateY(-8px);
}

.card-image {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 500ms ease;
}

.post-card:hover .card-image img {
  transform: scale(1.05);
}

.card-image .badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.card-body {
  padding: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.3;
  color: var(--color-text);
}

.post-excerpt {
  color: #64748b;
  margin-bottom: 24px;
  line-height: 1.7;
  flex: 1;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.post-meta {
  display: flex;
  gap: 16px;
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
}

.post-date,
.reading-time {
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  width: 16px;
  height: 16px;
}

.read-link {
  color: var(--color-primary);
  font-weight: 700;
  transition: var(--transition);
}

.read-link:hover {
  transform: translateX(4px);
}

.newsletter-section {
  background: var(--color-primary);
  padding: 100px 0;
  color: white;
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.newsletter-content h2 {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 24px;
  color: white;
}

.newsletter-content p {
  font-size: 1.25rem;
  margin-bottom: 48px;
  color: rgba(255, 255, 255, 0.9);
}

.newsletter-form {
  display: flex;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
}

.input-newsletter {
  flex: 1;
  border-radius: 30px;
  border: none;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
}

.input-newsletter::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input-newsletter:focus {
  background: rgba(255, 255, 255, 0.2);
  outline: 2px solid white;
}

.newsletter-form .btn-primary {
  background: white;
  color: var(--color-primary);
  border-radius: 30px;
}

@media (max-width: 768px) {
  .hero {
    padding: 80px 0;
  }
  .newsletter-form {
    flex-direction: column;
  }
  .newsletter-form .btn {
    width: 100%;
  }
}
</style>
