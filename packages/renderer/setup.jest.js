/* eslint-disable import/no-extraneous-dependencies */
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

// setup image matcher
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: './snapshots',
  customDiffDir: './diffs',
});

expect.extend({ toMatchImageSnapshot });
