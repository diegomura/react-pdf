module.exports = {
  testRegex: 'packages/.*/tests/.*?(test)\\.js$',
  setupFiles: ['<rootDir>tests/internal/setupTests.js'],
  moduleNameMapper: {
    'cross-fetch': 'jest-fetch-mock',
    'yoga-layout': 'yoga-layout-prebuilt',
  },
};
