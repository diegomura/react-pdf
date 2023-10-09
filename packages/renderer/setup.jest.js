import path from 'path';
import url from 'url';
import jestImageSnapshot from 'jest-image-snapshot';

const { configureToMatchImageSnapshot } = jestImageSnapshot;

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// setup image matcher
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${__dirname}/tests/snapshots`,
  customDiffDir: `${__dirname}/tests/diffs`,
});

expect.extend({ toMatchImageSnapshot });
