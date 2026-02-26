<template>
  <div v-if="post" class="post-wrapper">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-link">Trang chủ</router-link>
      <span class="breadcrumb-sep">/</span>
      <router-link to="/" class="breadcrumb-link">Bài viết</router-link>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-active">{{ post.title }}</span>
    </div>

    <!-- Post Header -->
    <div class="post-header">
      <div class="post-category-badge">{{ post.category }}</div>
      <h1 class="post-title">{{ post.title }}</h1>

      <div class="post-meta-section">
        <div class="author-info">
          <img :src="authorAvatar" :alt="post.author" class="author-avatar" />
          <div class="author-details">
            <p class="author-name">{{ post.author }}</p>
            <p class="post-date">
              {{ formatDate(post.date) }} • {{ estimateReadTime() }} phút đọc
            </p>
          </div>
        </div>
        <div class="post-actions">
          <button
            class="action-btn"
            @click="toggleBookmark"
            :class="{ active: isBookmarked }"
          >
            <svg
              v-if="!isBookmarked"
              xmlns="http://www.w3.org/2000/svg"
              class="icon-sm"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
              ></path>
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="icon-sm"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
              ></path>
            </svg>
            Lưu
          </button>
          <button class="action-btn" @click="showShareMenu = !showShareMenu">
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
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            Chia sẻ
          </button>
        </div>
      </div>

      <!-- Share Menu -->
      <div v-if="showShareMenu" class="share-menu">
        <button class="share-btn facebook-btn">Facebook</button>
        <button class="share-btn twitter-btn">Twitter</button>
        <button class="share-btn linkedin-btn">LinkedIn</button>
        <button class="share-btn copy-btn" @click="copyToClipboard">
          Sao chép liên kết
        </button>
      </div>
    </div>

    <!-- Featured Image -->
    <div class="post-image-wrapper">
      <img
        v-if="post.image"
        :src="post.image"
        :alt="post.title"
        class="post-image"
        loading="lazy"
      />
    </div>

    <!-- Post Content -->
    <article class="post-content">
      <div class="content-text">
        <p>{{ post.content }}</p>
      </div>

      <!-- Tags -->
      <div class="post-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </article>

    <!-- Related Posts -->
    <section class="related-posts" v-if="relatedPosts.length > 0">
      <h2 class="section-title">Bài viết liên quan</h2>
      <div class="related-posts-grid">
        <article
          v-for="relatedPost in relatedPosts"
          :key="relatedPost.id"
          class="related-post-card"
        >
          <div class="related-post-image">
            <img :src="relatedPost.image" :alt="relatedPost.title" />
          </div>
          <div class="related-post-content">
            <h4>{{ relatedPost.title }}</h4>
            <p class="related-post-date">{{ formatDate(relatedPost.date) }}</p>
            <router-link :to="`/post/${relatedPost.id}`" class="read-more"
              >Đọc tiếp →</router-link
            >
          </div>
        </article>
      </div>
    </section>

    <!-- Comments Section -->
    <section class="comments-section">
      <h2 class="section-title">Bình luận ({{ comments.length }})</h2>

      <!-- Comment Form -->
      <div v-if="isLoggedIn" class="comment-form">
        <textarea
          v-model="newComment"
          placeholder="Viết bình luận của bạn..."
          rows="4"
          class="comment-textarea"
        ></textarea>
        <div class="comment-form-actions">
          <button
            @click="addComment"
            class="btn btn-primary"
            :disabled="!newComment.trim()"
          >
            Gửi bình luận
          </button>
        </div>
      </div>
      <div v-else class="login-prompt">
        <p>
          Vui lòng
          <router-link to="/login" class="text-link">đăng nhập</router-link> để
          viết bình luận
        </p>
      </div>

      <!-- Comments List -->
      <div class="comments-list">
        <article
          v-for="(comment, index) in comments"
          :key="index"
          class="comment-card"
        >
          <div class="comment-avatar">
            <img
              :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.username}`"
              :alt="comment.username"
            />
          </div>
          <div class="comment-body">
            <div class="comment-header">
              <strong class="comment-author">{{ comment.username }}</strong>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
            <p class="comment-text">{{ comment.text }}</p>
            <div class="comment-actions">
              <button class="comment-action">Thích</button>
              <button class="comment-action">Trả lời</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
  <div v-else class="not-found">
    <h2>Không tìm thấy bài viết</h2>
    <p>Bài viết bạn tìm kiếm không tồn tại.</p>
    <router-link to="/" class="btn btn-primary">Quay lại trang chủ</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { posts as defaultPosts } from "../data/posts.js";
import { getPosts } from "../data/postStore.js";

const route = useRoute();
const router = useRouter();
const post = ref(null);
const newComment = ref("");
const isLoggedIn = ref(localStorage.getItem("isLoggedIn") === "true");
const isBookmarked = ref(false);
const showShareMenu = ref(false);

const allPosts = computed(() => getPosts() || defaultPosts);

const currentUserName = computed(() => {
  const userData = JSON.parse(localStorage.getItem("userAccount") || "{}");
  return userData.name || "Người dùng";
});

const currentUserAvatar = computed(() => {
  const userData = JSON.parse(localStorage.getItem("userAccount") || "{}");
  return (
    userData.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUserName.value}`
  );
});

