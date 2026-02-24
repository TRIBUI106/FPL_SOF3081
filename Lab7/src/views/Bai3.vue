<template>
  <div class="container py-5">
    <div class="row g-4 justify-content-center">
      <div class="col-12 col-lg-6">
        <div class="card border-0 shadow-lg custom-card h-100">
          <div class="card-header bg-primary text-white py-4 border-0 rounded-top-4">
            <h3 class="fw-bold mb-0 text-uppercase tracking-wider text-center">
              <i class="bi bi-person-plus-fill me-2"></i>Form Đăng Ký
            </h3>
          </div>
          
          <div class="card-body p-4 p-md-5">
            <form @submit.prevent="register">
              <div class="mb-4">
                <label class="form-label fw-bold text-secondary small">Họ tên:</label>
                <input type="text" class="form-control form-control-lg bg-light border-0 shadow-none" 
                       v-model="form.name" placeholder="Nhập họ tên" required>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold text-secondary small">Email:</label>
                <input type="email" class="form-control form-control-lg bg-light border-0 shadow-none" 
                       v-model="form.email" placeholder="Nhập email" required>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold text-secondary small">Mật khẩu:</label>
                <input type="password" class="form-control form-control-lg bg-light border-0 shadow-none" 
                       v-model="form.password" placeholder="Nhập mật khẩu" required>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold text-secondary small">Ngày sinh:</label>
                <input type="date" class="form-control form-control-lg bg-light border-0 shadow-none" 
                       v-model="form.dob" required>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold text-secondary small d-block">Giới tính:</label>
                <div class="d-flex gap-4 mt-2">
                  <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" value="Nam" v-model="form.gender" id="genderNam">
                    <label class="form-check-label" for="genderNam">Nam</label>
                  </div>
                  <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" value="Nữ" v-model="form.gender" id="genderNu">
                    <label class="form-check-label" for="genderNu">Nữ</label>
                  </div>
                  <div class="form-check custom-radio">
                    <input class="form-check-input" type="radio" value="Khác" v-model="form.gender" id="genderKhac">
                    <label class="form-check-label" for="genderKhac">Khác</label>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold text-secondary small d-block">Ngôn ngữ:</label>
                <div class="d-flex flex-wrap gap-3 mt-2">
                  <div class="form-check custom-checkbox">
                    <input class="form-check-input" type="checkbox" value="Tiếng Việt" v-model="form.languages" id="langVN">
                    <label class="form-check-label" for="langVN">Tiếng Việt</label>
                  </div>
                  <div class="form-check custom-checkbox">
                    <input class="form-check-input" type="checkbox" value="Tiếng Anh" v-model="form.languages" id="langEN">
                    <label class="form-check-label" for="langEN">Tiếng Anh</label>
                  </div>
                  <div class="form-check custom-checkbox">
                    <input class="form-check-input" type="checkbox" value="Tiếng Nhật" v-model="form.languages" id="langJP">
                    <label class="form-check-label" for="langJP">Tiếng Nhật</label>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-lg w-100 fw-bold shadow-sm mt-3">
                Đăng ký <i class="bi bi-check-circle-fill ms-2"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-5">
        <div class="card border-0 shadow-lg custom-card h-100 bg-light">
          <div class="card-body p-4 p-md-5">
            <h3 class="fw-bold text-dark mb-4 border-bottom pb-3">
              Thông tin đã đăng ký:
            </h3>
            
            <div class="display-info anim-fade-in">
              <div class="info-item mb-3">
                <span class="text-muted small text-uppercase d-block">Họ tên:</span>
                <span class="fs-5 fw-bold text-primary">{{ form.name || '---' }}</span>
              </div>
              
              <div class="info-item mb-3">
                <span class="text-muted small text-uppercase d-block">Email:</span>
                <span class="fs-5 fw-bold text-dark">{{ form.email || '---' }}</span>
              </div>

              <div class="info-item mb-3">
                <span class="text-muted small text-uppercase d-block">Ngày sinh:</span>
                <span class="fs-5 fw-bold text-dark">{{ form.dob || '---' }}</span>
              </div>

              <div class="info-item mb-3">
                <span class="text-muted small text-uppercase d-block">Giới tính:</span>
                <span class="fs-5 fw-bold text-dark">{{ form.gender }}</span>
              </div>

              <div class="info-item mb-3">
                <span class="text-muted small text-uppercase d-block">Ngôn ngữ:</span>
                <span class="fs-5 fw-bold text-dark">{{ form.languages.join(', ') || 'Chưa chọn' }}</span>
              </div>
            </div>

            <div v-if="!form.name" class="text-center py-5 opacity-25">
              <i class="bi bi-info-circle display-1"></i>
              <p class="mt-2">Vui lòng nhập thông tin để xem kết quả</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

// Khai báo reactive object để quản lý dữ liệu form 
const form = reactive({
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: 'Nam',
    languages: [] // Dùng mảng cho checkbox nhiều lựa chọn
});

const register = () => {
    // Logic xử lý khi nhấn nút Đăng ký [cite: 389]
    alert('Đăng ký thành công!');
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css");

.custom-card {
  border-radius: 2rem;
}

.form-control:focus {
  background-color: #fff !important;
  border: 1px solid #0d6efd !important;
}

.custom-radio .form-check-input:checked,
.custom-checkbox .form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.info-item {
  padding-bottom: 10px;
  border-bottom: 1px dashed #dee2e6;
}

.info-item:last-child {
  border-bottom: none;
}

.tracking-wider {
  letter-spacing: 1.5px;
}

.anim-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>