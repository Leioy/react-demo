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
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      },
      {
        test: /\.scss$/,
        loader: ['style-loader','css-loader','sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ]
  },
}