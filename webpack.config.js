const path = require('path')
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
}