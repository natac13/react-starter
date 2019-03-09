const merge = require('webpack-merge');
const webpack = require('webpack');

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = mode => {
  return merge([
    {
      mode,
      optimization: {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            extractComments: true,
          }),
          new OptimizeCssAssetsPlugin(),
        ],
      },
      output: {
        publicPath: '/', // where the generated static files reside. This is the project name for gh-pages
      },
      devtool: 'source-map',
      plugins: [
        new CopyWebpackPlugin([
          { from: '../package.json' },
          { from: '../Procfile' },
          { from: '../favicon.ico' },
        ]), // copys assets, like photos to the output folder.
        new CleanWebpackPlugin(['build']),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
        new Visualizer({ filename: './statistics.html' }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(mode),
        }),
      ],
    },
  ]);
};
