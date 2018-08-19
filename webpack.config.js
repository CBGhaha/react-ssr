var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common=require('./webpack.common.js')
const merge = require('webpack-merge')
const config={
  //配置模块的读取和解析规则
  module:{
    rules:[
      //css/less文件打包 并单独编译成文件 不插入在bundle中
      {
        test:[/\.css/,/\.less/],
        //用于单独打包css
        use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                publicPath: '../'
              }
            },
            {
              loader:"css-loader",//css-loader用于支持css的模块化 可以让css支持import require
              options:{minimize:true,modules:true}
            },
            'less-loader',
            {
              loader: 'postcss-loader',//css兼容性前缀
              options: {
                  plugins:  [
                       require('autoprefixer')({
                        browsers: ['last 10 versions']
                    })
                  ]
              }
            }
          ],
          exclude:[
            'node_module','dist'
          ]
      },

    ]
  },

  //插件 运用插件可以实现很多重要功能 代码压缩 自动生成html 热加载 提取公共库 等等
  plugins:[
    new CleanWebpackPlugin(['dist']),//每次编译 清空dist文件夹
    //代码压缩 & 删除不被引用的多余代码  在webpack进行摇树优化之后吧bundle中没有被外部引用的代码删除
    //从webpack4起 指定环境为生产环境会自动调用UglifyJSPlugin()；
    // new UglifyJSPlugin(),
    //指定环境为生产环境 一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码
    new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
     }),
     new MiniCssExtractPlugin({
       filename: "[name].[chunkhash:8].css",
       chunkFilename: "[id].css"
     })
  ],

  //代码调试映射模式 (map文件) 用于追踪调试报错和源码位置
  // devtool:'eval-source-map', //---开发环境适合
  devtool:'source-map' // 或不设置 ---生产环境适合
};
module.exports=merge(common,config);
