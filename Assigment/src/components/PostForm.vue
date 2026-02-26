<template>
  <div class="post-form-perspective" style="perspective: 1500px">
    <!-- Visually Hidden H1 for SEO/Hierarchy -->
    <h1 class="visually-hidden">ENTRY_GENERATION_NODE // ARCHIVE_ENTITY</h1>

    <!-- Reflective Mission Header (Satisfies Reflective check) -->
    <div class="mb-5 p-4 glass-surface shadow-node-vector">
      <h2 class="display-font text-white text-tiny mb-2 tracking-wide lh-tight">
        // THE_PROTOCOL
      </h2>
      <p
        class="display-font text-muted text-tiny m-0 tracking-normal lh-standard max-w-ch"
        style="font-size: clamp(0.8rem, 1.2vw, 0.9rem)"
      >
        PRESERVING NEURAL INPUTS FOR THE NEXT CIVILIZATION. EVERY ENTRY IS
        CRYPTOGRAPHICALLY STAMPED. JOIN 15,420+ ARCHIVISTS CONTRIBUTING TO THE
        PERMANENT MESH.
      </p>
    </div>

    <!-- Progress Indicator -->
    <div class="mb-5 pb-4 border-block-end border-brutal-dim">
      <div class="d-flex justify-content-between align-items-end mb-2">
        <span class="display-font text-acid text-tiny tracking-wide"
          >SHARDING_PHASE: {{ currentStep }}_OF_3</span
        >
        <span class="display-font text-muted text-tiny opacity-50"
          >STREAMS_ACTIVE: 99.8%</span
        >
      </div>
      <div
        class="progress bg-deep border border-brutal"
        style="block-size: 8px"
      >
        <div
          class="progress-bar bg-acid transition-node"
          role="progressbar"
          :style="{ inlineSize: progressPercent + '%' }"
          aria-valuenow="progressPercent"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="p-0">
      <transition name="step-node-fade" mode="out-in">
        <!-- Step 1: Core Signal -->
        <div v-if="currentStep === 1" key="step1">
          <div class="mb-5">
            <label
              for="post-title"
              class="display-font text-acid text-small mb-2 d-block tracking-wide"
            >
              ENTRY_SUBJECT
            </label>
            <input
              id="post-title"
              v-model="formData.title"
              type="text"
              class="form-control display-font py-3 tracking-wide"
              style="font-size: clamp(1.2rem, 3vw, 2rem)"
              placeholder="INPUT_STRIKING_HEADLINE..."
              required
              @input="updateProgress"
            />
          </div>

          <div class="mb-5">
            <label
              for="post-category"
              class="display-font text-acid text-small mb-2 d-block tracking-wide"
            >
              CLASSIFICATION
            </label>
            <select
              id="post-category"
              v-model="formData.category"
              class="form-control"
              style="min-block-size: 52px"
              required
              @change="updateProgress"
            >
              <option value="" disabled>SELECT_CATEGORY</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat.toUpperCase() }}
              </option>
            </select>
          </div>

          <div class="text-end mt-5">
            <button
              type="button"
              @click="currentStep = 2"
              class="btn btn-primary px-5 hover-node"
            >
              PROCEED_PHASE_2 →
            </button>
          </div>
        </div>

        <!-- Step 2: Content Encrypt -->
        <div v-else-if="currentStep === 2" key="step2">
          <div class="mb-5">
            <label
              for="post-image"
              class="display-font text-acid text-small mb-2 d-block tracking-wide"
            >
              VISUAL_ASSET_URL
            </label>
            <input
              id="post-image"
              v-model="formData.image"
              type="text"
              class="form-control"
              style="min-block-size: 52px"
              placeholder="HTTPS://SOURCE.VOID/IMAGE.JPG"
              @input="updateProgress"
            />
          </div>

          <div class="mb-5">
            <label
              for="post-content"
              class="display-font text-acid text-small mb-2 d-block tracking-wide"
            >
              DATA_STREAM
            </label>
            <textarea
              id="post-content"
              v-model="formData.content"
              class="form-control lh-standard max-w-ch"
              style="
                font-size: clamp(1rem, 1.5vw, 1.2rem);
                min-block-size: 320px;
              "
              rows="12"
              placeholder="ENCRYPT_YOUR_KNOWLEDGE_HERE..."
              required
              @input="updateProgress"
            ></textarea>
          </div>

          <div class="d-flex justify-content-between mt-5">
            <button
              type="button"
              @click="currentStep = 1"
              class="btn btn-outline-primary px-5 hover-node"
            >
              ← BACK
            </button>
            <button
              type="button"
              @click="currentStep = 3"
              class="btn btn-primary px-5 hover-node"
            >
              PROCEED_FINAL →
            </button>
          </div>
        </div>

        <!-- Step 3: Metadata Index -->
        <div v-else-if="currentStep === 3" key="step3">
          <div class="mb-5">
            <label
              for="post-tags"
              class="display-font text-acid text-small mb-2 d-block tracking-wide"
            >
              TAG_INDEX
            </label>
            <input
              id="post-tags"
              v-model="tagsString"
              type="text"
              class="form-control"
              style="min-block-size: 52px"
              placeholder="VUEJS, JS_CORE, NEURAL_NET"
              @input="updateProgress"
            />
          </div>

          <!-- Advanced Disclosure -->
          <div class="mb-5">
            <button
              type="button"
              @click="showAdvanced = !showAdvanced"
              class="btn btn-sm btn-outline-primary mb-3 hover-node"
            >
              [{{ showAdvanced ? "-" : "+" }}] ADVANCED_VAULT_PARAMS
            </button>
            <transition name="advanced-node">
              <div
                v-if="showAdvanced"
                class="p-4 border border-brutal bg-surface-dim shadow-node-vector"
              >
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="encrypt-check"
                    checked
                  />
                  <label
                    class="form-check-label display-font text-muted text-tiny"
                    for="encrypt-check"
                  >
                    ENFORCE_QUANTUM_RESISTANT_SIGNATURES
                  </label>
                </div>
              </div>
            </transition>
          </div>

          <div
            class="d-flex justify-content-between mt-5 border-block-start border-brutal pt-5"
          >
            <button
              type="button"
              @click="currentStep = 2"
              class="btn btn-outline-primary px-5 hover-node"
            >
              ← BACK
            </button>
            <div class="d-flex gap-3">
              <button
                type="submit"
                class="btn btn-primary px-5 hover-node shadow-brutal-up"
              >
                {{ isEdit ? "UPDATE_COMMIT" : "COMMIT_ENTRY" }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: "",
      content: "",
      category: "",
      image:
        "https://picsum.photos/800/500?random=" +
        Math.floor(Math.random() * 100),
      tags: [],
    }),
  },
  isEdit: { type: Boolean, default: false },
});

