import axios from 'axios';
export default function ajaxAxios(url,params={},method){
  return axios({
    method:method.toLocaleUpperCase(),
    url:url,
    params:params
    
  })
}
