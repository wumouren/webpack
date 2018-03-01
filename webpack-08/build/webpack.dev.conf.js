module.exports = {
  devtool: 'source-map',
  devServer:{
    port: 8081,
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
  plugins: [

  ]
}