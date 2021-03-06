import initStore from '../redux/store.js';
import {renderToString} from 'react-dom/server';
import MyRouter from '../router/router.jsx';
import createMemoryHistory from 'history/createMemoryHistory';
import createApp from '../createApp.js';
import ajaxAction from '../redux/actions/ajaxAction.js';
module.exports = html=> async function appHtml(req,res,next) {
  const url=req.path;
  let store=initStore({});
  if(url!=='/favicon.ico'){
    let history=createMemoryHistory({initialEntries:[url]});
    //获取路由下需要预先加载的数据 实际开发中可以放在一个配置文件中
    await Promise.all([ajaxAction('homeAjax',{grade:'五年级'})(store.dispatch,store.getState)] ).then(()=>{
    }).catch((err)=>{});
    let htmlString=renderToString(createApp(MyRouter(history),store));
    res.end(html.toString().replace("<div id='appContent'></div>",`<script>window.__DATA__ =${JSON.stringify(store.getState())}</script><div id='appContent'>${htmlString}</div>`))
  }else{
    res.end('aa')
  }


}
