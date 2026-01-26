<template>
    <div>
        <h2>Tạo bài viết mới</h2>
        <input type="text" placeholder="Tiêu đề" v-model="title">
        <input type="text" placeholder="Nội dung" v-model="content">
        <input type="text" placeholder="Tác giả" v-model="author">
        <button @click="submitPost">Đăng bài</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submitPost']);

const title = ref('');
const content = ref('');
const author = ref('');

const submitPost = () => {

    if (title.value && author.value && content.value) {

        const newPost = {
            title: title.value,
            content: content.value,
            author: author.value,
        }

        emit('submitPost', newPost);

        title.value = '';
        content.value = '';
        author.value = '';
    } else {
        alert('Vui lòng nhập đầy đủ thông tin');
    }

}
</script>

<style scoped>
input,
textarea {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>