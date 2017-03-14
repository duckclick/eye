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
    filename: 'duckclick.eye.js',
    sourceMapFilename: 'duckclick.eye.map',
    library: 'DuckClickEye',
    libraryTarget: 'var'
  },
  target: 'web',
  node: {
    process: false
  },
  plugins: [
    new webpack.DefinePlugin({
      WING_HOST: JSON.stringify(process.env.WING_HOST || '//localhost:7273')
    })
  ],
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}
