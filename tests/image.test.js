import fs from 'fs';
import path from 'path';
import Image from '../src/elements/Image';
import root from './utils/dummyRoot';

let dummyRoot;

const jpgImageUrl = 'https://react-pdf.org/static/images/quijote1.jpg';
const pngImageUrl = 'https://react-pdf.org/static/images/quijote2.png';
const localImage = fs.readFileSync(path.join(__dirname, 'assets/test.jpg'));

describe('Image', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
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

  test('Should render a local image', async () => {
    const image = new Image(dummyRoot, {
      src: { data: localImage, format: 'jpg' },
    });

    await image.fetch();
    await image.render();

    expect(image.image.data).toBeTruthy();
    expect(dummyRoot.instance.image.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.image.mock.calls[0][0]).toBe(image.image.data);
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

  test('Should cache previously loaded images by default', async () => {
    const image1 = new Image(dummyRoot, { src: jpgImageUrl });
    const image2 = new Image(dummyRoot, { src: jpgImageUrl });

    await image1.fetch();
    await image2.fetch();

    expect(image1.image).toBe(image2.image);
  });

  test('Should not cache previously loaded images if flag false', async () => {
    const image1 = new Image(dummyRoot, { src: jpgImageUrl, cache: false });
    const image2 = new Image(dummyRoot, { src: jpgImageUrl, cache: false });

    await image1.fetch();
    await image2.fetch();

    expect(image1.image).not.toBe(image2.image);
  });
});
