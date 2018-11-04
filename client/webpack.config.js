require('dotenv/config');

const { join } = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const API_PORT = process.env.API_PORT || '5000';
const APP_PORT = process.env.APP_PORT || '3000';

const src = (...paths) => join(__dirname, 'src', ...paths);

module.exports = {
  target: 'web',

  mode: 'development',

  devtool: 'cheap-module-source-map',

  entry: src('./index.jsx'),

  output: {
    publicPath: '/',
    pathinfo: false,
    path: join(__dirname, 'public'),
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: false,
          cacheCompression: false,
        },
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: src('index.html'),
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },

  devServer: {
    hot: true,
    inline: true,
    overlay: true,
    port: APP_PORT,
    publicPath: '/',
    stats: 'minimal',
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        changeOrigin: true,
        target: `http://localhost:${API_PORT}`,
      },
    ],
  },

  optimization: {
    splitChunks: false,
    removeEmptyChunks: false,
    removeAvailableModules: false,
  },

  performance: {
    hints: false,
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dgram: 'empty',
    child_process: 'empty',
  },
};
