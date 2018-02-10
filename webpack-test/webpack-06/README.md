## 生成 html
https://doc.webpack-china.org/plugins/html-webpack-plugin/
使用该插件可生成新的 html 文件，原 html 中不必再手动添加，js 和 css 的引入，在生成文件中,会自动添加所需链接

配置参数如下：
filename: 指定生成文件的名称,  
template: 生成文件的模板，即原文件路径  
chunk: [''] 当多 entry 时，可指定那些 entry 相关的 chunk 被添加，默认添加所有 chunk   

## html-loader
可以对 html 中引入静态资源的路径做处理  
attrs 为数组，默认处理 img 标签引用路径。  

## 引入资源的优化
https://www.npmjs.com/package/html-webpack-inline-chunk-plugin  
https://doc.webpack-china.org/plugins/commons-chunk-plugin/  
将代码公共部分提取后直接插入 html 中，减少网络请求。