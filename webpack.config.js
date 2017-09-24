const webpack = require('webpack');

const config = {
    devtool:'eval-source-map',
    context: __dirname + "/app",
    entry: "./main.js",

    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
    },
    devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    inline: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ],
    },
    plugins: [
        new webpack.BannerPlugin('created by Peng Zhang'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
    ]
};
module.exports = config;
