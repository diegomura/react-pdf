import Font from '../src/font';
import root from './utils/dummyRoot';

let dummyRoot;
const oswaldUrl =
  'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf';

describe('Font', () => {
  beforeEach(() => {
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
    Font.register(oswaldUrl, { family: 'Oswald' });
    await Font.load('Oswald', dummyRoot.instance);

    const font = Font.getFont('Oswald');

    expect(font.loaded).toBeTruthy();
    expect(font.loading).toBeFalsy();
    expect(font.data).toBeTruthy();
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
});
