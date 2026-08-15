import path from 'path';
import url from 'url';
import { expect } from 'vitest';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${__dirname}/tests/snapshots`,
  customDiffDir: `${__dirname}/tests/diffs`,
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });
