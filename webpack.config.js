const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: '/src/script/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[hash].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
        // contentBase: 'dist',
        open: true,
        compress: true,
        hot: true,
        liveReload: true,
        watchFiles: ["*.html", "src/styles/*.scss"],
        compress: true,
        port: 3000,
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                // include: path.resolve(__dirname, 'src/styles/styles.css'),
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                rules: [{
                    test: /\.(woff2?|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                }, ],
            },

            // {
            //   test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
            //   use: [
            //     {
            //       loader: 'file-loader?name=assets/fonts/[name].[ext]',
            //     },
            //   ],
            // },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [{
        //         from: '**/*',
        //         context: path.resolve(__dirname, 'src', 'assets'),
        //         to: './assets',
        //     }, ],
        // }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'style-[hash].css',
        }),
    ],
};