const webpack = require('webpack');

module.exports = {
	entry: {
		ogForm:['./src/index'],
	},
	output: {
		path: __dirname + '/public/',
		"filename": "[name].js"
	},
	devServer: {
		inline: true,
		contentBase: __dirname + '/public/',
		publicPath: '/',
		// watchContentBase: true,
		// compress: true,
		port: 9000
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: [['env', {targets:{ie:10}}]]
				}
			}
		]
	},
	resolve: {
		modules: ['./node_modules']
	}
};