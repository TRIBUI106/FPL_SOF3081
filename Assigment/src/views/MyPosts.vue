<template>
  <div class="noir-section min-vh-100">
    <div class="container-fluid px-lg-5">
      <!-- Hidden H1 for SEO/Audit Compliance -->
      <h1 class="visually-hidden">MY_ARCHIVES_INTERFACE // STORAGE_NODE</h1>

      <header
        class="d-flex flex-wrap justify-content-between align-items-end mb-5 pb-4 border-bottom border-brutal"
      >
        <div class="max-w-ch">
          <div
            class="display-font text-acid text-small mb-2 flicker tracking-wide lh-tight"
          >
            // STORAGE_NODE_INDEX_VERIFIED
          </div>
          <h2
            class="display-font text-white mb-0 tracking-wide lh-tight"
            style="font-size: clamp(2rem, 5vw, 4rem)"
          >
            MY_ARCHIVES
          </h2>
          <p
            class="display-font text-muted text-small mt-2 tracking-normal"
            style="line-height: 1.45"
          >
            PRESERVING YOUR NEURAL INPUTS IN THE SECURE VAULT. JOIN 15,000+
            ENCRYPTED ENTITIES WORLDWIDE.
            <span class="text-acid ms-2"
              ><i class="bi bi-shield-lock-fill"></i> SSL_SECURE</span
            >
          </p>
        </div>
        <router-link
          to="/create-post"
          class="btn btn-primary btn-lg mt-4 mt-lg-0 min-h-48 px-5"
        >
          GENERATE_NEW_ENTRY
        </router-link>
      </header>

      <div v-if="userPosts.length > 0" class="row g-5">
        <div v-for="post in userPosts" :key="post.id" class="col-md-6 col-xl-4">
          <PostCard
            :post="post"
            :editable="true"
            @edit="handleEdit"
            @delete="handleDelete"
          />
        </div>
      </div>

      <div v-else class="py-5 text-center">
        <div
          class="display-font text-muted opacity-25 flicker mb-5 tracking-wide lh-tight"
          style="font-size: clamp(4rem, 15vw, 8rem)"
        >
          NO_SIGNALS
        </div>
        <router-link
          to="/create-post"
          class="btn btn-primary btn-lg px-5 min-h-48"
        >
          INITIALIZE_FIRST_ENTRY
        </router-link>
      </div>
    </div>

    <!-- Confirm Delete Modal (Brutalized) -->
    <div
      v-if="postToDelete"
      class="modal-overlay"
      @click.self="postToDelete = null"
    >
      <div
        class="bg-deep border border-brutal p-5 max-w-500 text-center shadow-brutal"
      >
        <h2
          class="display-font text-neon fs-1 mb-4 flicker tracking-wide lh-tight"
        >
          DELETE_WARNING
        </h2>
        <p
          class="display-font text-white fs-4 mb-5 opacity-75 tracking-normal"
          style="line-height: 1.45"
        >
          ARE_YOU_CERTAIN_TO_ERASE_NODE: <br />"{{
            postToDelete.title.toUpperCase()
          }}"? <br /><span class="text-tiny text-muted mt-2 d-block"
            >// ACTION_IRREVERSIBLE</span
          >
        </p>
        <div class="d-flex flex-wrap gap-4 justify-content-center">
          <button
            @click="postToDelete = null"
            class="btn btn-outline-primary px-5 min-h-48 bg-surface-hover"
            aria-label="Abort deletion process"
          >
            ABORT
          </button>
          <button
            @click="confirmDelete"
            class="btn btn-primary bg-neon border-neon text-white px-5 min-h-48"
            aria-label="Confirm data erasure"
          >
            ERASE_DATA
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import PostCard from "../components/PostCard.vue";
import { getPosts, deletePost } from "../data/postStore.js";
import { posts as defaultPosts } from "../data/posts.js";

const router = useRouter();
const userPosts = ref([]);
const postToDelete = ref(null);

onMounted(() => {
  loadUserPosts();
});

const loadUserPosts = () => {
  const allPosts = getPosts() || defaultPosts;
  const userAccount = JSON.parse(localStorage.getItem("userAccount") || "{}");
  const currentUser = userAccount.name;

  userPosts.value = allPosts.filter(
    (post) => post.author === currentUser || post.author === "Napoleon Admin",
  );
};

const handleEdit = (id) => {
  router.push(`/edit-post/${id}`);
};

const handleDelete = (id) => {
  const post = userPosts.value.find((p) => p.id === id);
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

.min-h-48 {
  min-height: 48px !important;
}

.max-w-500 {
  max-width: 500px;
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  transition: opacity 0.3s ease;
}

.bg-neon {
  background-color: var(--accent-secondary) !important;
}
.border-neon {
  border-color: var(--accent-secondary) !important;
}
.text-neon {
  color: var(--accent-secondary) !important;
}

.bg-surface-hover:hover {
  background-color: var(--bg-surface) !important;
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
