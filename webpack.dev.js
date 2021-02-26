// 開発用webpack設定ファイル
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');

module.exports = merge(commonConfig, {
  mode: 'development',
  // ソースマップの生成
  devtool: 'eval-cheap-source-map',
  // webpack dev serverの設定
  devServer: {
    // サーバー起動時に自動的に開く
    open: true,
    port: 9000,
    contentBase: path.resolve(__dirname, 'public')
  }
})
