<template>
    <main class="home" aria-labelledby="main-title">
        <HomeHero />
        <slot name="hero" />
        <HomeFeatures />
        <div class="home-content">
            <Type/>
            <div
                v-for="(item, index) in pages"
                :key="index"
                class="home-docs-box"
            >
                <div class="docs-title">{{ item.frontMatter.title }}</div>
                <div class="docs-description">{{ item.frontMatter.description }}</div>
                <div class="docs-date">{{ item.frontMatter.date }}</div>
                <a :href="item.regularPath" class="docs-link"></a>
                
            </div>
            <Content />
        </div>
        <slot name="features" />
        <HomeFooter />
        <slot name="footer" />
    </main>
</template>

<script setup lang="ts">
import HomeHero from './HomeHero.vue'
import HomeFeatures from './HomeFeatures.vue'
import HomeFooter from './HomeFooter.vue'
import { useSiteData } from "vitepress"
import { computed } from 'vue'
const siteData = useSiteData()
const pages = computed(() => siteData.value.themeConfig.pages)

</script>

<style lang="stylus" scoped>
.home
    padding-top var(--header-height)

.home-content
    max-width 960px
    margin 0px auto
    padding 0 1.5rem

.home-docs-box
    background-color rgba(27,31,35,0.05)
    margin 2rem 0
    padding 2rem
    border-radius 5px
    position relative
    box-shadow 0 15px 35px rgba(0,0,0,0.1),0 3px 10px rgba(0,0,0,0.07)
    &:hover
        transition 0.2s ease-out
        transform scale(1.05)
    .docs-title
        font-size 1.5rem
        margin-bottom 1rem
        
    .docs-description
        font-size 1rem
        
    .docs-date
        margin-top 1rem
        font-size 1rem
        color #808080
    .docs-link
        position absolute 
        top 0
        left 0
        width 100%
        height 100%


@media (max-width 720px)
    .home-content
        max-width 392px
        padding 0
</style>
