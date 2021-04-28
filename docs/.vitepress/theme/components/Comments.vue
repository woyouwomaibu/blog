<template>
    <div id="vcomments"></div>
</template>

<script setup lang="ts">    
import { onMounted, computed, watch, defineComponent} from "vue"
import { useSiteDataByRoute, usePageData, useRoute } from 'vitepress'
const route = useRoute()
onMounted(async() => {
    const Valine = await(await import('valine')).default
    new Valine({
        el:'#vcomments',
        appId: 'eL362yYIidlk7fysgxKd0Ro7-gzGzoHsz',
        appKey: 'gbDRdQ99EJja7ijodGSFNESp',
        path: route.path,
        visitor: true
    })
    watch(() => route.path, () => {
        if ( route.path === '/' || route.path === '/tags.html' || route.path === '/timeline.html' ) return
        new Valine({
            el:'#vcomments',
            appId: 'eL362yYIidlk7fysgxKd0Ro7-gzGzoHsz',
            appKey: 'gbDRdQ99EJja7ijodGSFNESp',
            path: route.path,
            visitor: true
        })
    })
})

</script>

<style lang='stylus' scoped>

</style>

