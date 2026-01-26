<template>
    <div>
        <h1 class="mt-5">Bài 1</h1>
        <h2>{{ message }}</h2>

        <div class="btn btn-primary" @click="updateMessage">
            Thay doi thong bao
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('first message');

const updateMessage = () => {
    message.value = message.value === 'first message' ? 'second message' : 'first message';
}

</script>

<style scoped></style>