import fs from 'fs';
import path from 'path';

import Font from '../src/font';
import root from './utils/dummyRoot';

let dummyRoot;
const oswaldUrl =
  'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf';
const localFont = fs.readFileSync(path.join(__dirname, 'assets/font.ttf'));

describe('Font', () => {
  beforeEach(() => {
    fetch.resetMocks();
    dummyRoot = root.reset();
  });

  afterEach(() => {
    Font.clear();
  });

  test('should be able to register font families', () => {
    Font.register({ family: 'MyFont', src: 'src' });
    Font.register({ family: 'MyOtherFont', src: 'src' });

    expect(Font.getRegisteredFonts()).toEqual(['MyFont', 'MyOtherFont']);
  });

  test('should be able to clear registered fonts', () => {
    Font.register({ family: 'MyFont', src: 'src' });

    expect(Font.getRegisteredFonts()).toEqual(['MyFont']);

    Font.clear();

    expect(Font.getRegisteredFonts()).toEqual([]);
  });

  test.skip('should show warning when old register API used', async () => {
    fetch.once(localFont);

    const descriptor = { fontFamily: 'Oswald' };

    Font.register({ family: 'Oswald', src: oswaldUrl });
    await Font.load(descriptor, dummyRoot.instance);

    const font = Font.getFont(descriptor);

    expect(font.loaded).toBeTruthy();
    expect(font.loading).toBeFalsy();
    expect(font.data).toBeTruthy();
  });

  test('should be able to load font from url', async () => {
    fetch.once(localFont);

    const descriptor = { fontFamily: 'Oswald' };

    Font.register({ family: 'Oswald', src: oswaldUrl });
    await Font.load(descriptor, dummyRoot.instance);

    const font = Font.getFont(descriptor);

    expect(font.loaded).toBeTruthy();
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

    expect(font.loaded).toBeTruthy();
    expect(font.loading).toBeFalsy();
    expect(font.data).toBeTruthy();
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
