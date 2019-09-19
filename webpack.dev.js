'use strict'

const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const glob = require('glob')

// 设置多页面打包
const setMAP = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  Object.keys(entryFiles)
    .map(index => {
      const entryFile = entryFiles[index]
      const match = entryFile.match(/src\/(.*)\/index\.js/)
      const pageName = match && match[1]

      entry[pageName] = entryFile
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `src/${pageName}/${pageName}.html`),
          filename: `${pageName}.html`, // 指定打包出来的html文件名
          chunks: [pageName], // 生成的HTML使用哪些chunk
          inject: true,  // chunk 自动注入
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
          }
        }),
      )
    })
  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMAP() 

module.exports = {
    // 用来指定webpack打包入口
    /**
     * 两种方式： 单入口和多入口
     * 单入口 entry: './src/index.js',
     * 多入口 entry: {
     *           app: 'xxxx',
     *           adminApp: 'xxx'   
     *       }
     */
    entry: entry,
    // 用来告诉webpack如何将编译后的文件输出到磁盘
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js' // 单入口配置方式
        // 多入口配置方式  filename: '[name].js'  通过占位符确保文件名称的唯一
    },
    // mode 用来指定当前构建环境： production、 development、 还是none， 设置mode可以使用webpack内置函数， 默认值为production
    mode: 'development',
    // loaders   webpack原生只支持JS和JSON两种文件类型，通过Loaders去支持其他文件类型并且把他们转化成有效的模块，并且可以添加到依赖图中
    //           本身是一个函数，接受源文件作为参数，返回转换的结果
    module: {
        rules: [
            { // test 指定匹配规则   use 指定使用的loader名称
              test: /.js$/,
              use: 'babel-loader' 
            }, {
              test: /.css$/,
              use: [
                'style-loader', // 将样式通过<style>标签插入到head中
                'css-loader',    // 用于加载.css文件，并且转换成commonjs对象
              ]
            }, {
              test: /.less$/,
              use: [
                'style-loader',
                'css-loader',
                'less-loader'   // 将less文件转换成css
              ]
            }, {
              // test: /.(png|jpg|gif|jpeg)$/,
              // use: 'file-loader', // 用于处理文件
            }, {
              test: /.(woff|woff2|eot|ttf|otf)$/,
              use: 'file-loader'
            }, {
              test: /.(png|jpg|gif|jpeg)$/,
              use: [
                {
                  loader: 'url-loader', // 也可以处理图片和字体，可以设置较小资源自动转化为base64
                  options: {
                    limit: 20480
                  }
                }
              ] 
            }
        ]
    },
    // Plugins 插件用于bundle文件的优化，资源管理和环境变量注入    作用于整个构建过程
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './src/index.html'
        // })
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins),
    watch: true, // 监听文件变化，自动构建
    // 只有开启watch, watchOptions才会生效
    watchOptions: {
      // 默认为空，不监听的文件或者文件夹，支持正则匹配
      ignored: /node_modules/,
      // 监听到变化，300ms后再去构建， 默认300ms
      aggregateTimeout: 300,
      // 判断文件是否发生变化是通过不停的询问系统指定文件有没有变化实现的， 默认每秒询问1000次
      poll: 1000
    },
    devServer: {
      contentBase: './dist',
      hot: true
    },
    devtool: 'source-map'
}
// 文件指纹
// Hash: 和整个项目的构建相关，只要项目有修改，整个项目构建的hash值就会更改
// Chunkhash: 和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值
// ContentHash: 根据文件内容来定义hash，文件内容不变，则contenthash不变