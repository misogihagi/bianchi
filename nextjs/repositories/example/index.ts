import type { Card } from "../../../interface/graphql"
import type {Repository} from '../type'

import { genId } from "../../../utils"

const db = [
    { id: genId(), front: 'back', back: "front"},
    { id: genId(), front: 'reverso', back: "anverso"},
    { id: genId(), front: '表', back: "裏"},
] as Card[]

async function create({front,back}:{front:string,back:string}){
    db.push({id:genId(),front,back})
    return {ok:true,value:{ok:true}}
}

async function read(){
    return {ok:true,value:db}
}

const repository:Repository={
    create,
    read,
}

export default repository