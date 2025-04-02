import DefaultTheme from 'vitepress/theme'
import Mdlist from './components/mdlist.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('Mdlist', Mdlist)
  }
}