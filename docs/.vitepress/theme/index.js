import DefaultTheme from 'vitepress/theme'
import Timeline from "./components/Timeline.vue"
import Tags from "./components/Tags.vue"
import Navbox from "./components/Navbox.vue"

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Timeline", Timeline)
    app.component("Tags", Tags)
    app.component("Navbox", Navbox)
  }
}