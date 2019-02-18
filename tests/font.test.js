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
    Font.register('src', { family: 'MyFont' });
    Font.register('src', { family: 'MyOtherFont' });

    expect(Font.getRegisteredFonts()).toEqual(['MyFont', 'MyOtherFont']);
  });

  test('should be able to clear registered fonts', () => {
    Font.register('src', { family: 'MyFont' });

    expect(Font.getRegisteredFonts()).toEqual(['MyFont']);

    Font.clear();

    expect(Font.getRegisteredFonts()).toEqual([]);
  });

  test('should be able to load font from url', async () => {
    fetch.once(localFont);

    Font.register(oswaldUrl, { family: 'Oswald' });
    await Font.load('Oswald', dummyRoot.instance);

    const font = Font.getFont('Oswald');

    expect(font.loaded).toBeTruthy();
    expect(font.loading).toBeFalsy();
    expect(font.data).toBeTruthy();
  });

  test('should fetch remote font using GET method by default', async () => {
    fetch.once(localFont);

    Font.register(oswaldUrl, { family: 'Oswald' });
    await Font.load('Oswald', dummyRoot.instance);

    expect(fetch.mock.calls[0][1].method).toBe('GET');
  });

  test('Should fetch remote font using passed method', async () => {
    fetch.once(localFont);

    Font.register(oswaldUrl, { family: 'Oswald', method: 'POST' });
    await Font.load('Oswald', dummyRoot.instance);

    expect(fetch.mock.calls[0][1].method).toBe('POST');
  });

  test('Should fetch remote font using passed headers', async () => {
    fetch.once(localFont);

    const headers = { Authorization: 'Bearer qwerty' };

    Font.register(oswaldUrl, { family: 'Oswald', headers });
    await Font.load('Oswald', dummyRoot.instance);

    expect(fetch.mock.calls[0][1].headers).toBe(headers);
  });

  test('Should fetch remote font using passed body', async () => {
    fetch.once(localFont);

    const body = 'qwerty';

    Font.register(oswaldUrl, { family: 'Oswald', body });
    await Font.load('Oswald', dummyRoot.instance);

    expect(fetch.mock.calls[0][1].body).toBe(body);
  });

  test('should be able to load a font from file', async () => {
    Font.register(`${__dirname}/assets/font.ttf`, { family: 'Roboto' });

    await Font.load('Roboto', dummyRoot.instance);

    const font = Font.getFont('Roboto');

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
      Font.register('/roboto.ttf', { family: 'Roboto' });

      expect(Font.load('Roboto', dummyRoot.instance)).rejects.toThrowError(
        'no such file or directory',
      );
    });

    describe('in browser', () => {
      beforeEach(() => {
        global.BROWSER = true;
      });

      afterEach(() => {
        global.BROWSER = false;
      });

      test('should throw `Invalid font url` error', async () => {
        Font.register('/roboto.ttf', { family: 'Roboto' });

        expect(Font.load('Roboto', dummyRoot.instance)).rejects.toThrowError(
          'Invalid font url',
        );
      });
    });
  });
});
