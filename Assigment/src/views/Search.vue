<template>
  <div class="noir-section min-vh-100">
    <div class="container-fluid px-lg-5">
      <!-- Search Header -->
      <header class="mb-5 pb-4 border-bottom border-brutal">
        <div
          class="display-font text-acid text-small mb-2 flicker tracking-wide lh-tight"
        >
          // ARCHIVE_QUERY_TERMINAL
        </div>
        <h1
          class="display-font text-white mb-4 tracking-wide lh-tight"
          style="font-size: clamp(3rem, 10vw, 6rem)"
        >
          EXPLORE_VOIDS
        </h1>

        <div class="row g-4 align-items-end">
          <div class="col-lg-8">
            <div class="input-group input-group-lg shadow-brutal">
              <label for="archive-search" class="visually-hidden"
                >Search Keyword</label
              >
              <input
                id="archive-search"
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="KEYWORD_SEARCH..."
                @keyup.enter="performSearch"
              />
              <button
                @click="performSearch"
                class="btn btn-primary px-5"
                aria-label="Execute search"
              >
                EXECUTE
              </button>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="d-flex gap-3">
              <div class="w-100">
                <label
                  for="sort-select"
                  class="display-font text-acid text-tiny mb-2 d-block tracking-wide lh-tight"
                  >SORT_BY</label
                >
                <select id="sort-select" v-model="sortBy" class="form-control">
                  <option value="recent">NEWEST</option>
                  <option value="popular">MOST_ACCESSED</option>
                  <option value="oldest">OLDEST_DATA</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="row g-5">
        <!-- Filters Sidebar -->
        <div class="col-lg-3">
          <div class="sticky-top" style="top: 120px">
            <div class="mb-5 border border-brutal p-4 bg-surface shadow-brutal">
              <h3
                class="display-font text-acid text-small mb-4 pb-2 border-bottom border-brutal-dim tracking-wide lh-tight"
              >
                // FILTERS
              </h3>

              <div class="mb-4">
                <span
                  class="display-font text-muted text-tiny mb-3 d-block tracking-wide lh-tight"
                  >CATEGORIES</span
                >
                <div class="d-flex flex-column gap-2">
                  <button
                    v-for="category in categories"
                    :key="category"
                    @click="
                      selectedCategory =
                        selectedCategory === category ? '' : category
                    "
                    :class="[
                      'btn text-start display-font text-small',
                      selectedCategory === category
                        ? 'btn-primary'
                        : 'text-muted hover-acid',
                    ]"
                    :aria-label="'Filter by ' + category"
                  >
                    [{{ category.toUpperCase() }}]
                  </button>
                </div>
              </div>

              <button
                @click="resetFilters"
                class="btn btn-outline-primary btn-sm w-100 mt-4 py-3"
              >
                RESET_FILTERS
              </button>
            </div>

            <div
              class="display-font text-muted text-tiny opacity-25 mt-5 tracking-wide lh-tight"
            >
              SEARCH_STATUS: {{ searchPerformed ? "ACTIVE" : "IDLE" }}<br />
              RESULT_COUNT: {{ filteredPosts.length }}
            </div>
          </div>
        </div>

        <!-- Results Flow -->
        <div class="col-lg-9 border-start border-brutal ps-lg-5">
          <div v-if="searchPerformed">
            <div v-if="filteredPosts.length > 0">
              <div class="row g-5">
                <div
                  v-for="post in filteredPosts"
                  :key="post.id"
                  class="col-md-6"
                >
                  <!-- Reusing the logic from PostCard but styled for search results -->
                  <div
                    class="card h-100 p-0 border-brutal shadow-brutal-hover overflow-hidden group"
                  >
                    <div
                      class="card-img-container border-bottom border-brutal overflow-hidden"
                      style="height: 200px"
                    >
                      <img
                        :src="post.image"
                        class="w-100 h-100 object-fit-cover grayscale group-hover-clear"
                        alt="Post visual"
                      />
                    </div>
                    <div class="card-body p-4 bg-surface d-flex flex-column">
                      <div
                        class="d-flex justify-content-between text-acid display-font text-tiny mb-3 opacity-50 tracking-wide lh-tight"
                      >
                        <span>{{ post.category.toUpperCase() }}</span>
                        <span>{{ post.date }}</span>
                      </div>
                      <h3
                        class="display-font fs-4 text-white mb-3 tracking-wide lh-tight group-hover-acid transition"
                      >
                        {{ post.title.toUpperCase() }}
                      </h3>
                      <router-link
                        :to="'/post/' + post.id"
                        class="btn btn-outline-primary w-100 mt-auto py-3"
                        >DECRYPT_FILE</router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="py-5 text-center">
              <div
                class="display-font fs-1 text-muted opacity-25 flicker tracking-wide lh-tight"
              >
                NO_MATCHING_DATA_SIGNALS
              </div>
            </div>
          </div>

          <div v-else class="py-5 text-center opacity-50">
            <div
              class="display-font text-muted mb-4 flicker opacity-25 tracking-wide lh-tight"
              style="font-size: clamp(4rem, 15vw, 10rem)"
            >
              SEARCH
            </div>
            <p class="display-font fs-4 text-muted tracking-wide lh-tight">
              WAITING_FOR_QUERYINPUT...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { posts as defaultPosts } from "../data/posts.js";
import { getPosts } from "../data/postStore.js";

const searchQuery = ref("");
const searchPerformed = ref(false);
const selectedCategory = ref("");
const sortBy = ref("recent");

const categories = ["Vue.js", "CSS", "JavaScript", "Web Design", "Backend"];

const allPosts = computed(() => getPosts() || defaultPosts);

const filteredPosts = computed(() => {
  let results = allPosts.value;
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    results = results.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }
  if (selectedCategory.value) {
    results = results.filter(
      (post) => post.category === selectedCategory.value,
    );
  }
  if (sortBy.value === "popular") {
    results = [...results].sort(() => Math.random() - 0.5);
  } else if (sortBy.value === "oldest") {
    results = [...results].sort((a, b) => new Date(a.date) - new Date(b.date));
  } else {
    results = [...results].sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return results;
});

const performSearch = () => {
  searchPerformed.value = true;
};
const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  searchPerformed.value = false;
};
</script>

<style scoped>
.grayscale {
  filter: grayscale(1) contrast(1.2);
  transition: filter 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
.bg-surface {
  background-color: var(--bg-surface) !important;
}
.group:hover .group-hover-clear {
  filter: grayscale(0) contrast(1);
}
.shadow-brutal-hover {
  transition:
    transform 0.3s cubic-bezier(0.19, 1, 0.22, 1),
    box-shadow 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}
.shadow-brutal-hover:hover {
  transform: translate3d(0, -8px, 0);
  box-shadow: 0px 8px 16px 0px rgba(0, 255, 65, 0.4);
}
.group-hover-acid:hover {
  color: var(--accent-primary) !important;
}
.group:hover .group-hover-acid {
  color: var(--accent-primary) !important;
}
.text-tiny {
  font-size: 0.7rem;
}
.text-small {
  font-size: 0.85rem;
}
.border-brutal-dim {
  border-color: rgba(224, 224, 255, 0.05) !important;
}
.tracking-wide {
  letter-spacing: 0.15em !important;
}
.lh-tight {
  line-height: 1.1 !important;
}
.lh-base {
  line-height: 1.6 !important;
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
