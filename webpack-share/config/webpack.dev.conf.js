const path = require('path');
module.exports = {
  // 生成 source-map
  // devtool: 'source-map',
  devtool: 'cheap-module-eval-source-map',
  
  // 提供静态服务
  devServer:{ 
    contentBase: path.resolve(__dirname, "../dist"),
    port: 9999,
    publicPath: '/',
    overlay:{ //当有编译错误或者警告的时候显示一个全屏 overlay
      errors:true,
      warnings:true,
    },
    headers: { // 添加头部信息
      "X-Custom-Foo": "bar"
    },
    proxy: { // 请求代理
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { 
          "^/api": "",
        }
      }
    },
  },
}

