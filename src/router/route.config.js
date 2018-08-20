import AsyncComponent from '../components/asyncComponent';

let url1='../pages/page1/index.js';
let url2='../pages/page2/index.js';
let url3='../pages/home/index.js';

function loadingMode(url){
  return process.env.NODE_ENV==='ssr'?require(url).default:AsyncComponent(()=>import(url));
}
let Page1 = loadingMode(url1);
let Page2 = loadingMode(url2);
let Home  = loadingMode(url3);


const routeConfig=[
  {
    path:'/',
    exact:true,
    component:Home
  },
  {
    path:'/page1',
    exact:false,
    component:Page1

  },
  {
    path:'/page2',
    exact:true,
    component:Page2

  }


]
