const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const paths = require('./paths');

module.exports = {
  target: 'node',
  mode: 'production',
  devtool: 'inline-source-map',
  entry: [paths.serverEntry],
  output: {
    path: paths.output,
    filename: 'server.bundle.js',
  },
  externals: [nodeExternals()],
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
    ],
  },
  plugins: [new webpack.IgnorePlugin(/\.(css|scss)$/)],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};
