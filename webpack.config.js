/* eslint-disable no-undef */
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const devMode = process.env.npm_lifecycle_event

const postCss = {
	autoprefixer: require('autoprefixer'),
	cssvariables: require('postcss-css-variables'),
	import: require('postcss-import'),
	normalize: require('postcss-normalize'),
	nested: require('postcss-nested'),
}

module.exports = {
	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'build.js',
		publicPath: '/',
	},

	devtool: devMode == 'dev' ? 'source-map' : 'none',

	resolve: {
		alias: {
			// '~images': path.resolve(__dirname, 'src/img/'),
			'react-dom': '@hot-loader/react-dom',
		},
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						plugins: ['react-hot-loader/babel'],
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					'css-hot-loader',
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								postCss.autoprefixer({
									browsers: ['last 4 version'],
								}),
								postCss.import(),
								postCss.normalize(),
								postCss.nested(),
								postCss.cssvariables(),
							],
						},
					},
				],
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'build.css',
		}),
	],

	optimization: {
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				terserOptions: {
					output: {
						comments: false,
					},
				},
			}),
			new OptimizeCssAssetsPlugin(),
		],
	},
}
