
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
      algolia: {
        apiKey: 'd3ed98c90605ae96f48fd97a0a9a47a1',
        indexName: 'fxxkit'
      },
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
