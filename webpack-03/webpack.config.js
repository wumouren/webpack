module.exports = {
  entry: {
    index: './index.js'
  },
  output:{
    path: __dirname + '/bundle',
    publicPath: './bundle/',
    filename: '[name].bundle.js'
  },
  module:{
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            // loader: "style-loader/url",
            // loader: "style-loader/useable",
            loader: 'style-loader',
            options: {
              insertAt: 'bottom', /** top,bottom  插入位置 */
              insertInto: '#box', /** 生成 style, 插入 DOM */
              singleton: true, /** 合并多个 style 标签为一个标签 */
              transform: './css-transform.js' /** 对打包后的css文件做特殊处理 */
            }
          },
          {
            // loader: "file-loader",
            loader: 'css-loader',
            options: {
              /** https://doc.webpack-china.org/loaders/css-loader/ */
            }
          },
        ]  
      },
      {
        test: /\.less$/,
        /** https://doc.webpack-china.org/loaders/less-loader/ */
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader" ,
          }
       ]
    }
    ]
  }
}