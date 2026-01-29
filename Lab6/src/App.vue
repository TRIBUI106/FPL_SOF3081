<template>

  <div class="container">
    <h1 class="text-center mt-3 mb-3">Lab 6</h1>
    <div class="btn-group gap-4 w-100" role="group" aria-label="Basic example">
      <router-link to="/bai1" class="btn btn-primary">Bài 1</router-link>
      <router-link to="/bai2" class="btn btn-primary">Bài 2</router-link>
      <router-link to="/bai3" class="btn btn-primary">Bài 3</router-link>
      <router-link to="/bai4" class="btn btn-primary">Bài 4</router-link>
    </div>
    <router-view></router-view>
  </div>

</template>

<style scoped></style>