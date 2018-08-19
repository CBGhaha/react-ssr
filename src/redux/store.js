import {createStore,applyMiddleware } from 'redux';
import  promiseMiddleware from './middleware/promiseMiddleware.js';
import { combineReducers } from 'redux';
import * as reducers from './reducer/index.js';
const store =createStore(combineReducers({...reducers}),applyMiddleware(promiseMiddleware));
export default store;
