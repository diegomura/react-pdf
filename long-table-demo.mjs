/**
 * A long invoice table that spans several pages, rendered twice:
 *
 *   wrap            - the default: the table starts on page 1 and splits
 *   breakWhenNeeded - the table waits for page 2, then splits as usual
 *
 * Renders both PDFs and prints how the rows ended up distributed, so the
 * difference is visible without opening anything.
 *
 *   node long-table-demo.mjs [outputDir] [rowCount]
 */

import fs from 'fs';
import path from 'path';
import { createElement as h } from 'react';
import { Document, Page, View, Text, renderToFile } from '@react-pdf/renderer';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const outDir = process.argv[2] || process.cwd();
const ROWS = Number(process.argv[3] || 120);

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
    h(Text, { style: { fontSize: 10 } }, `${((i + 1) * 12.5).toFixed(2)} EUR`),
  );

const build = (tableProps) =>
  h(
    Document,
    null,
    h(
      Page,
      { size: 'A4', style: { padding: 40 } },
      // Tall cover block: leaves only a sliver of page 1 for the table
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
      h(
        View,
        { style: { border: '1pt solid #999999', padding: 8 }, ...tableProps },
        h(
          Text,
          { style: { fontSize: 12, marginBottom: 6 } },
          `Invoice positions (${ROWS} rows)`,
        ),
        ...Array.from({ length: ROWS }, (_, i) => row(i)),
      ),
    ),
  );

const report = async (label, file) => {
  const data = new Uint8Array(fs.readFileSync(file));
  const doc = await getDocument({ data, verbosity: 0 }).promise;

  const perPage = [];
  for (let i = 1; i <= doc.numPages; i += 1) {
    const page = await doc.getPage(i);
    const items = (await page.getTextContent()).items.map((it) => it.str);
    perPage.push(items.filter((s) => s.startsWith('Position')).length);
  }

  console.log(
    `${label.padEnd(16)} ${doc.numPages} pages | rows per page: [${perPage.join(', ')}]`,
  );
};

const cases = [
  ['wrap', { wrap: false }],
  ['breakWhenNeeded', { wrap: true, breakWhenNeeded: true }],
];

for (const [label, props] of cases) {
  const file = path.join(outDir, `long-table-${label}.pdf`);
  await renderToFile(build(props), file);
  await report(label, file);
}
