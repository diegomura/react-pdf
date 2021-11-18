const path = require('path');

/**
 * @typedef {import('webpack').Configuration} Configuration
 *
 * webpack configuration for rendering worker
 * @type {Configuration}
 */
module.exports = {
  mode: 'development',
  devtool: false,

  context: __dirname,

  entry: './index.js',

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
