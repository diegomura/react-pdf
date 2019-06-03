module.exports = {
  testRegex: 'tests/.*?(test)\\.js$',
  setupFiles: ['<rootDir>tests/internal/setupTests.js'],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleNameMapper: {
    'cross-fetch': 'jest-fetch-mock',
    'yoga-layout': 'yoga-layout-prebuilt',
  },
};
