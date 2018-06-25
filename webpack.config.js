const path = require('path');
// const extractTextPlugin = require('extract-text-webpack-plugin');


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
                test: /\.scss$/,
                // use: extractTextPlugin.extract({
                //     fallback: "style-loader",
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                // })
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },

    optimization: {
        // Compiling vendors libs into a single chunk
        // splitChunks: {
        //     cacheGroups: {
        //         commons: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: 'vendors',
        //             chunks: 'all'
        //         }
        //     }
        // }
    },

    plugins: [
        // new extractTextPlugin('style.css')
    ]
};
