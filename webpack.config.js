const path = require("path");
const webpack = require("webpack");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const WebpackMd5Hash = require("webpack-md5-hash");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const devMode = process.env.npm_lifecycle_event;
//const svgStore = require("webpack-svgstore-plugin")

// TODO заменить postCss на актуальную версию, добавить поддержку stylelint
const postCss = {
  cssNext: require('postcss-cssnext'),
  import: require('postcss-import'),
  nested: require('postcss-nested'),
  flexbugs: require("postcss-flexbugs-fixes"),
  inputStyle: require("postcss-input-style"),
  objectFit: require("postcss-object-fit-images")
} 

module.exports = {
  entry: { main: "./src/index.js" },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
    publicPath: '/'  
  },

  devtool: devMode == 'dev' ? 'source-map' : 'none',

  stats: {
    errorDetails: true,
    children: false,
    warnings: false
  },

  devServer: {
    compress: true,
    port: 80,
    hot: true,
    historyApiFallback: {
			index: './src/index.html',
		},    
  },

  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },

  resolve: {
    modules: ['node_modules'],

    alias: {
        img: path.resolve(__dirname, 'src/img/')
    },

    extensions: ['*', '.js', 'jsx', '.css']
  },

  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx'],
    mainFields: ['loader', 'main']
  },

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
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                postCss.import(),
                postCss.cssNext(),
                postCss.nested(),
                postCss.flexbugs(),
                postCss.inputStyle(),
                postCss.objectFit()
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
        filename: 'build.css'
    }),
//TODO: почитать настройка webpack devserver HMR   
    new webpack.HotModuleReplacementPlugin()
  ],
  
//TODO:  актуальная оптимизация js, css
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin()
    ]
  }
}