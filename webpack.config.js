const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'  // 指定输出文件
  },
  devServer: {
    open: true,
    port: 3000,
    contentBase: 'src',
    hot: true
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new miniCssExtractPlugin(),
    new optimizeCssAssetsWebpackPlugin(), 
  ],
  module: {
    rules: [
      {
        test: /\.css$/, 
        use: [miniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  devtool: 'source-map',
}