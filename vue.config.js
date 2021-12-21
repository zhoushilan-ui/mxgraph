const path = require("path");

function resolve(dir) {
  console.log(dir);
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port: "10593",
    open: true,
  },
  chainWebpack: (config) => {
    // 配置文件引入路径
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@img", resolve("src/assets/images"))
      .set("@utils", resolve("src/utils"));
    // 这里只写了部分，可以自己再添加，按这种格式 .set('', resolve(''))

    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 0 })); // 无效的话可以把0换成1试试，有时设置为0会失效
  },
};
