const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config={
  entry:{
    main:path.resolve(__dirname,'src'),//项目的主入口
    //代码分离---提取公共库
    // vendor:['react','react-router-dom','react-dom',],
  },
  output:{

    //如果需要使用cdn
    // path:path.resolve(__dirname,'[hash]'), //cdn地址文件夹名字是hash变化的
    // publicPath:'http://www.cdn.com/mycdn/[hash]/',

    filename:"[name].[hash].js",
    path:path.resolve(__dirname,'dist'),
    publicPath:'/',
    chunkFilename:"[name].[chunkhash:8].js",//在entry中未定义的js 一般是动态按需加载时的js
    crossOriginLoading:'anonymous',//设置跨域js crossorigin的值（主要用于获取跨域js的报错信息）

  },
  //配置模块的读取和解析规则
  module:{
    rules:[
      {
        test:/\.js/,
        use:[
          {
            loader:'babel-loader',
          }
        ],
        exclude:path.resolve(__dirname,'node_module')
      },
      //支持图片  import
      {
        test: /\.(png|jsp|gif)/,
        use:[
          {
            loader: 'url-loader',
            options:{
              query: {
                limit: 8192,
              }
            }
          }
        ],
      },

    ]
  },
  //配置webpack从入口文件进入编译 如何寻找对应的模块
  resolve:{
    //设置文件夹别名
    alias:{
        components:path.resolve(__dirname,'src/components'),//匹配路径components
        // 'utils$':'./src/utils',//配置以utils为结尾的路径
    },
    //设置模块引入时可以省略的后缀名
    extensions:['.js','.less','.json','.jsx'],
    //设置webpack在哪个文件夹中寻找模块 默认是node_module
    modules:['node_modules'],


  },
  //代码分离---
  optimization: {
    splitChunks: {
      minChunks: 1,
      chunks:'all'
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  //插件 运用插件可以实现很多重要功能 代码压缩 自动生成html 热加载 提取公共库 等等
  plugins:[
    //自动生成html模板
    new HtmlWebpackPlugin({
        filename: 'index.html',//生成的html模板的名称
        template: path.join(__dirname, 'src/index.html')//生成的html的模板的
    }),
  ],

  //项目的类型 默认是web项目
  target:'web',	//针对浏览器 (默认)，所有代码都集中在一个文件里
      // 'node'	针对 Node.js，使用 require 语句加载 Chunk 代码
      // 'async-node'	针对 Node.js，异步加载 Chunk 代码
      // 'webworker'	针对 WebWorker
      // 'electron-main'	针对 Electron 主线程
      // 'electron-renderer' 针对 Electron 渲染线程


//设置哪些模块不用打包到bundle里而是直接引用全局变量
//例如我在全局html里 引入jquery cdn地址 我在模块里引入jquery（import $ from 'jquery'）时不希望再将jq打包入bundle里
  externals:{
    // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
    jQuery:'jQuery'
  }
};
module.exports=config;
