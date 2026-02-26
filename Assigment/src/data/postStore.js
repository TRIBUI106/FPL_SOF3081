export const getPosts = () => {
  const localPosts = localStorage.getItem('blog_posts');
  if (localPosts) {
    const parsed = JSON.parse(localPosts);
    // Convert string dates back to Date objects
    return parsed.map(post => ({
      ...post,
      date: new Date(post.date)
    }));
  }
  return null; // Signals we should use default posts
};

export const savePosts = (posts) => {
  localStorage.setItem('blog_posts', JSON.stringify(posts));
};

export const addPost = (post) => {
  const posts = getPosts() || [];
  const newPost = {
    ...post,
    id: Date.now(), // Simple unique ID
    author: JSON.parse(localStorage.getItem('userAccount') || '{}').name || 'Anonymous'
  };
  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
};

export const updatePost = (updatedPost) => {
  const posts = getPosts() || [];
  const index = posts.findIndex(p => p.id === updatedPost.id);
  if (index !== -1) {
    posts[index] = updatedPost;
    savePosts(posts);
    return true;
  }
  return false;
};

export const deletePost = (id) => {
  const posts = getPosts() || [];
  const filtered = posts.filter(p => p.id !== id);
  savePosts(filtered);
};
