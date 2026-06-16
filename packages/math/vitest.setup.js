import { expect } from 'vitest';
import path from 'path';
import url from 'url';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${__dirname}/tests/snapshots`,
  customDiffDir: `${__dirname}/tests/diffs`,
  failureThreshold: 0.05,
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.3 },
});

expect.extend({ toMatchImageSnapshot });
