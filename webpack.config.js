var path = require('path');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js"
    },
    devtool: 'source-map',

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
    },
    resolveLoader: {
    },

    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: path.join(__dirname, 'node_modules', 'zone.js', 'dist')
        }]
    },
};