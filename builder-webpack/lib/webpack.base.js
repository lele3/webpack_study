
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
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
          chunks: ['vendors', 'commons', pageName], // 生成的HTML使用哪些chunk
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
  entry: entry,
  module: {
    rules: [
      {
        test: /.js$/,
        use: ['babel-loader']
      }, {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', // 将样式通过<style>标签插入到head中
          'css-loader',
        ]
      }, {
        test: /.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  // 浏览器最新的两个版本， 使用人数大于1%， ios 7以上的
                  // overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              // rem 相对 px的倍数， 即1rem=75px
              remUnit: 75,
              // px 转换成 rem后小数点保留位数
              remPrecision: 8
            }
          }
        ]
      }, {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]' // 设置字体文件指纹
            }
          }
        ]
      }, {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]'  // 设置图片的文件指纹
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function () {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
          console.log('build error')
          process.exit(1)
        }
      })
    }
  ].concat(htmlWebpackPlugins)
}