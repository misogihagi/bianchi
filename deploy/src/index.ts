import type {PostResponse} from '../../interface'

import { sheetsConfig } from "./constants";
import { getSheet, getRowIndex, parseRequest, useAuth, useWrite,transactionToData as _transactionToData  } from "./lib";
import { genId } from "../../utils";

import { useTest} from './test'
import { Card } from '../../interface/graphql';

const secret =
  "Cu22wTQ5JEjG5n6SuoGu42TAo37RkudDf/fVeNXrbz3fv64kVqr2JVyrHTjguwIhTVhWbIyo2d0X8V0WbbCqSSAECDWxdZfVJeNfLa09uhgzBiDyY9Aq/LC80jiHLCMAJNZ0P2O3Vd6CMyA8VXZsLWSEVLlt9nstBYukk1drJh/qamxDd52BuD+bhBX793SLO6vt3oKoD/+6RRtYXLl4W5fr8LZeVmGhbNgBvP4/sgEwRRu7WpTYhG1mkQA8DcPi/gaBpsmn7MbD0NT7kNAs2Es5wzQGg4I0JV/E3jdPzoH2zMtyXYFAhx08y8Qvpi80cwK0gRskteA/NqtdONdntw==";

function init() {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  Object.values(sheetsConfig).forEach((config) => {
    const sheet = spreadSheet.insertSheet();
    sheet.getRange(1, 1, 1, config.headers.length).setValues([[...config.headers]]);
    sheet.setName(config.name);
  });
}

function transactionToData(){
  const transactionSheet=getSheet('transaction')
  const dataSheet=getSheet('data')

  const transactionRow = getRowIndex("transaction")("transaction");

  const transactions = transactionSheet
  .getRange(2, transactionRow, transactionSheet.getLastRow()-1, 1)
  .getValues()
  .flat() as string[]

  const data=transactions.map(t=>{
    const r=_transactionToData(t)
    if(!r.ok)throw 'invalid transaction:'+t;
    return  r.value
  }).reduce((acc,{id,front,back})=>{
    acc.id.push([id])
    acc.front.push([front])
    acc.back.push([back])
    return acc
  },{id:[] as string[][],front:[] as string[][],back:[] as string[][]});

  (['id','front','back']  as(keyof typeof data)[]).forEach(p=>
    dataSheet
    .getRange(2, getRowIndex('data')(p), data[p].length, 1)
    .setValues(data[p])
  )

}

const authenticate = useAuth(secret);
const write = useWrite("data");
const pileTransaction = useWrite("transaction");

function response(obj:PostResponse){
  return ContentService
  .createTextOutput(JSON.stringify(obj))
}

function doPost(req: GoogleAppsScript.Events.DoPost):GoogleAppsScript.Content.TextOutput {
  if (!authenticate(req)) return response({ok:false,message:'token invalid!'})

  try {
    JSON.parse(req.postData.contents);    
  } catch (error) {
    return response({ok:false,message:'invalid json stri!'})
  }
  const contents = JSON.parse(req.postData.contents);    
  const result = parseRequest(contents);
  if (!result.ok) return response({ok:false,message:'invalid request!'})

  const sheet = getSheet("data");

  const idRow = getRowIndex("data")("id");
  const frontRow = getRowIndex("data")("front");
  const backRow = getRowIndex("data")("back");

  if(result.value.mode==='read'){
    const lastRow=sheet.getLastRow()
    function getValues(row:number){
      return sheet
    .getRange(2, row, lastRow, 1)
    .getValues()
    .flat()
    }
    const ids=getValues(idRow)
    const fronts=getValues(frontRow)
    const backs=getValues(backRow)

    const data=[...Array(lastRow)].map((_, i) => ({
      id:ids[i],
      front:fronts[i],
      back:backs[i],
    } as Card));

      return response({ok:true,value:data})
    }

  let id = genId();
  while (true) {
    const ids = sheet
      .getRange(2, idRow, sheet.getLastRow(), 1)
      .getValues()
      .flat();
    if (!ids.includes(id)) break;
  }
  if(result.value.mode==='create'){
    const mode=result.value.mode
    const objective=result.value.objective
      const data = result.value.data;
      pileTransaction({
        transaction:
          `${mode} ${objective} ` +
          JSON.stringify({
            id,
            ...data,
          }),
        timestamp: Date.now(),
      });
      write({
        id,
        ...data,
      });
  }
  return response({ok:true,value:null})
}

function test(){
  useTest(secret)(doPost)
}

declare let global: any
global.init = init
global.transactionToData=transactionToData
global.doPost = doPost
global.test = test