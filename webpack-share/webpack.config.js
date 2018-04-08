const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 注意版本号 extract-text-webpack-plugin@next
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
  },
  module:{
    rules: [
      {
        test: /\.jsx?$/,// 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
        exclude: /(node_modules|bower_components)/, // 过滤掉不需要处理的文件
        use: { loader: 'babel-loader' } // 指定使用的 loader
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.html$/,
        use: [ 
          {
            loader: 'html-loader',
            options: { // 压缩 html
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // 自定义配置，图片压缩、处理等
            } 
          }
        ]
      }
    ]  
  },

  // 提供静态服务
  devServer:{ 
    port: 9999,
    headers: { // 添加头部信息
      "X-Custom-Foo": "bar"
    },
    proxy: { // 请求代理
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
  plugins: [
    // 每次打包前清除 dist 下的文件
    new CleanWebpackPlugin('dist'),

    // 提取样式，生成单独文件
    new ExtractTextPlugin("styles.css"),
    
    // 生成新的 html 文件
    new HtmlWebpackPlugin({ 
      filename: 'index.html', // 最好和原文件同名，否则会有不可预期的错误
      template: './src/index.html', // 相对路径,
    }) 
  ]
}