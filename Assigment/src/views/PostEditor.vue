<template>
  <div class="editor-container">
    <div class="container container-sm">
      <header class="editor-header">
        <button @click="router.back()" class="back-link">
          ← Quay lại
        </button>
        <h1 class="page-title">{{ isEdit ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới' }}</h1>
        <p class="page-subtitle">
          {{ isEdit ? 'Cập nhật nội dung bài viết của bạn' : 'Chia sẻ những điều thú vị với mọi người' }}
        </p>
      </header>

      <section class="editor-card card">
        <PostForm 
          :initialData="postData" 
          :isEdit="isEdit"
          @submit="handleSave"
          @cancel="router.back()"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPosts, addPost, updatePost } from '../data/postStore.js';
import { posts as defaultPosts } from '../data/posts.js';
import PostForm from '../components/PostForm.vue';

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);
const postData = ref({
  title: '',
  content: '',
  category: '',
  image: 'https://picsum.photos/800/500?random=' + Math.floor(Math.random() * 100),
  tags: []
});

onMounted(() => {
  if (isEdit.value) {
    const id = parseInt(route.params.id);
    const allPosts = getPosts() || defaultPosts;
    const post = allPosts.find(p => p.id === id);
    
    if (post) {
      postData.value = { ...post };
    } else {
      router.push('/my-posts');
    }
  }
});

const handleSave = (data) => {
  if (isEdit.value) {
    updatePost(data);
  } else {
    addPost(data);
  }
  router.push('/my-posts');
};
</script>

<style scoped>
.editor-container {
  padding: 60px 0;
  background: var(--color-background);
  min-height: 100vh;
}

.container-sm {
  max-width: 800px;
}

.editor-header {
  margin-bottom: 40px;
}

.back-link {
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  margin-bottom: 24px;
  display: block;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 900;
  margin-bottom: 8px;
}

.page-subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.editor-card {
  padding: 40px;
  background: white;
  border-radius: 24px;
}

@media (max-width: 640px) {
  .editor-card {
    padding: 24px;
  }
}
</style>
