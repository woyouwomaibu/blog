<template>
    <div id="vcomments" v-show="showComment"></div>
</template>

<script setup lang="ts">    
import Valine from 'valine'
import { onMounted, computed } from "vue"
import { useSiteDataByRoute, usePageData } from 'vitepress'
const page = usePageData() 
const showComment = computed(() => {return !page.value.frontmatter.page} )
onMounted(() => {
    new Valine({
        el:'#vcomments',
        appId: 'eL362yYIidlk7fysgxKd0Ro7-gzGzoHsz',
        appKey: 'gbDRdQ99EJja7ijodGSFNESp',
        path: window.location.pathname,
        visitor: true
    })
})
</script>

<style lang='stylus' scoped>

</style>

