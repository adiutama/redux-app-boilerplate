var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var assetPath = '/assets/'
var absolutePath = path.join(__dirname, assetPath)

module.exports = {
    devtool: 'source-map',
    entry: ['./src/index'],
    output: {
        path: absolutePath,
        filename: 'app.js',
        publicPath: assetPath
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("style.css")
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            },
            // fonts and svg
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            {
                // images
                test: /\.(ico|jpe?g|png|gif)$/,
                loader: "file"
            },
            {
                // for some modules like foundation
                test: /\.scss$/,
                exclude: [/node_modules/], // sassLoader will include node_modules explicitly
                loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss!sass?sourceMap&outputStyle=expanded")
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss")
            }
        ]
    },
    postcss: function(webpack) {
        return [
            autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']})
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "node_modules")]
    }
}
