<script setup>
import { ref, reactive } from 'vue';

// Bai 1
const message = ref('first message');

// Bai 2
const userInput = ref('');

// Bai 3
const user = reactive({
  name: '',
  age: null,
  email: ''
});

const updateMessage = () => {
  message.value = message.value === 'first message' ? 'second message' : 'first message';
}

</script>

<template>

  <div class="container mt-4">
    <h1>Bai 1</h1>
    <h2>{{ message }}</h2>

    <div class="btn btn-primary" @click="updateMessage">
      Thay doi thong bao
    </div>

    <h1 class="mt-5">Bai 2</h1>
      <h2>Thong tin ban da nhap : {{ userInput }}</h2>
      <input type="text" v-model="userInput" class="form-control" placeholder="Nhap thong tin" />

    <h1 class="mt-5">Bai 3</h1>
    <h2>Thong tin ca nhan</h2>

    <!-- Input fields -->
    <div class="mb-3">
      <label class="form-label">Name:</label>
      <input type="text" v-model="user.name" class="form-control" placeholder="Nhap ten" />
    </div>
    <div class="mb-3">
      <label class="form-label">Age:</label>
      <input type="text" v-model="user.age" class="form-control" placeholder="Nhap tuoi" />
    </div>
    <div class="mb-3">
      <label class="form-label">Email:</label>
      <input type="text" v-model="user.email" class="form-control" placeholder="Nhap email" />
    </div>

    <div class="container bordered bg-light p-3">
      <h3>Thong tin ban da nhap:</h3>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Age:</strong> {{ user.age }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>

    <h1 class="mt-5">Bai 4</h1>
    

  </div>
  
</template>

<style scoped></style>
