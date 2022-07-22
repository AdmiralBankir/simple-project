'use strict';
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

const webpackConfig = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: false,
    port: 8000,
    watchFiles: 'src/*',
    liveReload: true,
  },
});

module.exports = webpackConfig;
