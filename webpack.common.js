const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = {
  entry: {
    app: './src/ts/App.ts',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: (pathData) => {
      return pathData.chunk.name.search(/vendor/) > -1 ? 'js/[name].js' : 'js/[name].[contenthash].js';
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendorJS: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
        },
        stylesheet: {
          test: /[\\/]src[\\/]scss[\\/]/,
          name: 'style',
          minSize: 0,
          minChunks: 2
        }
      }
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(glsl|vs|fs)$/,
        loader: "ts-shader-loader"
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: [/node_modules/, /tsOld/],
        loader: "ts-loader"
      },
      {
        test: /\\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img',
              publicPath: '/img',
            },
          },
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
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  target: ["web", "es5"],
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      chunks: ['app']
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css'
    })
  ]
}
