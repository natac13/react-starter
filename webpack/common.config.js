const webpack = require('webpack');
const merge = require('webpack-merge');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./paths.js');

require('dotenv').config();

module.exports = mode => {
  const isDevelopment = mode !== 'production';
  return merge([
    {
      context: paths.root, // absolute path for resolving entry point(s)
      entry: [paths.entry],
      output: {
        path: paths.output,
        filename: 'bundle.js',
        chunkFilename: '[name].js',
        publicPath: '/', // where the generated static files reside.
      },
      resolve: {
        extensions: [
          '*',
          '.js',
          '.jsx',
          '.json',
          '.node',
          '.png',
          '.css',
          '.scss',
        ],
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
              },
            ],
          },
          {
            test: /\.scss$/,
            use: [
              isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  camelCase: true,
                  localIdentName: '[local]__[hash:base64:9]',
                  importLoaders: 1,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  data: `@import "${paths.theme}";`,
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 50000,
              },
            },
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: ['url-loader?limit=10000', 'img-loader'],
          },
        ],
      },
      optimization: {
        runtimeChunk: 'single',
        // usedExports: true,
        splitChunks: {
          // sync + async chunks
          chunks: 'all',
          cacheGroups: {
            common: {
              name: 'commons',
              chunks: 'initial',
              minChunks: 2,
            },
            vendor: {
              // import file path containing node_modules
              test: /node_modules/,
              name: 'vendor.bundle',
            },
          },
        },
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: paths.template,
          filename: './index.html',
        }),
        new CopyWebpackPlugin([{ from: '../app/static' }]),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(mode),
        }),
      ],
    },
  ]);
};
