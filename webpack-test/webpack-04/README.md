# https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/
### 提取 css
    引入 const ExtractTextPlugin = require("extract-text-webpack-plugin") 之后，在plugins 中实例化 ExtractTextPlugin,接受一个 Object 参数.
    参数 allChunks 默认为 false 。
    当 allChunks 为 false 时, 通过 import 动态加载的组件中的样式不会被打包进设置的 css 打包文件中，而会被打包进组件打包后生成的 js 文件中，当访问该组件时，动态生成 style 标签插入页面中。
    // import(/*webpackChunkName:'设置打包生成的 chunk name'*/ '组件路径').then(回调函数)
    当 allChunks 为 true 时,则通过 import 动态加载的组件中的样式也会被打包进设置的 css 打包文件中。
# https://doc.webpack-china.org/loaders/postcss-loader/
### 转化 css 
    autoprefixer 添加浏览器前缀。
    cssnano 压缩 css , webpack 中 minimize 压缩的原理，便是引入 cssnano 进行压缩。
    postcss-cssnext 可以对一些浏览器支持不太好的新特新做处理。
    postcss-cssnext 可以单独使用，autoprefixer，已经包含在其中。

# tree Shaking 代码优化，去除多于代码，包括不限于，废弃的，没有用到的。
    webpack.optimize.UglifyJsPlugin 压缩 js 整理 js 代码，但对 es6 语法和一些第三方库无能为力。（针对 es6 可先用 babel 转化 ）
    purifycss-webpack 对 css 进行检测，去除多余代码。https://npm.taobao.org/package/purifycss-webpack
    在 webpack plugins 中对 purifycss-webpack 配置时，位置必须在 webpack.optimize.UglifyJsPlugin 之上。 
