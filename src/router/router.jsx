import React,{Component}from 'react';
import {Router,Route,Link,Switch} from 'react-router-dom';
import AsyncComponent from '../components/asyncComponent';
import Notfind from '../pages/404';

//在服务端是不需要异步加载组件的 采用AsyncComponent componentDidMount生命周期反而不会执行拿不到异步的组件
let Page1 = process.env.NODE_ENV==='ssr'?require('../pages/page1/index.js').default:AsyncComponent(()=>import('../pages/page1/index.js'));
let Page2 = process.env.NODE_ENV==='ssr'?require('../pages/page2/index.js').default:AsyncComponent(()=>import('../pages/page2/index.js'));
let Home  = process.env.NODE_ENV==='ssr'?require('../pages/home/index.js').default:AsyncComponent(()=>import('../pages/home/index.js'));


const links=[
  {routerName:'HomePage',url:'/'},
  {routerName:'Page1',url:'/page1'},
  {routerName:'Page2',url:'/page2'}
];

 const myRouter=(history)=>{
    return (
      <Router history={history}>
        <div>
          <ul>
              {links.map((item,index)=>
                <li style={{display:'inline-block',padding:20}} key={index.toString()}>
                  <Link to={item.url}>{item.routerName}</Link>
                </li>
              )}
          </ul>
          <Switch>
              <Route path="/page1" component={Page1}></Route>
              <Route exact path="/page2" component={Page2}></Route>
              <Route exact path="/" component={Home}></Route>
              <Route component={Notfind}></Route>
          </Switch>
        </div>
      </Router>
    )
}
export default myRouter;
