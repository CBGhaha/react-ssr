import React,{Component} from 'react';
import context from 'components/context';
const {Consumer}=context;

export default class Child1 extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
          <Consumer>
            {value=><div style={{color:value}}>child1</div>}
          </Consumer>
      </div>
    )
  }
}
