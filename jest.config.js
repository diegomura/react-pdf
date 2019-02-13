module.exports = {
  automock: false,
  testRegex: 'tests/.*?(test)\\.js$',
  setupFiles: ['<rootDir>tests/utils/setupTests.js'],
  moduleNameMapper: {
    fetch: 'cross-fetch',
    'yoga-layout': 'yoga-layout-prebuilt',
  },
};
