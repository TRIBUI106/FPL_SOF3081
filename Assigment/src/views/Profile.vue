<template>
  <div class="container-fluid p-0">
    <!-- Cinematic Header -->
    <header
      class="noir-section border-bottom border-brutal bg-surface pt-5 pb-0"
    >
      <div class="container-fluid px-lg-5">
        <div class="row align-items-end">
          <div class="col-lg-8 mb-5">
            <div class="display-font text-acid text-small mb-4 flicker">
              // PROFILE_VERIFICATION_COMPLETE
            </div>
            <h1
              class="display-font text-white mb-2"
              style="font-size: clamp(3rem, 8vw, 6rem); line-height: 0.9"
            >
              {{ userForm.name.toUpperCase() }}
            </h1>
            <p class="display-font text-muted fs-4">
              IDENTITY_SYNCED_SINCE: {{ memberSince }}
            </p>
          </div>
          <div class="col-lg-4 text-center text-lg-end mb-5">
            <div
              class="avatar-wrapper mx-auto ms-lg-auto position-relative border border-brutal p-2 d-inline-block"
            >
              <img
                :src="userForm.avatar"
                class="grayscale-content avatar-huge"
                alt="Profile Avatar"
              />
              <label
                for="avatar-input"
                class="btn btn-primary position-absolute bottom-0 end-0 p-2 lh-1"
                style="transform: translate(25%, 25%)"
              >
                <i class="bi bi-camera-fill"></i>
                <input
                  id="avatar-input"
                  type="file"
                  @change="handleAvatarChange"
                  hidden
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Brutalist Tab Navigation -->
      <div class="container-fluid px-lg-5 bg-deep border-top border-brutal">
        <div class="d-flex overflow-auto no-scrollbar">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'btn rounded-0 border-0 px-5 py-4 fs-5 display-font',
              activeTab === tab
                ? 'bg-primary text-deep shadow-none'
                : 'text-muted hover-acid',
            ]"
          >
            {{ tab.toUpperCase() }}
          </button>
        </div>
      </div>
    </header>

    <div class="container-fluid px-lg-5 py-5">
      <div
        v-if="message"
        :class="[
          'alert display-font text-small p-4 border-brutal mb-5 shadow-brutal',
          messageType === 'error' ? 'text-neon' : 'text-acid',
        ]"
      >
        // {{ message.toUpperCase() }}
      </div>

      <div class="row g-5">
        <div class="col-lg-8 mx-auto">
          <!-- Info Tab -->
          <div
            v-if="activeTab === 'info'"
            class="bg-surface border border-brutal p-5 shadow-brutal"
          >
            <h3
              class="display-font text-white fs-2 mb-5 pb-3 border-bottom border-brutal"
            >
              // BASIC_ATTRIBUTES
            </h3>
            <form @submit.prevent="handleUpdateProfile">
              <div class="row g-4">
                <div class="col-md-6">
                  <label
                    for="prof-name"
                    class="display-font text-acid text-small mb-2"
                    >FULL_IDENTITY</label
                  >
                  <input
                    id="prof-name"
                    v-model="userForm.name"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label
                    for="prof-location"
                    class="display-font text-acid text-small mb-2"
                    >ACCESS_REGION</label
                  >
                  <input
                    id="prof-location"
                    v-model="userForm.location"
                    type="text"
                    class="form-control"
                    placeholder="GLOBAL_VOID"
                  />
                </div>
                <div class="col-12">
                  <label
                    for="prof-bio"
                    class="display-font text-acid text-small mb-2"
                    >NEURAL_BIO_DATA</label
                  >
                  <textarea
                    id="prof-bio"
                    v-model="userForm.bio"
                    class="form-control"
                    rows="4"
                    placeholder="DESCRIBE_YOUR_DATA_STREAM..."
                  ></textarea>
                </div>
              </div>
              <div class="mt-5 text-end">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg px-5 py-3"
                  :disabled="isLoading"
                >
                  {{ isLoading ? "SYNCING..." : "UPDATE_DATA" }}
                </button>
              </div>
            </form>
          </div>

          <!-- Security Tab -->
          <div
            v-if="activeTab === 'security'"
            class="bg-surface border border-brutal p-5 shadow-brutal"
          >
            <h3
              class="display-font text-white fs-2 mb-5 pb-3 border-bottom border-brutal"
            >
              // PROTOCOL_RE_KEYING
            </h3>
            <div class="mb-5 border border-brutal-dim p-3">
              <div class="display-font text-muted text-tiny opacity-50 mb-1">
                REGISTERED_EMAIL_UID
              </div>
              <div class="display-font fs-4 text-acid">
                {{ userForm.email }}
              </div>
            </div>

            <form @submit.prevent="handleChangePassword">
              <div class="mb-4">
                <label
                  for="prof-cur-pass"
                  class="display-font text-acid text-small mb-2"
                  >LEGACY_KEY</label
                >
                <input
                  id="prof-cur-pass"
                  v-model="passwordForm.current"
                  type="password"
                  class="form-control"
                  required
                />
              </div>
              <div class="row g-4 mb-5">
                <div class="col-md-6">
                  <label
                    for="prof-new-pass"
                    class="display-font text-acid text-small mb-2"
                    >NEW_KEY_GENERATION</label
                  >
                  <input
                    id="prof-new-pass"
                    v-model="passwordForm.new"
                    type="password"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label
                    for="prof-conf-pass"
                    class="display-font text-acid text-small mb-2"
                    >CONFIRM_NEW_KEY</label
                  >
                  <input
                    id="prof-conf-pass"
                    v-model="passwordForm.confirm"
                    type="password"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="text-end">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg px-5 py-3"
                  :disabled="isLoading"
                >
                  {{ isLoading ? "UPDATING_ENCRYPTION..." : "EXECUTE_RE_KEY" }}
                </button>
              </div>
            </form>
          </div>

          <!-- Settings Tab -->
          <div
            v-if="activeTab === 'settings'"
            class="bg-surface border border-brutal p-5 shadow-brutal"
          >
            <h3
              class="display-font text-white fs-2 mb-5 pb-3 border-bottom border-brutal"
            >
              // SYSTEM_PREFERENCES
            </h3>
            <div class="d-flex flex-column gap-5 mb-5">
              <div
                v-for="(val, key) in settings"
                :key="key"
                class="d-flex justify-content-between align-items-center"
              >
                <div>
                  <h4 class="display-font text-white fs-5 mb-1">
                    {{ key.toUpperCase() }}
                  </h4>
                  <p class="text-muted text-small mb-0 opacity-50">
                    MANAGE_THE_SYSTEM_STREAMS_FOR_{{ key.toUpperCase() }}
                  </p>
                </div>
                <div class="form-check form-switch fs-3">
                  <input
                    class="form-check-input bg-deep border-brutal"
                    type="checkbox"
                    v-model="settings[key]"
                  />
                </div>
              </div>
            </div>
            <div
              class="d-flex justify-content-between align-items-center pt-5 border-top border-brutal"
            >
              <button
                @click="showDeleteModal = true"
                class="btn btn-outline-danger"
              >
                TERMINATE_IDENTITY
              </button>
              <button
                @click="handleSaveSettings"
                class="btn btn-primary px-5 py-3"
                :disabled="isLoading"
              >
                SAVE_CONFIG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TERMINATE Identity Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div
        class="bg-deep border border-brutal p-5 max-w-500 text-center shadow-brutal"
      >
        <h2 class="display-font text-neon fs-1 mb-4 flicker">
          TERMINAL_WARNING
        </h2>
        <p class="display-font text-white fs-4 mb-5 opacity-75">
          ARE_YOU_CERTAIN_TO_ERASE_ALL_DATA_STREAMS?
          THIS_ACTION_IS_IRREVERSIBLE.
        </p>
        <div class="d-flex gap-4 justify-content-center">
          <button
            @click="showDeleteModal = false"
            class="btn btn-outline-primary px-5"
          >
            ABORT
          </button>
          <button
            @click="handleDeleteAccount"
            class="btn btn-primary bg-neon border-neon text-white px-5"
          >
            EXECUTE_WIPE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeTab = ref("info");
