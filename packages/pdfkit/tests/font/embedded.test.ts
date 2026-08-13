import { describe, expect, it } from 'vitest';

import PDFDocument from '../../src/document.node.js';

const ROBOTO = new URL(
  '../../../examples/vite/public/Roboto-Regular.ttf',
  import.meta.url,
).pathname;

const render = (text: string, options = {}) =>
  new Promise<string>((resolve) => {
    const doc = new PDFDocument({ compress: false, ...options });
    const decoder = new TextDecoder('latin1');
    const chunks: string[] = [];

    doc.on('data', (chunk) => chunks.push(decoder.decode(chunk)));
    doc.on('end', () => resolve(chunks.join('')));

    doc.font(ROBOTO).text(text);
    doc.end();
  });

describe('embedded fonts', () => {
  it('derives the subset tag from the font id', async () => {
    const pdf = await render('Hello');

    // 'F2' — the default Helvetica takes 'F1'
    expect(pdf).toContain('/BaseFont /CZZZZZ+Roboto-Regular');
  });

  it('writes a ToUnicode cmap as bfranges', async () => {
    const pdf = await render('AB');

    expect(pdf).toContain('1 beginbfrange');
    expect(pdf).toContain('<0000> <0002> [<0000> <0041> <0042>]');
    expect(pdf).not.toContain('beginbfchar');
  });

  it('splits the cmap into 256-glyph bfranges', async () => {
    const codePoints = (from: number, to: number) =>
      Array.from({ length: to - from + 1 }, (_, i) =>
        String.fromCodePoint(from + i),
      ).join('');

    const pdf = await render(
      codePoints(0x21, 0x7e) +
        codePoints(0xa1, 0xff) +
        codePoints(0x100, 0x17f) +
        codePoints(0x400, 0x45f),
    );

    const [, count, body] = pdf.match(
      /(\d+) beginbfrange\n([\s\S]*?)\nendbfrange/,
    )!;
    const lines = body.split('\n');

    expect(Number(count)).toBe(lines.length);
    expect(lines.length).toBeGreaterThan(1);

    // every range must declare exactly as many destinations as it spans
    for (const line of lines) {
      const [, from, to, dsts] = line.match(
        /^<([0-9a-f]{4})> <([0-9a-f]{4})> \[(.*)\]$/,
      )!;
      expect(dsts.split(' ').length).toBe(
        parseInt(to, 16) - parseInt(from, 16) + 1,
      );
    }
  });

  it('writes a CIDSet for PDF/A-1', async () => {
    expect(await render('AB', { subset: 'PDF/A-1b' })).toContain('/CIDSet');
    expect(await render('AB')).not.toContain('/CIDSet');
  });
});
