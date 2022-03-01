/**
 * 配置文件
 */
// const webpack = require('webpack')

// gzip
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 拼接路径
// const resolve = dir => require('path').join(__dirname, dir)

// 增加环境变量
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  configureWebpack: config => {
    const plugins = []

    if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_PLATFORM === 'h5') {
      plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          // test: /\.(js|css)$/,
          test: /\.(js|css)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    // nvue 不支持
    // plugins.push(
    //   new webpack.DefinePlugin({
    //     'mytest': JSON.stringify('test')
    //   })
    // );
    // plugins.push(
    //   new webpack.ProvidePlugin({
    //     'dayjs': ['dayjs']
    //   })
    // );
    config.plugins = [...config.plugins, ...plugins]
    // 非开发环境
    // if (process.env.NODE_ENV !== 'development') {
    //   config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
    //   config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    //   config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
    //   config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    // }
  },
  chainWebpack: config => {
    // 重新设置 alias
    // config.resolve.alias
    // 判断环境加入模拟数据
    // const entry = config.entry('app')
    // entry
    //   .add('@/mock')
    //   .end()
  }
}
