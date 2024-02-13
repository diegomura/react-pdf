const fs = require('node:fs/promises');
const os = require('node:os');
const assert = require('node:assert');
const { test } = require('node:test');
const { jsx } = require('react/jsx-runtime');
const { Document, Page, Text, renderToBuffer } = require('@react-pdf/renderer');

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
