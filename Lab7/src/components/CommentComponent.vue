<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm overflow-hidden mb-5 rounded-4">
          <img src="https://picsum.photos/800/400?grayscale" class="card-img-top" alt="Bài viết" /> 
          <div class="card-body p-4">
            <h2 class="card-title fw-bold text-success mb-3">8 loại rau củ quả giàu canxi</h2> 
            <p class="card-text text-muted lh-lg">
              Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi, 
              trong đó bổ sung qua đường ăn uống là cách tốt nhất. Có 8 loại rau củ giàu canxi... 
            </p>
          </div>
        </div>

        <div class="card border-0 shadow-sm p-4 rounded-4 bg-white">
          <h5 class="fw-bold mb-4">Để lại bình luận:</h5>
          <form @submit.prevent="submitComment"> 
            <div class="mb-3">
              <textarea class="form-control border-0 bg-light p-3 shadow-none" rows="3" 
                        v-model="commentText" placeholder="Nhập bình luận của bạn..."></textarea> 
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-success px-4 fw-bold">Gửi bình luận</button> 
            </div>
          </form>

          <div v-if="comments.length" class="mt-5 anim-fade-in"> [cite: 497]
            <h5 class="fw-bold border-bottom pb-3 mb-4">Danh sách các bình luận ({{ comments.length }})</h5> 
            <div class="comment-item d-flex mb-4" v-for="(comment, index) in comments" :key="index"> 
              <div class="avatar-small me-3 bg-secondary-subtle text-secondary fw-bold rounded-circle">
                {{ comment.name.charAt(0).toUpperCase() }}
              </div>
              <div class="comment-content p-3 bg-light rounded-4 w-100 shadow-sm">
                <span class="fw-bold text-dark d-block">{{ comment.name }}</span> 
                <span class="text-muted">{{ comment.text }}</span> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['username']); 
const commentText = ref('');
const comments = ref([]);

function submitComment() {
  if (commentText.value) {
    comments.value.push({
      name: props.username, 
      text: commentText.value
    });
    commentText.value = '';
  }
}
</script>

<style scoped>
.avatar-small { width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.anim-fade-in { animation: fadeInUp 0.5s ease-out; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
</style>