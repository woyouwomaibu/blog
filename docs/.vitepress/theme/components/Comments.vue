<template>
    <div id="vcomments"></div>
</template>

<script setup lang="ts">
import Valine from 'valine'
import { onMounted } from "vue"

onMounted(() => {
    new Valine({
        el:'#vcomments',
        appId: 'eL362yYIidlk7fysgxKd0Ro7-gzGzoHsz',
        appKey: 'gbDRdQ99EJja7ijodGSFNESp'
    })
})
</script>

<style lang='stylus' scoped>

</style>

