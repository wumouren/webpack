const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const glob = require('glob-all');
const purify = require('purifycss-webpack');
const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: {
    index: './index.js'
  },
  output:{
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].bundle.js',
    // chunkFilename: '[name].bundle.js'
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
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: '../'
            }
          },
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

  resolve:{
    alias: {
      // jquery$: '本地地址'
    }
  },

  plugins: [
    new ExtractTextPlugin({
      filename: "css/[name].min.css",
      allChunks: true // 提取所有 chunk ,默认false、
    }),


    new webpack.optimize.CommonsChunkPlugin({
      name: "component",
      minChunks: Infinity
    }),

    new HtmlWebpackInlineChunkPlugin({
      inlineChunks: ['component']
    }),
   
    new purify({
      paths: glob.sync([
        path.join(__dirname, './*.html'),
        path.join(__dirname, './*.js'),
        // path.join(__dirname, '文件路径'),
      ])
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),

    
  ]
}