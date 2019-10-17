import advanceWidth from '@react-pdf/textkit/run/advanceWidth';

import root from './utils/dummyRoot';
import Page from '../src/elements/Page';
import Text from '../src/elements/Text';
import TextInstance from '../src/elements/TextInstance';
import * as urlUtils from '../src/utils/url';

jest.mock('@react-pdf/textkit/renderers/pdf', () => ({ render: () => {} }));

let dummyRoot;

describe('Text', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
  });

  test('Should render empty text', async () => {
    const page = new Page(dummyRoot, {});
    const text = new Text(dummyRoot, {});
    const textInstance = new TextInstance(dummyRoot, '');

    page.appendChild(text);
    text.appendChild(textInstance);

    await text.render();

    expect(text.lines).toHaveLength(0);
  });

  test('Should render aligned left text by default', async () => {
    const page = new Page(dummyRoot, {});
    const text = new Text(dummyRoot, {});
    const textInstance = new TextInstance(dummyRoot, 'sometext');

    page.appendChild(text);
    text.appendChild(textInstance);

    text.applyProps();
    text.layoutText(200, 30);

    await text.render();

    expect(text.lines[0].box.x).toBe(0);
  });

  test('Should render aligned left text', async () => {
    const containerWidth = 200;
    const page = new Page(dummyRoot, {});
    const text = new Text(dummyRoot, { style: { textAlign: 'left' } });
    const textInstance = new TextInstance(dummyRoot, 'sometext');

    page.appendChild(text);
    text.appendChild(textInstance);

    text.applyProps();
    text.layoutText(containerWidth, 30);

    await text.render();

    expect(text.lines[0].box.x).toBe(0);
  });

  test('Should render aligned right text', async () => {
    const containerWidth = 200;
    const page = new Page(dummyRoot, {});
    const text = new Text(dummyRoot, { style: { textAlign: 'right' } });
    const textInstance = new TextInstance(dummyRoot, 'sometext');

    page.appendChild(text);
    text.appendChild(textInstance);

    text.applyProps();
    text.layoutText(containerWidth, 30);

    await text.render();

    const textWidth = advanceWidth(text.lines[0].runs[0]);

    expect(text.lines[0].box.x).toBe(containerWidth - textWidth);
  });

  test('Should render aligned center text', async () => {
    const containerWidth = 200;
    const page = new Page(dummyRoot, {});
    const text = new Text(dummyRoot, { style: { textAlign: 'center' } });
    const textInstance = new TextInstance(dummyRoot, 'sometext');

    page.appendChild(text);
    text.appendChild(textInstance);

    text.applyProps();
    text.layoutText(containerWidth, 30);

    await text.render();

    const textWidth = advanceWidth(text.lines[0].runs[0]);

    expect(text.lines[0].box.x).toBe((containerWidth - textWidth) / 2);
  });

  test('Should render single line justified text aligned to the left', async () => {
    const containerWidth = 200;
    const page = new Page(dummyRoot, {});
    const text = new Text(dummyRoot, { style: { textAlign: 'justify' } });
    const textInstance = new TextInstance(dummyRoot, 'sometext');

    page.appendChild(text);
    text.appendChild(textInstance);

    text.applyProps();
    text.layoutText(containerWidth, 30);

    await text.render();

    expect(text.lines[0].box.x).toBe(0);
  });

  test('Should render align justified text', async () => {
    const containerWidth = 200;
    const page = new Page(dummyRoot, {});
    const text = new Text(dummyRoot, { style: { textAlign: 'justify' } });
    const textInstance = new TextInstance(
      dummyRoot,
      'some very long text goes here',
    );

    page.appendChild(text);
    text.appendChild(textInstance);

    text.applyProps();
    text.layoutText(containerWidth, 60);

    await text.render();

    const lines = text.lines;
    const positions = lines[0].runs[0].positions;
    const spaceWidth = positions[positions.length - 1].xAdvance;

    // First line justified. Last line aligned to the left
    expect(lines[0].box.width).toBe(containerWidth + spaceWidth);
    expect(lines[1].box.width).not.toBe(containerWidth + spaceWidth);
  });

  test('Should render maxLines', async () => {
    const page = new Page(dummyRoot, {});
    const text = new Text(dummyRoot, { style: { maxLines: 2 } });
    const textInstance = new TextInstance(dummyRoot, 'really long text');

    page.appendChild(text);
    text.appendChild(textInstance);

    text.applyProps();
    text.layoutText(20, 100); // Force to wrap in many lines

    expect(text.lines.length).toEqual(2);
  });

  test('Should render the same rect x value for clones', async () => {
    const text = new Text(dummyRoot, {});
    const textInstance = new TextInstance(dummyRoot, 'sometext');

    text.appendChild(textInstance);
    text.getAbsoluteLayout = () => ({ top: 20, left: 20 });
    text.layoutText(100, 100);

    const clone = text.clone();

    await text.render();

    const textRectX = text.lines[0].box.x;

    clone.layoutText(100, 100);
    clone.getAbsoluteLayout = () => ({ top: 20, left: 20 });

    await clone.render();

    expect(clone.lines[0].box.x).toEqual(textRectX);
  });

  test('should call setLink function on render', async () => {
    const src = '#myDist';
    const text = new Text(dummyRoot, { src });
    const setLinkSpy = jest.spyOn(urlUtils, 'setLink');
    await text.render();
    expect(setLinkSpy).toHaveBeenCalledWith(text);
  });
});
