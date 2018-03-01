const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const glob = require('glob-all');
const purify = require('purifycss-webpack');
const path = require('path');
module.exports = {
  entry: {
    index: './index.js'
  },
  output:{
    path: __dirname + '/bundle',
    publicPath: './bundle/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  module:{
    rules: [
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
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-cssnext')(),
                  // require('autoprefixer')(),
                  // require('cssnano')()
                ]
              }
            }
          ]
        })
      },
      
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].min.css",
      allChunks: true // 提取所有 chunk ,默认false、
    }),

    new purify({
      paths: glob.sync([
        path.join(__dirname, './index.html'),
        // path.join(__dirname, '文件路径'),
      ])
    }),

    new webpack.optimize.UglifyJsPlugin(),


  ]
}