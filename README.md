## webpack 安装
> npm i webpack webpack-clie --save-dev

* webpack 是核心代码；
* webpack-cli 是命令行工具。

> npm i webpack-dev-server webpack 本地开发工具

**`解释`**
|Asset|Size|Chunks|Chunks Name|
|--|--|--|--|
|打包生成的文件|文件大小|打包的块|打包的块名称|

## loader
### babel 用来处理 ES6+ 并将其转换为 ES5.
  * babel-loader babel 和 loader 协同工作
  * @babel-loader babel 转义器的核心代码
  * @babel/preset-env 官方推荐预置器，根据用户设置的目标环境自动添加插件和补丁来编译 ES6+ 代码
  * @babel/preset-react 转义或添加 react 需要的补丁

```javascript
// webpack.config.js
module: {
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/, // 排队指定目录(/node_modules/)下模块
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    }
  }]
}
```
## plugins
### HtmlWebpackPlugin 生成 html 文件，默认引入打包好的 js 文件
```
// index.html 规定与项目相关的配置，如 title，container 等
plugins: [
  new HtmlWebpackPlugin({
    template: './index.html' // 以 index.html 为模板，打包
  })
]
```

## 阶段
1.  Render
2.  Pre-commit
3.  commit

## 创建时
* constructor 初始化内部状态；修改 state
* getDerivedStateFromProps 从属性初始化内部状态
  - 当 state 需要从 props 初始化时使用
  - 尽量不要使用：维护两者状态一致性会增加复杂度
  - 每次 render 都会调用
  - 典型场景：表单控件获取默认值
* render 唯一必须定义生命周期方法
* componentDidMount
  - UI 渲染完成后调用
  - 只执行一次
  - 典型场景：获取外部资源
## 更新时
* getDerivedStateFromProps
* shouldComponentUpdate
  - 决定 virtual DOM 是否需要重绘
  - 一般可以由 pureComponent 自动实现
  - 典型场景：性能优化
* render
* getSnapshotBeforeUpdate
  - 在页面 render 之前调用，state 已更新
  - 典型场景：获取 render 之前 DOM 状态
* componentDidUpdate
  - 每次 ui 更新时调用
  - 典型场景：页面需要根据 props 变化更新获取数据
## 卸载时
* componentWillUnmount
  - 组件移除时调用
  - 典型场景：资源释放

## virtual Dom 工作原理
virtual Dom 映射到真实 DOM
需拟 DOM 变化时，diff 算法算出差异，把 diff 部分以高效的方式，映射到真实 DOM

### 虚拟 DOM 的两个假设
1.  组件的 DOM 结构是相对稳定的
2.  类型相同的兄弟节点用唯一标识 key(属性区分，避免创建删除结点的大性能开销)

## 理解 key 属性的作用
## diff 算法
广度优先分层比较，从根节点开始比较
顺序及属性变化，改变位置及属性
节点类型发生变化，删除旧节点，直接创建新节点
节点跨层移动，删除旧节点及其子节点，创建新节点

## contextAPI 组件通信

## 高阶组件和函数作为子组件
### 高阶组件（HOC)
是对已有组件的封装，形成一个新的组件，新的组件会包含业务逻辑。这些逻辑包含新的状态，这些状态会传给已有组件。
高阶组件不会有自己的 UI 展示，高阶组件只负责为自己封装的组件传递数据和功能

### 函数作为子组件
```
class MyComponent extends React.Component {
  render() {
    return (
        <div>{this.props.children('Nate Wang')}
    )
  }
}

// 使用
<MyComponent>
{(name) => (
    <div>{name}</div>
)}
</MyComponent>
```

## redux flux
react state -> dom (组件内部)（props context)
redux state -> store(管理全局状态，简化组件之间的通信)

single source of truth (唯一状态管理)
可预测性： state + action = new state
纯函数更新 store(action => reducer => store|创建了一个新的 store|)

store
const store = createStore(reducers) // 创建一个 store
1.  getState // 得到当前数据
2.  dispatch(action) // action --> store --> dispatch --> reducer
3.  subscribe(listener) // 监听 store 变化，当 store 有变化，都会调用 callback

store 中包含三部分
state 数据
dispatch dispatch action
Middlewares 截获某种特殊类型的 action
reducer 处理 action


action 描述一个行为的数据结构
```
{
  type: 'TODO',
  text: 'build a react app'
}
```

reducer
```
function todoApp(state=initialState, action) {
  switch(action.type) {
    case TODO:
      return Object.assign({}, state, {
          todos: [
            ...state.todos,
            {
              text: action.text,
              completed: false
            }
          ]
        })
    default:
      return state
  }
}
```
## 工具函数
combineReducers
bindActionCreators


## webpack —— 代码修改，页面实时更新
```
devServer: {
  hot: true
}
plugins: [
  new webpack.HotModuleReplacementPlugin()
]
```

## Error: Cannot find module 'webpack-cli/bin/config-yargs'
webpack-cli 4 版本过高，降至 webpack-cli 3

## react-dom.development.js:26086 Uncaught Error: Target container is not a DOM element.
```
// index.html 规定与项目相关的配置，如 title，container 等
plugins: [
  new HtmlWebpackPlugin({
    template: './index.html' // 以 index.html 为模板，打包
  })
]
```
## error  Support for the experimental syntax 'classProperties' isn't currently enabled (7:11):
```
5 | export default function withTimer(wrappedComponent) {
6 |   return class extends Component {
>  7 |     state = { time: new Date() }
```
> Add @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.

```
// 1. npm i @babel/plugin-proposal-class-propertier
// 2. webpack.config.js
use: {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ["@babel/plugin-proposal-class-properties"]
  }
}
```
