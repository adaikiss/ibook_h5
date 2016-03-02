var config = require("./webpack.config.js");
var webpackDevServer = require('webpack-dev-server');
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");
var compiler = require('webpack')(config);
var server = new webpackDevServer(compiler, {
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    contentBase:"./",
    info:false,
    inline:true
});
server.listen(8080);