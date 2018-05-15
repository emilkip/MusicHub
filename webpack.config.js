const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './public/javascripts/app/main.tsx',

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            styleAlias: path.resolve(__dirname, 'public/stylesheets')
        }
    },

    output: {
        path: path.resolve(__dirname, 'public/dist_client/javascripts'),
        filename: 'client.js'
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
                // use: ExtractTextPlugin.extract({
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

    plugins: [
        // new ExtractTextPlugin('../stylesheets/style.css')
    ]
};
