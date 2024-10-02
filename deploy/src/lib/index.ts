import type { Result } from "../../../interface";
import type { Card } from "../../../interface/graphql";
import type { SheetName } from "../constants";

import { sheetsConfig } from "../constants";

type Headers = typeof sheetsConfig[SheetName]["headers"][number];

export function getSheet(sheetName: SheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) throw "sheet not found";
  return sheet;
}

export function getRowIndex(sheetName: SheetName) {
    return (rowName:Headers)=>
        (sheetsConfig[sheetName].headers as unknown as Headers).indexOf(rowName)
        +1 //array index => row index
 }
  


export function useWrite(sheetName: SheetName) {
  const sheet = getSheet(sheetName);

  return function write(e: {
    [key in Headers]?: string | number;
  }) {
    const column = sheetsConfig[sheetName].headers.map((r) => e[r]);
    sheet
      .getRange(sheet.getLastRow() + 1, 1, 1, column.length)
      .setValues([column]);
  };
}

export function useAuth(secret: string) {
  return function authenticate(req: GoogleAppsScript.Events.DoPost) {
    const write = useWrite("security");
    write({
      request: JSON.stringify(req),
      timestamp: Date.now(),
    });

    return secret === JSON.parse(req.postData.contents).secret;
  };
}


const verbs=['create', 'update' ,'read', 'delete'] as const
const objectives=['card','history','tag'] as const

export function transactionToData(str:string):Result<Card>{

    interface Statement {
        verb: typeof verbs[number],
        objective: typeof objectives[number],
        rest:string,
    }

    function lexer(str:string):{ok:false}|{ok:true,value:Statement}{
        const verb=['',...verbs].reduce((acc,cur)=>str.slice(0,cur.length)===cur ? cur : acc) as ''|typeof verbs[number]
        if(verb==='')return {ok:false}
        const objective=['',...objectives].reduce((acc,cur)=>str.slice(verb.length+1,verb.length+1+cur.length)===cur ? cur : acc ,'') as ''|typeof objectives[number]
        if(objective==='')return {ok:false}
        return {
            ok:true,
            value:{
            verb,
            objective,
            rest:str.slice(verb.length+objective.length+2)
        }}
    }

    function create(statement:Statement):Card{
        const {id,front,back}=JSON.parse(statement.rest)
        return {
            id,front,back
        }
    }
    const parsed=lexer(str)
    if(!parsed.ok)return {ok:false}

    return {ok:true, value:create(parsed.value)}
}

export  { parseRequest} from './parse'
