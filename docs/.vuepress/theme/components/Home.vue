<template>
    
    <div class="home-content">
        <div class="tags">
            <span
                @click="toggleTag(key)"
                v-for="(item, key, index) in pages"
                :key="index"
                :class="selectTag === key ? 'picked tag' : 'tag'"
            >
                {{ key }}
            </span>
        </div>
        <div v-for="(item, index) in pages[selectTag]" :key="index" class="home-docs-box">
            <div class="docs-title">{{ item.title }}</div>
            <div class="docs-date">{{ rTime(item.frontmatter.date) }}</div>
            <a :href="item.path" class="docs-link"></a>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
function rTime (date) {
    const json_date = new Date(date).toJSON()
    return json_date.split("T")[0]
}

declare const __GLOBAL_PAGES__: any

function sortByDate (a, b) {
    return a.frontmatter.date < b.frontmatter.date ? 1 : -1
}

function getPages () {
    let pages = __GLOBAL_PAGES__.filter(v => v.path !== '/404.html' && v.path !== '/')
    pages.sort(sortByDate)
    return pages
}

function initTags (pages) {
    const data = {
        All: []
    }
    for (let index = 0; index < pages.length; index++) {
        const element = pages[index];
        data.All.push(element)
        const tags = element.frontmatter.tags
        tags && tags.forEach((item) => {
            if (data[item]) {
                data[item].push(element);
            } else {
                data[item] = [];
                data[item].push(element);
            }
        })
    }
    return data
}

const selectTag = ref("All")
let tagsBox
const func = (e) => {
    tagsBox.removeEventListener('transitionend', func)
    requestAnimationFrame(() => {
        tagsBox.style.transform = 'translateY(0px)'
        tagsBox.style.opacity = '1'
    })
    
}
const toggleTag = (tag) => {
    selectTag.value = tag
    tagsBox = document.querySelector('.tags') as HTMLDivElement
    tagsBox.removeEventListener('transitionend', func)
    requestAnimationFrame(() => {
        tagsBox.style.transform = 'translateY(0px)'
        tagsBox.style.opacity = '1'
        requestAnimationFrame(() => {
            tagsBox.addEventListener('transitionend', func)
            tagsBox.style.transform = 'translateY(-20px)'
            tagsBox.style.opacity = '0'
        })
    })
}

const pages = reactive(initTags(getPages()))

</script>
<style lang="stylus" scoped>
.home-content
    max-width 720px
    margin 0px auto
    padding 0 1.5rem
    margin-top 6rem
    

    .tags
        margin-top 20px
        display flex
        justify-content center
        flex-wrap wrap
        transition transform 0.25s ease-in-out 0s, opacity 0.25s ease-in-out 0s
        transform translateY(0px)
        opacity 1


    .tag
        display inline-block
        padding 4px 16px
        margin 0 16px 12px 0
        font-size 14px
        line-height 25px
        background-color var(--c-bg-lighter)
        cursor pointer
        border-radius 5px

        &:hover
            transition 0.2s ease-out
            transform scale(1.1)

     

    .tags
        .picked
            background-color var(--c-brand)
            color white

.home-docs-box
    margin 1rem 0
    padding 0 2rem
    position relative
    display flex
    justify-content space-between
    align-items center

    &:hover
        text-decoration none
        transition 0.2s ease-out
        transform translateX(4px)

    .docs-title
        font-size 1.1rem

    .docs-date
        font-size 1rem
        color var(--c-text-quote)

    .docs-link
        position absolute
        top 0
        left 0
        width 100%
        height 100%


@media (max-width 720px)
    .home-content
        max-width 392px
        padding 0 0.5rem
</style>