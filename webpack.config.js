var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var PathRewriterPlugin = require('webpack-path-rewriter');

module.exports = {
    entry: {
        app: [path.resolve("./src/scripts/app.js")],
        toolbar:path.resolve("./sample/toolbar.js"),
        circle:path.resolve("./sample/circle.js")
    },
    output: {
        path: path.resolve("./assets"),
        publicPath: '/assets/',
        filename: "[name].js"
    },
    plugins: [
        new ExtractTextPlugin("[name].css", {
            allChunks: true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            __DEV__: "true"
        }),
        new PathRewriterPlugin()
    ],
    externals: {
        "jquery": "jQuery"
        //"react": "React",
        //"react-dom": "render",
        //"react-router": "ReactRouter"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        //preLoaders: [{
        //    test: /src\/scripts\/libs\/.*\.js$/,
        //    exclude: 'node_modules',
        //    loader: 'file?name=[path][name].[ext]?[hash]&context=/'
        //}],
        loaders: [
            {
                test: /scripts\/libs\/.*\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file?name=[path][name].[ext]?[hash]&context=/'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?presets[]=es2015,plugins[]=transform-decorators-legacy,plugins[]=transform-class-properties'
            },
            {
                test: /\.jsx$/,
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,plugins[]=transform-decorators-legacy,plugins[]=transform-class-properties'],
                exclude: /(node_modules|bower_components )/
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }, {
                test: /\.less/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?{browsers:["ff >= 20", "Chrome >= 31", "ie >= 8", "Opera >= 26"]}!less-loader')
            }, {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'file-loader?name=[path][name].[ext]&context=./src'
            }, {
                test: /\.html$/,
                loader: PathRewriterPlugin.rewriteAndEmit({
                    name: '[path][name].html',
                    loader: 'html'
                })
            }
        ]
    }
}