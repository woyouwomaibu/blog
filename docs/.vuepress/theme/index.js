const { path } = require('@vuepress/utils')

module.exports = {
  // 继承默认主题
  name: 'vuepress-theme-local',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
}