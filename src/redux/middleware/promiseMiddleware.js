export default function PromiseMiddleware({dispatch}){
  return next=>action=>{
    let {promise,callback}=action.payload;
    if(promise){
      promise.then(res=>{
        callback&&callback(res.data);dispatch({...action,payload:res.data})
      },error=>{
        callback&&callback(error);dispatch({...action,payload:error})
      })
    }else{
      next(action);
    }
  }
}
