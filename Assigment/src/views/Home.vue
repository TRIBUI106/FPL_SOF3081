<template>
  <div class="home-noir">
    <ScrollReveal>
      <h1 class="visually-hidden">ETHEREAL ARCHIVE // QUANTUM DATA VAULT</h1>
    </ScrollReveal>

    <!-- Cinematic Hero -->
    <section
      class="noir-section position-relative min-vh-100 d-flex align-items-center"
    >
      <div class="container-fluid px-lg-5">
        <ScrollReveal>
          <div class="row align-items-center">
            <div class="col-lg-10">
              <h1
                class="display-font text-white mb-0"
                style="
                  font-size: clamp(3.5rem, 15vw, 10rem);
                  line-height: 1.15;
                  letter-spacing: 0.15em;
                "
              >
                <span class="flicker">ETHEREAL</span><br />
                <span class="text-acid">ARCHIVE.</span>
              </h1>
              <p
                class="display-font text-muted mt-4 opacity-75 max-w-ch"
                style="font-size: clamp(1.2rem, 2vw, 1.8rem); line-height: 1.45"
              >
                // RESEARCH // LOGS // VOIDS <br />
                A SECURE QUANTUM VAULT FOR THE NEXT PARADIGM.
              </p>
              <div class="d-flex flex-wrap gap-4 mt-5">
                <router-link
                  to="/register"
                  class="btn btn-primary btn-lg px-5 hover-node"
                  >INITIALIZE_ENTRY</router-link
                >
                <a
                  href="#archives"
                  class="btn btn-outline-primary btn-lg px-5 hover-node"
                  >ACCESS_DATA</a
                >
              </div>
            </div>
            <div class="col-lg-2 d-none d-lg-block text-end opacity-25">
              <div
                class="display-font text-acid"
                style="
                  writing-mode: vertical-rl;
                  font-size: clamp(1rem, 2vw, 2rem);
                  letter-spacing: 0.2rem;
                "
              >
                STATUS: ONLINE // VERIFIED_NODE
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- Stats Grid -->
    <section class="border-block-end border-brutal bg-surface py-5">
      <div class="container-fluid px-lg-5">
        <div class="row g-0">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="col-md-4 border border-brutal p-5 text-center interaction-card"
          >
            <div
              class="display-font text-acid tracking-wide lh-tight mb-2"
              style="font-size: clamp(2.5rem, 5vw, 4.5rem)"
            >
              {{ stat.value }}
            </div>
            <div
              class="display-font text-muted fs-5 tracking-wide lh-tight opacity-50"
            >
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Sector -->
    <section class="noir-section" id="archives">
      <div class="container-fluid px-lg-5">
        <ScrollReveal>
          <div
            class="d-flex flex-wrap justify-content-between align-items-end mb-5 pb-4 border-block-end border-brutal"
          >
            <h2
              class="display-font text-white mb-0 lh-tight tracking-wide"
              style="font-size: clamp(2rem, 5vw, 3.5rem)"
            >
              LATEST_SIGNALS
            </h2>
            <div class="d-flex flex-wrap gap-2 mt-3 mt-lg-0">
              <button
                v-for="category in categories"
                :key="category"
                @click="
                  selectedCategory =
                    selectedCategory === category ? '' : category
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
        </ScrollReveal>

        <div class="row g-5 mb-5">
          <div v-if="filteredPosts.length > 0" class="col-12">
            <div class="row g-5">
              <div
                v-for="(post, index) in filteredPosts"
                :key="post.id"
                class="col-md-6 col-xl-4 p-perspective"
                :class="{ 'mt-lg-5': index % 2 !== 0 }"
              >
                <ScrollReveal>
                  <PostCard :post="post" />
                </ScrollReveal>
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

    <!-- Subscription Module -->
    <section class="noir-section border-top border-brutal bg-surface">
      <div class="container">
        <ScrollReveal>
          <div class="row justify-content-center py-5">
            <div class="col-lg-8 text-center">
              <h2
                class="display-font text-acid mb-4 lh-tight tracking-wide"
                style="font-size: clamp(2rem, 5vw, 3.5rem)"
              >
                SUBSCRIBE_TO_THE_VOID
              </h2>
              <p
                class="display-font text-muted mb-5 tracking-normal lh-standard max-w-ch mx-auto"
                style="font-size: clamp(1rem, 2vw, 1.2rem)"
              >
                ENCRYPTED UPDATES DIRECTLY TO YOUR NEURAL INTERFACE. JOIN
                15,420+ ARCHIVISTS ALREADY IN THE MESH.
              </p>
              <form
                @submit.prevent="subscribeNewsletter"
                class="input-group input-group-lg shadow-node-vector"
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
                  aria-label="Email subscription"
                />
                <button
                  class="btn btn-primary px-5"
                  type="submit"
                  aria-label="Confirm subscription"
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
        </ScrollReveal>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import PostCard from "../components/PostCard.vue";
import ScrollReveal from "../components/ScrollReveal.vue";
import { getPosts, savePosts } from "../data/postStore.js";
import { posts as defaultPosts } from "../data/posts.js";

const selectedCategory = ref("");
const emailNewsletter = ref("");
const newsletterMessage = ref("");

const categories = ["Vue.js", "CSS", "JavaScript", "Web Design", "Backend"];

const stored = getPosts();
if (!stored) {
  savePosts(defaultPosts);
}

const allPosts = ref(getPosts() || defaultPosts);

const stats = [
  { label: "ENTRIES_STORED", value: allPosts.value.length },
  { label: "NEURAL_LINKS", value: "4.2K+" },
  { label: "SYNC_LATENCY", value: "0.03s" },
];

const filteredPosts = computed(() => {
  if (!selectedCategory.value) return allPosts.value;
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
.lh-tight {
  line-height: 1.15 !important;
}
.lh-standard {
  line-height: 1.45 !important;
}

.interaction-card {
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease;
  cursor: crosshair;
}
.interaction-card:hover {
  background-color: rgba(0, 255, 65, 0.05);
  border-color: var(--accent-primary) !important;
  transform: scale(1.02);
}

.hover-node {
  transition: transform 0.2s cubic-bezier(0.19, 1, 0.22, 1);
}
.hover-node:hover {
  transform: translate3d(0, -4px, 0);
}

.shadow-node-vector {
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
}

.p-perspective {
  perspective: 1200px;
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
