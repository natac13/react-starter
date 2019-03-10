const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const paths = require('./paths');

module.exports = (mode) => ({
  target: 'node',
  mode,
  devtool: 'inline-source-map',
  entry: ['@babel/polyfill', paths.serverEntry],
  output: {
    path: paths.output,
    filename: 'server.bundle.js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: paths.serverFolder,
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
});
