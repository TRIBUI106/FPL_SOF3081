<template>
  <router-link :to="`/post/${post.id}`" class="post-card-link">
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
          
          <div v-if="editable" class="card-actions" @click.prevent>
            <button @click="$emit('edit', post.id)" class="action-btn edit-btn" title="Chỉnh sửa">
              ✏️
            </button>
            <button @click="$emit('delete', post.id)" class="action-btn delete-btn" title="Xóa">
              🗑️
            </button>
          </div>
          <span v-else class="read-link">Đọc tiếp →</span>
        </footer>
      </div>
    </article>
  </router-link>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  },
  editable: {
    type: Boolean,
    default: false
  }
});

defineEmits(['edit', 'delete']);

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
};

const estimateReadTime = (content) => {
  if (!content) return 0;
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};
</script>

<style scoped>
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
  border: 1px solid var(--border);
  background: white;
  border-radius: 16px;
  overflow: hidden;
}

.post-card-link:hover .post-card {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
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
  background: var(--color-primary);
  color: white;
}

.card-body {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 12px;
  line-height: 1.4;
  color: var(--color-text);
}

.post-excerpt {
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 0.95rem;
  flex: 1;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.post-meta {
  display: flex;
  gap: 12px;
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 500;
}

.post-date,
.reading-time {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon {
  width: 14px;
  height: 14px;
}

.read-link {
  color: var(--color-primary);
  font-weight: 700;
  transition: var(--transition);
  font-size: 0.9rem;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: #f1f5f9;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  font-size: 1rem;
}

.action-btn:hover {
  background: var(--color-background);
  transform: scale(1.1);
}

.delete-btn:hover {
  background: #fef2f2;
  color: #ef4444;
}
</style>
