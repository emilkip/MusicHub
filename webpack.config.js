const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: './public/javascripts/app/main.tsx',

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            styleAlias: path.resolve(__dirname, 'public/stylesheets')
        }
    },

    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'public/dist_client'),
        filename: 'client.js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: 'tsconfig.client.json'
                        }
                    }
                ]
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                // commons: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name: 'vendors',
                //     chunks: 'all'
                // }
                styles: {
                    name: 'styles',
                    test: /\.scss$/,
                    enforce: true
                }
            }
        }
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};
