import DefaultTheme from '../theme-default'
import Timeline from "./components/Timeline.vue"
import Tags from "./components/Tags.vue"

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Timeline", Timeline)
    app.component("Tags", Tags)
  }
}