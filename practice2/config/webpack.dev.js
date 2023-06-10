const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const os = require("os")
const threads = os.cpus().length  // cpu核数
const TerserWebpackPlugin = require("terser-webpack-plugin")

module.exports = {
    entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
    output: {                     // 输出
       filename: 'js/main.js',      // 打包后的文件名称
       path: undefined,  // 开发模式下可以不用定义，打包后的目录
       clean: true,     //   在webpack4的时候，需要插件才行，webpack5只需要配置这个就行了
    },
    module:{                     // 加载器
      rules:[               // loader的配置
         {
          oneOf: [
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
             test:/\.(png|jpe?g|gif|webp|svg)$/,     // png||jpe等图片结尾的文件才会执行下面的use
             type:"asset",                     // 相当与webpack的file-loader，对图片进行优化，
             parser:{             // 新增条件
              dataUrlCondition:{     
               maxSize:10 * 1024         // 条件为10kb的图片就进行base64转行
              }
             },
             generator:{     // 输出文件的路径
              //存放的路径，statuc/images/，然后hash就是唯一值加冒号：10就是代表前10位，防止图片名字冲突，因为都会放在同级，ext:后缀名，query携带
              filename:"statuc/images/[hash:10][ext][query]",  
             }
            },
            {
             test:/\.(ttf|woff2?|map3|map4|avi)$/,     // ttf|woff或者woff2结尾的文件才会执行下面的use
             type:"asset/resource",      // asset会转base64，加asset/resource则只会对文件原封不动的输出
             generator:{                // 输出文件的路径
              //存放的路径，statuc/media/，然后hash就是唯一值加冒号：10就是代表前10位，防止图片名字冲突，因为都会放在同级，ext:后缀名，query携带
              filename:"statuc/media/[hash:10][ext][query]",  
             }
            },
            {
             test: /\.js$/,    // 处理js文件
             // exclude: /node_modules/,  // exclude表示排除，排除node_modules文件
             include:path.resolve(__dirname,"../src"),   //表示只处理src下的js文件
             use:[
              {
               loader: 'thread-loader',      // 开启多线程
               options:{
                works:threads,    // 多进程数量
               }
              },
              {                // 注意，options可用在这里写，也可用在根级创建babel.config.js里面写
               loader: 'babel-loader',      // 兼容es6版本
               options:{
                 // presets: ['@babel/preset-env']
                cacheDirectory:true,       // 开启babel缓存
                cacheCompression:false,    // 关闭压缩缓存文件，不需要对这种缓存文件进行压缩
                plugins:["@babel/plugin-transform-runtime"]
               }
              }
             ]
            }
          ]
         }
      ]
    },
    plugins:[    // 插件
     new ESLintPlugin({
      context:path.resolve(__dirname,"../src/js"),  //  那个地方需要检查
      exclude:"node_modules",   // 默认值
      cache:true,      // 开启缓存
      cacheLocation:path.resolve(__dirname,"../node_modules/.cache/eslintcache")
     }),
     new HtmlWebpackPlugin({
      // 打包后的文件结构和原来的一致，还会自动引入打包输出的资源
      template:path.resolve(__dirname,"../public/index.html")  //  已这个文件目录下的html文件为模板
     })
   ],       
   // 开发模式下开启devServer后不会生成dist打包后的文件，在内存中编译打包
   devServer:{
     host:"localhost",      // 启动服务器域名
     port:"3000",           // 开启服务器端口号
     open:true,             // 是否自动打开浏览器
     hot:true,              // 开启指定模块热加载，注意，vue或者react会有自己的loader处理，自己的项目还需要自己来里
   },  
   mode:'development', // 开发模式
   devtool:"cheap-module-source-map",
}
