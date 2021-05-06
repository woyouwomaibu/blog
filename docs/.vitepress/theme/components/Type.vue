<template>
    <div class="typejs-box">
        <span id="typed"></span>
    </div>
</template>
<script>
import Typed from 'typed.js'
import { defineComponent, onMounted } from "vue"
export default defineComponent({
    setup () {
        document.title = 'Fxxk it'
        const options = {
            strings: [
                '过去、^500现在和未来的区别^1000只是一种固执的幻觉。 ——阿尔伯特·爱因斯坦',
                '还记得我嘛？^1000CLOT'
            ],
            typeSpeed: 40,
            loop: true,
            fadeOut: true
        }
        onMounted(() => {
            const typed = new Typed('#typed', options)
        })
        return
    }
})
</script>

<style lang="stylus" scoped>
.typejs-box
    white-space pre-wrap
    font-size 14px
    background rgba(27,31,35,.05)
    color #000
    display inline-block
    margin 1rem 0
    padding 20px
    min-height 78px
    width 100%

</style>