import {Card} from '../../interface/graphql'


//https://github.com/joliss/js-string-escape/blob/master/index.js
function escape(str:string) {
  if(!str)return
  return str.replace(/["'\\\n\r\u2028\u2029]/g,  (character)=>{
    switch (character) {
      case '"':
      case "'":
      case '\\':
        return '\\' + character
      case '\n':
        return '\\n'
      case '\r':
        return '\\r'
      case '\u2028':
        return '\\u2028'
      case '\u2029':
        return '\\u2029'
      default:
        return character
    }
  })
}
const GRAPHQL_URL='/api/graphql'

const query={
    create:({front,back}:Partial<Card>)=>{
      const arg:string=
        (front ? `front:"${escape(front)}"` : '') +
        (front && back ? ',' : '') +
        (back ? `back:"${escape(back)}"` : '') +
        '';
        console.log(arg)
      return `mutation {create(${arg}){ok}}`
    },
    read:()=>"query {read{id front back}}",
//    update:"mutation {create(front:\"rr\"){ok}}",
  //  delete:"mutation {create(front:\"rr\"){ok}}",
}

export const fetchData=(query:string)=>{
return     fetch(GRAPHQL_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({query})
  }).then(res=>{
    if(res.ok)return res.json()
    else throw 'fetch error'
  }).then(data=>{
    if(data.errors)throw JSON.stringify(data)
    return data
  })
}
export const createData= (card:Partial<Card>)=>{
  return fetchData(query.create(card)).then(json=>json.data.read)
}
export const readData= ()=>{
    return fetchData(query.read()).then(json=>json.data.read)
}
export const uploadImages =(images:ArrayBuffer[])=>{

}
