var extensions = ['.css', '.scss','.less','.png','.jpg','.gif']; //服务端渲染不加载的文件类型
  for (let i = 0, len = extensions.length; i < len; i++) {
    require.extensions[extensions[i]] = function () {
      return false;
    };
  }
const  express=require('express');
const  app=express();
const fs=require('fs');
const path=require('path');
const babelConfig=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../.babelrc')));
babelConfig.plugins=babelConfig.plugins.concat(['syntax-dynamic-import',"dynamic-import-node"]);
console.log(babelConfig);
require('babel-register')(babelConfig);
const  appHtml =require('./appHtml.js').default;
app.use(express.static(path.resolve(__dirname,'../../dist')));
app.use(appHtml)

app.listen('8080')
