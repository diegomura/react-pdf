export default {
  testRegex: 'tests/.*?(test)\\.js$',
  setupFilesAfterEnv: ['<rootDir>/setup.jest.js'],
  transformIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/tests/environment/jsdom.js',
  ],
};
