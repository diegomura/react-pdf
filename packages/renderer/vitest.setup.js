import { expect } from 'vitest';
import path from 'path';
import url from 'url';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${__dirname}/tests/snapshots`,
  customDiffDir: `${__dirname}/tests/diffs`,
});

expect.extend({ toMatchImageSnapshot });
