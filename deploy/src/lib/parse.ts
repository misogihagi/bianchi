import type { Result,PostRequest } from "../../../interface";
import { Card, Image } from "../../../interface/graphql";


function parseCreateContext(objective:unknown, data:unknown):Result<Omit<Card,'id'>|Omit<Image,'id'>>{
  if(typeof data!=='object' || !data) return { ok: false };

  function getData(key:string){
    return (data as Record<string,unknown>)[key]
  }

  if (objective==='card'){
    const front =getData('front')
    const back =getData('back')
    if ( front || back) 
      return { ok: false }
    else if (typeof front !== "string" || typeof back !== "string")  
      return { ok: false }; 
    else 
    return {
      ok: true,
      value: {
        front,
        back
      }
    }
  } 
  else if (objective==='image'){
    const imageData =getData('data')
    if (typeof imageData !== "string")  
    return { ok: false }; 
    else return {
      ok: true,
      value: {
        data:imageData
      }
    }
  }
  else return { ok: false,message:'not supported objective' }; 
}

function parseReadContext(objective:unknown):Result<null>{
  if (objective==='card' || objective === 'image')
  return {
    ok: true,
    value:null
  }
  else return { ok: false,message:'not supported objective' }; 
}


export function parseRequest(
    req: any
  ): Result<PostRequest> {
    const {secret, mode, objective}=req
    // first, secret exists or not
    // second, verb exists or not
    // third, objectives exists or not
    if (!(secret)) return { ok: false };
    if (!(mode==='create' || mode==='read')) return { ok: false };
    if (!(objective==='card' || objective==='image')) return { ok: false };
  
    if (mode==='create') {
      const context=parseCreateContext(objective,req.data)
      if(context.ok===false) {
        return context
      }else {
        return {
          ok:true,
          value: {
            secret,
            mode,
            objective,
            ...context.value,
          }
        }
      }
    }
    else if (mode==='read') {
        const context=parseReadContext(objective)
        if(context.ok===false) {
          return context
        }else {
          return {
            ok:true,
            value: {
              secret,
              mode,
              objective,
            }
          }
        }
      }else return {
        ok:false,
        message: 'invalid mode'
      }
  }
  