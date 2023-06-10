const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 // entry:"./src/main.js",   // 单个文件的情况
 entry:{
  app:"./src/app.js",    // key为文件名，后面为文件路径
  main:"./src/main.js"   // key为文件名，后面为文件路径
 },
 output:{
  path:path.resolve(__dirname,"dist"),   // 文件输出路径
  filename:'[name].js',       // webpack的一种命名方式，[name] , 以文件名自己命名。也就是entry中的key
 },
 plugins:[
   new HtmlWebpackPlugin({
    template:path.resolve(__dirname,"public/index.html")
   })
 ],
 mode:"production"
}