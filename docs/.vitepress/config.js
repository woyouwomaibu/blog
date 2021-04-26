
const getPages = require("./utils/page");

async function getConfig() {
  const config = {
    title: 'Fxxk it',
    description: 'Walking on my own 8miles',
    themeConfig: {
      search: true,
      // 保存解析 Markdown 的元数据
      pages: await getPages(),
      author: "slim walker",
      nav: [
        { text: "首页", link: "/" },
        { text: "归档", link: "/docs" }
      ]
    },
    dest: "public",
  };

  return config;
}
module.exports = getConfig();
