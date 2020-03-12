module.exports = {
    title: '拔剑四顾心茫然',
    description: '昏沉的夜，灯火温吞的灭',
    theme: 'reco',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
            { text: 'About', link: '/about' }
        ],
        sidebar: 'auto',
        displayAllHeaders: true,
        smoothScroll: true,
        logo: '/header.png',
        lastUpdated: 'Last Updated',
        blogConfig: {
            category: {
              location: 2,     // 在导航栏菜单中所占的位置，默认2
              text: 'Category' // 默认文案 “分类”
            },
            tag: {
              location: 3,     // 在导航栏菜单中所占的位置，默认3
              text: 'Tag'      // 默认文案 “标签”
            }
        },
        type: 'blog',
        authorAvatar: '/header.png',
        valineConfig: {
            appId: 'oQqEnwGsrr4LpFLPtIyQ2pQn-gzGzoHsz',// your appId
            appKey: 'rmmQatjenz0TCxDnww6CCiC7', // your appKey
        }

    }
}