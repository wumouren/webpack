const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const purify = require('purifycss-webpack');

const webpack = require('webpack');
const path = require('path');
const glob = require('glob-all');
module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].min.js',
    // publicPath: '/',
    chunkFilename: '[name].chunk.js'
  },
  module: {
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
            //       require('autoprefixer')(),
            //       // require('postcss-sprites')({
            //       //   spritePath: 'dist/img/'
            //       // }),
            //     ]
            //   }
            // }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              limit: 2024,
              outputPath: 'img/',
              useRelativePath: true,
              // publicPath: '../'
            }
          },
          // {
          //   loader: 'img-loader',
          //   option: {

          //   }
          // }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src']
          }
        }
      }
    ]
  },

  devtool: 'source-map',

  devServer:{
    port: 9000,
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

  resolve: {

  },

  plugins: [
    // 使用第三方库
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),

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
        // path.join(__dirname, './*.js'),
      ])
    }),

    // 生成 html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),

    new CleanWebpackPlugin('dist')
  ]
}