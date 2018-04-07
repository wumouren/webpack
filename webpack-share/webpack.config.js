const path = require('path');
module.exports = {
  entry: {
    index: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
  },
  module:{
    
  },
  devServer:{
    port: 9999
  }
}