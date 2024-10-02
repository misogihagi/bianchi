import type { Card } from "../../../interface/graphql"
import type {Repository} from '../type'

import sqlite3 from "sqlite3"
import schema from "../schema";
import { genId } from "../../../utils"


const db = new sqlite3.Database("./test.db");

db.serialize(() => {
    db.run(schema.transaction.toSQL());
    db.run(schema.access.toSQL());
    db.run(schema.data.toSQL());
});

async function create({front,back}:{front:string,back:string}){
    db.run(`INSERT INTO ${schema.data.name}
    (${Object.keys(schema.data.properties).join(',')})
    VALUES(${genId()},${front},${back})`)
    return {ok:true,value:{ok:true}}
}

async function read(){
    const rows= await new Promise<Card[]>((resolve,reject)=>{
      db.all(`select ${Object.keys(schema.data.properties).join(',')} from ${schema.data.name}`,
      (err:unknown, rows:unknown[]) => {
        if(err)reject(err)
        const parse=(row:unknown):Card=>{
            if (typeof row !== "object" || row === null) {
                return {id:'',front:'',back:''}
            }
            const _=(prop:keyof Card):string=>{
                const record=row as Record<keyof Card, unknown>
                const val=record[prop]
                if (typeof val !== "object" || val === null) {
                    return ''
                }
                if(typeof val !== 'string'){
                    return ''
                }
                return val
            }
            const id= _('id')
            const front= _('front')
            const back= _('back')
            return {
                id,front,back
            }
        }
        resolve(rows.map(parse))
    })
    })
    return {ok:true,value:rows}
}

//db.close();

const repository:Repository={
    create,
    read,
}

export default repository