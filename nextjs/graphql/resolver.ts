import { GraphQLError } from 'graphql';
import { useRepository } from "../repositories"
import type { Result } from '../../interface';
import type { Card } from '../../interface/graphql';

async function useHandleError<T>(fn:()=>Promise<Result<T>>):Promise<T>{
  const result=await fn()
  if (!result.ok){
  throw new GraphQLError('Failed to request backend', {
    extensions: { code: 'FORBIDDEN' },
  })
}
return result.value
}

const repository=useRepository()

export const resolvers = {
  Query: {
    read: ()=>useHandleError<Card[]>(repository.read),
  },
  Mutation: {
    create:(_:any,{front,back}:{front:string,back:string})=>{
      return useHandleError(()=>repository.create({id:'',front,back}))
  },
//    create:repository.create
  }
}
