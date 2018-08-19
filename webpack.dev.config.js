var webpack = require('webpack');
const common=require('./webpack.common.js');
const merge = require('webpack-merge');
const config={
  mode:'development',
  devServer:{
    hot:true,//启动热替换功能 局部刷新
    contentBase:'/',//启动服务器的目录 默认是当前执行目录
    host:'0.0.0.0',//启动服务器监听的域名 类似node里的listen 默认是127.0.0.1 如果希望局域网的设备访问项目可以设置成0.0.0.0
    port:3001,//启动服务器监听的端口号
    historyApiFallback:true,//请求不同路径时返回的html true表示 任何请求路径都返回index.html 然后js再根据路径渲染界面 适合单页面应用
    //在多页面应用中 如果不同的路径希望返回不同的html 可以如下设置
    // historyApiFallback: {
    //   // 使用正则匹配命中路由
    //   rewrites: [
    //     // /user 开头的都返回 user.html
    //     { from: /^\/user/, to: '/user.html' },
    //     { from: /^\/game/, to: '/game.html' },
    //     // 其它的都返回 index.html
    //     { from: /./, to: '/index.html' },
    //   ]
    // }

  },
  //代码调试映射模式 (map文件) 用于追踪调试报错和源码位置
  devtool:'eval-source-map', //---开发环境适合
  module: {
        rules: [
          //编译css/less文件
          {
            test:[/\.css/,/\.less/],
            use:[
              'style-loader',//style-loader将所有的计算后的样式加入页面中
              {
                loader:'css-loader',//css-loader用于支持css的模块化 可以让css支持import require
                options:{
                    minimize:true,
                    modules:true
                }
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
    plugins:[
      new webpack.HotModuleReplacementPlugin(),//HMR 模块热替换

    ],
}
module.exports=merge(common,config);
