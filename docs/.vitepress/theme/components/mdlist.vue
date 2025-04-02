<template>
  <div class="md-list">
    <ul>
      <li v-for="post of posts">
        <a :href="post.url">
          <div class="post-title">{{ post.frontmatter.title }}</div>
          <div class="post-meta">
            <time>{{ formatDate(post.frontmatter.date) }}</time>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
// 组件逻辑
import { data as posts } from './posts.data.js'

// 日期格式化函数
function formatDate(dateString) {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}
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
  margin: 24px 0;
  padding: 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.md-list li:last-child {
  border-bottom: none;
}

.md-list a {
  display: block;
  padding: 16px 0;
  text-decoration: none;
  transition: all 0.2s ease;
}

.md-list a:hover {
  opacity: 0.8;
}

.post-title {
  color: var(--vp-c-text-1);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 8px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.post-author {
  color: var(--vp-c-brand);
}
</style>
