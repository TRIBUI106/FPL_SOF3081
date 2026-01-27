<template>
  <div class="search-wrapper">
    <!-- Search Header -->
    <div class="search-header">
      <div class="search-container">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Tìm kiếm bài viết, tag, tác giả..."
            class="search-input"
            @keyup.enter="performSearch"
          />
          <button @click="performSearch" class="search-btn">🔍 Tìm kiếm</button>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <h3>🎯 Bộ lọc</h3>
      <div class="filter-group">
        <label class="filter-label">Danh mục</label>
        <div class="filter-options">
          <button
            v-for="category in categories"
            :key="category"
            class="filter-btn"
            :class="{ active: selectedCategory === category }"
            @click="selectedCategory === category ? selectedCategory = '' : selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div class="filter-group">
        <label class="filter-label">Sắp xếp theo</label>
        <select v-model="sortBy" class="filter-select">
          <option value="recent">Mới nhất</option>
          <option value="popular">Phổ biến nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>
    </div>

    <!-- Search Results -->
    <div class="results-section">
      <div v-if="searchPerformed" class="results-info">
        <h2 v-if="filteredPosts.length > 0">
          📊 Tìm thấy {{ filteredPosts.length }} kết quả
          <span v-if="searchQuery" class="search-term">cho "{{ searchQuery }}"</span>
        </h2>
        <h2 v-else>😢 Không tìm thấy kết quả nào</h2>
      </div>

      <!-- Results Grid -->
      <div class="results-grid">
        <article v-for="post in filteredPosts" :key="post.id" class="result-card">
          <div class="result-image">
            <img :src="post.image" :alt="post.title" />
          </div>
          <div class="result-content">
            <div class="result-category">{{ post.category }}</div>
            <h3 class="result-title">{{ post.title }}</h3>
            <p class="result-excerpt">{{ post.content.substring(0, 120) }}...</p>
            <div class="result-meta">
              <span class="meta-item">📅 {{ formatDate(post.date) }}</span>
              <span class="meta-item">⏱️ {{ estimateReadTime(post.content) }} phút đọc</span>
            </div>
            <div class="result-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <router-link :to="`/post/${post.id}`" class="read-btn">Đọc tiếp →</router-link>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-if="!searchPerformed" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>Bắt đầu tìm kiếm</h3>
        <p>Nhập từ khóa để tìm các bài viết bạn quan tâm</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const searchPerformed = ref(false);
const selectedCategory = ref('');
const sortBy = ref('recent');

const categories = ['Vue.js', 'CSS', 'JavaScript', 'Web Design', 'Backend'];

const allPosts = ref([
  {
    id: 1,
    title: 'Bắt đầu với Vue.js',
    content: 'Vue.js là một framework JavaScript tiến bộ để xây dựng giao diện người dùng. Nó cung cấp ràng buộc dữ liệu, kiến trúc dựa trên thành phần và trải nghiệm phát triển tuyệt vời.',
    category: 'Vue.js',
    tags: ['Vue.js', 'JavaScript', 'Frontend', 'Tutorial'],
    date: new Date(),
    image: 'https://picsum.photos/400/250?random=1'
  },
  {
    id: 2,
    title: 'Các Best Practices trong Vue.js',
    content: 'Những thực hành tốt nhất sẽ giúp bạn viết mã sạch hơn, dễ bảo trì và có hiệu suất tốt hơn.',
    category: 'Vue.js',
    tags: ['Vue.js', 'Best Practices', 'Code Quality'],
    date: new Date(Date.now() - 86400000),
    image: 'https://picsum.photos/400/250?random=2'
  },
  {
    id: 3,
    title: 'CSS Grid vs Flexbox',
    content: 'So sánh chi tiết giữa CSS Grid và Flexbox để tìm ra giải pháp phù hợp cho dự án của bạn.',
    category: 'CSS',
    tags: ['CSS', 'Layout', 'Web Design'],
    date: new Date(Date.now() - 172800000),
    image: 'https://picsum.photos/400/250?random=3'
  },
  {
    id: 4,
    title: 'JavaScript ES6: Những tính năng phải biết',
    content: 'Khám phá những tính năng mới của ES6 như arrow function, const/let, classes và template literals.',
    category: 'JavaScript',
    tags: ['JavaScript', 'ES6', 'Programming'],
    date: new Date(Date.now() - 259200000),
    image: 'https://picsum.photos/400/250?random=4'
  },
  {
    id: 5,
    title: 'Thiết kế responsive: Hướng dẫn hoàn chỉnh',
    content: 'Học cách thiết kế website mà hoạt động tốt trên tất cả các thiết bị, từ mobile đến desktop.',
    category: 'Web Design',
    tags: ['Web Design', 'Responsive', 'Mobile-First'],
    date: new Date(Date.now() - 345600000),
    image: 'https://picsum.photos/400/250?random=5'
  },
  {
    id: 6,
    title: 'Node.js và Express.js cho người mới bắt đầu',
    content: 'Hướng dẫn từng bước để tạo server backend với Node.js và Express.js.',
    category: 'Backend',
    tags: ['Node.js', 'Express.js', 'Backend', 'JavaScript'],
    date: new Date(Date.now() - 432000000),
    image: 'https://picsum.photos/400/250?random=6'
  },
]);

