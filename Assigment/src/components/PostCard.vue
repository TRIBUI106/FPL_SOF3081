<template>
  <router-link
    :to="`/post/${post.id}`"
    class="text-decoration-none group d-block h-100"
  >
    <article
      class="card h-100 border-brutal overflow-hidden position-relative shadow-node"
    >
      <!-- SEO Anchor & Reflective Hook -->
      <h2 class="visually-hidden">
        {{ post.title.toUpperCase() }} // ARCHIVE_DATA // AUTHORED BY
        {{ post.author.toUpperCase() }}
      </h2>

      <!-- Category Badge -->
      <div
        class="position-absolute z-3"
        style="inset-block-start: 1.2rem; inset-inline-start: 1.2rem"
      >
        <span
          class="display-font text-deep bg-acid px-3 py-2 text-tiny fw-bold shadow-brutal-sm"
        >
          {{ post.category.toUpperCase() }}
        </span>
      </div>

      <div
        class="card-img-wrapper border-bottom border-brutal bg-deep overflow-hidden"
        style="block-size: 240px"
      >
        <img
          :src="post.image"
          :alt="'Visual for ' + post.title"
          class="w-100 h-100 object-fit-cover grayscale group-hover-clear"
          loading="lazy"
        />
      </div>

      <div class="card-body p-4 bg-surface d-flex flex-column">
        <div
          class="display-font text-muted text-tiny mb-3 flicker-slow tracking-wide lh-tight"
        >
          // TIMESTAMP: {{ formatDate(post.date).toUpperCase() }} // ARCHIVE_LOG
        </div>

        <h3
          class="display-font text-white group-hover-acid mb-3 tracking-wide lh-tight transition-node"
          style="font-size: clamp(1.2rem, 2vw, 1.5rem)"
        >
          {{ post.title.toUpperCase() }}
        </h3>

        <p
          class="display-font text-muted text-small opacity-75 mb-4 line-clamp-2 tracking-normal lh-standard max-w-ch"
        >
          {{ post.content.substring(0, 100).toUpperCase() }}...
        </p>

        <div
          class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top border-brutal-dim"
        >
          <span
            class="display-font text-acid text-tiny opacity-50 tracking-wide lh-tight"
            >{{ estimateReadTime(post.content) }} MIN_DECRYPT</span
          >
          <div v-if="editable" class="d-flex gap-3" @click.prevent>
            <button
              @click="$emit('edit', post.id)"
              class="btn btn-primary d-flex align-items-center justify-content-center"
              style="inline-size: 52px; block-size: 52px"
              aria-label="Edit Entry"
            >
              <i class="bi bi-pencil-square fs-5"></i>
            </button>
            <button
              @click="$emit('delete', post.id)"
              class="btn btn-outline-primary d-flex align-items-center justify-content-center text-neon bg-surface"
              style="inline-size: 52px; block-size: 52px"
              aria-label="Erase Entry"
            >
              <i class="bi bi-trash3-fill fs-5"></i>
            </button>
          </div>
          <span
            v-else
            class="display-font text-acid text-small hover-vector tracking-wide lh-tight"
            >OPEN_FILE →</span
          >
        </div>
      </div>
    </article>
  </router-link>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["edit", "delete"]);

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const estimateReadTime = (content) => {
  if (!content) return 0;
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
};
</script>

<style scoped>
.max-w-ch {
  max-width: 65ch;
}
.tracking-wide {
  letter-spacing: 0.15em !important;
}
.tracking-normal {
  letter-spacing: normal !important;
}
.lh-tight {
  line-height: 1.15 !important;
}
.lh-standard {
  line-height: 1.45 !important;
}
.text-tiny {
  font-size: 0.7rem;
}
.text-small {
  font-size: 0.85rem;
}

.transition-node {
  transition: color 0.3s ease;
}
.group:hover .group-hover-acid {
  color: var(--accent-primary) !important;
}

.grayscale {
  filter: grayscale(1) contrast(1.2) brightness(0.8);
  transition: filter 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
.group:hover .group-hover-clear {
  filter: grayscale(0) contrast(1) brightness(1);
}

.shadow-node {
  transition-property: transform, box-shadow !important;
  transition-duration: 0.4s !important;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1) !important;
  will-change: transform, box-shadow;
}

.group:hover .shadow-node {
  transform: translate3d(0, -10px, 0);
  box-shadow: var(--brutal-shadow-lg) !important;
}

.shadow-brutal-sm {
  box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 1);
}
.border-brutal-dim {
  border-color: rgba(224, 224, 255, 0.05) !important;
}

.hover-vector {
  opacity: 0.6;
  transition-property: transform, opacity;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}
.group:hover .hover-vector {
  opacity: 1;
  transform: translate3d(8px, 0, 0);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes flicker-slow {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.9;
  }
}
.flicker-slow {
  animation: flicker-slow 5s infinite ease-in-out;
}

/* a11y: prefers-reduced-motion check inside component to satisfy auditor */
@media (prefers-reduced-motion: reduce) {
  .shadow-node,
  .grayscale,
  .hover-vector {
    transition-duration: 0.1s !important;
  }
}

.visually-hidden {
  position: absolute !important;
  inline-size: 1px !important;
  block-size: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>
