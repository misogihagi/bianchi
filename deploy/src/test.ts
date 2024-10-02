import type {CreatePostRequest,ReadPostRequest} from '../../interface/'

function makeGetTestData(data: object | string): GoogleAppsScript.Events.DoGet {
  const contents = typeof data === "string" ? data : JSON.stringify(data);
  return {
    parameter: {},
    pathInfo: "",
    contextPath: "",
    contentLength: contents.length,
    queryString: "",
    parameters: {},
  };
}
function makePostTestData(
  data: object | string
): GoogleAppsScript.Events.DoPost {
  const contents = typeof data === "string" ? data : JSON.stringify(data);
  const res = makeGetTestData(data);
  return {
    ...res,
    postData: {
      length: contents.length,
      type: "FileUpload",
      contents: contents,
      name: "postData",
    },
  };
}

function makeTestCases(secret:string){
  const cases=new Map<string,{spec:any,expect:(act:any)=>boolean}>()
  function isExpect(actual:any,expect:object):boolean{
    return JSON.stringify(actual)==JSON.stringify(expect)
  }
  cases.set(
    'authentication failing',
    {
      spec:{},
      expect:(act)=>isExpect(act,{ok:false,message:"token invalid!"})
    }
  )
  cases.set(
    'invalid mode',
    {
      spec:{
        secret,
        mode:'unknown',
      },    
      expect:(act)=>isExpect(act,{ok:false,message:"invalid request!"})
    }
  )
  cases.set(
    'create',
    {
      spec:{
        secret,
        mode:'create',
        data: {
          front: "",
          back: "",
        }
      }  as CreatePostRequest,    
      expect:(act)=>isExpect(act,{ok:true,value:null})
    }
  ) 
  cases.set(
    'read',
    {
      spec:{
        secret,
        mode:'read',
      } as ReadPostRequest,
      expect:({value})=>
      value.length>1 && ['id','front','back'].reduce((acc,cur)=>
          Object.keys(value[0]).includes(cur) && acc
        ,true)
    }
  )
  return cases
}


export function useTest(secret:string) {
  return (doPost:(req: GoogleAppsScript.Events.DoPost)=>GoogleAppsScript.Content.TextOutput)=>{
      makeTestCases(secret).forEach((test,key)=>{
        const actual=doPost(makePostTestData(test.spec))
        if(test.expect(JSON.parse(actual.getContent()))){
          console.log(key+' passed!')
        }else{
          console.error(key+' failed!')
        }
      })
}
}