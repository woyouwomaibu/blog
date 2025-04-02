import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fuck the world",
  description: "Fuck the world",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ]
  },
  vite: {
    plugins: [pagefindPlugin()],
  }
})
