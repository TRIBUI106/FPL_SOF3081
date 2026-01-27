<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">🚀 Khám phá Thế giới Công nghệ</h1>
        <p class="hero-subtitle">Cộng đồng chia sẻ kiến thức về lập trình, web development và công nghệ hiện đại</p>
        <div class="hero-buttons">
          <router-link to="/register" class="btn btn-primary btn-lg">🔥 Bắt đầu ngay</router-link>
          <a href="#posts" class="btn btn-outline btn-lg">📖 Khám phá</a>
        </div>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="filter-section">
      <div class="container">
        <h3>📚 Danh mục</h3>
        <div class="category-tags">
          <button 
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = selectedCategory === category ? '' : category"
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
          <div class="stat-number">{{ posts.length }}+</div>
          <div class="stat-label">Bài viết</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ Math.floor(Math.random() * 5000) + 1000 }}</div>
          <div class="stat-label">Độc giả hàng tháng</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ Math.floor(Math.random() * 500) + 100 }}</div>
          <div class="stat-label">Thành viên cộng đồng</div>
        </div>
      </div>
    </section>

    <!-- Posts Section -->
    <section class="posts-section" id="posts">
      <div class="container">
        <h2>✨ Bài viết mới nhất</h2>
        <div v-if="filteredPosts.length > 0" class="row cols-3">
          <article v-for="post in filteredPosts" :key="post.id" class="card post-card">
            <div class="card-image">
              <img :src="post.image" :alt="post.title" loading="lazy">
              <span class="badge badge-primary">{{ post.category }}</span>
              <div class="post-overlay">
                <router-link :to="`/post/${post.id}`" class="read-more-btn">Đọc tiếp →</router-link>
              </div>
            </div>
            <div class="card-body">
              <h3>{{ post.title }}</h3>
              <p class="post-excerpt">{{ post.content }}</p>
              <footer class="post-footer">
                <div class="post-meta">
                  <span class="post-date">📅 {{ formatDate(post.date) }}</span>
                  <span class="reading-time">⏱️ {{ estimateReadTime(post.content) }} phút</span>
                </div>
                <router-link :to="`/post/${post.id}`" class="read-link">Đọc → </router-link>
              </footer>
            </div>
          </article>
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
          <h2>📬 Đăng ký nhận tin</h2>
          <p>Nhận các bài viết mới nhất và kiến thức hữu ích trực tiếp vào email</p>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <input 
              v-model="emailNewsletter"
              type="email" 
              placeholder="Nhập email của bạn..."
              required
            >
            <button type="submit" class="btn btn-primary">Đăng ký</button>
          </form>
          <p v-if="newsletterMessage" :class="['newsletter-message', newsletterStatus]">
            {{ newsletterMessage }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const selectedCategory = ref('');
const emailNewsletter = ref('');
const newsletterMessage = ref('');
const newsletterStatus = ref('');

const categories = ['Vue.js', 'CSS', 'JavaScript', 'Web Design', 'Backend'];

const posts = ref([
  {
    id: 1,
    title: 'Học Vue.js từ cơ bản đến nâng cao',
    content: 'Hướng dẫn chi tiết về Template Syntax, Data Binding và Reactivity dành cho người mới bắt đầu học Vue.js',
    category: 'Vue.js',
    date: new Date('2026-01-23'),
    image: new URL('../img/Image.jpeg', import.meta.url).href,
  },
  {
    id: 2,
    title: 'Thành thạo CSS - Tạo layout responsive',
    content: 'Học cách tạo các layout đẹp mắt và responsive với các kỹ thuật CSS hiện đại như Flexbox và Grid',
    category: 'CSS',
    date: new Date('2026-01-22'),
    image: new URL('../img/anh1.png', import.meta.url).href,
  },
  {
    id: 3,
    title: 'Vue Router và Hệ thống xác thực',
    content: 'Xây dựng hệ thống đăng nhập và bảo vệ các routes quan trọng trong ứng dụng Vue của bạn',
    category: 'Vue.js',
    date: new Date('2026-01-21'),
    image: new URL('../img/anh2.png', import.meta.url).href,
  },
  {
    id: 4,
    title: 'JavaScript ES6+ Tính năng mới',
    content: 'Khám phá các tính năng mới trong JavaScript ES6+ giúp viết code sạch và hiệu quả hơn',
    category: 'JavaScript',
    date: new Date('2026-01-20'),
    image: new URL('../img/Image.jpeg', import.meta.url).href,
  },
  {
    id: 5,
    title: 'Thiết kế Web hiện đại với UX tốt',
    content: 'Những nguyên tắc thiết kế web hiện đại để tạo ra trải nghiệm người dùng tuyệt vời',
    category: 'Web Design',
    date: new Date('2026-01-19'),
    image: new URL('../img/anh1.png', import.meta.url).href,
  },
  {
    id: 6,
    title: 'Backend Development với Node.js',
    content: 'Xây dựng API backend mạnh mẽ với Node.js và Express.js',
    category: 'Backend',
    date: new Date('2026-01-18'),
    image: new URL('../img/anh2.png', import.meta.url).href,
  },
]);

const filteredPosts = computed(() => {
  if (!selectedCategory.value) {
    return posts.value;
  }
  return posts.value.filter(post => post.category === selectedCategory.value);
});

const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const estimateReadTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const subscribeNewsletter = () => {
  if (emailNewsletter.value) {
    newsletterMessage.value = 'Cảm ơn bạn đã đăng ký!';
    newsletterStatus.value = 'success';
    emailNewsletter.value = '';
    setTimeout(() => {
      newsletterMessage.value = '';
    }, 3000);
  }
};
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, rgba(30, 60, 114, 0.9) 0%, rgba(42, 82, 152, 0.9) 100%),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23fff" stroke-width="0.5" opacity="0.05"/></pattern></defs><rect width="1200" height="600" fill="%231e3c72"/><rect width="1200" height="600" fill="url(%23grid)"/></svg>');
  color: white;
  padding: 6rem 0;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%);
  animation: float 6s ease-in-out infinite;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -5%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100, 200, 255, 0.1) 0%, transparent 70%);
  animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(30px); }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 800;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: slideInDown 500ms ease;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: slideInUp 500ms ease;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: slideInUp 700ms ease;
}

