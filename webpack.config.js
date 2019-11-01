const path = require('path')
module.exports ={
  entry: {
    rui: './lib/index.tsx'
  },
  resolve: {
    extensions: ['.ts','.tsx','.js','.jsx'],
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
}