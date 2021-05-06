
const getPages = require("./theme/components/page");

async function getConfig() {
  const config = {
    title: 'Fxxk it',
    description: 'Walking on my own 8miles',
    themeConfig: {
      // 保存解析 Markdown 的元数据
      pages: await getPages(),
      author: "Slim Walker",
      lastUpdated: 'Last Updated',
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