.btn-outline {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.btn-outline:hover {
  background: white;
  color: #1e3c72;
  font-weight: 600;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-section {
  background: var(--light);
  padding: 2.5rem 0;
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--border);
}

.filter-section h3 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--dark);
}

.category-tags {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.tag {
  padding: 0.6rem 1.5rem;
  border: 2px solid var(--border);
  background: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all var(--transition);
  font-weight: 500;
  color: var(--dark);
}

.tag:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-2px);
}

.tag-active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
}

.stats-section {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 3rem 0;
  margin-bottom: 3rem;
}

.stats-section .container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-item {
  padding: 2rem 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ff6b6b, #ffd93d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.posts-section {
  padding: 2rem 0 3rem;
}

.posts-section .container {
  padding: 0 1rem;
}

.posts-section h2 {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  padding-bottom: 1.5rem;
}

.posts-section h2::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #0d6efd, #ff6b6b);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.post-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: var(--radius);
  transition: all var(--transition);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: var(--light);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 300ms ease;
}

.post-card:hover .card-image img {
  transform: scale(1.1);
}

.post-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition);
}

.post-card:hover .post-overlay {
  opacity: 1;
}

.read-more-btn {
  background: var(--primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition);
  display: inline-block;
}

.read-more-btn:hover {
  background: #0a58ca;
  transform: scale(1.05);
}

.card-image .badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.card-body h3 {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  color: var(--dark);
}

.post-excerpt {
  flex: 1;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: var(--secondary);
  line-height: 1.6;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.post-meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.85rem;
  color: var(--secondary);
}

.post-date, .reading-time {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.read-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition);
}

.read-link:hover {
  color: #0a58ca;
  transform: translateX(5px);
}

.no-posts {
  text-align: center;
  padding: 4rem 0;
}

.empty-state {
  color: var(--secondary);
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.newsletter-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  margin-top: 4rem;
}

.newsletter-content {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

.newsletter-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: white;
}

.newsletter-content p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

.newsletter-form {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.newsletter-form input {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.95rem;
}

.newsletter-form input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-form input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.newsletter-form .btn {
  white-space: nowrap;
  background: white;
  color: #667eea;
  font-weight: 600;
}

.newsletter-form .btn:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
}

.newsletter-message {
  font-size: 0.95rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
}

.newsletter-message.success {
  background: rgba(25, 135, 84, 0.3);
  color: rgba(255, 255, 255, 0.95);
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .btn-lg {
    width: 100%;
  }

  .stats-section .container {
    grid-template-columns: 1fr;
  }

  .post-card {
    margin-bottom: 2rem;
  }

  .category-tags {
    gap: 0.5rem;
  }

  .tag {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>