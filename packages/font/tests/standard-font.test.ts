import { describe, expect, it, vi } from 'vitest';

import FontStore from '../src/index';

const { registerStdFonts } = vi.hoisted(() => ({ registerStdFonts: vi.fn() }));

vi.mock('pdfkit', () => {
  class PDFDocument {
    _font: unknown;

    font(name: string) {
      this._font = { name };
    }
  }

  return { default: PDFDocument, registerStdFonts };
});

const registeredNames = () =>
  registerStdFonts.mock.calls.map(([data]) => (data as { name: string }).name);

describe('standard font', () => {
  it('should register the metrics of a face on first use', async () => {
    const fontStore = new FontStore();

    await fontStore.load({ fontFamily: 'Times-Roman' });

    expect(registeredNames()).toContain('Times-Roman');
  });

  it('should not register faces the document does not use', async () => {
    const fontStore = new FontStore();

    await fontStore.load({ fontFamily: 'Times-Roman' });

    expect(registeredNames()).not.toContain('Courier');
  });

  it('should register a face once however often it is loaded', async () => {
    const fontStore = new FontStore();

    await fontStore.load({ fontFamily: 'Helvetica' });
    await fontStore.load({ fontFamily: 'Helvetica' });

    expect(
      registeredNames().filter((name) => name === 'Helvetica'),
    ).toHaveLength(1);
  });
});
