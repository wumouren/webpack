const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 注意版本号 webpack 4 以上版本请下载 @next 版本
const merge = require('webpack-merge')
const webpack = require('webpack');
const path = require('path');

const prodConf = require('./webpack.prod.conf');
const devConf = require('./webpack.dev.conf');

module.exports = (env, argv) => {
  console.log(env,'==================', argv.mode)

  const baseConf = {
    entry: {
      index:  path.resolve(__dirname, '../src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name].min.js'
    },

    // optimization 优化配置 webpack 4 新增
    optimization: {
      
    },

    // 模块相关 
    module:{
      rules: [
        {
          test: /\.jsx?$/,// 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
          exclude: /(node_modules|bower_components)/, // 过滤掉不需要处理的文件
          use: { // 指定使用的 loader
            loader: 'babel-loader',
            options: {
              // presets: ['es2015','react'] webpack 3
              presets: ['@babel/preset-react','@babel/preset-es2015'], // webpack 4
            }
          } 
        },
        {
          test: /\.(less|css)$/,
          use: ExtractTextPlugin.extract({ // 使用插件抽离 css ，生成单独的 css 文件
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader:  'less-loader',
                options: { 
                  javascriptEnabled: true 
                } 
              }
            ]
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
                name: 'img/[name]-[hash:5].[ext]'
                // 自定义配置，图片压缩、处理等
              } 
            }
          ]
        }
      ]  
    },

    // 解析相关
    resolve: {
      // 别名
      alias: {
        Js: path.resolve(__dirname, '../src/js'),
        Less: path.resolve(__dirname, '../src/css'),
        Css$: path.resolve(__dirname, '../src/css/index.css')
      },
      // 文件后缀补全
      extensions: ['.js','.jsx','.less','.css'],
      modules: [
        path.resolve(__dirname, '../my_modules'),
        'node_modules',
      ]
    },

    plugins: [
      // 每次打包前清除 dist 下的文件
      new CleanWebpackPlugin('dist'),

      // 提取样式，生成单独文件
      new ExtractTextPlugin("css/styles.css"),
      
      // 生成新的 html 文件
      new HtmlWebpackPlugin({ 
        filename: 'index.html', // 如果文件名不是 index , 开发时要在 url 处添加文件名
        template: path.resolve(__dirname, '../src/index.html'), // 注意路径,
      }),
    ]
  }
  const config = env === 'dev' ? devConf : prodConf;
  return merge(baseConf,devConf)
}