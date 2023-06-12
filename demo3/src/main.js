import { sum } from "./math";
// import count from "./count";

console.log(sum(5,5))

console.log("hello main!!")

document.getElementById('btn').onclick = ()=>{
 // console.log(count(2,1),"hello count")
 import('./count').then(res=>{
   console.log('成功：',res)
 }).catch((err)=>{
  console.log('失败：',err)
 })
}