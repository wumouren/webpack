const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const purify = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack');

const glob = require('glob-all');
const path = require('path');

let pathsToClean = ['dist']
let cleanOptions = {
  root:     path.resolve(__dirname, "./"),
  exclude:  [],
  verbose:  true,
  dry:      false
}

module.exports = {
  context: path.resolve(__dirname, "src/"),
  entry: {
    index: './index.js'
  },
  output:{
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    filename: 'js/[name]-[hash]-dist.js',
    chunkFilename: '[name]-[hash]-dist.js'
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrites: [
    //     {
    //       from: '',
    //       to: function(cxt){
    //         return 
    //       }
    //     }
    //   ]
    // }  
  },

  module:{
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                'targets': {
                  'browsers': ['last 2 versions', 'safari >= 7']
                }
              }]
            ]
          }
        },
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     ident: 'postcss',
            //     plugins: [
            //       require('postcss-sprites')({
            //         retina: true, // 视网膜屏
            //         spritePath: 'dist/img/'
            //       })
            //     ]
            //   }
            // },

          ]
        })
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
        path.join(__dirname, './src/*.html'),
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