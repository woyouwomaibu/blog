
const getPages = require("./utils/page");

async function getConfig() {
  const config = {
    title: 'Fxxk it',
    description: 'Walking on my own 8miles',
    themeConfig: {
      // 保存解析 Markdown 的元数据
      pages: await getPages(),
      author: "slim walker",
      lastUpdated: 'Last Updated',
      sidebar: false,
      nav: [
        { text: "Home", link: "/" },
        { text: "Timeline", link: "/timeline" },
        { text: "Tags", link: "/tags" }
      ]
    }
  };

  return config;
}
module.exports = getConfig();