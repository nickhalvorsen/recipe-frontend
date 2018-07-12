const path = require("path")
const webpack = require("webpack")
const dotenv = require('dotenv').config({path: __dirname + '/.env'})
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['env'] }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        publicPath: '/',
        filename: "bundle.js"
    },
    devServer: {
        // contentBase: path.join(__dirname,'public'),
        //contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        //publicPath: "http://localhost:3000/dist",
        // need this line to fix webpack-dev-server 404'ing on page refresh
        historyApiFallback: true
    },
    plugins: [ 
        new webpack.HotModuleReplacementPlugin(), 
        new webpack.DefinePlugin({'process.env': JSON.stringify(dotenv.parsed)}),
        new HtmlWebpackPlugin({title: 'Recipe', template: 'src/index.html'})
    ],
};
