'use strict';

const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const helpers = require('./helpers');
const isDev = process.env.NODE_ENV === 'development';

const webpackConfig = {
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  entry: {
    main: helpers.root('src', 'main'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': helpers.root('src'),
      assets: helpers.root('src/assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [helpers.root('src')],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.svg$/,
        include: [helpers.root('src/sprite')],
        use: [
          {
            loader: 'svg-sprite-loader',
          },
          'svgo-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: 'asset/resource',
        exclude: [helpers.root('src/sprite')],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: isDev ? 'css/[hash].css' : 'css/[name].[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
    new HtmlPlugin({ template: 'index.html', filename: 'index.html', chunksSortMode: 'auto' }),
    new HtmlPlugin({ template: 'result.html', filename: 'result.html', chunksSortMode: 'auto' }),
    new ESLintPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'src/favicon', to: 'favicon' },
        { from: 'src/docx', to: 'docx' },
      ],
    }),
  ],
};

module.exports = webpackConfig;
