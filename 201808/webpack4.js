const path = require('path') 
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') //打包html文件
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 打包的css拆分 将一部分抽离
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.export = {
  entry: './src/index.js', //入口
  output: { //webpack 输出
    path: path.resolve(__dirname, 'dist'), //物理地址拼接
    filename: '[name].js'
  },
  module: { // 模块配置
    rules: [ // 解析规则，根究文件后缀
      {
        test: /\.js$/, //es6=>es5
        include: [
          path.resolve(__dirname, 'src')
        ],
        // exclude: [] 不匹配选项 优先级高于test include
        use: 'babel-loader'
      }, {
        test: /\.less$/, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
      }, { //图片loader
        test: /\.(png|jpg|gif)$/, 
        use: [
          'filename-loader',
        ]
      }
    ]
  },
  resolve: { // 解析模块的可选项
    // module: [] 模块的查找目录 配置其他的css文件等
    extensions: [".js", ".json", ".jsx", ".less", ".css"], //用到的文件扩展名
    alias: { //模块别名
      utils: path.resolve(__dirname, 'src/utils')
    }
  },
  plugins: [ // 引入插件，压缩， 美化代码
    new ExtractTextPlugin('[name].css'), //【name】默认 可以自定义name 声明使用
    new HtmlWebpackPlugin({ //将模板头部和稳步添加css和js模板 dist目录发布到服务器上 项目包 可以直接上线
      file: 'index.html', //打造单页引用 最后运行不是这个
      template: 'src/index.html' // vue-cli放在根目录
    }),
    new CopyWebpackPlugin([ // src下其他文件直接复制到dist目录下
      {from: 'src/assets/favicons.ico', to: 'fovicons.ico'}
    ]),
    new webpack.ProvidePlugin({ // 引用jquery lodash工具库
      '_': 'lodash'
    })
  ],
  devServer: {
    port: '8080',
    before: app => {}
  }
}