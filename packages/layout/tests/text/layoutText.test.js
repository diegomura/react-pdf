import * as P from '@nutshelllabs-pdf/primitives';

import layoutText from '../../src/text/layoutText';

const TEXT =
  'Life can be much broader once you discover one simple fact: Everything around you that you call life was made up by people that were no smarter than you';

const createTextNode = (value, style = {}, props = {}) => ({
  style,
  props,
  type: P.Text,
  children: [{ type: P.TextInstance, value }],
});

describe('text layoutText', () => {
  test('Should render empty text', async () => {
    const node = createTextNode('');
    const lines = layoutText(node, 1500, 200, null);

    expect(lines).toHaveLength(0);
  });

  test('Should render aligned left text by default', async () => {
    const node = createTextNode(TEXT);
    const lines = layoutText(node, 1500, 30, null);

    expect(lines[0].box.x).toBe(0);
  });

  test('Should render aligned left text', async () => {
    const node = createTextNode(TEXT, { textAlign: 'left' });
    const lines = layoutText(node, 1500, 30, null);

    expect(lines[0].box.x).toBe(0);
  });

  test('Should render aligned right text', async () => {
    const node = createTextNode(TEXT, { textAlign: 'right' });
    const lines = layoutText(node, 1500, 30, null);
    const textWidth = lines[0].runs[0].xAdvance;

    expect(lines[0].box.x).toBe(1500 - textWidth);
  });

  test('Should render aligned center text', async () => {
    const node = createTextNode(TEXT, { textAlign: 'center' });
    const lines = layoutText(node, 1500, 30, null);
    const textWidth = lines[0].runs[0].xAdvance;

    expect(lines[0].box.x).toBe((1500 - textWidth) / 2);
  });

  test('Should render single line justified text aligned to the left', async () => {
    const node = createTextNode(TEXT, { textAlign: 'justify' });
    const lines = layoutText(node, 1500, 30, null);

    expect(lines[0].box.x).toBe(0);
  });

  test('Should render multiline justified text correctly aligned', async () => {
    const containerWidth = 800;
    const node = createTextNode(TEXT, { textAlign: 'justify' });
    const lines = layoutText(node, containerWidth, 100, null);

    const positions = lines[0].runs[0].positions;
    const spaceWidth = positions[positions.length - 1].xAdvance;

    // First line justified. Last line aligned to the left
    expect(lines[0].box.width).toBe(containerWidth + spaceWidth);
    expect(lines[1].box.width).not.toBe(containerWidth + spaceWidth);
  });

  test('Should render maxLines', async () => {
    const node = createTextNode(TEXT, { maxLines: 2 });
    const lines = layoutText(node, 300, 100, null);

    expect(lines.length).toEqual(2);
  });

  test('should allow hyphenation callback to be overriden', async () => {
    const text = 'reallylongtext';
    const hyphens = ['really', 'long', 'text'];
    const hyphenationCallback = jest.fn().mockReturnValue(hyphens);

    const node = createTextNode(text, {}, { hyphenationCallback });
    const lines = layoutText(node, 50, 100, null);

    expect(lines[0].string).toEqual('really');
    expect(lines[1].string).toEqual('long');
    expect(lines[2].string).toEqual('text');
    expect(hyphenationCallback).toHaveBeenCalledWith('reallylongtext');
  });
});
