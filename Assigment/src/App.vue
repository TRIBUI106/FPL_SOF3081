<template>
  <nav class="nav-main">
    <div class="container">
      <router-link to="/" class="nav-brand">Blog</router-link>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </div>
  </nav>

  <main class="container" style="padding-top: 2rem; padding-bottom: 2rem;">
    <router-view></router-view>
  </main>
</template>

<style scoped>
.nav-main {
  background: var(--dark);
  color: white;
  padding: 1rem 0;
  box-shadow: var(--shadow);
}

.nav-main .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  flex-shrink: 0;
}

.nav-brand:hover {
  color: var(--primary);
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav-links a {
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  text-decoration: none;
  transition: background var(--transition);
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-links a.router-link-active {
  background: var(--primary);
}

@media (max-width: 640px) {
  .nav-main .container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
  }
}
</style>