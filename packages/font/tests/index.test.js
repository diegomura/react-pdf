import FontStore from '../src';
import Font from '../src/font';

const mockRegister = jest.fn();
const mockResolve = jest.fn();

jest.mock('../src/font', () => ({
  create: jest.fn(() => {
    return {
      register: mockRegister,
      resolve: mockResolve,
    };
  }),
}));

describe('font store', () => {
  beforeEach(() => {
    Font.create.mockClear();
    mockRegister.mockClear();
    mockResolve.mockClear();
  });
  test('Should register a single font', () => {
    const fontStore = new FontStore();
    const font = {
      family: 'Arial',
      src: '',
      fontWeight: 'normal',
      unicodeRange: /[\u0600-\u06FF]/gu,
    };
    fontStore.register(font);

    expect(Font.create).toBeCalledTimes(1);
    expect(mockRegister).toBeCalledTimes(1);

    expect(mockRegister).toBeCalledWith(font);

    expect(fontStore.getRegisteredFontFamilies()).toEqual(['Arial']);
  });

  test('Should register multiple font families', () => {
    const fontStore = new FontStore();
    const myFont1 = {
      family: 'MyFont1',
      src: '',
      fontWeight: 'Bold',
      unicodeRange: /[\u0600-\u06FF]/gu,
    };
    const myFont2 = {
      family: 'MyFont2',
      src: '',
      fontWeight: 'normal',
      unicodeRange: /[\u0600-\u06FF]/gu,
    };
    fontStore.register(myFont1);
    fontStore.register(myFont2);

    expect(Font.create).toBeCalledTimes(2);
    expect(mockRegister).toBeCalledTimes(2);

    expect(mockRegister).toBeCalledWith(myFont1);
    expect(mockRegister).toBeCalledWith(myFont2);

    expect(fontStore.getRegisteredFontFamilies()).toEqual([
      'MyFont1',
      'MyFont2',
    ]);
  });

  test('Should register a multiple fonts', () => {
    expect(Font.create).toBeCalledTimes(0);
    const fontStore = new FontStore();
    const fontFamily = {
      family: 'Arial',
      unicodeRange: /[\u0600-\u06FF]/gu,
      fonts: [
        { src: '', fontWeight: 'normal' },
        { src: '', fontWeight: 'bold' },
      ],
    };
    fontStore.register(fontFamily);

    expect(Font.create).toBeCalledTimes(1);
    expect(mockRegister).toBeCalledTimes(fontFamily.fonts.length);

    const defaultValues = { ...fontFamily };
    delete defaultValues.fonts;

    expect(mockRegister).toBeCalledWith({
      ...defaultValues,
      ...fontFamily.fonts[0],
    });
    expect(mockRegister).toBeCalledWith({
      ...defaultValues,
      ...fontFamily.fonts[1],
    });
  });

  test('Should register override family properties by font properties', () => {
    expect(Font.create).toBeCalledTimes(0);
    const fontStore = new FontStore();
    const fontFamily = {
      family: 'Arial',
      unicodeRange: /[\u0600-\u06FF]/gu,
      fonts: [
        { src: '', fontWeight: 'normal', unicodeRange: /[\u0600-\u06DD]/gu },
        { src: '', fontWeight: 'bold', unicodeRange: /[\u0600-\u06CC]/gu },
      ],
    };
    fontStore.register(fontFamily);

    expect(Font.create).toBeCalledTimes(1);
    expect(mockRegister).toBeCalledTimes(fontFamily.fonts.length);

    const defaultValues = { ...fontFamily };
    delete defaultValues.fonts;

    expect(mockRegister).toBeCalledWith({
      ...defaultValues,
      ...fontFamily.fonts[0],
    });
    expect(mockRegister).toBeCalledWith({
      ...defaultValues,
      ...fontFamily.fonts[1],
    });
  });

  test('Should clear fonts', () => {
    const fontStore = new FontStore();
    const font = {
      family: 'Arial',
      src: '',
      fontWeight: 'normal',
      unicodeRange: /[\u0600-\u06FF]/gu,
    };
    fontStore.register(font);

    expect(fontStore.getRegisteredFontFamilies()).toEqual(['Arial']);
    fontStore.clear();
    expect(fontStore.getRegisteredFontFamilies()).toEqual([]);
  });

  test('should resolve the font', () => {
    const fontStore = new FontStore();
    const fontFamily = {
      family: 'Arial',
      fontFamily: 'Arial',
      src: '',
      fontWeight: 'normal',
      unicodeRange: /[\u0600-\u06FF]/gu,
    };
    fontStore.register(fontFamily);

    fontStore.getFont(fontFamily);
    expect(mockResolve).toBeCalledTimes(1);
    expect(mockResolve).toBeCalledWith(fontFamily);
  });

  test('should load the font', async () => {
    const fontStore = new FontStore();

    fontStore.getFont = jest.fn(() => ({
      unicodeRange: /\u0048/gu, // H
      data: null,
      loading: false,
      load: jest.fn(),
    }));

    await fontStore.load(
      {
        fontFamily: 'MyFont1',
      },
      'H',
    );
    expect(fontStore.getFont.mock.results[0].value.load).toBeCalledTimes(1);

    expect(fontStore.getFont).toBeCalledTimes(1);
    expect(fontStore.getFont).toBeCalledWith({
      fontFamily: 'MyFont1',
    });
  });

  test('should not load any font', async () => {
    const fontStore = new FontStore();

    fontStore.getFont = jest.fn(() => ({
      unicodeRange: /\u0049/gu, // I
      data: null,
      loading: false,
      load: jest.fn(),
    }));

    await fontStore.load(
      {
        fontFamily: 'MyFont1, MyFont2, MyFont3',
      },
      'ZXC',
    );
    expect(fontStore.getFont).toBeCalledTimes(3);
    expect(fontStore.getFont).toBeCalledWith({
      fontFamily: 'MyFont1',
    });
    expect(fontStore.getFont).toBeCalledWith({
      fontFamily: 'MyFont2',
    });
    expect(fontStore.getFont).toBeCalledWith({
      fontFamily: 'MyFont3',
    });

    expect(fontStore.getFont.mock.results[0].value.load).toBeCalledTimes(0);
    expect(fontStore.getFont.mock.results[1].value.load).toBeCalledTimes(0);
    expect(fontStore.getFont.mock.results[2].value.load).toBeCalledTimes(0);
  });

  test('should load only one font', async () => {
    const fontStore = new FontStore();
    fontStore.getFont = jest
      .fn()
      .mockImplementationOnce(() => ({
        unicodeRange: /\u0049/gu, // I
        data: null,
        loading: false,
        load: jest.fn(),
      }))
      .mockImplementation(() => ({
        unicodeRange: /\u0048/gu, // H
        data: null,
        loading: false,
        load: jest.fn(),
      }));

    await fontStore.load(
      {
        fontFamily: 'MyFont1',
      },
      'HI',
    );
    expect(fontStore.getFont).toBeCalledTimes(1);
    expect(fontStore.getFont).toBeCalledWith({
      fontFamily: 'MyFont1',
    });

    expect(fontStore.getFont.mock.results[0].value.load).toBeCalledTimes(1);
  });

  test('should load two fonts', async () => {
    const fontStore = new FontStore();
    fontStore.getFont = jest
      .fn()
      .mockImplementationOnce(() => ({
        unicodeRange: /\u0049/gu, // I
        data: null,
        loading: false,
        load: jest.fn(),
      }))
      .mockImplementation(() => ({
        unicodeRange: /\u0048/gu, // H
        data: null,
        loading: false,
        load: jest.fn(),
      }));

    await fontStore.load(
      {
        fontFamily: 'MyFont1, MyFont2',
      },
      'HI',
    );
    expect(fontStore.getFont).toBeCalledTimes(2);
    expect(fontStore.getFont).toBeCalledWith({
      fontFamily: 'MyFont1',
    });
    expect(fontStore.getFont).toBeCalledWith({
      fontFamily: 'MyFont2',
    });

    expect(fontStore.getFont.mock.results[0].value.load).toBeCalledTimes(1);
    expect(fontStore.getFont.mock.results[1].value.load).toBeCalledTimes(1);
  });

  test('should load only two fonts', async () => {
    const fontStore = new FontStore();
    fontStore.getFont = jest
      .fn()
      .mockImplementationOnce(() => ({
        unicodeRange: /\u0049/gu, // I
        data: null,
        loading: false,
        load: jest.fn(),
      }))
      .mockImplementationOnce(() => ({
        unicodeRange: /\u0048/gu, // H
        data: null,
        loading: false,
        load: jest.fn(),
      }))
      .mockImplementationOnce(() => ({
        unicodeRange: /\u0050/gu, // P
        data: null,
        loading: false,
        load: jest.fn(),
      }));

    await fontStore.load(
      {
        fontFamily: 'MyFont1, MyFont2, MyFont3',
      },
      'HIJ',
    );
    expect(fontStore.getFont).toBeCalledTimes(3);
    expect(fontStore.getFont).toBeCalledWith({
      fontFamily: 'MyFont1',
    });
    expect(fontStore.getFont).toBeCalledWith({
      fontFamily: 'MyFont2',
    });
    expect(fontStore.getFont).toBeCalledWith({
      fontFamily: 'MyFont3',
    });

    expect(fontStore.getFont.mock.results[0].value.load).toBeCalledTimes(1);
    expect(fontStore.getFont.mock.results[1].value.load).toBeCalledTimes(1);
    expect(fontStore.getFont.mock.results[2].value.load).toBeCalledTimes(0);
  });
});
