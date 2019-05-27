const path = require("path");
const webpack = require("webpack");
const devMode = process.env.npm_lifecycle_event;

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js', 
  },

  mode: development,

  devtool: devMode == 'dev' ? 'source-map' : 'none',

  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },

  devServer: {    
    compress: true,
    port: 80,
    index: './dist/index.html',
    historyApiFallback: true,    
    hotOnly: true
}
}