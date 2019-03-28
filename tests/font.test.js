import fs from 'fs';
import path from 'path';

import Font from '../src/font';
import root from './utils/dummyRoot';
import warning from '../src/utils/warning';

jest.mock('../src/utils/warning');

let dummyRoot;
const localFont = fs.readFileSync(path.join(__dirname, 'assets/font.ttf'));
const oswaldUrl =
  'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf';

describe('Font', () => {
  beforeEach(() => {
    fetch.resetMocks();
    warning.mockReset();
    dummyRoot = root.reset();
  });

  afterEach(() => {
    Font.clear();
  });

  test('should be able to clear registered fonts', () => {
    Font.register({ family: 'MyFont', src: 'src' });

    expect(Font.getRegisteredFontFamilies()).toEqual(['MyFont']);

    Font.clear();

    expect(Font.getRegisteredFontFamilies()).toEqual([]);
  });

  test('should show warning when old register API used', () => {
    fetch.once(localFont);

    Font.register(oswaldUrl, { family: 'Oswald' });

    expect(warning.mock.calls).toHaveLength(1);
  });

  test('should be able to register one font family', () => {
    Font.register({ family: 'MyFont', src: 'src' });

    expect(Font.getRegisteredFontFamilies()).toEqual(['MyFont']);
  });

  test('should be able to register many font families', () => {
    Font.register({ family: 'MyFont', src: 'src' });
    Font.register({ family: 'MyOtherFont', src: 'src' });

    expect(Font.getRegisteredFontFamilies()).toEqual(['MyFont', 'MyOtherFont']);
  });

  test('should be able to register many sources of one font family individually', () => {
    Font.register({ family: 'MyFont', src: 'src' });
    Font.register({ family: 'MyFont', src: 'src', fontStyle: 'italic' });
    Font.register({
      family: 'MyFont',
      src: 'src',
      fontStyle: 'italic',
      fontWeight: 700,
    });

    expect(Font.getRegisteredFontFamilies()).toEqual(['MyFont']);

    const fontInstance = Font.getRegisteredFonts()['MyFont'];

    expect(fontInstance.sources).toHaveLength(3);
    expect(fontInstance.sources[0]).toHaveProperty('fontStyle', 'normal');
    expect(fontInstance.sources[0]).toHaveProperty('fontWeight', 400);
    expect(fontInstance.sources[1]).toHaveProperty('fontStyle', 'italic');
    expect(fontInstance.sources[1]).toHaveProperty('fontWeight', 400);
    expect(fontInstance.sources[2]).toHaveProperty('fontStyle', 'italic');
    expect(fontInstance.sources[2]).toHaveProperty('fontWeight', 700);
  });

  test('should be able to register many sources of one font family in bulk', () => {
    Font.register({
      family: 'MyFont',
      fonts: [
        { src: 'src' },
        { src: 'src', fontStyle: 'italic' },
        {
          src: 'src',
          fontStyle: 'italic',
          fontWeight: 700,
        },
      ],
    });

    expect(Font.getRegisteredFontFamilies()).toEqual(['MyFont']);

    const fontInstance = Font.getRegisteredFonts()['MyFont'];

    expect(fontInstance.sources).toHaveLength(3);
    expect(fontInstance.sources[0]).toHaveProperty('fontStyle', 'normal');
    expect(fontInstance.sources[0]).toHaveProperty('fontWeight', 400);
    expect(fontInstance.sources[1]).toHaveProperty('fontStyle', 'italic');
    expect(fontInstance.sources[1]).toHaveProperty('fontWeight', 400);
    expect(fontInstance.sources[2]).toHaveProperty('fontStyle', 'italic');
    expect(fontInstance.sources[2]).toHaveProperty('fontWeight', 700);
  });

  test('should be able to load font from url', async () => {
    fetch.once(localFont);

    const descriptor = { fontFamily: 'Oswald' };

    Font.register({ family: 'Oswald', src: oswaldUrl });
    await Font.load(descriptor, dummyRoot.instance);

    const font = Font.getFont(descriptor);

    expect(font.loading).toBeFalsy();
    expect(font.data).toBeTruthy();
  });

  test('should fetch remote font using GET method by default', async () => {
    fetch.once(localFont);

    const descriptor = { fontFamily: 'Oswald' };

    Font.register({ family: 'Oswald', src: oswaldUrl });
    await Font.load(descriptor, dummyRoot.instance);

    expect(fetch.mock.calls[0][1].method).toBe('GET');
  });

  test('Should fetch remote font using passed method', async () => {
    fetch.once(localFont);

    const descriptor = { fontFamily: 'Oswald' };

    Font.register({ family: 'Oswald', src: oswaldUrl, method: 'POST' });
    await Font.load(descriptor, dummyRoot.instance);

    expect(fetch.mock.calls[0][1].method).toBe('POST');
  });

  test('Should fetch remote font using passed headers', async () => {
    fetch.once(localFont);

    const descriptor = { fontFamily: 'Oswald' };
    const headers = { Authorization: 'Bearer qwerty' };

    Font.register({ family: 'Oswald', src: oswaldUrl, headers });
    await Font.load(descriptor, dummyRoot.instance);

    expect(fetch.mock.calls[0][1].headers).toBe(headers);
  });

  test('Should fetch remote font using passed body', async () => {
    fetch.once(localFont);

    const descriptor = { fontFamily: 'Oswald' };
    const body = 'qwerty';

    Font.register({ family: 'Oswald', src: oswaldUrl, body });
    await Font.load(descriptor, dummyRoot.instance);

    expect(fetch.mock.calls[0][1].body).toBe(body);
  });

  test('should be able to load a font from file', async () => {
    Font.register({ family: 'Roboto', src: `${__dirname}/assets/font.ttf` });

    const descriptor = { fontFamily: 'Roboto' };

    await Font.load(descriptor, dummyRoot.instance);

    const font = Font.getFont(descriptor);

    expect(font.loading).toBeFalsy();
    expect(font.data).toBeTruthy();
  });

  test('should fetch remote font only once', async () => {
    // Delay fetch response
    fetch.mockResponse(
      () =>
        new Promise(resolve => setTimeout(() => resolve({ body: localFont }))),
      500,
    );

    const descriptor = { fontFamily: 'Oswald' };

    Font.register({ family: 'Oswald', src: oswaldUrl });

    const fontResolvers = Promise.all([
      Font.load(descriptor, dummyRoot.instance),
      Font.load(descriptor, dummyRoot.instance),
    ]);

    await fontResolvers;

    expect(fetch.mock.calls).toHaveLength(1);
  });

  test('should throw error if missing font style is requested', async () => {
    Font.register({ family: 'Roboto', src: `${__dirname}/assets/font.ttf` }); // normal

    await Font.load({ fontFamily: 'Roboto' }, dummyRoot.instance);

    expect(() =>
      Font.getFont({ fontFamily: 'Roboto', fontStyle: 'italic' }),
    ).toThrow();
  });

  test('should be able to load requested font style source', async () => {
    Font.register({
      family: 'Roboto',
      src: `${__dirname}/assets/font.ttf`,
      fontStyle: 'italic',
    });

    const descriptor = { fontFamily: 'Roboto', fontStyle: 'italic' };

    await Font.load(descriptor, dummyRoot.instance);

    const font = Font.getFont(descriptor);

    expect(font.data).toBeTruthy();
    expect(font.loading).toBeFalsy();
    expect(font.fontStyle).toEqual('italic');
  });

  test('should correctly resolve exact font weight if present', async () => {
    const src = `${__dirname}/assets/font.ttf`;

    Font.register({
      src,
      family: 'Roboto',
      fontWeight: 600,
    });

    const font = Font.getFont({ fontFamily: 'Roboto', fontWeight: 600 });

    expect(font.fontWeight).toEqual(600);
  });

  test('should correctly resolve font between target and 500 when target between 400 and 500', async () => {
    const src = `${__dirname}/assets/font.ttf`;

    Font.register({
      family: 'Roboto',
      fonts: [{ src, fontWeight: 430 }, { src, fontWeight: 470 }],
    });

    expect(
      Font.getFont({ fontFamily: 'Roboto', fontWeight: 420 }).fontWeight,
    ).toEqual(430);
    expect(
      Font.getFont({ fontFamily: 'Roboto', fontWeight: 450 }).fontWeight,
    ).toEqual(470);
  });

  test('should correctly resolve font less than target when target between 400 and 500', async () => {
    const src = `${__dirname}/assets/font.ttf`;

    Font.register({
      family: 'Roboto',
      fonts: [{ src, fontWeight: 300 }, { src, fontWeight: 600 }],
    });

    expect(
      Font.getFont({ fontFamily: 'Roboto', fontWeight: 420 }).fontWeight,
    ).toEqual(300);
    expect(
      Font.getFont({ fontFamily: 'Roboto', fontWeight: 450 }).fontWeight,
    ).toEqual(300);
  });

  test('should correctly resolve font greater than target when target between 400 and 500', async () => {
    const src = `${__dirname}/assets/font.ttf`;

    Font.register({
      family: 'Roboto',
      fonts: [{ src, fontWeight: 600 }],
    });

    expect(
      Font.getFont({ fontFamily: 'Roboto', fontWeight: 420 }).fontWeight,
    ).toEqual(600);
    expect(
      Font.getFont({ fontFamily: 'Roboto', fontWeight: 450 }).fontWeight,
    ).toEqual(600);
  });

  test('should correctly resolve font less than target when target below 400', async () => {
    const src = `${__dirname}/assets/font.ttf`;

    Font.register({
      family: 'Roboto',
      fonts: [{ src, fontWeight: 100 }, { src, fontWeight: 200 }],
    });

    expect(
      Font.getFont({ fontFamily: 'Roboto', fontWeight: 300 }).fontWeight,
    ).toEqual(200);
  });

  test('should correctly resolve font greater than target when target below 400', async () => {
    const src = `${__dirname}/assets/font.ttf`;

    Font.register({
      family: 'Roboto',
      fonts: [{ src, fontWeight: 600 }, { src, fontWeight: 700 }],
    });

    expect(
      Font.getFont({ fontFamily: 'Roboto', fontWeight: 300 }).fontWeight,
    ).toEqual(600);
  });

  test('should correctly resolve font greater than target when target above 500', async () => {
    const src = `${__dirname}/assets/font.ttf`;

    Font.register({
      family: 'Roboto',
      fonts: [{ src, fontWeight: 600 }, { src, fontWeight: 700 }],
    });

    expect(
      Font.getFont({ fontFamily: 'Roboto', fontWeight: 550 }).fontWeight,
    ).toEqual(600);
  });

  test('should correctly resolve font less than target when target above 500', async () => {
    const src = `${__dirname}/assets/font.ttf`;

    Font.register({
      family: 'Roboto',
      fonts: [{ src, fontWeight: 200 }, { src, fontWeight: 300 }],
    });

    expect(
      Font.getFont({ fontFamily: 'Roboto', fontWeight: 550 }).fontWeight,
    ).toEqual(300);
  });

  test('should get undefined hyphenation callback if not registered', () => {
    expect(Font.getHyphenationCallback()).toBe(undefined);
  });

  test('should get registered hyphenation callback', () => {
    const callbackMock = () => {};
    Font.registerHyphenationCallback(callbackMock);

    expect(Font.getHyphenationCallback()).toBe(callbackMock);
  });

  test('should get undefined emoji source if not registered', () => {
    expect(Font.getEmojiSource()).toBe(undefined);
  });

  test('should get registered emoji source', () => {
    const sourceMock = { url: 'foo', format: 'bar' };
    Font.registerEmojiSource(sourceMock);

    expect(Font.getEmojiSource()).toEqual(sourceMock);
  });

  describe('invalid url', () => {
    test('should throw `no such file or directory` error', async () => {
      Font.register({ family: 'Roboto', src: '/roboto.ttf' });

      expect(
        Font.load({ fontFamily: 'Roboto' }, dummyRoot.instance),
      ).rejects.toThrow('no such file or directory');
    });

    describe('in browser', () => {
      beforeEach(() => {
        global.BROWSER = true;
      });

      afterEach(() => {
        global.BROWSER = false;
      });

      test('should throw `Invalid font url` error', async () => {
        Font.register({ family: 'Roboto', src: '/roboto.ttf' });

        expect(
          Font.load({ fontFamily: 'Roboto' }, dummyRoot.instance),
        ).rejects.toThrow('Invalid font url');
      });
    });
  });
});
