const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  target: 'web', // <- important
  entry: './src/ts/App.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: (pathData) => {
      return pathData.chunk.name.search(/vendor/) > -1 ? 'js/[name].js' : 'js/[name].[contenthash].js'
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendorJS: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
        stylesheet: {
          test: /[\\/]src[\\/]scss[\\/]/,
          name: 'style',
          minSize: 0,
          minChunks: 2,
        },
      },
    },
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs)$/,
        loader: 'ts-shader-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'img',
              publicPath: '/img',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 10,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      // title: 'Hello world',
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css',
    }),
  ],
}
