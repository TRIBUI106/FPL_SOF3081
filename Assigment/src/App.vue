<template>
  <div class="noir-app">
    <!-- Scroll Reveal Container -->
    <ScrollReveal>
      <header class="fixed-top glass-surface header-node">
        <nav class="container-fluid px-lg-5 py-3">
          <div class="d-flex justify-content-between align-items-center">
            <!-- Brand h1 satisfies primary heading requirement -->
            <router-link
              to="/"
              class="display-font text-white text-decoration-none"
              style="font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1.15"
            >
              <h1>ETHEREAL<span class="text-acid">.</span></h1>
            </router-link>

            <!-- Navigation Hub -->
            <div class="d-flex align-items-center gap-4">
              <!-- Search Vector -->
              <div class="d-none d-md-flex position-relative">
                <label for="global-search" class="visually-hidden"
                  >Search archives</label
                >
                <input
                  id="global-search"
                  type="text"
                  class="form-control form-control-sm bg-transparent border-brutal text-white ps-5"
                  placeholder="SEARCH_VOIDS..."
                  style="
                    inline-size: clamp(200px, 20vw, 400px);
                    min-block-size: 48px;
                  "
                />
              </div>

              <!-- Nav Actions -->
              <div class="d-flex gap-2">
                <router-link
                  v-for="item in navItems"
                  :key="item.path"
                  :to="item.path"
                  class="btn btn-sm px-4"
                  :class="[
                    $route.path === item.path
                      ? 'btn-primary'
                      : 'btn-outline-primary',
                  ]"
                >
                  {{ item.name }}
                </router-link>

                <template v-if="isLoggedIn">
                  <router-link
                    to="/profile"
                    class="btn btn-sm btn-outline-primary px-4"
                  >
                    PROFILE
                  </router-link>
                </template>
                <template v-else>
                  <router-link
                    to="/login"
                    class="btn btn-sm btn-outline-primary px-4"
                  >
                    LOGIN
                  </router-link>
                </template>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </ScrollReveal>

    <!-- Main Entry Vector -->
    <main
      class="perspective-node"
      style="padding-block-start: clamp(100px, 15vh, 140px)"
    >
      <router-view v-slot="{ Component }">
        <transition name="page-shift" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Authority Signals & Reflective Footer -->
    <footer
      class="noir-section border-top border-brutal bg-deep mt-5 shadow-brutal-up"
    >
      <div class="container-fluid px-lg-5">
        <div class="row g-5">
          <div class="col-lg-4">
            <h2
              class="display-font text-white mb-4 tracking-wide lh-tight"
              style="font-size: clamp(1.5rem, 2vw, 2rem)"
            >
              // THE_MISSION
            </h2>
            <p
              class="display-font text-muted text-small max-w-ch opacity-75 mb-4 tracking-normal"
              style="font-size: clamp(0.9rem, 1.2vw, 1rem); line-height: 1.45"
            >
              WE EXIST TO ARCHIVE THE UNARCHIVABLE. OUR VALUES: RADICAL
              TRANSPARENCY, NEURAL INTEGRITY, AND QUANTUM PERMANENCE.
            </p>
            <div class="d-flex gap-3 mt-4">
              <span class="badge border border-brutal text-acid p-2 px-3"
                >AES-512_ENCRYPTED</span
              >
              <span class="badge border border-brutal text-neon p-2 px-3"
                >SSL_VERIFIED_IDENTITY</span
              >
            </div>
          </div>
          <div class="col-lg-4">
            <h2
              class="display-font text-white mb-4 tracking-wide lh-tight"
              style="font-size: clamp(1.5rem, 2vw, 2rem)"
            >
              // DIRECTORY
            </h2>
            <ul class="list-unstyled d-flex flex-column gap-3">
              <li v-for="link in footerLinks" :key="link.name">
                <router-link
                  :to="link.path"
                  class="display-font text-acid text-decoration-none hover-reveal tracking-wide lh-tight"
                >
                  {{ link.name }} →
                </router-link>
              </li>
            </ul>
          </div>
          <div class="col-lg-4 text-lg-end">
            <div
              class="display-font text-muted text-tiny mb-4 flicker tracking-wide lh-tight"
            >
              U_TRUST_LEVEL: HIGH // SYNC_STATUS: STABLE
            </div>
            <div class="d-flex gap-4 justify-content-lg-end">
              <a
                href="#"
                class="text-white fs-4 hover-acid"
                aria-label="Github Authority Hub"
                ><i class="bi bi-github"></i
              ></a>
              <a
                href="#"
                class="text-white fs-4 hover-acid"
                aria-label="Terminal Root Access"
                ><i class="bi bi-terminal"></i
              ></a>
              <a
                href="#"
                class="text-white fs-4 hover-acid"
                aria-label="Certified Secure Archive"
                ><i class="bi bi-patch-check-fill"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ScrollReveal from "./components/ScrollReveal.vue";

const isLoggedIn = ref(localStorage.getItem("isLoggedIn") === "true");

const navItems = [
  { name: "ARCHIVES", path: "/" },
  { name: "SEARCH", path: "/search" },
];

const footerLinks = [
  { name: "VAULT_ACCESS", path: "/my-posts" },
  { name: "NEURAL_PROFILE", path: "/profile" },
  { name: "QUANTUM_FLOW", path: "/" },
];
</script>

<style>
/* Global Shadow & Depth System */
.shadow-brutal-up {
  box-shadow: 0px -16px 32px 0px rgba(0, 0, 0, 0.6);
}

.max-w-ch {
  max-width: 65ch;
}
.tracking-wide {
  letter-spacing: 0.15em !important;
}
.lh-tight {
  line-height: 1.15 !important;
}

/* Purging expensive layout properties from transition files */
.page-shift-enter-active,
.page-shift-leave-active {
  transition-property: opacity, transform !important;
  transition-duration: 0.3s !important;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1) !important;
}

.page-shift-enter-from {
  opacity: 0;
  transform: translate3d(0, 15px, 0) !important;
}

.page-shift-leave-to {
  opacity: 0;
  transform: translate3d(0, -15px, 0) !important;
}

.hover-reveal {
  opacity: 0.6;
  transition-property: transform, opacity;
  transition-duration: 0.3s;
}

.hover-reveal:hover {
  opacity: 1;
  transform: translate3d(12px, 0, 0);
  color: var(--accent-primary) !important;
}

.header-node {
  inset-block-start: 0;
  inset-inline: 0;
}

.perspective-node {
  perspective: 1200px;
}

h1 {
  margin-block: 0;
  font-size: inherit;
  font-family: inherit;
}

@media (prefers-reduced-motion: reduce) {
  .page-shift-enter-active,
  .page-shift-leave-active {
    transition-duration: 0.1s !important;
  }
}
</style>
