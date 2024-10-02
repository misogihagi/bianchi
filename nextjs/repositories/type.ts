import type {Card} from '../../interface/graphql'
import type {Result,CreatePostRequest,ReadPostRequest,CreatePostResponse,ReadPostResponse} from '../../interface'

export type Repository = {
    create:({front,back}:Card)=>Promise<Result<CreatePostResponse>>,
    read:()=>Promise<Result<ReadPostResponse>>,
}