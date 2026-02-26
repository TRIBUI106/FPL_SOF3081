<template>
  <div v-if="post" class="container-fluid p-0">
    <!-- Cinematic Header -->
    <header
      class="noir-section border-bottom border-brutal position-relative overflow-hidden pt-5"
    >
      <div class="container-fluid px-lg-5">
        <div class="row">
          <div class="col-lg-10">
            <div
              class="display-font text-acid text-small mb-4 flicker tracking-wide lh-tight"
            >
              // ARCHIVE_FILE: #{{ post.id }} // CATEGORY:
              {{ post.category.toUpperCase() }}
            </div>
            <h1
              class="display-font text-white mb-5 tracking-wide lh-tight"
              style="font-size: clamp(2.5rem, 8vw, 6rem)"
            >
              {{ post.title.toUpperCase() }}
            </h1>

            <div
              class="d-flex flex-wrap align-items-center gap-5 border-top border-brutal pt-4 mt-5"
            >
              <div class="d-flex align-items-center gap-3">
                <img :src="authorAvatar" class="avatar-brutal" alt="Author" />
                <div>
                  <div
                    class="display-font text-white text-small tracking-wide lh-tight"
                  >
                    ENTITY: {{ post.author.toUpperCase() }}
                  </div>
                  <div
                    class="display-font text-muted text-tiny tracking-wide lh-tight"
                  >
                    TIMESTAMP: {{ post.date }}
                  </div>
                </div>
              </div>

              <div class="ms-auto d-flex flex-wrap gap-3">
                <button
                  @click="toggleBookmark"
                  :class="[
                    'btn min-h-48',
                    isBookmarked ? 'btn-primary' : 'btn-outline-primary',
                  ]"
                  aria-label="Save this archive"
                >
                  <i
                    :class="[
                      'bi',
                      isBookmarked ? 'bi-bookmark-fill' : 'bi-bookmark',
                    ]"
                  ></i>
                  SAVE_ARCHIVE
                </button>
                <div class="dropdown">
                  <button
                    class="btn btn-outline-primary dropdown-toggle min-h-48"
                    data-bs-toggle="dropdown"
                    aria-label="Share options"
                  >
                    SHARE_LINK
                  </button>
                  <ul
                    class="dropdown-menu dropdown-menu-dark border-brutal glass-surface shadow-brutal p-0 overflow-hidden"
                  >
                    <li>
                      <button
                        class="dropdown-item py-3 px-4 display-font tracking-wide"
                        @click="copyToClipboard"
                      >
                        COPY_URL
                      </button>
                    </li>
                    <li><hr class="dropdown-divider border-brutal m-0" /></li>
                    <li>
                      <a
                        class="dropdown-item py-3 px-4 display-font tracking-wide"
                        href="#"
                        >X_COM</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item py-3 px-4 display-font tracking-wide"
                        href="#"
                        >F_BOOK</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container-fluid px-lg-5">
      <div class="row g-0">
        <!-- Sidebar Navigation (Sticky) -->
        <div class="col-lg-1 border-end border-brutal d-none d-lg-block">
          <div class="sticky-top py-5 text-center" style="top: 100px">
            <div
              class="display-font text-muted fs-6 tracking-wide"
              style="writing-mode: vertical-rl; rotate: 180deg; opacity: 0.3"
            >
              READING_MODE // {{ estimateReadTime() }} MIN_DECRYPT
            </div>
          </div>
        </div>

        <!-- Content Flow -->
        <div class="col-lg-8 border-end border-brutal p-5 p-lg-6 bg-surface">
          <div
            class="post-image-hero mb-5 shadow-brutal border border-brutal overflow-hidden"
          >
            <img
              :src="post.image"
              class="w-100 grayscale-content"
              alt="Visual narrative"
              loading="lazy"
            />
          </div>

          <article
            class="display-font text-white opacity-90 mb-5 pb-5 border-bottom border-brutal tracking-normal lh-base"
            style="font-size: clamp(1.2rem, 1.5vw, 1.8rem); max-width: 65ch"
          >
            {{ post.content }}
          </article>

          <!-- Tags -->
          <div class="d-flex gap-2 flex-wrap mb-5">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="btn btn-sm btn-outline-primary opacity-50 px-3 py-2 lh-tight"
              >#{{ tag.toUpperCase() }}</span
            >
          </div>

          <!-- Comments Section -->
          <section class="mt-5 pt-5">
            <h2 class="display-font text-acid fs-1 mb-5 tracking-wide lh-tight">
              TERMINAL_FEEDBACK ({{ comments.length }})
            </h2>

            <div
              v-if="isLoggedIn"
              class="mb-5 border border-brutal p-4 shadow-brutal"
            >
              <label for="comment-textarea" class="visually-hidden"
                >Write a comment</label
              >
              <textarea
                id="comment-textarea"
                v-model="newComment"
                class="form-control bg-transparent border-0 fs-4 p-0 mb-4 lh-base"
                rows="3"
                placeholder="TYPE_YOUR_LOG_ENTRY..."
                aria-label="Comment Log Entry"
              ></textarea>
              <div class="text-end">
                <button
                  @click="addComment"
                  class="btn btn-primary px-5 min-h-48"
                  :disabled="!newComment.trim()"
                >
                  TRANSMIT_LOG
                </button>
              </div>
            </div>
            <div v-else class="text-center p-5 border border-brutal mb-5">
              <p
                class="display-font text-muted mb-4 fs-4 tracking-wide lh-tight"
              >
                IDENTITY_VERIFICATION_REQUIRED_FOR_FEEDBACK
              </p>
              <router-link
                to="/login"
                class="btn btn-outline-primary btn-lg px-5 min-h-48"
                >INITIALIZE_LOGIN</router-link
              >
            </div>

            <div class="comments-list mt-5">
              <div
                v-for="(comment, index) in comments"
                :key="index"
                class="border-bottom border-brutal py-5"
              >
                <div class="d-flex gap-4">
                  <img
                    :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.username}`"
                    class="avatar-brutal opacity-75"
                    alt="Reviewer"
                  />
                  <div class="w-100">
                    <div class="d-flex justify-content-between mb-3">
                      <span
                        class="display-font text-acid fs-5 tracking-wide lh-tight"
                        >{{ comment.username.toUpperCase() }}</span
                      >
                      <span
                        class="display-font text-muted text-tiny opacity-50 tracking-wide lh-tight"
                        >{{ comment.time.toUpperCase() }}</span
                      >
                    </div>
                    <p
                      class="display-font text-white opacity-75 fs-4 mb-0 tracking-normal lh-base"
                    >
                      {{ comment.text }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar: Related -->
        <div class="col-lg-3 p-5 bg-deep">
          <div class="sticky-top" style="top: 120px">
            <h3
              class="display-font text-acid text-small mb-4 pb-2 border-bottom border-brutal tracking-wide lh-tight"
            >
              RELATED_ARCHIVES
            </h3>
            <div
              v-for="related in relatedPosts"
              :key="related.id"
              class="mb-5 pb-4 border-bottom border-brutal-dim"
            >
              <router-link
                :to="`/post/${related.id}`"
                class="text-decoration-none group d-block"
              >
                <div
                  class="display-font text-muted text-tiny mb-2 tracking-wide lh-tight"
                >
                  #{{ related.category.toUpperCase() }}
                </div>
                <h4
                  class="display-font text-white fs-5 group-hover-acid transition tracking-wide lh-tight"
                >
                  {{ related.title.toUpperCase() }}
                </h4>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
  >
    <div class="text-center">
      <div
        class="display-font text-neon fs-huge mb-4 flicker tracking-wide lh-tight"
        style="font-size: clamp(4rem, 15vw, 10rem)"
      >
        404
      </div>
      <p class="display-font text-muted fs-3 mb-5 tracking-wide lh-tight">
        ARCHIVE_NOT_FOUND_IN_SYSTEM
      </p>
      <router-link to="/" class="btn btn-primary btn-lg px-5 min-h-48"
        >RETURN_TO_CORE</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { posts as defaultPosts } from "../data/posts.js";
import { getPosts } from "../data/postStore.js";

const route = useRoute();
const router = useRouter();
const post = ref(null);
const newComment = ref("");
const isLoggedIn = ref(localStorage.getItem("isLoggedIn") === "true");
const isBookmarked = ref(false);

const allPosts = computed(() => getPosts() || defaultPosts);

const currentUserName = computed(() => {
  const userData = JSON.parse(localStorage.getItem("userAccount") || "{}");
  return userData.name || "User";
});

const authorAvatar = computed(() => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.value?.author || "admin"}`;
});

