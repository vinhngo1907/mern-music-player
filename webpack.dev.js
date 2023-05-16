const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry: {
        app: './app'
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        chunkFilename: '[id].js',
        publicPath: '/'
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        stats: 'error-only',
        hot: true,
        inline: true,
        historyApiFallback: true,
        port: 8000,
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    resolve: {
        extensions: ['.js', '.sass', '.json'],
        modules: ['node_modules', 'app', 'seed'],
    },
    devtool: 'cheap-module-source-map',
}