'use strict';

const { merge } = require('webpack-merge');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const helpers = require('./helpers');
const commonConfig = require('./webpack.config.common');
const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = merge(commonConfig, {
  mode: 'production',
  devtool: false,
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: 'js/[name].[contenthash:8].js',
  },
  target: ['web', 'es2020'],
  optimization: {
    minimize: true,
    minimizer: [
      new CSSMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          sourceMap: false,
        },
      }),
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [new WebpackManifestPlugin({ basePath: '' })],
});

if (!isProd) {
  webpackConfig.devtool = 'source-map';
}

module.exports = webpackConfig;
