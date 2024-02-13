import fs from 'node:fs/promises';
import os from 'node:os';
import assert from 'node:assert';
import { test } from 'node:test';
import { jsx } from 'react/jsx-runtime';
import { Document, Page, Text, renderToBuffer } from '@react-pdf/renderer';

const platform = os.platform();

const MyDocument = () =>
  jsx(Document, {
    children: jsx(Page, {
      size: 'A4',
      children: jsx(Text, {
        children: 'Hello world',
      }),
    }),
  });

function removeMovingParts(buffer) {
  return Buffer.from(
    buffer
      .toString('ascii')
      .replace(/\(D:[0-9]{14}Z\)/g, '(D:20240101000000Z)')
      .replace(
        /\/ID \[.*\]/,
        '/ID [<00000000000000000000000000000000> <00000000000000000000000000000000>]',
      ),
  );
}

test('rendering a PDF', async () => {
  const bufferPromise = renderToBuffer(jsx(MyDocument, {}));
  const referenceBufferPromise = fs.readFile(`../reference-${platform}.pdf`);

  const [buffer, referenceBuffer] = await Promise.all([
    bufferPromise,
    referenceBufferPromise,
  ]);

  const bufferAsciiWithIDsRemoved = removeMovingParts(buffer);
  const referenceBufferAsciiWithIDsRemoved = removeMovingParts(referenceBuffer);

  assert.deepStrictEqual(
    bufferAsciiWithIDsRemoved,
    referenceBufferAsciiWithIDsRemoved,
  );
});
