module.exports = {
 // 解析选项
 parserOptions:{
  ecmaVersion:6,    // ES版本
  sourceType:"module",   // ES模块化
  ecmaFeatures:{      // ES的其他特性
    jsx:true          // 如果是react项目，就需要开启jsx语法
  }
 },
 env:{
  node:true,    // 启动node的全局变量
  browser:true,   // 启用浏览器中的全局变量
 },
 // 具体检查规则
 rules:{
  /*
   * 1. 说明：
   * ·  "off" 或者 0 关闭规则
   * ·  "warn" 或者 1 开启规则，警告，但是不报错，不退出程序
   * ·  "error" 或者 2 开启规则，报错退出程序
  */ 
  // 例子：
  semi:"error",    // semi:分号。  禁止使用分号
  "array-callback-return":"warn",  // 数组的回调中必须有return语句，否则警告
  "default-case":[
     "warn",      // 要求switch语句中有default分支，否则警告
     {commentPattern:"^no default$"}    // 允许在最后注释 no default，就不会有警告了
  ],
  // eqeqeq:[
   // "warn",   // 强制使用 === 和 !== , 否则警告
   // "smart",  // https://zh-hans.eslint.org/docs/latest/rules/  除了少数情况下不会有报错
  // ],
  "no-var":"error",  // 不能使用var定义变量
 },
 // 继承其他规则  eslint:recommended:继承官方规则
 extends:["eslint:recommended"],   // 除了官方网站的规则不需要下载，其他的需要下载
 ignorePatterns: [    // 指定文件不做校验
   'iconfont.js'  // 忽略iconfont.js 文件
 ]
}