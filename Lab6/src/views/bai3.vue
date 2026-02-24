<script setup>
import { reactive } from 'vue';

// Bai 3
const user = reactive({
    name: '',
    age: null,
    email: ''
});

</script>

<template>

    <h1 class="mt-5">Bài 3</h1>
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

</template>