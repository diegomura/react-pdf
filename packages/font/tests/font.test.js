import Font from '../src/font';

// should load the font only once (no race condition)
// should not load loading font
// should not load loaded font

describe('Font', () => {
  test('Should register font', async () => {
    const font = Font.create('MyFont1');

    font.register({
      family: 'MyFont1',
      src: '',
      fontWeight: 'normal',
      unicodeRange: /\u0048/gu,
    });

    font.register({
      family: 'MyFont1',
      src: '',
      fontWeight: 'bold',
      unicodeRange: /\u0048/gu,
    });

    expect(font.sources).toHaveLength(2);
    expect(font.sources[0].fontFamily).toBe('MyFont1');
    expect(font.sources[0].src).toBe('');
    expect(font.sources[0].fontWeight).toBe(400);
    expect(font.sources[0].unicodeRange.source).toBe(/\u0048/gu.source);

    expect(font.sources).toHaveLength(2);
    expect(font.sources[1].fontFamily).toBe('MyFont1');
    expect(font.sources[1].src).toBe('');
    expect(font.sources[1].fontWeight).toBe(700);
    expect(font.sources[1].unicodeRange.source).toBe(/\u0048/gu.source);
  });

  test('Should resolve font to closest weight', async () => {
    const font = Font.create('MyFont1');

    font.register({
      family: 'MyFont1',
      src: '',
      fontWeight: 'normal',
      unicodeRange: /\u0048/gu,
    });

    font.register({
      family: 'MyFont1',
      src: '',
      fontWeight: 'bold',
      unicodeRange: /\u0048/gu,
    });
    font.register({
      family: 'MyFont1',
      src: '',
      fontWeight: 'thin',
      unicodeRange: /\u0048/gu,
    });

    expect(font.resolve({ fontWeight: 700 })).toBe(font.sources[1]);
    expect(font.resolve({ fontWeight: 400 })).toBe(font.sources[0]);

    expect(font.resolve({ fontWeight: 100 })).toBe(font.sources[2]);
    expect(font.resolve({ fontWeight: 300 })).toBe(font.sources[2]);
    expect(font.resolve({ fontWeight: 200 })).toBe(font.sources[2]);
  });
});

const mockLoadFont = jest.fn(async function() {
  this.data = {};
});
describe('FontSource', () => {
  beforeEach(() => {
    mockLoadFont.mockClear();
  });

  test('Should only try to load font once', async () => {
    const font = Font.create('MyFont1');

    font.register({
      family: 'MyFont1',
      src: '',
      fontWeight: 'normal',
      unicodeRange: /\u0048/gu,
    });

    const fontResolved = font.resolve({ fontWeight: 400 });
    fontResolved.loadFont = mockLoadFont;

    await Promise.all([
      fontResolved.load(),
      fontResolved.load(),
      fontResolved.load(),
      fontResolved.load(),
      fontResolved.load(),
    ]);
    expect(fontResolved.loadFont).toBeCalledTimes(1);
  });

  test('All calls should await font to be loaded', async () => {
    const font = Font.create('MyFont1');

    font.register({
      family: 'MyFont1',
      src: '',
      fontWeight: 'normal',
      unicodeRange: /\u0048/gu,
    });

    const fontResolved = font.resolve({ fontWeight: 400 });
    fontResolved.loadFont = mockLoadFont;
    const promise1 = fontResolved.load();
    const promise2 = fontResolved.load();

    expect(promise1).toStrictEqual(promise2);
    await expect(promise1).resolves.toBe(await promise2);
  });

  test('Should not load already loaded font', async () => {
    const font = Font.create('MyFont1');

    font.register({
      family: 'MyFont1',
      src: '',
      fontWeight: 'normal',
      unicodeRange: /\u0048/gu,
    });

    const fontResolved = font.resolve({ fontWeight: 400 });
    fontResolved.loadFont = mockLoadFont;
    await fontResolved.load();
    await fontResolved.load();

    expect(fontResolved.loadFont).toBeCalledTimes(1);
  });
});
