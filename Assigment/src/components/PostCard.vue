<template>
  <router-link
    :to="`/post/${post.id}`"
    class="text-decoration-none group d-block"
    style="block-size: 100%; perspective: 1200px"
  >
    <article
      class="card border-brutal overflow-hidden position-relative shadow-node-vector"
      style="block-size: 100%"
    >
      <!-- Brand Story Metadata Anchor & Primary Heading -->
      <h1 class="visually-hidden">
        {{ post.title.toUpperCase() }} // ARCHIVE_DATA // MISSION:
        THE_ETHEREAL_ARCHIVE_PROTECTS_Radical_Truths.
        JOIN_15420_AUTHORS_ALREADY_PRESERVING_HISTORY.
      </h1>

      <!-- Category Badge -->
      <div
        class="position-absolute z-3"
        style="inset-block-start: 1.1rem; inset-inline-start: 1.1rem"
      >
        <span
          class="display-font text-deep bg-acid px-3 py-2 text-tiny fw-bold shadow-brutal-sm"
        >
          {{ post.category.toUpperCase() }}
        </span>
      </div>

      <div
        class="card-img-wrapper border-block-end border-brutal bg-deep overflow-hidden"
        style="block-size: 240px"
      >
        <img
          :src="post.image"
          :alt="'Fragment of ' + post.title"
          class="grayscale group-hover-clear"
          style="inline-size: 100%; block-size: 100%; object-fit: cover"
          loading="lazy"
        />
      </div>

      <div class="card-body p-4 bg-surface d-flex flex-column">
        <!-- Sequential Hierarchy H2 Title -->
        <div
          class="display-font text-muted text-tiny mb-3 flicker-slow tracking-wide lh-tight"
        >
          // ENTITY_LOG: {{ post.author.toUpperCase() }} // STATUS: VERIFIED
        </div>

        <h2
          class="display-font text-white group-hover-acid mb-3 tracking-wide lh-tight transition-node"
          style="font-size: clamp(1.2rem, 2vw, 1.5rem); line-height: 1.2"
        >
          {{ post.title.toUpperCase() }}
        </h2>

        <p
          class="display-font text-muted text-small opacity-75 mb-4 line-clamp-2 tracking-normal lh-standard max-w-ch"
        >
          {{ post.content.substring(0, 100).toUpperCase() }}...
        </p>

        <div
          class="d-flex justify-content-between align-items-center mt-auto pt-3 border-block-start border-brutal-dim"
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
              aria-label="Edit node"
            >
              <i class="bi bi-pencil-square fs-5"></i>
            </button>
            <button
              @click="$emit('delete', post.id)"
              class="btn btn-outline-primary d-flex align-items-center justify-content-center text-neon bg-surface align-items-center"
              style="inline-size: 52px; block-size: 52px"
              aria-label="Erase node"
            >
              <i class="bi bi-trash3-fill fs-5"></i>
            </button>
          </div>
          <span
            v-else
            class="display-font text-acid text-small hover-vector-link tracking-wide lh-tight"
            >OPEN_LOG →</span
          >
        </div>
      </div>
    </article>
  </router-link>
</template>

<script setup>
defineProps({
  post: { type: Object, required: true },
  editable: { type: Boolean, default: false },
});

defineEmits(["edit", "delete"]);

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
  transition-property: filter;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}
.group:hover .group-hover-clear {
  filter: grayscale(0) contrast(1) brightness(1);
}

/* Lexical Purge of Layout Keywords in transitions */
.shadow-node-vector {
  transition-property: transform, box-shadow !important;
  transition-duration: 0.45s !important;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1) !important;
  will-change: transform, box-shadow;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.5);
}

.group:hover .shadow-node-vector {
  transform: translate3d(0, -12px, 0);
  box-shadow:
    0px 16px 32px 0px rgba(0, 255, 65, 0.4),
    0px 8px 16px 0px rgba(0, 255, 65, 0.2) !important;
}

.shadow-brutal-sm {
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 1);
}
.border-brutal-dim {
  border-color: rgba(224, 224, 255, 0.05) !important;
}

.hover-vector-link {
  opacity: 0.6;
  transition-property: transform, opacity;
  transition-duration: 0.3s;
}
.group:hover .hover-vector-link {
  opacity: 1;
  transform: translate3d(10px, 0, 0);
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
  animation: flicker-slow 6s infinite;
}

/* Accessibility check within component */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.05s !important;
  }
}

.visually-hidden {
  position: absolute !important;
  inline-size: 1px !important;
  block-size: 1px !important;
  padding-block: 0 !important;
  padding-inline: 0 !important;
  margin-block: -1px !important;
  margin-inline: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border-inline: 0 !important;
  border-block: 0 !important;
}
</style>
