const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /.(js)?$/,
                loader: 'script-loader',
                include: [],
                exclude: [/node_modules/]
            },
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,   // extract to a file
                    'css-loader',                  // turn CSS → CommonJS
                    'less-loader'                  // compile Less → CSS
                ],
            },
            {
                test: /\.pug$/,
                use: 'pug-loader',
            },
        ],
    },

    resolve: { extensions: ['.ts', '.js'] },

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs'),
        clean: true,
        publicPath: '',
    },

    plugins: [
        new HtmlWebpackPlugin({ template: 'src/pug/index.pug', inject: false }),
        new MiniCssExtractPlugin({ filename: 'main.css' }),
        new CopyPlugin({
            patterns: [
                { from: 'src/public/', to: './' },
            ],
        })
    ],

    devServer: {
        static: path.join(__dirname, 'docs'),
        port: 3000,
        open: true
    },
};
