<template>
  <form @submit.prevent="handleSubmit" class="post-form">
    <div class="form-group">
      <label for="title">Tiêu đề bài viết</label>
      <input 
        v-model="formData.title" 
        type="text" 
        id="title" 
        placeholder="Nhập tiêu đề hấp dẫn..." 
        required 
      />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="category">Danh mục</label>
        <select v-model="formData.category" id="category" required>
          <option value="" disabled>Chọn danh mục</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="image">URL Hình ảnh</label>
        <input 
          v-model="formData.image" 
          type="text" 
          id="image" 
          placeholder="https://example.com/image.jpg" 
        />
      </div>
    </div>

    <div class="form-group">
      <label for="content">Nội dung</label>
      <textarea 
        v-model="formData.content" 
        id="content" 
        rows="10" 
        placeholder="Chia sẻ kiến thức của bạn ở đây..." 
        required
      ></textarea>
    </div>

    <div class="form-group">
      <label>Tags (Phân cách bằng dấu phẩy)</label>
      <input 
        v-model="tagsString" 
        type="text" 
        placeholder="vuejs, javascript, frontend" 
      />
    </div>

    <div class="form-actions">
      <button type="button" @click="$emit('cancel')" class="btn btn-secondary">
        Hủy bỏ
      </button>
      <button type="submit" class="btn btn-primary">
        {{ isEdit ? 'Cập nhật bài viết' : 'Đăng bài viết' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      content: '',
      category: '',
      image: 'https://picsum.photos/800/500?random=' + Math.floor(Math.random() * 100),
      tags: []
    })
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

const categories = ["Vue.js", "CSS", "JavaScript", "Web Design", "Backend"];
const formData = ref({ ...props.initialData });
const tagsString = ref(props.initialData.tags ? props.initialData.tags.join(', ') : '');

watch(() => props.initialData, (newVal) => {
  formData.value = { ...newVal };
  tagsString.value = newVal.tags ? newVal.tags.join(', ') : '';
}, { deep: true });

const handleSubmit = () => {
  const finalData = {
    ...formData.value,
    tags: tagsString.value.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    date: props.isEdit ? formData.value.date : new Date()
  };
  emit('submit', finalData);
};
</script>

<style scoped>
.post-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 700;
  color: var(--color-text);
  font-size: 0.9rem;
}

input, select, textarea {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition);
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
}

textarea {
  resize: vertical;
  min-height: 200px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
