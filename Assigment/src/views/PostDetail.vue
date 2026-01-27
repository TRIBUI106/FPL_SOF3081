<template>
  <div v-if="post" class="post-detail">
    <div class="post-header">
      <router-link to="/">← Back to Posts</router-link>
      <h1>{{ post.title }}</h1>
      <div class="post-meta">
        <time>{{ formatDate(post.date) }}</time>
        <span>By {{ post.author }}</span>
      </div>
    </div>

    <img v-if="post.image" :src="post.image" :alt="post.title" class="post-image" loading="lazy" />

    <article class="post-content">
      <p>{{ post.content }}</p>
    </article>

    <!-- Comments Section -->
    <section class="comments-section">
      <h2>Comments ({{ comments.length }})</h2>

      <div v-if="isLoggedIn" class="comment-form">
        <textarea
          v-model="newComment"
          placeholder="Share your thoughts..."
          rows="4"
        ></textarea>
        <button @click="addComment" class="btn btn-primary" :disabled="!newComment.trim()">
          Post Comment
        </button>
      </div>
      <div v-else class="alert alert-primary">
        <router-link to="/login">Sign in</router-link> to comment
      </div>

      <div class="comments-list">
        <article v-for="(comment, index) in comments" :key="index" class="comment">
          <div class="comment-header">
            <strong>{{ comment.username }}</strong>
            <time class="text-secondary">{{ comment.time }}</time>
          </div>
          <p>{{ comment.text }}</p>
        </article>
      </div>
    </section>
  </div>
  <div v-else class="text-center py-5">
    <p>Post not found</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);
const newComment = ref('');
const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');

const comments = ref([
  { username: 'John Doe', time: '2 hours ago', text: 'Great article! Very helpful.' },
  { username: 'Jane Smith', time: '1 hour ago', text: 'Thanks for sharing this knowledge.' },
]);

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date || new Date());
};

onMounted(() => {
  const postId = route.params.id;
  post.value = {
    id: postId,
    title: 'Getting Started with Vue.js',
    content:
      'Vue.js is a progressive JavaScript framework for building user interfaces. It provides data binding, component-based architecture, and excellent developer experience. In this tutorial, we\'ll explore the fundamentals and build interactive applications.\n\nVue makes it easy to create dynamic and responsive user interfaces with minimal boilerplate code. The framework is designed to be incrementally adoptable, so you can use as much or as little as you need.',
    image: `https://picsum.photos/800/400?random=${postId}`,
    date: new Date(),
    author: 'Admin',
  };
});

const addComment = () => {
  if (!newComment.value.trim()) return;

  const userData = JSON.parse(localStorage.getItem('userAccount')) || { name: 'User' };

  comments.value.unshift({
    username: userData.name,
    time: 'just now',
    text: newComment.value,
  });

  newComment.value = '';
};
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.post-header {
  margin-bottom: 2rem;
}

.post-header a {
  display: inline-block;
  margin-bottom: 1rem;
  color: var(--primary);
  font-weight: 500;
}

.post-header h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.post-meta {
  display: flex;
  gap: 2rem;
  color: var(--secondary);
  font-size: 0.95rem;
}

.post-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: var(--radius);
  margin-bottom: 2rem;
}

.post-content {
  line-height: 1.8;
  margin-bottom: 3rem;
}

.post-content p {
  white-space: pre-line;
  margin-bottom: 1.5rem;
}

.comments-section {
  border-top: 2px solid var(--border);
  padding-top: 2rem;
}

.comments-section h2 {
  margin-bottom: 2rem;
}

.comment-form {
  background: var(--light);
  padding: 1.5rem;
  border-radius: var(--radius);
  margin-bottom: 2rem;
}

.comment-form textarea {
  margin-bottom: 1rem;
}

.comment-form .btn {
  float: right;
}

.comments-list {
  clear: both;
}

.comment {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0;
}

.comment:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.comment-header strong {
  color: var(--dark);
}

.comment-header time {
  font-size: 0.85rem;
}

.comment p {
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .post-detail {
    padding: 1rem;
  }

  .post-header h1 {
    font-size: 1.5rem;
  }

  .post-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .post-image {
    height: 250px;
  }

  .comment-form .btn {
    float: none;
    width: 100%;
  }
}
</style>