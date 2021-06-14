

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/handwritingReact/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包文件的存储目录
    filename: 'js/[name]-[chunkhash].js' // js 文件保存在 js目录下
  },
  mode: 'development',
  //devtool: '#cheap-module-eval-source-map', // 代码映射为打包前的代码，方便调试
  devServer: {
    host: '0.0.0.0',
    port: 8000,
    overlay: {
      errors: true
    },
    hot: true,
    // historyFallback: {}, // 处理未映射的地址
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html', // 与 context 运行上下文脚本一致
      inject: 'body', // 指定打包生成的 js 文件，script 插入到 body
      title: 'react+webpack demo'
    })
  ]
}
