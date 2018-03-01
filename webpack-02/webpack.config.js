module.exports = {
  entry: {
    index: './index.js'
  },
  output:{
    path: __dirname + '/',
    filename: '[name].min.js'
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                'targets': {
                  'browsers': ['last 2 versions', 'safari >= 7']
                }
              }]
            ]
          }
        },
        exclude: '/node_modules/'
      }
    ]
  }
}