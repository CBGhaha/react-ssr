//webpack-dev-server 是express+webpack-dev-middleware 两者区别是webpack-dev-server是封装好的 除了webpack.config.js配置 很难做定制化的设置
//webpack-dev-middleware 可以手动配置服务 整合自己的后端服务


const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
