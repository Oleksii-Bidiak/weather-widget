const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: ['@babel/polyfill', './index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: filename('js'),
	},
	devtool: isDev ? 'source-map' : false,
	devServer: {
		port: 3000,
		hot: isDev
	},
	resolve: {
		extensions: ['.js']
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: 'index.html',
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd
			}
		}),
		new CleanWebpackPlugin(),
		// [].concat(isDev ? [] : [new MiniCssExtractPlugin()]),
	],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
}
