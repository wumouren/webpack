const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].min.css",
      allChunks: false // 提取所有 chunk ,默认false、
    }),
  ]
}