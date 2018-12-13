import fs from 'fs';
import path from 'path';
import warning from 'fbjs/lib/warning';
import Image from '../src/elements/Image';
import { isDangerousLocalPath } from '../src/utils/image';
import root from './utils/dummyRoot';

let dummyRoot;

const jpgImageUrl = 'https://react-pdf.org/static/images/quijote1.jpg';
const pngImageUrl = 'https://react-pdf.org/static/images/quijote2.png';
const localJPGImage = fs.readFileSync(path.join(__dirname, 'assets/test.jpg'));
const localPNGImage = fs.readFileSync(path.join(__dirname, 'assets/test.png'));

jest.mock('fbjs/lib/warning');

describe('image utils', () => {
  test('isDangerousLocalPath should correctly identify a dangerous local path', () => {
    const filename = '/server/app/test/assets/../tests/assets/test.jpg';
    const safePath = '/server/app/test/assets';

    const result = isDangerousLocalPath(filename, { safePath });

    expect(result).toBeTruthy();
  });
});

describe('Image', () => {
  let globalWarn = null;

  beforeEach(() => {
    dummyRoot = root.reset();
    warning.mockReset();
    globalWarn = global.console.warn;
    global.console.warn = jest.fn();
  });

  afterEach(() => {
    global.console.warn = globalWarn;
  });

  test('Should not wrap by default', () => {
    const view = new Image(dummyRoot, {});

    expect(view.wrap).toBeFalsy();
  });

  test('Should render a jpeg image over http', async () => {
    const image = new Image(dummyRoot, { src: jpgImageUrl });

    await image.fetch();
    await image.render();

    expect(image.image.data).toBeTruthy();
    expect(dummyRoot.instance.image.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.image.mock.calls[0][0]).toBe(image.image.data);
  });

  test('Should render a png image over http', async () => {
    const image = new Image(dummyRoot, { src: pngImageUrl });

    await image.fetch();
    await image.render();

    expect(image.image.data).toBeTruthy();
    expect(dummyRoot.instance.image.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.image.mock.calls[0][0]).toBe(image.image.data);
  });

  test('Should render a local image from data', async () => {
    const image = new Image(dummyRoot, {
      src: { data: localJPGImage, format: 'jpg' },
    });

    await image.fetch();
    await image.render();

    expect(image.image.data).toBeTruthy();
    expect(dummyRoot.instance.image.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.image.mock.calls[0][0]).toBe(image.image.data);
  });

  test('Should render a local image from a file in a safe path', async () => {
    const image = new Image(dummyRoot, {
      src: './tests/assets/test.jpg',
      safePath: './tests/assets',
    });

    await image.fetch();
    await image.render();

    expect(image.image.data).toBeTruthy();
    expect(dummyRoot.instance.image.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.image.mock.calls[0][0]).toBe(image.image.data);
  });

  test('Should not render a local image from a file in an unsafe path', async () => {
    const image = new Image(dummyRoot, {
      src: '../tests/assets/test.jpg',
      safePath: './tests/assets',
    });

    await image.fetch();
    await image.render();

    expect(image.image.data).toBeFalsy();
    expect(dummyRoot.instance.image.mock.calls).toHaveLength(0);
    expect(warning.mock.calls).toHaveLength(1);
    expect(global.console.warn).toHaveBeenCalledWith(
      'Cannot fetch dangerous local path: ../tests/assets/test.jpg',
    );
  });

  test('Should render a base64 image', async () => {
    const image = new Image(dummyRoot, {
      src:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
    });

    await image.fetch();
    await image.render();

    expect(image.image.data).toBeTruthy();
    expect(dummyRoot.instance.image.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.image.mock.calls[0][0]).toBe(image.image.data);
  });

  test('Should render a buffer jpg image', async () => {
    const image = new Image(dummyRoot, { src: localJPGImage });

    await image.fetch();
    await image.render();

    expect(image.image.data).toBeTruthy();
    expect(dummyRoot.instance.image.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.image.mock.calls[0][0]).toBe(image.image.data);
  });

  test('Should render a buffer png image', async () => {
    const image = new Image(dummyRoot, { src: localPNGImage });

    await image.fetch();
    await image.render();

    expect(image.image.data).toBeTruthy();
    expect(dummyRoot.instance.image.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.image.mock.calls[0][0]).toBe(image.image.data);
  });

  test('Should render background when render', async () => {
    const drawBackgroundColor = jest.fn();
    const image = new Image(dummyRoot, {
      style: { backgroundColor: 'tomato' },
    });

    image.image = {};
    image.drawBackgroundColor = drawBackgroundColor;

    await image.render();

    expect(drawBackgroundColor.mock.calls).toHaveLength(1);
  });

  test('Should render borders when render', async () => {
    const drawBorders = jest.fn();
    const image = new Image(dummyRoot, {});

    image.image = {};
    image.drawBorders = drawBorders;

    await image.render();

    expect(drawBorders.mock.calls).toHaveLength(1);
  });

  test('Should render debug guides if flag true', async () => {
    const debug = jest.fn();
    const image = new Image(dummyRoot, { debug: true });

    image.image = {};
    image.debug = debug;

    await image.render();

    expect(debug.mock.calls).toHaveLength(1);
  });

  test('Should not render debug guides if flag false', async () => {
    const debug = jest.fn();
    const image = new Image(dummyRoot, {});

    image.image = {};
    image.debug = debug;

    await image.render();

    expect(debug.mock.calls).toHaveLength(0);
  });

  test('Should cache previously loaded remote images by default', async () => {
    const image1 = new Image(dummyRoot, { src: jpgImageUrl });
    const image2 = new Image(dummyRoot, { src: jpgImageUrl });

    await image1.fetch();
    await image2.fetch();

    expect(image1.image).toBe(image2.image);
  });

  test('Should not cache previously loaded remote images if flag false', async () => {
    const image1 = new Image(dummyRoot, { src: jpgImageUrl, cache: false });
    const image2 = new Image(dummyRoot, { src: jpgImageUrl, cache: false });

    await image1.fetch();
    await image2.fetch();

    expect(image1.image).not.toBe(image2.image);
  });

  test('Should cache previously loaded local images by default', async () => {
    const image1 = new Image(dummyRoot, {
      src: { data: localJPGImage, format: 'jpg' },
    });
    const image2 = new Image(dummyRoot, {
      src: { data: localJPGImage, format: 'jpg' },
    });

    await image1.fetch();
    await image2.fetch();

    expect(image1.image).toBe(image2.image);
  });

  test('Should not cache previously loaded local images if flag false', async () => {
    const image1 = new Image(dummyRoot, {
      src: { data: localJPGImage, format: 'jpg' },
      cache: false,
    });
    const image2 = new Image(dummyRoot, {
      src: { data: localJPGImage, format: 'jpg' },
      cache: false,
    });

    await image1.fetch();
    await image2.fetch();

    expect(image1.image).not.toBe(image2.image);
  });
});
