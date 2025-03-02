import { describe, expect, it } from 'vitest';

import FontStore from '../src/index';

describe('font store', () => {
  it('should create font store', () => {
    const fontStore = new FontStore();
    expect(fontStore).toBeTruthy();
  });

  it('should throw if font is not registered', () => {
    const fontStore = new FontStore();
    expect(() => fontStore.getFont({ fontFamily: 'Roboto' })).toThrow();
  });

  it('should register single font', () => {
    const fontStore = new FontStore();

    fontStore.register({
      family: 'Roboto',
      src: 'https://example.com/Roboto-Regular.ttf',
    });

    const font = fontStore.getFont({ fontFamily: 'Roboto' });

    expect(font).toBeTruthy();
  });

  it('should use default weight and style if not passed', () => {
    const fontStore = new FontStore();

    fontStore.register({
      family: 'Roboto',
      src: 'https://example.com/Roboto-Regular.ttf',
    });

    const font = fontStore.getFont({ fontFamily: 'Roboto' });

    expect(font?.fontWeight).toBe(400);
    expect(font?.fontStyle).toBe('normal');
  });

  it('should register font with style and weight', () => {
    const fontStore = new FontStore();

    fontStore.register({
      family: 'Roboto',
      fontStyle: 'italic',
      fontWeight: 700,
      src: 'https://example.com/Roboto-BoldItalic.ttf',
    });

    const font = fontStore.getFont({
      fontFamily: 'Roboto',
      fontStyle: 'italic',
      fontWeight: 700,
    });

    expect(font?.fontWeight).toBe(700);
    expect(font?.fontStyle).toBe('italic');
    expect(font?.src).toBe('https://example.com/Roboto-BoldItalic.ttf');
  });

  it('should register fonts in bulk', () => {
    const fontStore = new FontStore();

    fontStore.register({
      family: 'Roboto',
      fonts: [
        {
          src: 'https://example.com/Roboto-Regular.ttf',
        },
        {
          src: 'https://example.com/Roboto-Bold.ttf',
          fontWeight: 700,
        },
      ],
    });

    const regular = fontStore.getFont({ fontFamily: 'Roboto' });
    const bold = fontStore.getFont({ fontFamily: 'Roboto', fontWeight: 700 });

    expect(regular?.fontWeight).toBe(400);
    expect(bold?.fontWeight).toBe(700);
  });
});
