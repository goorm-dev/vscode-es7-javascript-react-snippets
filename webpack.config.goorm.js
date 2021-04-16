const path = require('path');
const EsmWebpackPlugin = require('@purtuga/esm-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const pkg = require('./package.json');

module.exports = {
	entry: pkg.main,
	mode: 'production',
	output: {
		path: path.resolve(__dirname, './dist/goorm/'),
		filename: 'index.js',
		library: 'LIB',
		libraryTarget: 'var',
	},
	externals: {
		vscode: 'commonjs2 vscode',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	plugins: [new EsmWebpackPlugin()],
};