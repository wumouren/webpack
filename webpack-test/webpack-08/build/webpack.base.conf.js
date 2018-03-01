const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const purify = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack');

const glob = require('glob-all');
const path = require('path');

// 合并工具
const merge = require('webpack-merge');

const devConfig = require('./webpack.dev.conf');
const prodConfig = require('./webpack.prod.conf');

let pathsToClean = ['dist']
let cleanOptions = {
  root:     path.resolve(__dirname, "../"),
  exclude:  [],
  verbose:  true,
  dry:      false
}
// 生成公共配置
const baseConfig = env => {
  
  // 可通过数组方法 concat 来添加其他 loader 
  
  const scriptLoader = ['babel-loader']
  const cssLoader = [
    {
      loader: 'css-loader',
      options: {
        minimize: true,
        souceMap: env === 'dev',
      }
    },
  ]
  const styleLoader = env === 'dev' ? 
    [{
      loader: 'style-loader'
    }].concat(cssLoader) :
    ExtractTextPlugin.extract({
      fallback: {
        loader: 'style-loader',
        options: {
          singleton: true,
          souceMap: env === 'dev'
        }
      },
      use: cssLoader
    })

  return {
    context: path.resolve(__dirname, "../src/"),
    entry: {
      index: './index.js'
    },
    output:{
      path: path.resolve(__dirname, '../dist'),
      // publicPath: '/',
      filename: 'js/[name]-[hash]-dist.js',
      chunkFilename: '[name]-[hash]-dist.js'
    },
  
    devtool: 'source-map',
  
    devServer:{
      port: 8081,
      historyApiFallback: {
        rewrites: [
          // { from: /^\/$/, to: '/views/landing.html' },
          {
            from: /^\/subpage/,
            to: () =>{
              return
            }
          },
        ]
      },
      proxy: {
        "/learn": {
          target: "https://coding.imooc.com",
          changeOrigin: true,
          pathRewrite: {
            // "^/api": ""
          },
          headers:{
  
          }
        }
      }
    },
  
    module:{
      rules: [
        {
          test: /\.js$/,
          use: scriptLoader,
          exclude: '/node_modules/'
        },
        {
          test: /\.css$/,
          use: styleLoader,
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: '[name]-sprite.[ext]',
                outputPath: 'img/',
                publicPath: '',
                useRelativePath: true,
              }
            },
            {
              loader: 'img-loader',
              options: {
                pngquant: {
                  floyd: 0.5,
                  speed: 2
                },
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options:{
              attrs: ['img:src']
            }
          }
        }
      ]
    },
    devtool: 'source-map',
  
    devServer:{
      port: 8081,
      historyApiFallback: {
        rewrites: [
          // { from: /^\/$/, to: '/views/landing.html' },
          {
            from: /^\/subpage/,
            to: () =>{
              return
            }
          },
        ]
      },
      proxy: {
        "/learn": {
          target: "https://coding.imooc.com",
          changeOrigin: true,
          pathRewrite: {
            // "^/api": ""
          },
          headers:{
  
          }
        }
      }
    },
    resolve:{
      alias: {
        '$': 'jquery',
      }
    },
    plugins: [
      
      // 提取 css
      new ExtractTextPlugin({
        filename: "css/[name].min.css",
        allChunks: true // 提取所有 chunk ,默认false、
      }),
      
      // 提取公共代码
      new webpack.optimize.CommonsChunkPlugin({
        name: "component",
        minChunks: Infinity
      }),
      
      // 公共代码直接插入页面
      new HtmlWebpackInlineChunkPlugin({
        inlineChunks: ['component']
      }),
      
      // 去除多余代码
      new purify({
        paths: glob.sync([
          path.join(__dirname, '../src/*.html'),
        ])
      }),
  
      // 生成 html
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
      }),
  
      // 使用第三方库
      new webpack.ProvidePlugin({
        $: 'jquery',
      }),
      new CleanWebpackPlugin(pathsToClean, cleanOptions)
    ]
  }
}

module.exports = env => {
  const config = env === 'dev' ? devConfig : prodConfig;

  // 合并配置
  return merge(baseConfig(env),config)
}