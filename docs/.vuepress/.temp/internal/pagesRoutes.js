import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/","",["/index.html","/README.md"]],
  ["v-1c523596","/blog/debounceAndThrottle.html","防抖与节流",["/blog/debounceAndThrottle","/blog/debounceAndThrottle.md"]],
  ["v-713d021c","/blog/deepClone.html","深拷贝",["/blog/deepClone","/blog/deepClone.md"]],
  ["v-3c87156c","/blog/gitCommand.html","git command",["/blog/gitCommand","/blog/gitCommand.md"]],
  ["v-ad8120a0","/blog/gitUser.html","git多用户配置",["/blog/gitUser","/blog/gitUser.md"]],
  ["v-6f8dbe58","/blog/jsEventLoop.html","浏览器中的的Event Loop",["/blog/jsEventLoop","/blog/jsEventLoop.md"]],
  ["v-3706649a","/404.html","",["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, title, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta: { title },
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
