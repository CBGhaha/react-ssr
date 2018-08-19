import ajaxAxios from '../../utils/axios.js';
import * as services from '../../services/index.js';
export default function ajaxAction(method,parms,callback){
  let ajaxConfig=services[method];
  callback=typeof parms==='function'?parms:callback;
  let promise=ajaxAxios(ajaxConfig.url,typeof parms==='function'?{}:parms,ajaxConfig.method);
  return {
    type:method,
    payload:{
      promise:promise,
      callback:callback
      
    }

  }
}
