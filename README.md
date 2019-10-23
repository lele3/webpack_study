# webpack_study

### DCE(Elimination)
- 代码不会被执行，不可到达
- 代码执行的结果不会被用到
- 代码只会影响死变量（只写不读）

### tree-shaking原理
利用es6模块的特点
  - 只能作为模块顶层的语句出现
  - import 的模块名只能是字符串常量
  - import binding 是 immutable 的
代码擦除： uglify 阶段删除无用代码

### scope hoisting 
- 原理
将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
- 对比
通过 scope hoisting 可以减少函数声明代码和内存开销

### 动态import 
- require.ensure()
- 需要安装babel插件 @babel/plugin-syntax-dynamic-import

### 统计信息 stats  与构建日志相关
    优化命令行的构建日志
    插件 friendly-errors-webpack-plugin

### 如何判断构建成功
    在CI/CD的pipline或者发布系统需要知道当前的构建状态
    每次构建完成后输入 echo $? 可以获取到错误码

### 如何主动捕获并处理构建错误
    compiler 在每次构建结束后会触发 done 这个 hook
    process.exit 主动处理构建报错


### 构建配置包设计
    通过多个配置文件管理不同环境的webpack配置
    - 基础配置： webpack.base.js
    - 开发环境： webpack.dev.js
    - 生产环境： webpack.prod.js
    - SSR环境： webpack.ssr.js

    抽离成一个npm包统一管理
    - 规范： git commit日志， REMADE, ESLint规范， Semver规范
    - 质量： 冒烟测试、单元测试、测试覆盖率和CI

### 通过webpack-merge组合配置
    合并配置
    ```javascript
       merge = require('webpack-merge')
       ...
       module.exports = merge(baseConfig, devConfig)
    ```