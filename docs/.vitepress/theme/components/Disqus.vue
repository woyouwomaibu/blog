<template>
    <div id="disqus_thread"></div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue"
import { usePageData, useRoute } from 'vitepress'
const page = usePageData()
const pageTitle = computed(() => page.value.frontmatter.title)
const showComment = computed(() => { return !page.value.frontmatter.page })

const route = useRoute()
const pathname = computed(() => { return route.path })

function callback () {
    console.log(111111)
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
        callback();
        watch(pathname, () => {
            console.log(page.value.frontmatter.page, showComment)
            if (!showComment.value) return
            console.log(22222)

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
            var disqus_observer = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting) {
                    loadDisqus();
                    disqus_observer.disconnect();
                }
            });
            disqus_observer.observe(document.getElementById('disqus_thread'));
        } else {
            loadDisqus();
        }
        
    }
    

}, 0);
</script>