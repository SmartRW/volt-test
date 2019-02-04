const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  mode: process.env.NODE_ENV || 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/app.jsx'),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  output: {
    path: path.join(__dirname, 'dist/public/'),
    publicPath: '/assets/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      use: 'file-loader',
    }],
  },
};
