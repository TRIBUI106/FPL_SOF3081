<template>
  <div class="my-posts-container">
    <div class="container">
      <header class="page-header">
        <div>
          <h1 class="page-title">Bài viết của tôi</h1>
          <p class="page-subtitle">Quản lý và chỉnh sửa nội dung bạn đã chia sẻ</p>
        </div>
        <router-link to="/create-post" class="btn btn-primary">
          ✨ Đăng bài mới
        </router-link>
      </header>

      <div v-if="userPosts.length > 0" class="row cols-3">
        <ScrollReveal v-for="post in userPosts" :key="post.id">
          <PostCard 
            :post="post" 
            editable 
            @edit="handleEdit" 
            @delete="handleDelete"
          />
        </ScrollReveal>
      </div>

      <div v-else class="empty-management">
        <div class="empty-state">
          <span class="empty-icon">📝</span>
          <h3>Bạn chưa có bài viết nào</h3>
          <p>Hãy bắt đầu chia sẻ kiến thức của bạn với cộng đồng ngay hôm nay!</p>
          <router-link to="/create-post" class="btn btn-primary mt-4">
            Tạo bài viết đầu tiên
          </router-link>
        </div>
      </div>
    </div>

    <!-- Confirm Delete Modal -->
    <div v-if="postToDelete" class="modal-overlay">
      <div class="modal-content">
        <h3>Xác nhận xóa</h3>
        <p>Bạn có chắc chắn muốn xóa bài viết "<strong>{{ postToDelete.title }}</strong>"? Hành động này không thể hoàn tác.</p>
        <div class="modal-actions">
          <button @click="postToDelete = null" class="btn btn-secondary">Hủy</button>
          <button @click="confirmDelete" class="btn btn-danger">Xóa bài viết</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getPosts, deletePost } from '../data/postStore.js';
import { posts as defaultPosts } from '../data/posts.js';
import PostCard from '../components/PostCard.vue';
import ScrollReveal from '../components/ScrollReveal.vue';

const router = useRouter();
const userPosts = ref([]);
const postToDelete = ref(null);

onMounted(() => {
  loadUserPosts();
});

const loadUserPosts = () => {
  const allPosts = getPosts() || defaultPosts;
  const currentUser = JSON.parse(localStorage.getItem('userAccount') || '{}').name;
  
  // For the assignment/demo, if we don't have "owned" posts, we show posts by Napoleon Admin (demo user)
  userPosts.value = allPosts.filter(post => post.author === currentUser || post.author === 'Napoleon Admin');
};

const handleEdit = (id) => {
  router.push(`/edit-post/${id}`);
};

const handleDelete = (id) => {
  const post = userPosts.value.find(p => p.id === id);
  if (post) {
    postToDelete.value = post;
  }
};

const confirmDelete = () => {
  if (postToDelete.value) {
    deletePost(postToDelete.value.id);
    postToDelete.value = null;
    loadUserPosts();
  }
};
</script>

<style scoped>
.my-posts-container {
  padding: 60px 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 24px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 8px;
}

.page-subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.empty-management {
  padding: 80px 0;
  text-align: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  padding: 32px;
  border-radius: 20px;
  max-width: 450px;
  width: 90%;
  box-shadow: var(--shadow-xl);
}

.modal-content h3 {
  margin-top: 0;
  color: var(--color-text);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}
</style>