const comments = ref([
  {
    username: "Nexus_Alpha",
    time: "2 HOURS AGO",
    text: "DATA_SET_VERY_USEFUL. SYNCHRONIZING_FOR_FUTURE_PROJECTS.",
  },
  {
    username: "Cyber_Eater",
    time: "4 HOURS AGO",
    text: "HOW_DO_WE_BYPASS_THE_RENDER_LIMIT_ON_THIS_SPECIFIC_NODE?",
  },
]);

const relatedPosts = computed(() => {
  if (!post.value) return [];
  return allPosts.value.filter(
    (p) => p.category === post.value.category && p.id !== post.value.id,
  );
});

const estimateReadTime = () => {
  if (!post.value) return 0;
  const wordCount = post.value.content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
};

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert("// URL_CLONED_TO_BUFFER");
  });
};

const addComment = () => {
  if (!newComment.value.trim()) return;
  comments.value.unshift({
    username: currentUserName.value,
    time: "JUST_NOW",
    text: newComment.value,
    createdAt: new Date(),
  });
  newComment.value = "";
};

const loadPost = () => {
  const postId = parseInt(route.params.id);
  const foundPost = allPosts.value.find((p) => p.id === postId);
  if (foundPost) {
    post.value = foundPost;
    window.scrollTo(0, 0);
  } else {
    post.value = null;
  }
};

onMounted(loadPost);
watch(() => route.params.id, loadPost);
</script>

<style scoped>
.avatar-brutal {
  width: 50px;
  height: 50px;
  border: 1px solid var(--accent-primary);
  filter: grayscale(1);
}
.text-tiny {
  font-size: 0.7rem;
}
.text-small {
  font-size: 0.85rem;
}
.bg-surface {
  background-color: var(--bg-surface) !important;
}
.grayscale-content {
  filter: grayscale(1) contrast(1.1);
}
.border-brutal-dim {
  border-color: rgba(224, 224, 255, 0.05) !important;
}

.min-h-48 {
  min-height: 48px !important;
}
.tracking-wide {
  letter-spacing: 0.15em !important;
}
.tracking-normal {
  letter-spacing: normal !important;
}
.lh-tight {
  line-height: 1.1 !important;
}
.lh-base {
  line-height: 1.6 !important;
}

.group:hover .group-hover-acid {
  color: var(--accent-primary) !important;
}
.transition {
  transition: all 0.3s ease;
}

.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>
