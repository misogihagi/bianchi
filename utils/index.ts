export function genId(){
    return Math.random().toString(32).slice(2).slice(-6) 
      + '-' + Math.random().toString(32).slice(2).slice(-6)
}
