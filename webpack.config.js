const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports ={
  mode: 'production',
  entry: {
    rui: './lib/index.tsx'
  },
  output: {
    path: path.resolve(__dirname,'dist/lib'),
    library: 'rui',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'rui',
        template: 'index.html'
    })
],
}