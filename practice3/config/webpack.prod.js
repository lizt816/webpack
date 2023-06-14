const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const os = require("os")
const threads = os.cpus().length  // cpu核数
const TerserWebpackPlugin = require("terser-webpack-plugin")
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin")

function getStyleLoader(pre){
   return [              // 这个是从后往前执行
    MiniCssExtractPlugin.loader,    //  将js的css通过插件style标签添加到html中
    "css-loader",       //  将css资源编译成commonjs的模块到js中
    {
     loader:"postcss-loader",
     options:{
      postcssOptions:{
       plugins:[
        "postcss-preset-env"      // 解决大多数兼容的问题
       ]
      }
     }
    },
    pre,   // 指定的预处理器
  ].filter(Boolean);  // 表示过滤掉不用的东西,如pre不需要则过滤掉
}

module.exports = {
    entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
    output: {                     // 输出
       filename: 'static/js/[name].js',      // 打包后的文件名称，使用[name] 实现更多的兼容
       chunkFilename:'static/js/[name].chunk.js',    // 这是动态引入打包的文件名字
       assetModuleFilename:"static/media/[hash:10][ext][query]",  // 图片字体通过type：asset处理资源命名方式
       path: path.resolve(__dirname,'../dist'),  // 打包后的目录
       clean: true,     //   清除上次打包的dist，在webpack4的时候，需要插件才行，webpack5只需要配置这个就行了
    },
    module:{                     // 加载器
      rules:[               // loader的配置
         {
           oneOf:[
             {
              test:/\.css$/,     // css结尾的文件才会执行下面的use
              use:getStyleLoader()
             },
             {
              test:/\.less$/,     // less结尾的文件才会执行下面的use
              use:getStyleLoader("less-loader")
             },
             {
              test:/\.s[ac]ss$/,     // sass结尾的文件才会执行下面的use
              use:getStyleLoader("sass-loader")
             },
             {
              test:/\.styl$/,     // stylus结尾的文件才会执行下面的use
              use:getStyleLoader("stylus-loader")
             },
             {
              test:/\.(png|jpe?g|gif|webp|svg)$/,     // png||jpe等图片结尾的文件才会执行下面的use
              type:"asset",                     // 相当与webpack的file-loader，对图片进行优化，
              parser:{             // 新增条件
               dataUrlCondition:{     
                maxSize:10 * 1024         // 条件为10kb的图片就进行base64转行
               }
              },
              // 下面这个generator注释是因为上面assetModuleFilename处理了命名，不过我感觉这里命名也还行
              // generator:{     // 输出文件的路径
              //  //存放的路径，static/images/，然后hash就是唯一值加冒号：10就是代表前10位，防止图片名字冲突，因为都会放在同级，ext:后缀名，query携带
              //  filename:"static/images/[hash:10][ext][query]",  
              // }
             },
             {
              test:/\.(ttf|woff2?|map3|map4|avi)$/,     // ttf|woff或者woff2结尾的文件才会执行下面的use
              type:"asset/resource",      // asset会转base64，加asset/resource则只会对文件原封不动的输出
              // 下面这个generator注释是因为上面assetModuleFilename处理了命名，不过我感觉这里命名也还行
              // generator:{                // 输出文件的路径
              //  //存放的路径，static/media/，然后hash就是唯一值加冒号：10就是代表前10位，防止图片名字冲突，因为都会放在同级，ext:后缀名，query携带
              //  filename:"static/media/[hash:10][ext][query]",  
              // }
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
               },
              ]
             }
           ]
         }
      ]
    },
    plugins:[    // 插件
     new ESLintPlugin({
      context:path.resolve(__dirname,"../src/js"),  //  那个地方需要检查
      exclude:"node_modules",
     }),
     new HtmlWebpackPlugin({
      // 打包后的文件结构和原来的一致，还会自动引入打包输出的资源
      template:path.resolve(__dirname,"../public/index.html")  //  已这个文件目录下的html文件为模板
     }),
     new MiniCssExtractPlugin({
      filename:'static/css/[name].[contenthash:10].css',             // 
      chunkFilename:"static/css/[name].chunk.[contenthash:10].css",  // 这个是为了防止以后动态引入打包文件的命名规范，加chunk和主文件区分
     }),
     // new CssMinimizerPlugin(),   // 压缩css
     // new TerserWebpackPlugin({    // 压缩js
     //  parallel:threads,      // 开启多线程和设置进程数量
     // }),
     // preload的处理方式
     // new PreloadWebpackPlugin({
     //  rel:'preload',
     //  as:'script'
     // }),
     // Prefetch的处理方式
     new PreloadWebpackPlugin({
      rel:'prefetch'
     }),
     
   ],    
   optimization:{
    minimizer:[   // 放置压缩的操作
     new CssMinimizerPlugin(),   // 压缩css
     new TerserWebpackPlugin({    // 压缩js
      parallel:threads,      // 开启多线程和设置进程数量
     })
    ],
    splitChunks:{
     chunks:"all",   //  就会执行所谓的代码分割操作，其他的用默认值就行
    },
    runtimeChunk:{
     name:(entrypoint) => `runtime~${entrypoint.name}.js`
    }
   },   
   mode:'production', // 生产模式
   devtool:"source-map",
}
