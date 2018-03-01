# css-loader,less-loader
## style-loader/url 配合 file-loader 生成多个 link 标签，引入 css
## style-loader/useable 配合 css-loader， 在入口文件中引入 css 文件赋值给变量，通过函数调用的方式，来使用相应的 css 文件
## style-loader 的 options 配置项：
### {
###  insertAt: 'bottom', /** top,bottom  插入位置 */
###  insertInto: '#box', /** 生成 style, 插入 DOM */
###  singleton: true, /** 合并多个 style 标签为一个标签 */
###  transform: url, /** 对 css 文件做特殊处理，url 为处理打包后 生成 js 文件的路径  */
###}

# 更多内容 https://doc.webpack-china.org/loaders