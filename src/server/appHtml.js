import React from 'react';
import initStore from '../redux/store.js';
import {renderToString} from 'react-dom/server';
import MyRouter from '../router/router.jsx';
import createMemoryHistory from 'history/createMemoryHistory';
import createApp from '../createApp.js';
import fs from 'fs';
import path from 'path';
import ajaxAction from '../redux/actions/ajaxAction.js';
let html=fs.readFileSync(path.join(path.resolve(__dirname,'../../dist'),'app.html'),'utf-8');
export default async function appHtml(req,res,next) {
  const url=req.path;
  let store=initStore({});
  if(url!=='/favicon.ico'){
    let history=createMemoryHistory({initialEntries:[url]});
    let htmlString=renderToString(createApp(MyRouter(history),store));
    //获取路由下需要预先加载的数据 实际开发中可以放在一个配置文件中
    await Promise.all([ajaxAction('homeAjax',{level:'country'})(store.dispatch,store.getState)] ).then(()=>{
    }).catch((err)=>{});
    res.end(html.toString().replace("<div id='appContent'></div>",`<script>window.__DATA__ =${JSON.stringify(store.getState())}</script><div id='appContent'>${htmlString}</div>`))
  }else{
    res.end('aa')
  }


}
