export default function PromiseMiddleware({dispatch}){
  return next=>action=>{

      next(action);

  }
}
