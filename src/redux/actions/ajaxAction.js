import ajaxAxios from '../../utils/axios.js';
import * as services from '../../services/index.js';
export default  function ajaxAction(method,parms,callback){
  let ajaxConfig=services[method];
  callback=typeof parms==='function'?parms:callback;
  return  async (dispatch,getState)=>{
    await  ajaxAxios(ajaxConfig.url,typeof parms==='function'?{}:parms,ajaxConfig.method).then(res=>{
      callback&&callback(res.data);
      dispatch({
        type:method,
        payload:res.data
      })
    });
  }

}