const tabs = ["info", "security", "settings"];
const isLoading = ref(false);
const message = ref("");
const messageType = ref("");
const showDeleteModal = ref(false);

const userForm = ref({
  name: "",
  email: "",
  bio: "",
  location: "",
  avatar: "",
});

const passwordForm = ref({ current: "", new: "", confirm: "" });
const settings = ref({
  email_notifications: true,
  public_profile: true,
  data_analytics: false,
});

const memberSince = ref("JANUARY 2026");

onMounted(() => {
  const savedUser = JSON.parse(localStorage.getItem("userAccount"));
  if (!savedUser) {
    router.push("/login");
    return;
  }
  userForm.value = {
    name: savedUser.name || "User",
    email: savedUser.email || "",
    bio: savedUser.bio || "",
    location: savedUser.location || "",
    avatar:
      savedUser.avatar ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${savedUser.name}`,
  };
});

const handleAvatarChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      userForm.value.avatar = event.target?.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleUpdateProfile = async () => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));
  const savedUser = JSON.parse(localStorage.getItem("userAccount"));
  const updatedUser = { ...savedUser, ...userForm.value };
  localStorage.setItem("userAccount", JSON.stringify(updatedUser));
  message.value = "profile sync complete";
  messageType.value = "success";
  isLoading.value = false;
  setTimeout(() => (message.value = ""), 3000);
};

const handleChangePassword = async () => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));
  message.value = "encryption key rotate complete";
  messageType.value = "success";
  isLoading.value = false;
  passwordForm.value = { current: "", new: "", confirm: "" };
  setTimeout(() => (message.value = ""), 3000);
};

const handleSaveSettings = async () => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 600));
  message.value = "system configuration locked";
  messageType.value = "success";
  isLoading.value = false;
  setTimeout(() => (message.value = ""), 3000);
};

const handleDeleteAccount = async () => {
  localStorage.clear();
  router.push("/login");
};
</script>

<style scoped>
.avatar-huge {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border: 1px solid var(--accent-primary);
}
.grayscale-content {
  filter: grayscale(1) contrast(1.1);
}
.text-tiny {
  font-size: 0.65rem;
  letter-spacing: 1px;
}
.text-small {
  font-size: 0.8rem;
  letter-spacing: 2px;
}
.bg-surface {
  background-color: var(--bg-surface) !important;
}
.border-brutal-dim {
  border-color: rgba(255, 255, 255, 0.05) !important;
}
.bg-neon {
  background-color: var(--accent-secondary) !important;
}
.border-neon {
  border-color: var(--accent-secondary) !important;
}
.text-neon {
  color: var(--accent-secondary) !important;
}
.max-w-500 {
  max-width: 500px;
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.hover-acid:hover {
  color: var(--accent-primary) !important;
}
.form-check-input:checked {
  background-color: var(--accent-primary);
  border-color: var(--accent-primary);
}
</style>
