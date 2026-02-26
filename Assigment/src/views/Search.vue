<template>
  <div class="search-wrapper">
    <!-- Search Header -->
    <div class="search-header">
      <div class="search-container">
        <h1 class="search-title">Khám phá nội dung</h1>
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm bài viết, tag, tác giả..."
            class="input search-input"
            @keyup.enter="performSearch"
          />
          <button @click="performSearch" class="btn btn-primary search-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon-sm"
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
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <h3 class="filter-header">Bộ lọc</h3>
      <div class="filter-group">
        <label class="filter-label">Danh mục</label>
        <div class="filter-options">
          <button
            v-for="category in categories"
            :key="category"
            class="filter-btn"
            :class="{ active: selectedCategory === category }"
            @click="
              selectedCategory === category
                ? (selectedCategory = '')
                : (selectedCategory = category)
            "
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
          Tìm thấy {{ filteredPosts.length }} kết quả
          <span v-if="searchQuery" class="search-term"
            >cho "{{ searchQuery }}"</span
          >
        </h2>
        <h2 v-else>Không tìm thấy kết quả nào</h2>
      </div>

      <!-- Results Grid -->
      <div class="results-grid row cols-3">
        <ScrollReveal 
          v-for="post in filteredPosts" 
          :key="post.id"
        >
          <PostCard :post="post" />
        </ScrollReveal>
      </div>

      <!-- Empty State -->
      <div v-if="!searchPerformed" class="empty-state">
        <div class="empty-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon-empty"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <h3>Bắt đầu tìm kiếm</h3>
        <p>Nhập từ khóa để tìm các bài viết bạn quan tâm</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { posts as defaultPosts } from "../data/posts.js";
import { getPosts } from "../data/postStore.js";
import PostCard from "../components/PostCard.vue";
import ScrollReveal from "../components/ScrollReveal.vue";

const searchQuery = ref("");
const searchPerformed = ref(false);
const selectedCategory = ref("");
const sortBy = ref("recent");

const categories = ["Vue.js", "CSS", "JavaScript", "Web Design", "Backend"];

const allPosts = computed(() => getPosts() || defaultPosts);

const filteredPosts = computed(() => {
  let results = allPosts.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    results = results.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  // Filter by category
  if (selectedCategory.value) {
    results = results.filter(
      (post) => post.category === selectedCategory.value,
    );
  }

  // Sort
  if (sortBy.value === "popular") {
    results = [...results].sort(() => Math.random() - 0.5); // Simulated popularity
  } else if (sortBy.value === "oldest") {
    results = [...results].sort((a, b) => new Date(a.date) - new Date(b.date));
  } else {
    results = [...results].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return results;
});

const formatDate = (date) => {
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
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
.search-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.search-header {
  margin-bottom: 64px;
}

.search-title {
  font-size: 3rem;
  font-weight: 900;
  color: var(--color-text);
  margin-bottom: 32px;
  letter-spacing: -0.02em;
}

.search-box {
  display: flex;
  gap: 16px;
}

.search-input {
  flex: 1;
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
}

.filters-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 64px;
  padding: 32px;
  background: white;
  border-radius: 20px;
  border: 1px solid var(--border);
}

.filter-header {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
  letter-spacing: 0.05em;
}

.filter-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  border-radius: 99px;
  border: 1px solid var(--border);
  background: white;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-btn.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.filter-select {
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  font-weight: 700;
  max-width: 200px;
}

.results-info {
  margin-bottom: 32px;
}

.results-info h2 {
  font-size: 1.5rem;
  font-weight: 800;
}

.empty-state {
  text-align: center;
}

.empty-state {
  text-align: center;
  padding: 80px 0;
}
</style>
