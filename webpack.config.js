var webpack = require('webpack');
var path = require('path');
var libraryName = 'util';

var config = {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: 'util.js',
        libraryTarget: 'commonjs',
        // umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|test)/,
                query: {
                    presets: ['es2015']
                }
             }
        ]
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    }
}

module.exports = config;