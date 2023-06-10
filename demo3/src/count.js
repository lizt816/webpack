import { sum } from "./math"

import count from "./count";

console.log("hello count")
console.log(sum(1,4,7),"hello count")

document.getElementById('btn').onclick = ()=>{
 console.log(sum(2,1),"hello count")
}