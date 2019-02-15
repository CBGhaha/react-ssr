
const  express=require('express');
const  app=express();
const fs=require('fs');
const path=require('path');
let html=fs.readFileSync(path.join(path.resolve(__dirname,'../../dist'),'app.html'),'utf-8');
const appHtml =require('../../distserver/main.js');
const appHtmlMiddleware=appHtml(html);
app.use(express.static(path.resolve(__dirname,'../../dist')));
app.use(appHtmlMiddleware);
console.log('open http://localhost:8080');
app.listen('8080')
