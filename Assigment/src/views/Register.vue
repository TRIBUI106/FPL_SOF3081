<template>
  <div class="container-fluid p-0 overflow-hidden">
    <div class="row g-0 min-vh-100">
      <!-- Left: Stark Brutalist Form -->
      <div
        class="col-lg-5 d-flex align-items-center bg-deep border-end border-brutal order-2 order-lg-1"
      >
        <div class="w-100 p-5 px-lg-6">
          <div class="form-wrapper max-w-400 mx-auto">
            <div class="mb-5 border-start border-neon border-4 ps-4">
              <h2 class="display-font text-white fs-1 mb-2">GENERATE</h2>
              <p class="display-font text-muted text-small mb-0">
                CREATE_NEW_ENTITY_IDENTITY
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

            <form @submit.prevent="handleRegister">
              <div class="mb-4">
                <label
                  for="reg-name"
                  class="display-font text-acid text-small mb-2"
                  >FULL_ENTITY_NAME</label
                >
                <input
                  id="reg-name"
                  v-model="user.name"
                  type="text"
                  class="form-control"
                  placeholder="YOUR_NAME"
                  required
                />
                <small
                  v-if="errors.name"
                  class="text-neon text-small mt-1 d-block"
                  >{{ errors.name }}</small
                >
              </div>

              <div class="mb-4">
                <label
                  for="reg-email"
                  class="display-font text-acid text-small mb-2"
                  >CONTACT_EMAIL</label
                >
                <input
                  id="reg-email"
                  v-model="user.email"
                  type="email"
                  class="form-control"
                  placeholder="EMAIL@VOID.NET"
                  required
                />
                <small
                  v-if="errors.email"
                  class="text-neon text-small mt-1 d-block"
                  >{{ errors.email }}</small
                >
              </div>

              <div class="row mb-4">
                <div class="col-6">
                  <label
                    for="reg-password"
                    class="display-font text-acid text-small mb-2"
                    >SECRET_KEY</label
                  >
                  <input
                    id="reg-password"
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div class="col-6">
                  <label
                    for="reg-confirm"
                    class="display-font text-acid text-small mb-2"
                    >RE_CONFIRM</label
                  >
                  <input
                    id="reg-confirm"
                    v-model="user.confirmPassword"
                    type="password"
                    class="form-control"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div class="col-12">
                  <small
                    v-if="errors.password || errors.confirmPassword"
                    class="text-neon text-small mt-1 d-block"
                  >
                    {{ errors.password || errors.confirmPassword }}
                  </small>
                </div>
              </div>

              <div class="mb-5 border border-brutal p-3">
                <div class="form-check">
                  <input
                    v-model="agreeTerms"
                    class="form-check-input bg-deep border-acid"
                    type="checkbox"
                    id="terms"
                  />
                  <label
                    class="form-check-label display-font text-muted text-small ms-2"
                    for="terms"
                  >
                    I_AGREE_TO_THE_VOID_PROTOCOLS
                  </label>
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100 btn-lg mb-4 py-3"
                :disabled="isLoading || !agreeTerms"
              >
                {{ isLoading ? "GENERATING..." : "INITIALIZE_ENTITY" }}
              </button>

              <div class="text-center mt-5">
                <p class="display-font text-muted text-small">
                  ALREADY_VERIFIED?
                  <router-link
                    to="/login"
                    class="text-acid text-decoration-none hover-neon ms-2"
                    >ACCESS_PORTAL</router-link
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Right: Cinematic Tension -->
      <div
        class="col-lg-7 d-none d-lg-block position-relative order-1 order-lg-2"
      >
        <div class="cinematic-visual w-100 h-100 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=2070&auto=format&fit=crop"
            class="w-100 h-100 object-fit-cover grayscale-neon opacity-50 f-reveal"
            alt="Noir visual"
          />
          <div
            class="overlay-gradient-left position-absolute top-0 left-0 w-100 h-100"
          ></div>
          <div class="position-absolute bottom-0 right-0 p-5 w-100 text-end">
            <h1
              class="display-font text-white mb-0"
              style="font-size: 8rem; line-height: 0.8"
            >
              <span class="flicker">GENESIS.</span><br />
              PROTOCOL.
            </h1>
            <p class="display-font fs-3 text-neon mt-4 opacity-75">
              // ARCHIVE_NODE_CREATION. STAND_BY.
            </p>
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
const user = ref({ name: "", email: "", password: "", confirmPassword: "" });
const agreeTerms = ref(false);
const isLoading = ref(false);
const message = ref("");
const messageType = ref("");
const errors = ref({ name: "", email: "", password: "", confirmPassword: "" });

const handleRegister = async () => {
  errors.value = { name: "", email: "", password: "", confirmPassword: "" };
  message.value = "";

  if (!user.value.name.trim()) {
    errors.value.name = "name required";
    return;
  }
  if (!user.value.email.trim()) {
    errors.value.email = "email required";
    return;
  }
  if (user.value.password.length < 8) {
    errors.value.password = "min 8 chars";
    return;
  }
  if (user.value.password !== user.value.confirmPassword) {
    errors.value.confirmPassword = "mismatch";
    return;
  }

  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newAccount = {
    name: user.value.name,
    email: user.value.email,
    password: user.value.password,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem("userAccount", JSON.stringify(newAccount));
  localStorage.setItem("isLoggedIn", "true");

  message.value = "entity generated";
  messageType.value = "success";

  setTimeout(() => router.push("/profile"), 1000);
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
  background: linear-gradient(to left, transparent 50%, var(--bg-deep) 100%);
}
.grayscale-neon {
  filter: grayscale(1) contrast(1.2) sepia(0.5) hue-rotate(280deg);
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
.form-check-input:checked {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
}
</style>
