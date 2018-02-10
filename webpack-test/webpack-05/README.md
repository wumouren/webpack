### 文件处理 file-loader, url-loader
使用 file-loader 来处理图片文件时，在 options 中配置图片输出路径（outputPath）和引用路径（publicPath）需注意：
这些路径分别是相对于 output 中 "path" (文件输出路径)，和 "publicPath"(文件引用路径)。
output 中的 path 为打包文件输出路径， publicPath 为静态资源文件加载路径。
可以在 postcss-loader 中使用 postcss-sprites , 生成雪碧图。retina 可处理视网膜屏下图片显示，img 需要改为 *@2x.[ext] 来命名。
字体文件可使用 url-loader 来处理：
{
    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
    loader: 'url-loader?limit=8192&name=[path][name].[ext]'
}
### 第三方库的处理
处理 npm 包可参见：
https://doc.webpack-china.org/plugins/provide-plugin/

处理本地库时该插件可配合，resolve 来通过别名，定位本地库的位置，注意，别名后需加 $ 符。
也可单独通过 imports-loader 来处理。


详细请看:
https://doc.webpack-china.org/configuration/output/#output-publicpath。
https://doc.webpack-china.org/loaders/file-loader/
https://doc.webpack-china.org/loaders/url-loader/
https://www.npmjs.com/package/postcss-sprites