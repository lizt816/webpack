const path = require('path')

module.exports = {
    entry: path.resolve(__dirname,'./src/main.js'),    // 入口文件
    output: {                     // 输出
       filename: 'main.js',      // 打包后的文件名称
       path: path.resolve(__dirname,'dist')  // 打包后的目录
    },
    module:{                     // 加载器
      rules:[               // loader的配置
         {
          test:/\.css$/,     // css结尾的文件才会执行下面的use
          use:[              // 这个是从后往前执行
           "style-loader",    //  将js的css通过插件style标签添加到html中
           "css-loader"       //  将css资源编译成commonjs的模块到js中
          ]
         },
         {
          test:/\.less$/,     // less结尾的文件才会执行下面的use
          use:[              // 这个是从后往前执行
           "style-loader",    //  将js的css通过插件style标签添加到html中
           "css-loader",       //  将css资源编译成commonjs的模块到js中
           "less-loader"      //  处理less的加载器
          ]
         },
         {
          test:/\.s[ac]ss$/,     // sass结尾的文件才会执行下面的use
          use:[              // 这个是从后往前执行
           "style-loader",    //  将js的css通过插件style标签添加到html中
           "css-loader",       //  将css资源编译成commonjs的模块到js中
           "sass-loader"      //  将sass编译成css文件
          ]
         },
         {
          test:/\.styl$/,     // stylus结尾的文件才会执行下面的use
          use:[              // 这个是从后往前执行
           "style-loader",    //  将js的css通过插件style标签添加到html中
           "css-loader",       //  将css资源编译成commonjs的模块到js中
           "stylus-loader"      //  将stylus编译成css文件
          ]
         },
         {
          test:/\.(png|jpe|gif|webp)$/,     // stylus结尾的文件才会执行下面的use
          type:"asset",                     // 相当与webpack的file-loader，对图片进行优化，
         }
      ]
    },
    plugins:[],         // 插件
    mode:'development', // 开发模式
}
