<template>
    <Layout>
        <template #page-top>
            <Home v-if="frontmatter.isHome"/>
        </template>
        <template #page-bottom>
            <Disqus v-show="!frontmatter.isHome"/>
        </template>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import Home from '../components/Home.vue'
import Disqus from '../components/Disqus.vue'
import { usePageFrontmatter} from '@vuepress/client'
const frontmatter = usePageFrontmatter()

</script>

<style lang="css">
.my-footer {
    text-align: center;
}
</style>