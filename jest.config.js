module.exports = {
  testRegex: 'tests/.*?(test)\\.js$',
  setupFiles: ['<rootDir>tests/utils/setupTests.js'],
  moduleNameMapper: {
    'yoga-layout': 'yoga-layout-prebuilt',
  },
};