const filteredPosts = computed(() => {
  let results = allPosts.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    results = results.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Filter by category
  if (selectedCategory.value) {
    results = results.filter(post => post.category === selectedCategory.value);
  }

  // Sort
  if (sortBy.value === 'popular') {
    results = [...results].sort(() => Math.random() - 0.5); // Simulated popularity
  } else if (sortBy.value === 'oldest') {
    results = [...results].sort((a, b) => new Date(a.date) - new Date(b.date));
  } else {
    results = [...results].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return results;
});

const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date || new Date());
};

const estimateReadTime = (content) => {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
};

const performSearch = () => {
  searchPerformed.value = true;
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.search-wrapper {
  min-height: calc(100vh - 80px);
  background: #f5f7fa;
}

/* Search Header */
.search-header {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 3rem 1rem;
  text-align: center;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  gap: 0.5rem;
  animation: slideDown 0.5s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
}

.search-btn {
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: white;
  color: #1e3c72;
  transform: translateY(-2px);
}

/* Filters Section */
.filters-section {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.filters-section h3 {
  margin-top: 0;
  color: #1e3c72;
  font-size: 1.1rem;
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-label {
  display: block;
  font-weight: 600;
  color: #1e3c72;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.filter-options {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.2rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  color: #333;
}

.filter-btn:hover {
  border-color: #2a5298;
  color: #2a5298;
}

.filter-btn.active {
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  border-color: transparent;
}

.filter-select {
  padding: 0.6rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  background: white;
  transition: border-color 0.3s ease;
  font-family: inherit;
}

.filter-select:focus {
  outline: none;
  border-color: #2a5298;
}

/* Results Section */
.results-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
}

.results-info {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.results-info h2 {
  margin: 0;
  color: #1e3c72;
  font-size: 1.3rem;
}

.search-term {
  color: #2a5298;
  font-weight: 700;
}

/* Results Grid */
.results-grid {
  display: grid;
  gap: 1.5rem;
}

.result-card {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.5rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.result-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.result-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.result-card:hover .result-image img {
  transform: scale(1.1);
}

.result-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.result-category {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  width: fit-content;
}

.result-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e3c72;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.result-excerpt {
  color: #666;
  font-size: 0.95rem;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.result-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.meta-item {
  font-size: 0.85rem;
  color: #999;
}

.result-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.tag {
  display: inline-block;
  padding: 0.3rem 0.7rem;
  background: #f0f4fa;
  color: #2a5298;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid #2a5298;
}

.read-btn {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  width: fit-content;
  transition: all 0.3s ease;
}

.read-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(42, 82, 152, 0.3);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #1e3c72;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #999;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .result-card {
    grid-template-columns: 1fr;
  }

  .result-image {
    height: 200px;
  }

  .search-box {
    flex-direction: column;
  }

  .search-btn {
    width: 100%;
  }

  .filter-options {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .result-meta {
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .search-header {
    padding: 2rem 1rem;
  }

  .search-input {
    font-size: 0.95rem;
  }

  .filters-section {
    padding: 1rem;
  }

  .result-title {
    font-size: 1.1rem;
  }

  .result-content {
    padding: 1rem;
  }

  .result-tags {
    margin-bottom: 0.75rem;
  }

  .result-meta {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
}
</style>