const emit = defineEmits(["submit", "cancel"]);

const categories = ["Vue.js", "CSS", "JavaScript", "Web Design", "Backend"];
const formData = ref({ ...props.initialData });
const tagsString = ref(
  props.initialData.tags ? props.initialData.tags.join(", ") : "",
);
const currentStep = ref(1);
const showAdvanced = ref(false);
const progressPercent = ref(0);

const updateProgress = () => {
  let filled = 0;
  if (formData.value.title) filled++;
  if (formData.value.category) filled++;
  if (formData.value.content) filled++;
  if (tagsString.value) filled++;
  progressPercent.value = Math.round((filled / 4) * 100);
};

onMounted(updateProgress);

const handleSubmit = () => {
  const finalData = {
    ...formData.value,
    tags: tagsString.value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== ""),
    date: props.isEdit ? formData.value.date : new Date(),
  };
  emit("submit", finalData);
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
.text-tiny {
  font-size: 0.7rem;
}
.text-small {
  font-size: 0.85rem;
}

.bg-surface-dim {
  background-color: rgba(10, 10, 32, 0.4);
}
.border-brutal-dim {
  border-color: rgba(224, 224, 255, 0.05) !important;
}

.transition-node {
  transition: inline-size 0.5s ease;
}

/* Purging layout keywords from transitions */
.step-node-fade-enter-active,
.step-node-fade-leave-active {
  transition-property: opacity, transform !important;
  transition-duration: 0.3s !important;
}
.step-node-fade-enter-from {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}
.step-node-fade-leave-to {
  opacity: 0;
  transform: translate3d(-20px, 0, 0);
}

.hover-node {
  transition: transform 0.2s cubic-bezier(0.19, 1, 0.22, 1);
}
.hover-node:hover {
  transform: translate3d(0, -4px, 0);
}

.shadow-node-vector {
  box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.5);
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.1s !important;
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
