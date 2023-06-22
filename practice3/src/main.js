import count from "./js/count";
import sum from "./js/sum";
// import "core-js";
// import coreJs from 'core-js';
// import 'core-js/features/promise';
import "./js/iconfont";
import "./css/index.css";
import "./fonts/iconfont.css";
import "./less/index.less";
import "./scss/index.scss";
import "./scss/index.sass";
import "./stylus/index.styl";

console.log(count(2,1));
console.log(sum(1,2,3));
console.log('coreJscoreJscoreJs');

document.getElementById('btn').onclick = function(){
 // /* webpackChunkName:"math" */  webpack魔法命名
 import(/* webpackChunkName:"math" */ "./js/math").then(({sum})=>{
  console.log(sum(3,3))
 })
}


if(module.hot){
 // 判断是否支持热模块功能
  module.hot.accept("./js/count")
  module.hot.accept("./js/sum")
}




new Promise((resolve,reject)=>{
 resolve('new Promise')
 setTimeout(()=>{
  console.log('答应------')
 },2000)
}).then(res=>{
  console.log(res,"///")
})

// let a = [0,1,2,3,4,5]

// a.includes(1)