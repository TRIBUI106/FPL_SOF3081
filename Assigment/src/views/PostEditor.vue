<template>
  <div class="noir-section min-vh-100">
    <div class="container-fluid px-lg-5">
      <header class="mb-5 pb-4 border-bottom border-brutal">
        <button
          @click="router.back()"
          class="btn btn-sm btn-outline-primary mb-4 display-font lh-1 p-2"
        >
          <i class="bi bi-arrow-left"></i> BACK_ARCHIVE
        </button>
        <div class="display-font text-acid text-small mb-2 flicker">
          // EDITOR_NODE_ACTIVE
        </div>
        <h1 class="display-font text-white fs-1 mb-0">
          {{ isEdit ? "MODIFY_ENTRY" : "GENERATE_ENTRY" }}
        </h1>
        <p class="display-font text-muted text-small mt-2">
          {{
            isEdit
              ? "UPDATING_DATA_STREAM_CONTENT"
              : "INITIALIZING_NEW_KNOWLEDGE_TRANSMISSION"
          }}
        </p>
      </header>

      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="bg-surface border border-brutal p-5 shadow-brutal mb-5">
            <PostForm
              :initialData="postData"
              :isEdit="isEdit"
              @submit="handleSave"
              @cancel="router.back()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPosts, addPost, updatePost } from "../data/postStore.js";
import { posts as defaultPosts } from "../data/posts.js";
import PostForm from "../components/PostForm.vue";

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);
const postData = ref({
  title: "",
  content: "",
  category: "",
  image:
    "https://picsum.photos/800/500?random=" + Math.floor(Math.random() * 100),
  tags: [],
});

onMounted(() => {
  if (isEdit.value) {
    const id = parseInt(route.params.id);
    const allPosts = getPosts() || defaultPosts;
    const post = allPosts.find((p) => p.id === id);

    if (post) {
      postData.value = { ...post };
    } else {
      router.push("/my-posts");
    }
  }
});

const handleSave = (data) => {
  if (isEdit.value) {
    updatePost(data);
  } else {
    // Add current user as author
    const userData = JSON.parse(localStorage.getItem("userAccount") || "{}");
    data.author = userData.name || "Anonymous Entity";
    addPost(data);
  }
  router.push("/my-posts");
};
</script>

<style scoped>
.text-small {
  font-size: 0.8rem;
  letter-spacing: 2px;
}
.bg-surface {
  background-color: var(--bg-surface) !important;
}
</style>
