<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <div class="card border-0 shadow-lg custom-card">
          <div class="card-header bg-primary text-white text-center py-5 border-0 rounded-top-4">
            <h2 class="fw-bold mb-1 text-uppercase tracking-wider">Quản lý công việc</h2>
            <p class="mb-0 opacity-75 fw-light">Lab 7 - Event Handling & List Rendering</p>
          </div>

          <div class="card-body p-4 p-md-5">
            <form @submit.prevent="handleSubmit" class="mb-5">
              <label class="form-label fw-bold text-secondary mb-2 ms-1">
                <i class="bi" :class="isEditing ? 'bi-pencil-square' : 'bi-plus-circle'"></i> 
                {{ isEditing ? 'Chỉnh sửa công việc' : 'Tên công việc mới' }}
              </label>
              <div class="input-group input-group-lg shadow-sm rounded-3 overflow-hidden">
                <input
                  type="text"
                  class="form-control border-0 shadow-none custom-input"
                  v-model="newTodo"
                  :placeholder="isEditing ? 'Nhập nội dung mới...' : 'Ví dụ: Đi tập gym...'"
                  ref="todoInput"
                />
                <button 
                  class="btn fw-bold px-4 transition-all" 
                  :class="isEditing ? 'btn-warning' : 'btn-primary'"
                  type="submit"
                >
                  {{ isEditing ? 'Cập nhật' : 'Thêm' }} 
                  <i class="bi ms-1" :class="isEditing ? 'bi-check-all' : 'bi-send-fill'"></i>
                </button>
                <button v-if="isEditing" class="btn btn-light border-start" type="button" @click="cancelEdit">
                  Hủy
                </button>
              </div>
            </form>

            <div class="mb-4">
              <div class="input-group shadow-sm rounded-pill overflow-hidden border">
                <span class="input-group-text bg-white border-0 ps-3">
                  <i class="bi bi-search text-muted"></i>
                </span>
                <input 
                  type="text" 
                  class="form-control border-0 shadow-none py-2" 
                  v-model="searchQuery"
                  placeholder="Tìm kiếm công việc..."
                />
              </div>
            </div>

            <div class="d-flex align-items-center mb-4">
              <h5 class="fw-bold mb-0 me-3">Danh sách cần làm</h5>
              <div class="flex-grow-1 border-bottom opacity-25"></div>
            </div>

            <div class="todo-list">
              <transition-group name="list">
                <div
                  class="todo-item d-flex justify-content-between align-items-center p-4 mb-3 rounded-4 shadow-sm"
                  v-for="(job, index) in filteredJobs"
                  :key="job"
                >
                  <div class="d-flex align-items-center">
                    <div class="status-box me-3">
                       <i class="bi bi-check-circle-fill text-primary"></i>
                    </div>
                    <span class="fw-medium text-dark fs-5">{{ job }}</span>
                  </div>
                  
                  <div class="action-buttons">
                    <button
                      class="btn btn-light btn-sm border-0 rounded-circle edit-btn me-2"
                      @click="editList(job)"
                      title="Sửa"
                    >
                      <i class="bi bi-pencil-fill text-warning"></i>
                    </button>
                    <button
                      class="btn btn-light btn-sm border-0 rounded-circle delete-btn"
                      @click="removeList(job)"
                      title="Xóa"
                    >
                      <i class="bi bi-trash-fill text-danger"></i>
                    </button>
                  </div>
                </div>
              </transition-group>
            </div>

            <div v-if="filteredJobs.length === 0" class="text-center py-5 my-3">
              <i class="bi bi-clipboard-x display-1 text-primary opacity-25"></i>
              <p class="text-muted mt-3 fs-5 italic">
                {{ searchQuery ? 'Không tìm thấy công việc phù hợp.' : 'Danh sách đang trống.' }}
              </p>
            </div>
          </div>

          <div class="card-footer bg-light border-0 py-4 text-center rounded-bottom-4">
            <span class="badge bg-white text-primary border shadow-sm rounded-pill px-4 py-2 fs-6">
              <i class="bi bi-activity me-1"></i> 
              {{ searchQuery ? 'Tìm thấy:' : 'Tổng cộng:' }} <strong>{{ filteredJobs.length }}</strong> mục
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Dữ liệu
const newTodo = ref("");
const searchQuery = ref("");
const jobs = ref(["Ăn sáng", "Đi học", "Chơi bóng rổ"]);

// Trạng thái chỉnh sửa
const isEditing = ref(false);
const oldTodoValue = ref("");
const todoInput = ref(null);

// Xử lý Tìm kiếm (Computed Property)
const filteredJobs = computed(() => {
  return jobs.value.filter(job => 
    job.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Xử lý Thêm hoặc Cập nhật
const handleSubmit = () => {
  const value = newTodo.value.trim();
  if (!value) return;

  if (isEditing.value) {
    // Logic Sửa
    const index = jobs.value.indexOf(oldTodoValue.value);
    if (index !== -1) {
      jobs.value[index] = value;
    }
    cancelEdit();
  } else {
    // Logic Thêm
    if (!jobs.value.includes(value)) {
      jobs.value.unshift(value);
      newTodo.value = "";
    } else {
      alert("Công việc này đã tồn tại!");
    }
  }
};

// Bắt đầu chỉnh sửa
const editList = (job) => {
  isEditing.value = true;
  newTodo.value = job;
  oldTodoValue.value = job;
  todoInput.value.focus(); // Tự động focus vào ô nhập
};

// Hủy chỉnh sửa
const cancelEdit = () => {
  isEditing.value = false;
  newTodo.value = "";
  oldTodoValue.value = "";
};

// Xóa công việc
const removeList = (job) => {
  if (confirm(`Bạn có chắc muốn xóa "${job}"?`)) {
    const index = jobs.value.indexOf(job);
    if (index !== -1) {
      jobs.value.splice(index, 1);
    }
    if (isEditing.value && oldTodoValue.value === job) {
      cancelEdit();
    }
  }
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css");

.custom-card { border-radius: 2rem; background: #ffffff; }

.custom-input {
  border-radius: 1rem 0 0 1rem !important;
  background-color: #f8f9fa;
  padding-left: 1.5rem;
}

.custom-input:focus { background-color: #ffffff; }

.todo-item {
  background: #ffffff;
  border: 1px solid #f1f3f5;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.todo-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important;
  border-color: #0d6efd;
}

.edit-btn:hover { background-color: #fffbeb !important; }
.delete-btn:hover { background-color: #fff5f5 !important; }

.transition-all { transition: all 0.3s ease; }

/* Animation List */
.list-enter-active, .list-leave-active { transition: all 0.5s ease; }
.list-enter-from { opacity: 0; transform: scale(0.9); }
.list-leave-to { opacity: 0; transform: translateX(50px); }

.tracking-wider { letter-spacing: 2px; }
</style>