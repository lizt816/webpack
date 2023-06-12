import { sum } from "./math"


console.log(sum(1,4,7),"hello count")

export function count(...args){
 return args.reduce((p,c)=>p+c,0)
}