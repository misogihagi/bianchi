type Table=    {
    name: string,
    properties: {
        [key:string]: {type: string},
    },
}

const schema = {
    transaction: {
        name: 'transaction_log',
        properties: {
            statement: {type: 'TEXT'},
            timestamp: {type: 'TIMESTAMP'},
        },
    } as Table,
    access:{
        name: 'access_log',
        properties: {
            access_log: {type: 'TEXT'},
            timestamp: {type: 'TIMESTAMP'},
        },
    } as Table,
    data:{
        name: 'data',
        properties: {
            id: {type: 'TEXT'},
            front: {type: 'TEXT'},
            back: {type: 'TEXT'},
        },
    } as Table,
}

function toSQL({name,properties}:Table){
  return 'CREATE TABLE IF NOT EXISTS '+
    name + '(' +
    Object.keys(properties).map(col=>col+' '+properties[col].type).join(',') +
    ')'
}

export default (Object.keys(schema) as Array<keyof typeof schema>)
  .reduce(
    (acc,key)=>({...acc,[key]:{...schema[key],toSQL:()=>toSQL(schema[key])}})
  ,{} as {[key in keyof typeof schema]:Table & {toSQL:()=>string}})

