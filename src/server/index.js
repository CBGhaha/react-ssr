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
console.log(babelConfig);
require('babel-register')(babelConfig);
const  appHtml =require('./appHtml.js').default;
app.use(express.static('../../dist'));
app.use((req,res,next)=>{
  
    res.end(appHtml(req.path))
})

app.listen('8080')
