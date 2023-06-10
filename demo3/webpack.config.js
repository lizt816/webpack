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
 mode:"production",
 optimization:{
  splitChunks:{     // Chunk: 就是打包的文件，就叫Chunk，
   chunks:"all",              // 对所有模块都进行分割
   // 一下是默认值
   // minSize:20000,         // 分割代码最小体积  20 kb
   // minRemainingSize:0,    // 类似于minSize,最后确保提取的文件大小不能为0
   // minChunks:1,            // 至少被引用的次数,满足条件才会代码分割
   // maxAsyncRequests:30,     // 入口js文件最大并行请求数量
   // maxInitialRequests:30,     // 入口js文件最大并行请求数量
   // enforceSizeThreshold:50000,  // 超过50kb一定会单独打包( 此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests )
   // cacheGroups:{          // 组，哪些模块要打包到一个组
   //   defaultVendors:{   // 组名
   //      test: /[\\/]node_modules[\\/]/,   // 哪些文件需要打包到defaultVendors， 需要打包到一块的模块
   //      priority:-10,                   // 权重（ 越大越高 ）
   //      reuseExistingChunk:true,         // 如果当前chunk包已从主bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
   //   }
   // }
   // default:{  // 其他没有写的配置会使用上面的默认值
   //   minChunks:2,   // 这里的minChunks权重更大
   //   priority:-20 ,   // 权重
   //   reuseExistingChunk:true,   // 没有注释
   // }
   // 修改配置
   cacheGroups:{  // 组，哪些模块要打包到一个组
    // cacheGroups:{          // 组，哪些模块要打包到一个组
    //   defaultVendors:{   // 组名
    //      test: /[\\/]node_modules[\\/]/,   // 哪些文件需要打包到defaultVendors， 需要打包到一块的模块
    //      priority:-10,                   // 权重（ 越大越高 ）
    //      reuseExistingChunk:true,         // 如果当前chunk包已从主bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
    //   }
    // }
    default:{   // 其他没有写的配置会使用上面的默认值
     minSize:0,   // 我们定义的文件体积太小了，所以要改打包的最小文件体积
     minChunks:2,    // 没有注释
     priority:-20,   // 没有注释
     reuseExistingChunk:true,   // 没有注释
    }
   }
  }
 }
}