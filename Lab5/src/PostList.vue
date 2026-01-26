<template>
    <div>
        <h2>Danh sách bài viết</h2>
        <div v-for="(post, index) in posts" :key="index" :class="{ 'highlighted': post.title.length > 20 }">
            <h3 class="text-success">{{ post.title }}</h3>
            <h4 class="text-danger">{{ post.content }}</h4>
            <p>{{ post.author }}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: "PostList",
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
};

</script>

<style scoped>
.post {
    padding: 20px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 10px;
}

.highlighted {
    background-color: #f0f0f0;
    border: 2px solid lightgray;
}
</style>