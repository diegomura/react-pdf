module.exports = {
  modulePathIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules'],
  testRegex: '/.*?(Spec)\\.js$',
  setupFiles: ['<rootDir>specs/utils/setupTests.js'],
};
