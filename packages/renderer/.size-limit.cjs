const webpack = require('webpack');

module.exports = [
  {
    path: 'lib/react-pdf.browser.js',
    limit: '550 kB',

    modifyWebpackConfig: config => {
      config.resolve = {
        alias: {
          // TODO: ignore iconv-lite on default because it contains exotic encodings like `win1251`, that isn't used in pdf
          'iconv-lite': false,
        },
      };
      return config;
    },
  },
];
