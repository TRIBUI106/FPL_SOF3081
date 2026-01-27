<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Discover Blogs</h1>
        <p>Share knowledge and experience about programming and web development.</p>
        <router-link to="/register" class="btn btn-primary btn-lg">Get Started</router-link>
      </div>
    </section>

    <!-- Posts Section -->
    <section class="posts-section">
      <h2>Latest Posts</h2>
      <div class="row cols-3">
        <article v-for="post in posts" :key="post.id" class="card post-card">
          <div class="card-image">
            <img :src="post.image" :alt="post.title" loading="lazy">
            <span class="badge badge-primary">{{ post.category }}</span>
          </div>
          <div class="card-body">
            <h3>{{ post.title }}</h3>
            <p>{{ post.content }}</p>
            <footer class="post-footer">
              <time>{{ formatDate(post.date) }}</time>
              <router-link :to="`/post/${post.id}`" class="btn btn-sm btn-primary">Read More</router-link>
            </footer>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const posts = ref([
  {
    id: 1,
    title: 'Learning Vue.js from Zero',
    content: 'Complete guide to Template Syntax, Data Binding and Reactivity for beginners.',
    category: 'Vue.js',
    date: new Date('2026-01-23'),
    image: new URL('../img/image.png', import.meta.url).href,
  },
  {
    id: 2,
    title: 'Mastering CSS Basics',
    content: 'Learn to create responsive and beautiful layouts with modern CSS techniques.',
    category: 'CSS',
    date: new Date('2026-01-22'),
    image: new URL('../img/anh1.png', import.meta.url).href,
  },
  {
    id: 3,
    title: 'Vue Router & Authentication',
    content: 'Build login systems and protect important routes in your application.',
    category: 'Vue.js',
    date: new Date('2026-01-21'),
    image: new URL('../img/anh2.png', import.meta.url).href,
  },
]);

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
  margin-bottom: 4rem;
  border-radius: var(--radius);
}

.hero-content h1 {
  margin-bottom: 1rem;
  color: white;
}

.hero-content p {
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.posts-section h2 {
  margin-bottom: 3rem;
  position: relative;
  text-align: center;
  padding-bottom: 1rem;
}

.posts-section h2::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: var(--primary);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.post-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: var(--light);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition);
}

.post-card:hover .card-image img {
  transform: scale(1.05);
}

.card-image .badge {
  position: absolute;
  top: 12px;
  right: 12px;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-body h3 {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.card-body p {
  flex: 1;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.post-footer time {
  font-size: 0.85rem;
  color: var(--secondary);
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 0;
  }

  .hero-content h1 {
    font-size: 1.75rem;
  }

  .row.cols-3 {
    grid-template-columns: 1fr;
  }
}
</style>