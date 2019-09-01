'use strict'

const path = require('path')

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
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    // 用来告诉webpack如何将编译后的文件输出到磁盘
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js' // 单入口配置方式
        // 多入口配置方式  filename: '[name].js'  通过占位符确保文件名称的唯一
    },
    // mode 用来指定当前构建环境： production、 development、 还是none， 设置mode可以使用webpack内置函数， 默认值为production
    mode: 'production',
    // loaders   webpack原生只支持JS和JSON两种文件类型，通过Loaders去支持其他文件类型并且把他们转化成有效的模块，并且可以添加到依赖图中
    //           本身是一个函数，接受源文件作为参数，返回转换的结果
    module: {
        rules: [
            { test: /.js$/, use: 'babel-loader' }  // test 指定匹配规则   use 指定使用的loader名称
        ]
    },
    // Plugins 插件用于bundle文件的优化，资源管理和环境变量注入    作用于整个构建过程
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './src/index.html'
        // })
    ]
}