const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const devMode = process.env.npm_lifecycle_event;
const svgStore = require("webpack-svgstore-plugin")

const postCss = {
  cssNext: require('postcss-cssnext'),
  import: require('postcss-import'),
  nested: require('postcss-nested'),
  flexbugs: require("postcss-flexbugs-fixes"),
  inputStyle: require("postcss-input-style"),
  objectFit: require("postcss-object-fit-images")
}

module.exports = {
  entry: { main: "./src/js/index.js" },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: devMode == 'prod' ? '[name].[chunkhash].js' : '[name].js',
    publicPath: '/'  
  },

  devtool: devMode == 'dev' ? 'source-map' : 'none',

  stats: {
    errorDetails: true,
    children: false,
    warnings: false
  },

  devServer: {
    host: 'localhost',
    port: 80,
    contentBase: path.resolve(__dirname, 'dist')    
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

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
      },
      {
        test: /\.(svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
        filename: devMode == 'prod' ? 'style.[contenthash].css' : 'style.css'
    }),

    new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: "./src/html/index.html",
        filename: "index.html"
      }),
    new WebpackMd5Hash(),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 2,
    }),

    new svgStore({
      svgoOptions: {
        plugins: [{
          removeTitle: true
        }]
      }
    }),   
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: true,
        parallel: true,
      }),
      new OptimizeCssAssetsPlugin()
    ]
  }
}