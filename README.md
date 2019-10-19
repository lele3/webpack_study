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