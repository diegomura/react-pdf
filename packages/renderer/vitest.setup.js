import { expect } from 'vitest';
import path from 'path';
import url from 'url';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import React from 'react';
import ReactDOM from 'react-dom';

console.log(`Using React ${React.version} + ReactDOM ${ReactDOM.version}`);

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${__dirname}/tests/snapshots`,
  customDiffDir: `${__dirname}/tests/diffs`,
});

expect.extend({ toMatchImageSnapshot });
