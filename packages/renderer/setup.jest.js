/* eslint-disable import/no-extraneous-dependencies */
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

// setup image matcher
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${__dirname}/tests/snapshots`,
  customDiffDir: `${__dirname}/tests/diffs`,
});

expect.extend({ toMatchImageSnapshot });

// JSDOM environment doesn't polyfill TextEncoder and TextDecoder
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
