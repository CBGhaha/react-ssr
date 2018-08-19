import React,{Component}from 'react';
import {Router,Route,Link,Switch} from 'react-router-dom';
import AsyncComponent from '../components/asyncComponent';
import RootLayout from '../layout/rootLayout';
import Notfind from '../pages/404';
const Home=AsyncComponent(()=>import('../pages/home/index.js'));
// const Page1=AsyncComponent(()=>import('../pages/page1'));
const Page2=AsyncComponent(()=>import('../pages/page2'));

import Page1 from '../pages/page1';

const links=[
  {routerName:'HomePage',url:'/'},
  {routerName:'Page1',url:'/page1'},
  {routerName:'Page2',url:'/page2'}
];

//
const LayoutComponent=({component:Component,...reset})=>(
    <Route {...reset} render={()=>(<RootLayout><Component/></RootLayout>)} />
)

 const myRouter=(history)=>{
    return (
      <Router history={history}>
        <div>
          <ul>
              {links.map((item,index)=>
                <li>
                  <Link to={item.url}>{item.routerName}</Link>
                </li>
              )}
          </ul>
          <Switch>
              <Route path="/page1" component={Page1}></Route>
              <Route exact path="/page2" component={Page2}></Route>
              <LayoutComponent exact path="/" component={Home}/>
              <Route component={Notfind}></Route>
          </Switch>
        </div>
      </Router>
    )
}
export default myRouter;
