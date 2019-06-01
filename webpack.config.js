const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.npm_lifecycle_event;


module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js', 
    publicPath: "/",
  },

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
          'style-loader', MiniCssExtractPlugin.loader, 'css-loader' ,'postcss-loader'      
          
        ]
      }
    ]
  },

  devServer: { 
    contentBase: path.join(__dirname, 'dist'),   
    compress: true,
    port: 80,
    index: './index.html',
    historyApiFallback: true,    
    hot: true
},

plugins: [
  new webpack.HotModuleReplacementPlugin(),

  new MiniCssExtractPlugin({
    filename: 'build.css',
  })
]
}