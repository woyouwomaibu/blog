<template>

    <div class="tags">
        <span
            @click="toggleTag(key)"
            v-for="(item, key, index) in data"
            :class="selectTag === key  ? 'picked tag': 'tag'"
        >
            {{ key + '(' + item.length + ')' }}
        </span>
    </div>
    <a
        v-show="!article.frontMatter.home"
        :href="article.regularPath || ''"
        v-for="(article, el) in data[selectTag]"
        :key="el"
        class="md-line"
    >
        <div class="title">
            {{ article.frontMatter.title || "" }}
        </div>
        <div class="date">{{ article.frontMatter.date.slice(5) || "" }}</div>
    </a>
</template>

<script>
import { defineComponent, computed, watch, ref } from "vue";
import { initTags } from "./utils";
import {
    usePageData,
    useSiteData,
    useRoute,
    useSiteDataByRoute,
} from "vitepress";
export default defineComponent({
    setup () {
        const siteData = useSiteData();
        const route = useRoute();
        const data = computed(() => initTags(siteData.value.themeConfig.pages));
        let selectTag = ref("all");
        const toggleTag = (tag) => {
            selectTag.value = tag;
        };
        return {
            data,
            route,
            toggleTag,
            selectTag,
        };
    },
});
</script>

<style lang="stylus" scoped>
.tags {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.tag {
  display: inline-block;
  padding: 4px 16px;
  margin: 0 16px 12px 0;
  font-size: 14px;
  line-height: 25px;
  background-color: #ccc;
  transition: 0.4s;
  color: #000;
  cursor: pointer;
}
@media screen and (max-width: 700px) {
  .md-line {
    padding: 2px;
  }
  .date,
  .title {
    font-size: 0.9rem;
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 18em;
  }
}
.tags
    .picked
        background-color var(--c-brand)
        color white
</style>