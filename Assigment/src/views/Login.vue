<template>
  <div class="container-fluid p-0 overflow-hidden">
    <div class="row g-0 min-vh-100">
      <!-- Left: Cinematic Tension -->
      <div class="col-lg-7 d-none d-lg-block position-relative">
        <div class="cinematic-visual w-100 h-100 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
            class="w-100 h-100 object-fit-cover grayscale opacity-50 f-reveal"
            alt="Noir visual"
          />
          <div
            class="overlay-gradient position-absolute top-0 left-0 w-100 h-100"
          ></div>
          <div class="position-absolute bottom-0 left-0 p-5 w-100">
            <h1
              class="display-font text-white mb-0"
              style="font-size: 8rem; line-height: 0.8"
            >
              <span class="flicker">IDENTITY.</span><br />
              VERIFICATION.
            </h1>
            <p class="display-font fs-3 text-acid mt-4 opacity-75">
              // ACCESS_POINT_01. LOGIN_REQUIRED.
            </p>
          </div>
        </div>
      </div>

      <!-- Right: Stark Brutalist Form -->
      <div
        class="col-lg-5 d-flex align-items-center bg-deep border-start border-brutal"
      >
        <div class="w-100 p-5 px-lg-6">
          <div class="form-wrapper max-w-400 mx-auto">
            <div class="mb-5 border-start border-acid border-4 ps-4">
              <h2 class="display-font text-white fs-1 mb-2">INITIALIZE</h2>
              <p class="display-font text-muted text-small mb-0">
                ENTER_CREDENTIALS_TO_PROCEED
              </p>
            </div>

            <div
              v-if="message"
              :class="[
                'alert display-font text-small p-3 border-brutal mb-4',
                messageType === 'error' ? 'text-neon' : 'text-acid',
              ]"
            >
              // {{ message.toUpperCase() }}
            </div>

            <form @submit.prevent="handleLogin" class="needs-validation">
              <div class="mb-4">
                <label
                  for="auth-email"
                  class="display-font text-acid text-small mb-2"
                  >AUTH_EMAIL</label
                >
                <input
                  id="auth-email"
                  v-model="loginData.email"
                  type="email"
                  class="form-control"
                  placeholder="USER@ETHEREAL.VOID"
                  required
                />
              </div>

              <div class="mb-5">
                <label
                  for="auth-password"
                  class="display-font text-acid text-small mb-2 d-flex justify-content-between w-100"
                >
                  <span>SECRET_KEY</span>
                  <a href="#" class="text-muted text-decoration-none hover-acid"
                    >FORGOT?</a
                  >
                </label>
                <div class="position-relative">
                  <input
                    id="auth-password"
                    v-model="loginData.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control pe-5"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    class="btn btn-link position-absolute end-0 top-0 h-100 text-muted"
                    @click="showPassword = !showPassword"
                  >
                    <i
                      :class="[
                        'bi',
                        showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill',
                      ]"
                    ></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100 btn-lg mb-4 py-3"
                :disabled="isLoading"
              >
                {{ isLoading ? "SYNCING..." : "ESTABLISH_CONNECTION" }}
              </button>

              <div class="row g-2 mb-4">
                <div class="col-6">
                  <button
                    type="button"
                    class="btn btn-outline-primary w-100 py-2"
                  >
                    G_HUB
                  </button>
                </div>
                <div class="col-6">
                  <button
                    type="button"
                    class="btn btn-outline-primary w-100 py-2"
                  >
                    G_OGLE
                  </button>
                </div>
              </div>

              <div class="text-center mt-5">
                <p class="display-font text-muted text-small">
                  NO_ACCOUNT?
                  <router-link
                    to="/register"
                    class="text-acid text-decoration-none hover-neon ms-2"
                    >GENERATE_IDENTITY</router-link
                  >
                </p>
              </div>

              <!-- Demo Access Hint -->
              <div
                class="mt-5 border border-brutal p-3 opacity-50 hover-opacity-100 transition"
              >
                <p class="text-small text-acid mb-1 display-font">
                  // BYPASS_GUEST_ACCESS
                </p>
                <code class="text-muted fs-6"
                  >USER: demo@example.com / PASS: demo123</code
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loginData = ref({ email: "", password: "" });
const showPassword = ref(false);
const isLoading = ref(false);
const message = ref("");
const messageType = ref("");

const handleLogin = async () => {
  message.value = "";
  isLoading.value = true;

  if (!loginData.value.email || !loginData.value.password) {
    message.value = "credentials required";
    messageType.value = "error";
    isLoading.value = false;
    return;
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Demo account check
  if (
    loginData.value.email === "demo@example.com" &&
    loginData.value.password === "demo123"
  ) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "userAccount",
      JSON.stringify({
        name: "Demo User",
        email: loginData.value.email,
        password: loginData.value.password,
      }),
    );
    message.value = "session established";
    messageType.value = "success";
    setTimeout(() => router.push("/profile"), 500);
  } else {
    const savedAccount = JSON.parse(
      localStorage.getItem("userAccount") || "null",
    );
    if (
      savedAccount &&
      savedAccount.email === loginData.value.email &&
      savedAccount.password === loginData.value.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      message.value = "session established";
      messageType.value = "success";
      setTimeout(() => router.push("/profile"), 500);
    } else {
      message.value = "access denied";
      messageType.value = "error";
    }
  }
  isLoading.value = false;
};
</script>

<style scoped>
.cinematic-visual::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, transparent 50%, var(--bg-deep) 100%);
}
.grayscale {
  filter: grayscale(1) contrast(1.1);
}
.max-w-400 {
  max-width: 400px;
}
.text-small {
  font-size: 0.75rem;
  letter-spacing: 2px;
}
.hover-acid:hover {
  color: var(--accent-primary) !important;
}
.hover-neon:hover {
  color: var(--accent-secondary) !important;
}
.transition {
  transition: all 0.3s ease;
}
.hover-opacity-100:hover {
  opacity: 1 !important;
}
@keyframes reveal {
  from {
    transform: scale(1.1);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 0.5;
  }
}
.f-reveal {
  animation: reveal 2s cubic-bezier(0.19, 1, 0.22, 1);
}
</style>
