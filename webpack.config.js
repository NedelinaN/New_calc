/* eslint-disable no-undef */
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.npm_lifecycle_event

const postCss = {
	import: require('postcss-import'),
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

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: [
					'css-hot-loader?reloadAll=true',
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
							plugins: () => [postCss.import(), postCss.nested()],
						},
					},
				],
			},
		],
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),

		new MiniCssExtractPlugin({
			filename: 'build.css',
		}),
	],
}
