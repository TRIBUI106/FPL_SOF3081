<template>
  <form @submit.prevent="handleSubmit" class="p-0">
    <div class="mb-5">
      <label for="post-title" class="display-font text-acid text-small mb-2"
        >ENTRY_SUBJECT</label
      >
      <input
        id="post-title"
        v-model="formData.title"
        type="text"
        class="form-control fs-2 display-font py-3"
        placeholder="INPUT_STRIKING_HEADLINE..."
        required
      />
    </div>

    <div class="row g-4 mb-5">
      <div class="col-md-6">
        <label
          for="post-category"
          class="display-font text-acid text-small mb-2"
          >ARCHIVE_CLASSIFICATION</label
        >
        <select
          id="post-category"
          v-model="formData.category"
          class="form-control"
          required
        >
          <option value="" disabled>SELECT_CATEGORY</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat.toUpperCase() }}
          </option>
        </select>
      </div>

      <div class="col-md-6">
        <label for="post-image" class="display-font text-acid text-small mb-2"
          >VISUAL_ASSET_URL</label
        >
        <input
          id="post-image"
          v-model="formData.image"
          type="text"
          class="form-control"
          placeholder="HTTPS://SOURCE.VOID/IMG.JPG"
        />
      </div>
    </div>

    <div class="mb-5">
      <label for="post-content" class="display-font text-acid text-small mb-2"
        >DATA_BODY</label
      >
      <textarea
        id="post-content"
        v-model="formData.content"
        class="form-control fs-5"
        rows="12"
        placeholder="ENCODE_YOUR_KNOWLEDGE_STREAM_HERE..."
        required
      ></textarea>
    </div>

    <div class="mb-5">
      <label for="post-tags" class="display-font text-acid text-small mb-2"
        >TAG_INDEX (COMMA_SEPARATED)</label
      >
      <input
        id="post-tags"
        v-model="tagsString"
        type="text"
        class="form-control"
        placeholder="VUEJS, JS_CORE, NEURAL_NET"
      />
    </div>

    <div
      class="d-flex justify-content-between align-items-center pt-5 border-top border-brutal"
    >
      <button
        type="button"
        @click="$emit('cancel')"
        class="btn btn-outline-primary px-5 py-3"
      >
        ABORT_OPERATION
      </button>
      <button type="submit" class="btn btn-primary px-5 py-3 fs-5">
        {{ isEdit ? "UPDATE_ARCHIVE" : "TRANSMIT_ARCHIVE" }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";

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
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit", "cancel"]);

const categories = ["Vue.js", "CSS", "JavaScript", "Web Design", "Backend"];
const formData = ref({ ...props.initialData });
const tagsString = ref(
  props.initialData.tags ? props.initialData.tags.join(", ") : "",
);

watch(
  () => props.initialData,
  (newVal) => {
    formData.value = { ...newVal };
    tagsString.value = newVal.tags ? newVal.tags.join(", ") : "";
  },
  { deep: true },
);

const handleSubmit = () => {
  const finalData = {
    ...formData.value,
    tags: tagsString.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== ""),
    date: props.isEdit ? formData.value.date : new Date(),
  };
  emit("submit", finalData);
};
</script>

<style scoped>
.text-small {
  font-size: 0.8rem;
  letter-spacing: 2px;
}
.form-control::placeholder {
  opacity: 0.3;
}
</style>
