const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const glob = require('glob-all');
const purify = require('purifycss-webpack');
const path = require('path');
module.exports = {
  // context: path.resolve(__dirname + '/'),
  entry: {
    index: './index.js'
  },
  output:{
    path: path.resolve(__dirname, 'bundle'),
    // publicPath: path.resolve(__dirname, 'bundle'),
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
                  require('postcss-sprites')({
                    retina: true // 视网膜屏
                    // options 
                  })
                  // require('autoprefixer')(),
                  // require('cssnano')()
                ]
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
              // useRelativePath: true,
              publicPath: ''
            }
          },
          // {
          //   loader: 'url-loader',
          //   options: {
          //     name: '[name].[ext]',
          //     limit: 8192
          //   }
          // }
        ]
      },
      // {
      //   test: require.resolve("本地库路径"),
      //   use: {
      //     loader: 'imports-loader',
      //     options: {
      //       $: 'jquery'
      //     }
      //   }
      // }
    ]
  },

  resolve:{
    alias: {
      // jquery$: '本地地址'
    }
  },

  plugins: [
    new ExtractTextPlugin({
      filename: "[name].min.css",
      allChunks: true // 提取所有 chunk ,默认false、
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      // $: 'jquery' 本地库使用方式
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