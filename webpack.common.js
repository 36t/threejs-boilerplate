// 共通webpack設定ファイル
const path = require('path');
// 出力先をクリーンアップ
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// htmlテンプレート
const HtmlWebpackPlugin = require('html-webpack-plugin');
// cssの外部化
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 出力するcssの最適化
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = {
  entry: {
    app: './src/js/app.js', // エントリポイント①
    another: './src/js/another.js' //エントリポイント②
  },
  output: {
    path: path.resolve(__dirname, 'public'), // 絶対パス必要
    /* 以下2つを有効にすると、全て「bundle」がついてしまう
    filename: 'js/[name].bundle.js', // 出力するファイルの名前([name]にentryポイントが入る。「.bundle.」は無くても良い)
    chunkFilename: 'js/[name].js', // splitChunksの設定はこちらが優先される
    */
    filename: (pathData) => {
      // pathData.chunk.name：nameが入る。ここでは「app, another, vendor, vendor-modules」
      return pathData.chunk.name.search(/vendor/) > -1 ? 'js/[name].js' : 'js/[name].[contenthash].js';
    },
  },
  optimization: {
    // ファイルの分割で指定
    splitChunks: {
      chunks: 'initial',  // initial:静的にインポートしているモジュールが対象(要するに「import」の部分が分割の対象になる),
      cacheGroups: {
        // jqueryとvelocity-animateの出力設定
        vendorJS: { // 「vendorJS」の名前は任意で良い。わかりやすい名前を
          test: /[\\/]node_modules[\\/]/, // jqueryとvelocity-animateはnode_modulesの下にあるのでこのように設定
          name: 'vendor' // 分割して出力するファイルの名前
        },
        // src/modules/greet.jsの出力設定
        suctomJS: { // プロパティ名は任意で良い
          test: /[\\/]src[\\/]js[\\/]modules[\\/]/, // [\\\\/] <= 途中のスラッシュを書く場合 (普通に書くと、ウインドウズは動作しない)
          name: 'script', // 分割して出力するファイルの名前
          minSize: 0, // 分割の対象となるモジュールの最小サイズ。デフォルトは30kb。今回めっちゃ小さいので
          minChunks: 2 // モジュールがいくつの場所で利用されていれば分割の対象とするか
        },
        // src/scss/sytle.scssの出力設定
        stylesheet: { // プロパティ名は任意で良い
          test: /[\\/]src[\\/]scss[\\/]/, // [\\\\/] <= 途中のスラッシュを書く場合 (普通に書くと、ウインドウズは動作しない)
          name: 'style', // 分割して出力するファイルの名前
          minSize: 0, // 分割の対象となるモジュールの最小サイズ。デフォルトは30kb。今回めっちゃ小さいので
          minChunks: 2 // モジュールがいくつの場所で利用されていれば分割の対象とするか
        }
      }
    },
    // cssの最適化
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      // eslintの設定
      {
        enforce: 'pre', // preを指定してない場合よりも先に実行する。今回はBabelよりも先
        test: /\\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true, // eslintloaderのオプション。場合によってはコードを調整してくれる
        }
      },
      // Babelの設定
      {
        test: /\\.js$/, // loaderの処理対象。今回はjs
        exclude: /node_modules/, // 除外したいディレクトリ。node_modulesを入れると処理が重くなるので、基本的にはこの設定を行う
        loader: 'babel-loader' // 利用するloader
      },
      // sassについて
      {
        // test: /\\.scss$/, // エラーになる
        test: /\.scss$/,
        // use: ['style-loader', 'css-loader', 'sass-loader'] // loaderは指定した順番の逆から実行される　
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] // loaderは指定した順番の逆から実行される　
      },
      // imageについて
      {
        test: /\.(jpe?g|gif|png|svg)$/, // 画像の拡張子
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'img', // 画像の出力先。デフォルトのパスは「path: path.resolve(__dirname, 'public')」
              publicPath: '/img', // 出力する画像からのパス。public/imgにしたい場合は'/img'
            },
          },
          // 画像の圧縮
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 10
              }
            }
          }
        ],
      },
      // htmlについて (画像)
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    // 上記outputで指定したディレクトリ以下をクリーンアップ
    new CleanWebpackPlugin(),
    // htmlテンプレートを指定
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      chunks: ['app'] // 読み込ませたいエントリポイント名を指定する
    }),
    // anotherの設定
    new HtmlWebpackPlugin({
      filename: 'another.html', // 出力するファイル名。何も指定していないとindex.html
      template: './src/html/another.html', // テンプレートの場所
      chunks: ['another'] // 読み込ませたいエントリポイント名を指定する
    }),
    // sassの設定
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css' // output.pathの相対パスに出力
    })
  ]
}
