import type { Card } from "../../../../interface/graphql"
import type {Repository} from '../type'
import type {Result,CreatePostRequest,ReadPostRequest,CreatePostResponse,ReadPostResponse} from '../../../../interface/index'

if(!process.env.API_URL || !process.env.SECRET){
  process.exit()
}
//curl -X POST -H "Content-Type: application/json" -d '{"data":"transaction"}' 

const url=process.env.API_URL
const secret=process.env.SECRET

type HandleFetchContents =  CreatePostRequest|  ReadPostRequest

const handleFetch= async <T>(contents:HandleFetchContents):Promise<Result<T>>=>{
//  const handleFetch = async  <T>(contents:T):Promise<Result<T>>=>{
  const result=await fetch(url,{
    method: 'POST', 
    body: JSON.stringify(contents)
  })

  if(result.status===403)
  return  {
    ok:false,
    message:'gas returned forbidden'
  }
  else {
    const resuleValue=await result.json()
    return resuleValue.ok ?
    {
      ok:true,
      value: resuleValue.value
    }: {
      ok:false,
      message:'server side error'
    }
  }
}

function create({front,back}:Card):Promise<Result<CreatePostResponse>>{
  const contents:CreatePostRequest={
    secret,
    mode:'create',
    objective:'card',
    "data":{
      front,
      back,
    }
  }
  return handleFetch<CreatePostResponse>(contents)
}

function read():Promise<Result<ReadPostResponse>>{
  const contents:ReadPostRequest={
    secret,
    mode:'read',
    objective:'card',
  }

  return handleFetch(contents)
}


  const repository:Repository={
    create,
    read,
}

export default repository
