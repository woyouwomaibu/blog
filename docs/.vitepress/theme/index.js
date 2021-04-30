import DefaultTheme from '../theme-default'
import Timeline from "./components/Timeline.vue"
import Tags from "./components/Tags.vue"
import Type from "./components/Type.vue"
import Disqus from './components/Disqus.vue'

export default {
    ...DefaultTheme,
    enhanceApp ({ app }) {
        app.component("Timeline", Timeline)
        app.component("Tags", Tags)
        app.component("Type", Type)
        app.component('Disqus', Disqus)
    }
}