const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            include: [path.resolve(__dirname, 'src')],
            exclude: [path.resolve(__dirname, 'node_modules')],
            loader: 'babel-loader',
            query: {
                presets: [
                    'es2015',
                    'react'
                ]
            }
        }, {
            test: /\.css$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
            ],
        }]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css']
    },
    devServer: {
        contentBase: path.join(__dirname, "."),
        publicPath: '/dist/',
        compress: true,
        port: 9000
    }
};
