<script setup>
import { ref } from 'vue';

const userInput = ref('');

</script>

<template>
  <h1 class="mt-5">Bài 2</h1>
  <h2>Thong tin ban da nhap : {{ userInput }}</h2>
  <input type="text" v-model="userInput" class="form-control" placeholder="Nhap thong tin" />
</template>