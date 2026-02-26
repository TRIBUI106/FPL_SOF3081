# Task: Fully Blog Website Implementation (Components & Performance)

## 🎯 Objective
Transform the current blog into a professional, scalable codebase with reusable components, CRUD functionality for posts, and high-performance animations (scroll-reveal/lazy-loading).

## 🛠️ Tech Stack
- **Framework**: Vue 3 (Composition API)
- **Styling**: Vanilla CSS (Modern CSS Variables)
- **Animations**: Intersection Observer + CSS Keyframes
- **State**: localStorage (Mocked Backend)

## 📋 Phase 1: Reusable Component Architecture (Option B)
- [ ] **Create `src/components/PostCard.vue`**:
    - Extract card logic from `Home.vue` and `Search.vue`.
    - Props: `post`, `isEditable`.
- [ ] **Create `src/components/PostForm.vue`**:
    - Unified form for Create/Edit.
    - Validation for title, content, category, and image URL.
- [ ] **Refactor Existing Views**:
    - Update `Home.vue` and `Search.vue` to use `PostCard.vue`.

## 🏗️ Phase 2: CRUD Management (Assignment Requirements)
- [ ] **Update Router**:
    - Add `/my-posts` route.
    - Add `/create-post` and `/edit-post/:id` routes.
- [ ] **Implement `MyPosts.vue`**:
    - List of posts created by the current user.
    - Edit/Delete buttons on each card.
- [ ] **Implement `PostEditor.vue`**:
    - Handle both creation and editing logic using `PostForm.vue`.
    - Persistence to `localStorage`.

## ✨ Phase 3: Premium Animations & Performance (Option C)
- [ ] **Implement `ScrollReveal.vue` Component**:
    - Uses Intersection Observer to trigger fade-in/slide-up on scroll.
- [ ] **Image Lazy Loading**:
    - Ensure all `<img>` tags use `loading="lazy"`.
    - Implement a "Glassmorphism" placeholder effect while loading.
- [ ] **Global Transitions**:
    - Smooth page transitions between routes.

## ✅ Verification
- [ ] CRUD operations work correctly (Save to localStorage).
- [ ] Animations trigger only when elements enter viewport.
- [ ] Mobile responsiveness maintained across all new pages.
- [ ] Code is DRY (Don't Repeat Yourself).
