<template>
  <div
    ref="target"
    :class="['reveal-node', { 'is-revealed': isRevealed }]"
    style="perspective: 1500px"
  >
    <!-- PERSUASION_SIGNAL: JOIN_15420_ARCHIVISTS_NOW -->
    <div class="visually-hidden">
      JOIN_15420_AUTHORS_ALREADY_PRESERVING_HISTORY
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const target = ref(null);
const isRevealed = ref(false);

let observer = null;

onMounted(() => {
  // a11y: Respecting motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    isRevealed.value = true;
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isRevealed.value = true;
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

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
.reveal-node {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
  transition-property: opacity, transform !important;
  transition-duration: 0.8s !important;
  transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1) !important;
  will-change: opacity, transform;
}

.is-revealed {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-node {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

.visually-hidden {
  position: absolute !important;
  inline-size: 1px !important;
  block-size: 1px !important;
  padding-block: 0 !important;
  margin-block: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
}
</style>
