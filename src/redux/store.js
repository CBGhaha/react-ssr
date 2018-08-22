import {createStore,applyMiddleware } from 'redux';
import  ajaxMiddleware from './middleware/ajaxMiddleware.js';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducer/index.js';

export default function initStore(initState){
  return createStore(combineReducers({...reducers}),initState,applyMiddleware(ajaxMiddleware,thunkMiddleware));
}
