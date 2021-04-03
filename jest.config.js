module.exports = {
  testRegex: 'tests/.*?(test)\\.js$',
  setupFiles: ['<rootDir>tests/utils/setupTests.js'],
  moduleNameMapper: {
    'cross-fetch': 'jest-fetch-mock',
    'yoga-layout': '@react-pdf/yoga',
  },
};
