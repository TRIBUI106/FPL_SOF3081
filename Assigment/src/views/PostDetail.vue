<template>
  <div v-if="post" class="post-wrapper">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-link">🏠 Trang chủ</router-link>
      <span class="breadcrumb-sep">/</span>
      <router-link to="/" class="breadcrumb-link">📰 Bài viết</router-link>
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
            <p class="author-name">👤 {{ post.author }}</p>
            <p class="post-date">📅 {{ formatDate(post.date) }} • ⏱️ {{ estimateReadTime() }} phút đọc</p>
          </div>
        </div>
        <div class="post-actions">
          <button class="action-btn" @click="toggleBookmark" :class="{ active: isBookmarked }">
            {{ isBookmarked ? '❤️' : '🤍' }} Lưu
          </button>
          <button class="action-btn" @click="showShareMenu = !showShareMenu">
            📤 Chia sẻ
          </button>
        </div>
      </div>

      <!-- Share Menu -->
      <div v-if="showShareMenu" class="share-menu">
        <button class="share-btn facebook-btn">Facebook</button>
        <button class="share-btn twitter-btn">Twitter</button>
        <button class="share-btn linkedin-btn">LinkedIn</button>
        <button class="share-btn copy-btn" @click="copyToClipboard">📋 Sao chép liên kết</button>
      </div>
    </div>

    <!-- Featured Image -->
    <div class="post-image-wrapper">
      <img v-if="post.image" :src="post.image" :alt="post.title" class="post-image" loading="lazy" />
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
      <h2 class="section-title">📚 Bài viết liên quan</h2>
      <div class="related-posts-grid">
        <article v-for="relatedPost in relatedPosts" :key="relatedPost.id" class="related-post-card">
          <div class="related-post-image">
            <img :src="relatedPost.image" :alt="relatedPost.title" />
          </div>
          <div class="related-post-content">
            <h4>{{ relatedPost.title }}</h4>
            <p class="related-post-date">{{ formatDate(relatedPost.date) }}</p>
            <router-link :to="`/post/${relatedPost.id}`" class="read-more">Đọc tiếp →</router-link>
          </div>
        </article>
      </div>
    </section>

    <!-- Comments Section -->
    <section class="comments-section">
      <h2 class="section-title">💬 Bình luận ({{ comments.length }})</h2>

      <!-- Comment Form -->
      <div v-if="isLoggedIn" class="comment-form">
        <div class="comment-form-header">
          <img :src="currentUserAvatar" :alt="currentUserName" class="form-avatar" />
          <span class="form-user-name">{{ currentUserName }}</span>
        </div>
        <textarea
          v-model="newComment"
          placeholder="Viết bình luận của bạn..."
          rows="4"
          class="comment-textarea"
        ></textarea>
        <div class="comment-form-actions">
          <button @click="addComment" class="btn-submit" :disabled="!newComment.trim()">
            💬 Gửi bình luận
          </button>
        </div>
      </div>
      <div v-else class="login-prompt">
        <p>👤 Vui lòng <router-link to="/login" class="text-link">đăng nhập</router-link> để viết bình luận</p>
      </div>

      <!-- Comments List -->
      <div class="comments-list">
        <article v-for="(comment, index) in comments" :key="index" class="comment-card">
          <div class="comment-avatar">
            <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.username}`" :alt="comment.username" />
          </div>
          <div class="comment-body">
            <div class="comment-header">
              <strong class="comment-author">{{ comment.username }}</strong>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
            <p class="comment-text">{{ comment.text }}</p>
            <div class="comment-actions">
              <button class="comment-action">👍 Thích</button>
              <button class="comment-action">💬 Trả lời</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
  <div v-else class="not-found">
    <h2>📄 Không tìm thấy bài viết</h2>
    <p>Bài viết bạn tìm kiếm không tồn tại.</p>
    <router-link to="/" class="btn-back">← Quay lại trang chủ</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const post = ref(null);
const newComment = ref('');
const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');
const isBookmarked = ref(false);
const showShareMenu = ref(false);

const currentUserName = computed(() => {
  const userData = JSON.parse(localStorage.getItem('userAccount') || '{}');
  return userData.name || 'Người dùng';
});

const currentUserAvatar = computed(() => {
  const userData = JSON.parse(localStorage.getItem('userAccount') || '{}');
  return userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUserName.value}`;
});

