/**
 * Renders the same invoice-ish document three ways so the effect of
 * breakWhenNeeded is visible side by side.
 *
 *   node break-when-needed-demo.mjs [outputDir]
 */

import path from 'path';
import { createElement as h } from 'react';
import {
  Document,
  Page,
  View,
  Text,
  renderToFile,
} from '@react-pdf/renderer';

const outDir = process.argv[2] || process.cwd();

const row = (i) =>
  h(
    View,
    {
      key: i,
      style: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderBottom: '1pt solid #dddddd',
      },
    },
    h(Text, { style: { fontSize: 10 } }, `Position ${i + 1}`),
    h(Text, { style: { fontSize: 10 } }, `${(i + 1) * 12.5} EUR`),
  );

const build = ({ breakWhenNeeded, experimentalPagination }) =>
  h(
    Document,
    null,
    h(
      Page,
      {
        size: 'A4',
        style: { padding: 40 },
        ...(experimentalPagination ? { experimentalPagination: true } : {}),
      },
      // Tall enough to push the table near the bottom of page 1
      h(
        View,
        {
          style: {
            height: 520,
            backgroundColor: '#f2f2f2',
            marginBottom: 12,
          },
        },
        h(Text, { style: { fontSize: 12, padding: 8 } }, 'Header / cover block'),
      ),
      // The table. Without the prop it starts splitting at the page bottom.
      h(
        View,
        {
          style: { border: '1pt solid #999999', padding: 8 },
          ...(breakWhenNeeded ? { breakWhenNeeded: true } : {}),
        },
        h(Text, { style: { fontSize: 12, marginBottom: 6 } }, 'Invoice positions'),
        ...Array.from({ length: 18 }, (_, i) => row(i)),
      ),
    ),
  );

const cases = [
  ['without-breakWhenNeeded.pdf', {}],
  ['with-breakWhenNeeded.pdf', { breakWhenNeeded: true }],
  [
    'with-breakWhenNeeded-new-engine.pdf',
    { breakWhenNeeded: true, experimentalPagination: true },
  ],
];

for (const [name, opts] of cases) {
  const file = path.join(outDir, name);
  await renderToFile(build(opts), file);
  console.log('wrote', file);
}
