const webpack = require('webpack');

module.exports = [
  {
    path: 'lib/react-pdf.browser.es.js',
    limit: '600 kB',

    modifyWebpackConfig: config => {
      config.resolve = {
        fallback: {
          process: require.resolve('process/browser'),
          zlib: require.resolve('browserify-zlib'),
          stream: require.resolve('stream-browserify'),
          util: require.resolve('util'),
          buffer: require.resolve('buffer'),
          asset: require.resolve('assert'),
        },
      };

      config.plugins = [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
      ];

      return config;
    },
  },
];
