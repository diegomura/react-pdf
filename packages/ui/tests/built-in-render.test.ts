import { describe, expect, it, vi } from 'vitest';

import { render } from '../src/render/render';

const run = (code: string) =>
  render([{ name: 'a.jsx', code }], { signal: new AbortController().signal });

describe('built-in render', () => {
  it('reports the page count of the laid out document', async () => {
    const result = await run(`
      ReactPDF.render(
        <Document>
          <Page><Text>one</Text></Page>
          <Page><Text>two</Text></Page>
        </Document>
      );
    `);

    expect(result.blob).toBeInstanceOf(Blob);
    expect(result.numPages).toBe(2);
  });

  it('still calls an onRender written by the consumer', async () => {
    const onRender = vi.fn();
    (globalThis as { onRender?: unknown }).onRender = onRender;

    await run(`
      ReactPDF.render(
        <Document onRender={onRender}>
          <Page><Text>one</Text></Page>
        </Document>
      );
    `);

    expect(onRender).toHaveBeenCalledTimes(1);
    delete (globalThis as { onRender?: unknown }).onRender;
  });
});
