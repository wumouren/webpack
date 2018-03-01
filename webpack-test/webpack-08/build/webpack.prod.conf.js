const webpack = require('webpack');
const glob = require('glob-all');
const path = require('path');
const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const purify = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')

let pathsToClean = ['dist']
let cleanOptions = {
  root:     path.resolve(__dirname, "../"),
  exclude:  [],
  verbose:  true,
  dry:      false
}

module.exports = {
  plugins: [
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
    new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ]
}