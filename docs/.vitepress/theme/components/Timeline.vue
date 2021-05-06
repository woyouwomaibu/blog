<template>
    <div class="years" v-for="(year, index) in data" :key="index">
        <div class="year">
            {{ year[0].frontMatter.date.split('-')[0] }}
        </div>
        <a
            v-show="!article.frontMatter.home"
            :href="article.regularPath || ''"
            v-for="(article, el) in year"
            :key="el"
            class="md-line"
        >
            <div class="md-title">
                {{ article.frontMatter.title || '' }}
            </div>
            <div class="date">
                {{ article.frontMatter.date.slice(5) || '' }}
            </div>
        </a>
    </div>
</template>

<script>
import { defineComponent, computed } from "vue"
import { useYearSort } from "./utils"
import { useSiteData } from "vitepress"
export default defineComponent({
    setup () {
        const siteData = useSiteData()
        const data = computed(() =>
            useYearSort(siteData.value.themeConfig.pages)
        )
        return {
            data
        }
    },
});
</script>

<style lang='stylus' scoped>
.year
    padding 15px 0
    font-size 2.5rem
    font-weight 600
    color var(--text-color)
</style>
<style lang='stylus'>
.md-line
    padding 5px 25px
    display flex
    justify-content space-between
    align-items center

    .md-title
        color gray
        font-size 1.1rem

    .date
        color #ccc
        font-size 1rem

.md-line:hover
    text-decoration none
    transition 0.2s ease-out
    transform translateX(4px)

    .md-title
        color black

    .date
        color black

@media screen and (max-width 720px)
    .md-line
        padding 2px

        .date, .md-title
            font-size 0.9rem

    .md-title
        overflow hidden
        text-overflow ellipsis
        white-space nowrap

</style>
