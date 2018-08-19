import React ,{Component} from 'react';
import { connect } from 'react-redux';
import action from '../redux/actions/common.js';
import ajaxAction from '../redux/actions/ajaxAction.js';
@connect(
  store=>({

  }),
  {
    action,
    ajaxAction
  }
)
export default class RootLayout extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const {children,action,ajaxAction}=this.props;
    return(
      <div>
        {
          React.cloneElement(
              children,{action,ajaxAction}
          )
        }
      </div>
    )
  }
}
