import count from "./js/count";
import sum from "./js/sum";
import "./js/iconfont";
import "./css/index.css";
import "./fonts/iconfont.css";
import "./less/index.less";
import "./scss/index.scss";
import "./scss/index.sass";
import "./stylus/index.styl";

console.log(count(2,1));
console.log(sum(1,2,3));

if(module.hot){
 // 判断是否支持热模块功能
  module.hot.accept("./js/count")
  module.hot.accept("./js/sum")
}