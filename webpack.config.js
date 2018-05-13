const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let mode = 'development'
let plugins = []

if (process.env.NODE_ENV === 'production') {
  mode = 'production'
  plugins.push(new UglifyJsPlugin())
}

module.exports = {
  mode,
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins
}
