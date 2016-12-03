const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: __dirname,
  resolve: {
    root: [
      path.join(__dirname, '/node_modules'),
      __dirname,
    ]
  },
  entry: 'src/index.js',
  output: {
    path: 'dist/',
    filename: 'ducktrack.eye.js',
    sourceMapFilename: 'ducktrack.eye.map',
    library: 'ducktrack.eye',
    libraryTarget: 'umd'
  },
  target: 'web',
  node: {
    process: false
  },
  plugins: [],
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}
