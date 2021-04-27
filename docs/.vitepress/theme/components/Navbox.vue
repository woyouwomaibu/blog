<template>
    <ul class="nav-box">
        <li
            class="nav-item"
            v-for="item in pageData.headers"
        >
            <a
                class="level level-2"
                v-if="item.level == 2"
                :href="'#' + item.slug"
            >{{ item.title }}</a>
            <a
                class="level level-3"
                v-if="item.level == 3"
                :href="'#' + item.slug"
            >{{ item.title }}</a>
        </li>
    </ul>
</template>
<script>
import { usePageData } from "vitepress";
import { onMounted, onBeforeUnmount } from 'vue';
export default {
    setup () {
        const pageData = usePageData()
        onMounted(() => {
            document.querySelector('.page').className += ' page-nav'
        })
        onBeforeUnmount(() => {
            document.querySelector('.page').className = 'page'
        })
        return {
            pageData
        }
    }
}
</script>

<style lang="stylus" scoped>
.nav-box 
    border-left 1px solid #ccc
    position fixed
    top 100px
    right 3rem
    padding-left 12px
    width 12rem
.nav-item 
    display: block;

.level-2 
    color: #313131 !important;
    font-size: 12px;

.level-3 
    margin: 10px 0;
    display: list-item;
    list-style-position: inside;
    color: #717171 !important;
    padding-left: 1rem;
    font-size: 12px;
    list-style-type: circle;

.level-3::marker 
    font-size: 2px;
    padding-right: 10px;
    width: 100px;

@media screen and (max-width: 48rem) 
    .nav-box
        display none
</style>
<style lang="stylus">
.page-nav
    padding-right 15rem

@media screen and (max-width: 48rem) 
    .page-nav
        padding-right 0
</style>
