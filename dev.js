var path = require("path");
var config = require("./webpack.config.js");
var webpackDevServer = require('webpack-dev-server');
config.entry.toolbar = path.resolve("./sample/toolbar.js");
config.entry.circle = path.resolve("./sample/circle.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");
var webpack = require('webpack');
config.plugins.push(new webpack.HotModuleReplacementPlugin());
var compiler = webpack(config);

var server = new webpackDevServer(compiler, {
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    contentBase:__dirname,
    //info:true,
    //quiet: false,
    //noInfo: false,
    stats: { colors: true },
    watchDelay: 100,
    publicPath: "/assets/",
    //filename: "app.js",
    //lazy: true
});
server.listen(8080);