const authorAvatar = computed(() => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.value?.author || "admin"}`;
});

const comments = ref([
  {
    username: "Nguyễn Văn A",
    time: "2 giờ trước",
    text: "Bài viết rất hữu ích! Cảm ơn bạn đã chia sẻ kiến thức này. Tôi sẽ thử áp dụng ngay.",
  },
  {
    username: "Trần Thị B",
    time: "1 giờ trước",
    text: "Có thể bạn giải thích thêm phần này được không? Tôi muốn hiểu rõ hơn.",
  },
]);

const relatedPosts = computed(() => {
  if (!post.value) return [];
  return allPosts.value.filter(
    (p) => p.category === post.value.category && p.id !== post.value.id
  );
});

const formatDate = (date) => {
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date || new Date());
};

const estimateReadTime = () => {
  if (!post.value) return 0;
  const wordCount = post.value.content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200)); // Average reading speed: 200 words per minute
};

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;
};

const copyToClipboard = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert("📋 Đã sao chép liên kết!");
  });
};

const addComment = () => {
  if (!newComment.value.trim()) return;

  comments.value.unshift({
    username: currentUserName.value,
    time: "vừa xong",
    text: newComment.value,
  });

  newComment.value = "";
};

const loadPost = () => {
  const postId = parseInt(route.params.id);
  const foundPost = allPosts.value.find((p) => p.id === postId);
  if (foundPost) {
    post.value = foundPost;
    window.scrollTo(0, 0);
  } else {
    post.value = null;
  }
};

onMounted(loadPost);
watch(() => route.params.id, loadPost);
</script>

<style scoped>
.post-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
}

.breadcrumb {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  font-size: 0.875rem;
  font-weight: 600;
}

.breadcrumb-link {
  color: #64748b;
  text-decoration: none;
  transition: var(--transition);
}

.breadcrumb-link:hover {
  color: var(--color-primary);
}

.breadcrumb-sep {
  color: #cbd5e1;
}

.breadcrumb-active {
  color: var(--color-text);
}

.post-header {
  margin-bottom: 40px;
}

.post-category-badge {
  display: inline-block;
  padding: 6px 16px;
  background: var(--color-primary);
  color: white;
  border-radius: 99px;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.post-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  line-height: 1.1;
  color: var(--color-text);
  margin-bottom: 32px;
  letter-spacing: -0.02em;
}

.post-meta-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
  gap: 24px;
  flex-wrap: wrap;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-weight: 800;
  color: var(--color-text);
}

.post-date {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 4px;
}

.post-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  font-weight: 700;
  color: var(--color-text);
  cursor: pointer;
  transition: var(--transition);
}

.action-btn:hover {
  background: #f8fafc;
  border-color: var(--color-primary);
}

.icon-sm {
  width: 18px;
  height: 18px;
}

.post-image-wrapper {
  margin-bottom: 48px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.post-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.post-content {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--color-text);
}

.post-content p {
  margin-bottom: 32px;
}

.post-tags {
  display: flex;
  gap: 8px;
  margin-top: 64px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
}

.tag {
  padding: 6px 12px;
  background: var(--color-background);
  color: var(--color-primary);
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.875rem;
}

.related-posts {
  margin-top: 80px;
  padding: 48px;
  background: white;
  border-radius: 24px;
  border: 1px solid var(--border);
}

.related-posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.related-post-card {
  text-decoration: none;
  color: inherit;
}

.related-post-image img {
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 16px;
}

.related-post-content h4 {
  font-size: 1.125rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.comments-section {
  margin-top: 80px;
}

.comment-form {
  margin-bottom: 48px;
}

.comment-textarea {
  width: 100%;
  padding: 24px;
  background: #f1f5f9;
  border: 2px solid transparent;
  border-radius: 16px;
  font-size: 1.1rem;
  transition: var(--transition);
  margin-bottom: 16px;
}

.comment-textarea:focus {
  background: white;
  border-color: var(--color-primary);
  outline: none;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.comment-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
}

.comment-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.comment-author {
  font-weight: 800;
  color: var(--color-text);
  margin-right: 12px;
}

.comment-time {
  font-size: 0.875rem;
  color: #64748b;
}

.comment-text {
  margin-top: 8px;
  line-height: 1.6;
}

.comment-actions {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}

.comment-action {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
}

@media (max-width: 640px) {
  .post-wrapper {
    padding: 24px 16px;
  }
  .post-meta-section {
    flex-direction: column;
    align-items: flex-start;
  }
  .related-posts {
    padding: 24px;
  }
}
/* Not Found */
.not-found {
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  text-align: center;
}

.not-found h2 {
  font-size: 1.8rem;
  color: #1e3c72;
  margin-bottom: 1rem;
}

.not-found p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.btn-back {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-back:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(42, 82, 152, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .post-wrapper {
    padding: 1.5rem 1rem;
  }

  .post-title {
    font-size: 1.6rem;
  }

  .post-meta-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .post-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .post-image {
    height: 250px;
  }

  .related-posts-grid {
    grid-template-columns: 1fr 1fr;
  }

  .comment-card {
    gap: 0.75rem;
  }
}

@media (max-width: 640px) {
  .post-title {
    font-size: 1.4rem;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .post-meta-section {
    padding: 1rem;
  }

  .post-image {
    height: 200px;
  }

  .related-posts-grid {
    grid-template-columns: 1fr;
  }

  .action-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }

  .breadcrumb {
    font-size: 0.8rem;
  }

  .breadcrumb-active {
    max-width: 150px;
  }
}
</style>
