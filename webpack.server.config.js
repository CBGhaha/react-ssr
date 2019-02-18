var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path=require('path');
const config={
  //配置模块的读取和解析规则
  entry:{
      main:path.resolve(__dirname,'src/server/appHtml.js'),
  },
  mode:'production',
  module:{
    rules:[
      {
        test:[/\.css/,/\.less/],
        //忽略css
        use: ['ignore-loader'],

      },
      {
        test:/\.js/,
        use:[
          {
            loader:'babel-loader',
          }
        ],
        exclude:path.resolve(__dirname,'node_module')
      },
      {
        test: /\.(png|jpg|gif|jpeg)/,
        use: ['ignore-loader'],
      },

    ]
  },

  output: {
    // 为了以 CommonJS2 规范导出渲染函数，以给采用 Nodejs 编写的 HTTP 服务调用
    libraryTarget: 'commonjs2',
    path:path.resolve(__dirname,'distserver'),
    filename:"[name].js",
    publicPath:'/',
    chunkFilename:"[name].[chunkhash:8].js",//在entry中未定义的js 一般是动态按需加载时的js
    crossOriginLoading:'anonymous',
  },
  resolve:{
    alias:{
        components:path.resolve(__dirname,'src/components'),//匹配路径components
      },
    extensions:['.js','.less','.json','.jsx'],
    modules:['node_modules'],


  },
  plugins:[
    new CleanWebpackPlugin(['distserver']),//每次编译 清空dist文件夹
  ],
  //为了不把 Node.js 内置的模块打包进输出文件中，例如 fs net 模块等
  target:'node',
  devtool: 'source-map' ,
  //为了不把 node_modules 目录下的第三方模块打包进输出文件中
  externals: [nodeExternals()],
};
module.exports=config;
