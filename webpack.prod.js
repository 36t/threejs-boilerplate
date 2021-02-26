// 本番用webpack設定ファイル
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false, // ライブラリのライセンスコメントの抽出を防ぐ
                terserOptions: {
                    compress: {
                        drop_console: true // console.logの削除
                    }
                }
            })
        ]
    }
})
