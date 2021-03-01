// 開発用webpack設定ファイル
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    open: true,
    port: 9000,
    contentBase: path.resolve(__dirname, 'public'),
  }
})
