<template>
    <div class="tags">
        <span
            @click="toggleTag(key)"
            v-for="(item, key, index) in data"
            :key="index"
            :class="selectTag === key ? 'picked tag' : 'tag'"
        >
            {{ key }}
        </span>
    </div>
    <a
        v-show="!article.frontMatter.home"
        :href="article.regularPath || ''"
        v-for="(article, el) in data[selectTag]"
        :key="el"
        class="md-line"
    >
        <div class="md-title">
            {{ article.frontMatter.title || '' }}
        </div>
        <div class="date">{{ article.frontMatter.date || '' }}</div>
    </a>
</template>

<script>
import { defineComponent, computed, watch, ref } from "vue"
import { initTags } from "./utils"
import {
    usePageData,
    useSiteData,
    useRoute,
    useSiteDataByRoute,
} from "vitepress"
export default defineComponent({
    setup () {
        const siteData = useSiteData()
        const route = useRoute()
        const data = computed(() => initTags(siteData.value.themeConfig.pages))
        const selectTag = ref("All")
        const toggleTag = (tag) => {
            selectTag.value = tag
        }
        return {
            data,
            route,
            toggleTag,
            selectTag
        }
    },
});
</script>

<style lang="stylus" scoped>
.tags
    margin-top 20px
    display flex
    justify-content center
    flex-wrap wrap

.tag
    display inline-block
    padding 4px 16px
    margin 0 16px 12px 0
    font-size 14px
    line-height 25px
    background-color rgba(27,31,35,0.05)
    color #000
    cursor pointer
    border-radius 5px
    &:hover
        transition 0.2s ease-out
        transform scale(1.1)
        

.tags
    .picked
        background-color var(--c-brand)
        color white
</style>