const authorAvatar = computed(() => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.value?.author || 'admin'}`;
});

const comments = ref([
  { 
    username: 'Nguyễn Văn A', 
    time: '2 giờ trước', 
    text: 'Bài viết rất hữu ích! Cảm ơn bạn đã chia sẻ kiến thức này. Tôi sẽ thử áp dụng ngay.' 
  },
  { 
    username: 'Trần Thị B', 
    time: '1 giờ trước', 
    text: 'Có thể bạn giải thích thêm phần này được không? Tôi muốn hiểu rõ hơn.' 
  },
]);

const relatedPosts = ref([
  {
    id: 2,
    title: 'Các Best Practices trong Vue.js',
    category: 'Vue.js',
    date: new Date(Date.now() - 86400000),
    image: 'https://picsum.photos/400/250?random=2'
  },
  {
    id: 3,
    title: 'CSS Grid vs Flexbox: So sánh chi tiết',
    category: 'CSS',
    date: new Date(Date.now() - 172800000),
    image: 'https://picsum.photos/400/250?random=3'
  },
  {
    id: 4,
    title: 'JavaScript ES6: Những tính năng phải biết',
    category: 'JavaScript',
    date: new Date(Date.now() - 259200000),
    image: 'https://picsum.photos/400/250?random=4'
  }
]);

const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date || new Date());
};

const estimateReadTime = () => {
  if (!post.value) return 0;
  const wordCount = post.value.content.split(/\s+/).length;
  return Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
};

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;
  const message = isBookmarked.value ? '❤️ Đã lưu bài viết' : '💔 Đã bỏ lưu bài viết';
  console.log(message);
};

const copyToClipboard = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert('📋 Đã sao chép liên kết!');
  });
};

const addComment = () => {
  if (!newComment.value.trim()) return;

  comments.value.unshift({
    username: currentUserName.value,
    time: 'vừa xong',
    text: newComment.value,
  });

  newComment.value = '';
};

onMounted(() => {
  const postId = route.params.id;
  post.value = {
    id: postId,
    title: 'Bắt đầu với Vue.js',
    content: 'Vue.js là một framework JavaScript tiến bộ để xây dựng giao diện người dùng. Nó cung cấp ràng buộc dữ liệu, kiến trúc dựa trên thành phần và trải nghiệm phát triển tuyệt vời. Trong hướng dẫn này, chúng ta sẽ khám phá những kiến thức cơ bản và xây dựng các ứng dụng tương tác.\n\nVue giúp dễ dàng tạo giao diện người dùng động và phản ứng với mã boilerplate tối thiểu. Framework này được thiết kế để có thể thích ứng dần dần, vì vậy bạn có thể sử dụng bao nhiêu hoặc bao ít tùy theo nhu cầu của mình.\n\nMột trong những lợi thế chính của Vue là cú pháp của nó đơn giản và dễ học. Nó kết hợp các khái niệm tốt nhất từ React và Angular trong khi vẫn duy trì tính độc lập của nó.',
    category: 'Vue.js',
    tags: ['Vue.js', 'JavaScript', 'Frontend', 'Tutorial'],
    image: `https://picsum.photos/800/400?random=${postId}`,
    date: new Date(),
    author: 'Nguyen Admin',
  };
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.post-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
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

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  flex-wrap: wrap;
}

.breadcrumb-link {
  color: #2a5298;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #1e3c72;
  text-decoration: underline;
}

.breadcrumb-sep {
  color: #ccc;
  margin: 0 0.25rem;
}

