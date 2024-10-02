import {Card,Image} from './graphql'

export type Result<T>={ok:false,message?:string}|{ok:true,value:T}

interface PostRequestBase {
    secret:string,
}
export interface CreatePostRequestBase extends PostRequestBase{
    mode: 'create',
}

export interface CreateCardRequest extends CreatePostRequestBase{
    objective: 'card',
    data:Omit<Card,'id'>,
}
export interface CreateImageRequest extends CreatePostRequestBase{
    objective: 'image',
    data:Omit<Image,'id'>,
}
export interface ReadPostRequest extends PostRequestBase{
    mode: 'read',
    objective: 'card' | 'image',
}
export type CreatePostRequest=CreateCardRequest | CreateImageRequest

export type PostRequest = CreatePostRequest | ReadPostRequest




export type UnexpectedPostResponse={
    ok:false,
    message:string
}
export type CreatePostResponse={ok:boolean}
export type ReadPostResponse=Card[]

export type PostResponse=UnexpectedPostResponse|CreatePostResponse|ReadPostResponse
