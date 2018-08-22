import React,{Component} from 'react';
import context from '../../components/context.js';
import Child1 from './component/child1';
import Child2 from './component/child2';
const {Consumer,Provider}=context;
import { connect } from 'react-redux';
import action from '../../redux/actions/common.js';
import ajaxAction from '../../redux/actions/ajaxAction.js';
@connect(
  state=>({
    homeAjax:state.homeAjax
  }),
  {
    action,
    ajaxAction:ajaxAction
  }
)
//react 的context上下文 上下文用于将一些全局的状态作用于全部子组件 (redux的store)
//Provider 的value属性值会改变 在其内部 Consumer createContext（‘value’）时定义的value 而其外部不会受改变
export default class Home extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    (!this.props.homeAjax.data)&&this.props.ajaxAction('homeAjax',{level:'country'},(res)=>{console.log(res)});
  }
  render(){
    return(
      <div>
      <p>一个关于react上下文context的例子</p>
      <Provider value='red'>
        <Consumer>
          {theme => (<div style={{color:theme}}>child</div>)}
        </Consumer>
        <Child1/>
      </Provider>
      <Child1/>
      </div>
    )
  }
}
