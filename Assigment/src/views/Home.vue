<template>
  <div class="home-noir">
    <h2 class="visually-hidden">HOME_ARCHIVE_INTERFACE</h2>

    <!-- Cinematic Hero: Extreme Asymmetry (90/10) -->
    <section
      class="noir-section position-relative min-vh-100 d-flex align-items-center"
    >
      <div class="container-fluid px-lg-5">
        <div class="row align-items-center">
          <div class="col-lg-10">
            <h1
              class="display-font text-white mb-0"
              style="
                font-size: clamp(3.5rem, 15vw, 12rem);
                line-height: 1.1;
                letter-spacing: 0.15em;
              "
            >
              <span class="flicker">ETHEREAL</span><br />
              <span class="text-acid">ARCHIVE.</span>
            </h1>
            <p
              class="display-font text-muted mt-4 opacity-75 max-w-ch"
              style="font-size: clamp(1.2rem, 2vw, 2rem); line-height: 1.4"
            >
              // RESEARCH. LOGS. VOIDS. <br />
              THE QUANTUM BLOGGING INTERFACE FOR THE DEEP WEB.
            </p>
            <div class="d-flex flex-wrap gap-4 mt-5">
              <router-link to="/register" class="btn btn-primary btn-lg px-5"
                >INITIALIZE_ENTRY</router-link
              >
              <a href="#archives" class="btn btn-outline-primary btn-lg px-5"
                >ACCESS_DATA</a
              >
            </div>
          </div>
          <div class="col-lg-2 d-none d-lg-block text-end opacity-25">
            <div
              class="display-font text-acid"
              style="
                writing-mode: vertical-rl;
                font-size: clamp(1rem, 2vw, 2.5rem);
                letter-spacing: 0.2rem;
              "
            >
              STATUS: ONLINE // 2026.02.26
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats: Brutalist Grid -->
    <section class="border-bottom border-brutal bg-surface py-5">
      <div class="container-fluid px-lg-5">
        <div class="row g-0">
          <div class="col-md-4 border border-brutal p-5 text-center">
            <div
              class="display-font text-acid tracking-wide lh-tight"
              style="font-size: clamp(2.5rem, 5vw, 5rem)"
            >
              {{ allPosts.length }}
            </div>
            <div class="display-font text-muted fs-5 tracking-wide lh-tight">
              ENTRIES_STORED
            </div>
          </div>
          <div class="col-md-4 border border-brutal p-5 text-center">
            <div
              class="display-font text-acid tracking-wide lh-tight"
              style="font-size: clamp(2.5rem, 5vw, 5rem)"
            >
              4.2K+
            </div>
            <div class="display-font text-muted fs-5 tracking-wide lh-tight">
              NEURAL_LINKS
            </div>
          </div>
          <div class="col-md-4 border border-brutal p-5 text-center">
            <div
              class="display-font text-acid tracking-wide lh-tight"
              style="font-size: clamp(2.5rem, 5vw, 5rem)"
            >
              0.03s
            </div>
            <div class="display-font text-muted fs-5 tracking-wide lh-tight">
              SYNC_LATENCY
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content: Staggered Layout -->
    <section class="noir-section" id="archives">
      <div class="container-fluid px-lg-5">
        <div
          class="d-flex flex-wrap justify-content-between align-items-end mb-5 pb-4 border-bottom border-brutal"
        >
          <h2
            class="display-font text-white mb-0 lh-tight tracking-wide"
            style="font-size: clamp(2rem, 5vw, 4rem)"
          >
            LATEST_SIGNALS
          </h2>
          <div class="d-flex flex-wrap gap-2 mt-3 mt-lg-0">
            <button
              v-for="category in categories"
              :key="category"
              @click="
                selectedCategory = selectedCategory === category ? '' : category
              "
              :class="[
                'btn btn-sm px-4',
                selectedCategory === category
                  ? 'btn-primary'
                  : 'btn-outline-primary',
              ]"
              :aria-label="'Filter by ' + category"
            >
              [{{ category.toUpperCase() }}]
            </button>
          </div>
        </div>

        <div class="row g-5 mb-5">
          <div v-if="filteredPosts.length > 0" class="col-12">
            <div class="row g-5">
              <div
                v-for="(post, index) in filteredPosts"
                :key="post.id"
                class="col-md-6 col-xl-4"
                :class="{ 'mt-lg-5': index % 2 !== 0 }"
              >
                <PostCard :post="post" />
              </div>
            </div>
          </div>
          <div v-else class="col-12 py-5 text-center">
            <div
              class="display-font fs-1 text-muted opacity-25 flicker tracking-wide lh-tight"
            >
              NO_SIGNALS_FOUND_IN_SECTOR
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Communication: Brutalist Newsletter -->
    <section class="noir-section border-top border-brutal bg-surface">
      <div class="container">
        <div class="row justify-content-center py-5">
          <div class="col-lg-8 text-center">
            <h2
              class="display-font text-acid mb-4 lh-tight tracking-wide"
              style="font-size: clamp(2rem, 5vw, 4rem)"
            >
              SUBSCRIBE_TO_THE_VOID
            </h2>
            <p
              class="display-font text-muted mb-5 tracking-normal lh-base max-w-ch mx-auto"
              style="font-size: clamp(1rem, 2vw, 1.4rem)"
            >
              ENCRYPTED UPDATES DIRECTLY TO YOUR NEURAL INTERFACE.
              JOIN_10,000+_ENTITIES.
            </p>
            <form
              @submit.prevent="subscribeNewsletter"
              class="input-group input-group-lg"
            >
              <label for="newsletter-email" class="visually-hidden"
                >Newsletter Email</label
              >
              <input
                id="newsletter-email"
                v-model="emailNewsletter"
                type="email"
                class="form-control"
                placeholder="ENTITY@DOMAIN.COM"
                required
                aria-label="Email for newsletter"
              />
              <button
                class="btn btn-primary px-5 shadow-none"
                type="submit"
                aria-label="Subscribe now"
              >
                TRANSMIT
              </button>
            </form>
            <p
              v-if="newsletterMessage"
              class="mt-4 display-font text-acid tracking-wide lh-tight"
            >
              {{ newsletterMessage }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import PostCard from "../components/PostCard.vue";
import { posts as defaultPosts } from "../data/posts.js";
import { getPosts, savePosts } from "../data/postStore.js";

const selectedCategory = ref("");
const emailNewsletter = ref("");
const newsletterMessage = ref("");

const categories = ["Vue.js", "CSS", "JavaScript", "Web Design", "Backend"];

// Initialize store if empty
const stored = getPosts();
if (!stored) {
  savePosts(defaultPosts);
}

const allPosts = ref(getPosts() || defaultPosts);

const filteredPosts = computed(() => {
  if (!selectedCategory.value) {
    return allPosts.value;
  }
  return allPosts.value.filter(
    (post) => post.category === selectedCategory.value,
  );
});

const subscribeNewsletter = () => {
  if (emailNewsletter.value) {
    newsletterMessage.value = "SIGNAL_RECEIVED. WELCOME_TO_THE_VOID.";
    emailNewsletter.value = "";
    setTimeout(() => {
      newsletterMessage.value = "";
    }, 3000);
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
  line-height: 1.1 !important;
}
.lh-base {
  line-height: 1.6 !important;
}

.home-noir {
  overflow-x: hidden;
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
