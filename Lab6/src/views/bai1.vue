<template>

    <div class="container mt-5">
        <span>Nhập điểm của bạn : </span>
        <input type="number" class="rounded px-2" v-model="num" min="0" max="10" step="0.25">

        <div v-if="num != 0">
            <span class="fw-bold me-2">Hạnh kiểm:</span>
            <span class="text-danger" v-if="num < 5">Yếu</span>
            <span class="text-warning" v-else-if="num < 6.5">Trung bình</span>
            <span class="text-warning" v-else-if="num < 8">Khá</span>
            <span class="text-success" v-else-if="num < 9">Giỏi</span>
            <span class="text-success" v-else>Xuất sắc</span>
        </div>
    </div>

</template>

<script setup>

import { ref } from 'vue';

const num = ref(0)

</script>