.breadcrumb-active {
  color: #666;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Post Header */
.post-header {
  margin-bottom: 2rem;
}

.post-category-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.post-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1e3c72;
  margin: 0 0 1.5rem 0;
  line-height: 1.3;
}

.post-meta-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2a5298;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.author-name {
  font-weight: 700;
  color: #1e3c72;
  margin: 0;
  font-size: 0.95rem;
}

.post-date {
  color: #999;
  font-size: 0.85rem;
  margin: 0;
}

.post-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  padding: 0.6rem 1.2rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  color: #333;
}

.action-btn:hover,
.action-btn.active {
  border-color: #2a5298;
  background: #f0f4fa;
  color: #2a5298;
  transform: translateY(-2px);
}

/* Share Menu */
.share-menu {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;
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

.share-btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  color: white;
}

.facebook-btn {
  background: #1877f2;
}

.facebook-btn:hover {
  background: #0a66c2;
}

.twitter-btn {
  background: #1da1f2;
}

.twitter-btn:hover {
  background: #1a8cd8;
}

.linkedin-btn {
  background: #0077b5;
}

.linkedin-btn:hover {
  background: #00669c;
}

.copy-btn {
  background: #6c757d;
}

.copy-btn:hover {
  background: #5a6268;
}

/* Post Image */
.post-image-wrapper {
  margin-bottom: 3rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.post-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

/* Post Content */
.post-content {
  margin-bottom: 3rem;
}

.content-text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 2rem;
}

.content-text p {
  margin-bottom: 1.5rem;
  white-space: pre-line;
}

.content-text p:last-child {
  margin-bottom: 0;
}

/* Tags */
.post-tags {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding-top: 2rem;
  border-top: 2px solid #e0e0e0;
}

.tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #f0f4fa;
  border: 1px solid #2a5298;
  color: #2a5298;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag:hover {
  background: #2a5298;
  color: white;
}

/* Related Posts Section */
.related-posts {
  margin: 3rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e8ecf1 100%);
  border-radius: 12px;
}

.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e3c72;
  margin-bottom: 1.5rem;
}

.related-posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.related-post-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.related-post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.related-post-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.related-post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-post-card:hover .related-post-image img {
  transform: scale(1.1);
}

.related-post-content {
  padding: 1rem;
}

.related-post-content h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e3c72;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.related-post-date {
  font-size: 0.8rem;
  color: #999;
  margin: 0 0 0.75rem 0;
}

.read-more {
  color: #2a5298;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #1e3c72;
}

/* Comments Section */
.comments-section {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 2px solid #e0e0e0;
}

/* Comment Form */
.comment-form {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  transition: border-color 0.3s ease;
}

.comment-form:focus-within {
  border-color: #2a5298;
  box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
}

.comment-form-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.form-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.form-user-name {
  font-weight: 600;
  color: #1e3c72;
  font-size: 0.9rem;
}

.comment-textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 1rem;
  transition: border-color 0.3s ease;
}

.comment-textarea:focus {
  outline: none;
  border-color: #2a5298;
  box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
}

.comment-textarea::placeholder {
  color: #999;
}

.comment-form-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-submit {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(42, 82, 152, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Login Prompt */
.login-prompt {
  background: #e3f2fd;
  border: 1px solid #bbdefb;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

.login-prompt p {
  margin: 0;
  color: #1e3c72;
}

.text-link {
  color: #2a5298;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s ease;
}

.text-link:hover {
  color: #1e3c72;
  text-decoration: underline;
}

/* Comments List */
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.comment-card:hover {
  background: #f0f4fa;
}

.comment-avatar {
  flex-shrink: 0;
}

.comment-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-body {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.comment-author {
  font-weight: 700;
  color: #1e3c72;
  font-size: 0.95rem;
}

.comment-time {
  font-size: 0.8rem;
  color: #999;
}

.comment-text {
  color: #333;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 0.75rem 0;
}

.comment-actions {
  display: flex;
  gap: 1rem;
}

.comment-action {
  padding: 0.4rem 0.8rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.comment-action:hover {
  color: #2a5298;
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