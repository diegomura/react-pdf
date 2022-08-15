/* eslint-disable import/no-extraneous-dependencies */
const util = require('util');
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

// setup image matcher
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${__dirname}/tests/snapshots`,
  customDiffDir: `${__dirname}/tests/diffs`,
});

expect.extend({ toMatchImageSnapshot });
