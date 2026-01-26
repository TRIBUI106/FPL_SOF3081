<script>
import { ref } from 'vue';
import CreatePost from '../CreatePost.vue';
import PostList from '../PostList.vue';

const posts = ref([]);

function submitPost(post) {
    posts.value.push(post);
}

</script>

<template>
    <h1 class="mt-5">Bài 4</h1>
    <div id="app">
        <h1>Ứng dụng bờ lốc nhỏ</h1>
        <CreatePost @submitPost="submitPost" />
        <PostList :posts="posts" />
    </div>
</template>

<style>
#app {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
</style>