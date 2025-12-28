import { describe, expect, it } from 'vitest';

import FontStore from '../src/index';

describe('standard fonts', () => {
  it('should resolve courier', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Courier' });

    expect(font.src).toBe('Courier');
  });

  it('should resolve bold courier', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Courier',
      fontWeight: 700,
    });

    expect(font.src).toBe('Courier-Bold');
  });

  it('should resolve italic courier', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Courier',
      fontStyle: 'italic',
    });

    expect(font.src).toBe('Courier-Oblique');
  });

  it('should resolve bold italic courier', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Courier',
      fontWeight: 700,
      fontStyle: 'italic',
    });

    expect(font.src).toBe('Courier-BoldOblique');
  });

  it('should resolve courier normal weight', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Courier',
      fontWeight: 400,
    });

    expect(font.src).toBe('Courier');
  });

  it('should resolve courier missing font weight', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Courier',
      fontWeight: 600,
    });

    expect(font.src).toBe('Courier-Bold');
  });

  it('should resolve times', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Times-Roman' });

    expect(font.src).toBe('Times-Roman');
  });

  it('should resolve bold times', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Times-Roman',
      fontWeight: 700,
    });

    expect(font.src).toBe('Times-Bold');
  });

  it('should resolve italic times', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Times-Roman',
      fontStyle: 'italic',
    });

    expect(font.src).toBe('Times-Italic');
  });

  it('should resolve bold italic times', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Times-Roman',
      fontWeight: 700,
      fontStyle: 'italic',
    });

    expect(font.src).toBe('Times-BoldItalic');
  });

  it('should resolve times normal weight', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Times-Roman',
      fontWeight: 400,
    });

    expect(font.src).toBe('Times-Roman');
  });

  it('should resolve times missing font weight', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Times-Roman',
      fontWeight: 600,
    });

    expect(font.src).toBe('Times-Bold');
  });

  it('should resolve helvetica', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Helvetica' });

    expect(font.src).toBe('Helvetica');
  });

  it('should resolve bold helvetica', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Helvetica',
      fontWeight: 700,
    });

    expect(font.src).toBe('Helvetica-Bold');
  });

  it('should resolve italic helvetica', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Helvetica',
      fontStyle: 'italic',
    });

    expect(font.src).toBe('Helvetica-Oblique');
  });

  it('should resolve bold italic helvetica', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Helvetica',
      fontWeight: 700,
      fontStyle: 'italic',
    });

    expect(font.src).toBe('Helvetica-BoldOblique');
  });

  it('should resolve helvetica normal weight', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Helvetica',
      fontWeight: 400,
    });

    expect(font.src).toBe('Helvetica');
  });

  it('should resolve helvetica missing font weight', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({
      fontFamily: 'Helvetica',
      fontWeight: 600,
    });

    expect(font.src).toBe('Helvetica-Bold');
  });

  it('should resolve legacy courier bold', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Courier-Bold' });

    expect(font.src).toBe('Courier-Bold');
  });

  it('should resolve legacy courier oblique', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Courier-Oblique' });

    expect(font.src).toBe('Courier-Oblique');
  });

  it('should resolve legacy courier bold oblique', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Courier-BoldOblique' });

    expect(font.src).toBe('Courier-BoldOblique');
  });

  it('should resolve legacy times bold', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Times-Bold' });

    expect(font.src).toBe('Times-Bold');
  });

  it('should resolve legacy times italic', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Times-Italic' });

    expect(font.src).toBe('Times-Italic');
  });

  it('should resolve legacy times bold italic', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Times-BoldItalic' });

    expect(font.src).toBe('Times-BoldItalic');
  });

  it('should resolve legacy helvetica bold', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Helvetica-Bold' });

    expect(font.src).toBe('Helvetica-Bold');
  });

  it('should resolve legacy helvetica oblique', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Helvetica-Oblique' });

    expect(font.src).toBe('Helvetica-Oblique');
  });

  it('should resolve legacy helvetica bold oblique', () => {
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Helvetica-BoldOblique' });

    expect(font.src).toBe('Helvetica-BoldOblique');
  });

  it('should resolve advanceWidth of soft hyphen to be zero', () => {
    const SOFT_HYPHEN = '\u00AD';
    const fontStore = new FontStore();

    const font = fontStore.getFont({ fontFamily: 'Helvetica' });

    expect(font.data.encode(SOFT_HYPHEN)[1][0].advanceWidth).toBe(0);
  });
});
