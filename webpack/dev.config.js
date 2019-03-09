const merge = require('webpack-merge');

module.exports = env => {
  return merge([
    {
      mode: 'development',
      devtool: 'inline-source-map',
      devServer: {
        contentBase: './build',
        overlay: true,
        port: process.env.PORT,
        historyApiFallback: true,
        hot: true,
        open: true,
        proxy: {
          '/api': `http://localhost:${process.env.SERVER_PORT}`,
        },
      },
    },
  ]);
};
