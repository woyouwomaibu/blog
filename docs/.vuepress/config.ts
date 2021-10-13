const { path } = require('@vuepress/utils')
module.exports = {
    theme: path.resolve(__dirname, 'theme'),
    title: 'Fxxkit',
    themeConfig: {
        navbar: [
            {
                text: 'Home',
                link: '/',
            }
        ]
    },
    define: (app) => ({
        __GLOBAL_PAGES__: app.pages
    }),
    plugins: [
        [
            '@vuepress/plugin-search',
            {
                isSearchable: (page) => page.path !== '/' && page.path !== '404.html',
            },
        ],
    ]
}