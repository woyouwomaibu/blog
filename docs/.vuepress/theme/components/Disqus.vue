<template>
    <div id="disqus_thread"></div>
</template>
<script setup lang="ts">
import { computed, watch } from "vue"
import { usePageFrontmatter, usePageData } from '@vuepress/client'
const frontmatter = usePageFrontmatter()

const showComment = computed(() => { return !frontmatter.value.isHome })

const pageData = usePageData()
const pathname = computed(() => { return pageData.value.path })


function callback () {
    new DisqusJS({
        shortname: 'fxxkit',
        siteName: 'fxxkit',
        api: 'https://disqus.skk.moe/disqus/',
        identifier: 'https://fxxkit.com' + pathname.value + 'slim',
        url: 'https://fxxkit.com' + pathname.value,
        apikey: 'Gqh1gWjKD5AWwnKZ3ambhugxnHLpUqNZFs65E1OI4OyNGfrZpyWfns5H11OX0khE',
    })
    
}
function addStyle (url) {
    var d = document.createElement('link');
    d.rel = 'stylesheet';
    d.href = url;
    document.head.appendChild(d);
}
function addScript (url) {
    var d = document.createElement('script');
    d.src = url;
    d.async = false;
    document.body.appendChild(d);
    d.onload = () => {
        callback()
        watch(pathname, () => {
            if (!showComment.value) return
            new DisqusJS({
                shortname: 'fxxkit',
                siteName: 'fxxkit',
                identifier: 'https://fxxkit.com' + pathname.value + 'slim',
                url: 'https://fxxkit.com' + pathname.value,
                api: 'https://disqus.skk.moe/disqus/',
                apikey: 'Gqh1gWjKD5AWwnKZ3ambhugxnHLpUqNZFs65E1OI4OyNGfrZpyWfns5H11OX0khE',
            })
        })
    }
}

function loadDisqus () {
    addScript('https://cdn.jsdelivr.net/npm/disqusjs@1.3/dist/disqus.js');
    addStyle('https://cdn.jsdelivr.net/npm/disqusjs@1.3/dist/disqusjs.css');
}

const runningOnBrowser = typeof window !== "undefined"
const isBot = runningOnBrowser && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent);
const supportsIntersectionObserver = runningOnBrowser && "IntersectionObserver" in window;

setTimeout(function () {
    if (runningOnBrowser) {
        if (!isBot && supportsIntersectionObserver) {
            let disqus_observer = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting) {
                    loadDisqus()
                    disqus_observer.disconnect()
                }
            })
            disqus_observer.observe(document.getElementById('disqus_thread'))
        } else {
            loadDisqus()
        }
    }
}, 0)
</script>
<style lang="stylus" scoped>
#disqus_thread
    max-width var(--content-width)
    margin 0 auto
    padding 2rem 2.5rem
</style>