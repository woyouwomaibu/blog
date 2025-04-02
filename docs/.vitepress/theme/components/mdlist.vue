<template>
  <div class="md-list">
    <ul>
      <li v-for="post of posts">
        <a :href="post.url">{{ post.frontmatter.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
// 组件逻辑
import { data as posts } from './posts.data.js'
console.log(posts)

</script>

<style scoped>
.md-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.md-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.md-list li {
  margin: 12px 0;
  padding: 16px 24px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.md-list li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.md-list a {
  color: #2c3e50;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  display: block;
  line-height: 1.5;
}

.md-list a:hover {
  color: #3eaf7c;
}
</style>
