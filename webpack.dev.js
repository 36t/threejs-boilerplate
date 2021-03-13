// 開発用webpack設定ファイル
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    open: true,
    compress: true,
    hot: true,
    port: 9000,
    contentBase: path.resolve(__dirname, 'src'), // <- important
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
})
