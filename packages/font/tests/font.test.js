const path = require('path');
const fontkit = require('@react-pdf/fontkit');
const { default: FontStore } = require('../src/index');

global.BROWSER = false;

describe('FontStore', () => {
  test('load method will wait for font loaded when parallel execution', async () => {
    const openSpy = jest.spyOn(fontkit.default, 'open');
    const fontStore = new FontStore();
    const fontFamily = '思源';
    fontStore.register({
      family: fontFamily, // assume this is a chinese font
      fonts: [
        {
          src: path.join(__dirname, '../../examples/public/Roboto-Bold.ttf'),
        },
      ],
    });

    const getFontSource = () =>
      fontStore.getRegisteredFonts()[fontFamily].sources[0];

    const getFontData = () => getFontSource().data;

    const makeSureFontLoadedAfterLoad = async () => {
      expect(getFontData()).toBeNull();
      await fontStore.load({
        fontFamily,
      });
      expect(getFontData()).not.toBeNull();
    };
    return Promise.all([
      makeSureFontLoadedAfterLoad(),
      makeSureFontLoadedAfterLoad(),
    ]).then(() => {
      // call load method twice but just call file open method once
      expect(openSpy.mock.calls).toHaveLength(1);
    });
  });
});
