import React from 'react';
import store from '../redux/store.js';
import {AppContainer} from 'react-hot-loader';
import {renderToString} from 'react-dom/server';
import MyRouter from '../router/router.jsx';
import createMemoryHistory from 'history/createMemoryHistory'
import createApp from '../createApp.js'
import fs from 'fs'
import path from 'path'

let html=fs.readFileSync(path.join(path.resolve(__dirname,'../../dist'),'app.html'),'utf-8');
export default function appHtml(url) {
  console.log(url)
  if(url!=='/favicon.ico'){
    let history=createMemoryHistory({initialEntries:[url]});
    let htmlString=renderToString(createApp(MyRouter(history),store));
    return html.toString().replace("<div id='appContent'></div>",`<div id='appContent'>${htmlString}</div>`)
  }else{
    return html
  }


}
