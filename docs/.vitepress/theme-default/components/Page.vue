<template>
    <main class="page">
        <div class="container">
            <slot name="top" />

            <div class="content">
                <Content />
            </div>

            <PageFooter />

            <NextAndPrevLinks />
            <Disqus v-show="showComment"/>

            <slot name="bottom" />
        </div>
    </main>
</template>

<script setup lang="ts">
import PageFooter from './PageFooter.vue'
import NextAndPrevLinks from './NextAndPrevLinks.vue'
import { computed, ref, onMounted, watch } from "vue"
import { usePageData, useRoute } from 'vitepress'

const route = useRoute()
const pathname = computed(() => { return route.path })
const page = usePageData()
const pageTitle = computed(() => page.value.frontmatter.title)
const showComment = computed(() => { return !page.value.frontmatter.page })

</script>

<style lang='stylus' scoped>
.page
    padding-top var(--header-height)

@media (min-width 720px)
    .page
        margin-right 16.4rem

@media (min-width 960px)
    .page
        margin-right 20rem

.container
    margin 0 auto
    padding 0 1.5rem 4rem
    max-width 48rem

.content
    padding-bottom 1.5rem

@media (max-width 420px)
    .content
        /* fix carbon ads display */
        clear both
</style>

