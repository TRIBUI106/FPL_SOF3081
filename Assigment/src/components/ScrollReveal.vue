<template>
  <div ref="target" :class="['reveal-container', { 'is-revealed': isRevealed }]">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const target = ref(null);
const isRevealed = ref(false);

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isRevealed.value = true;
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  if (target.value) {
    observer.observe(target.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.reveal-container {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), 
              transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: opacity, transform;
}

.is-revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
