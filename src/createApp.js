import React from 'react';
import { Provider } from 'react-redux';
import styles from './global.less'




export default function createApp(element,store){
  return (
            <Provider store={store}>
              <div>
                {element}
              </div>
            </Provider>  
      )
}
