import { describe, expect, test, vi } from 'vitest';

import * as P from '@react-pdf/primitives';
import FontStore from '@react-pdf/font';

import layoutText from '../../src/text/layoutText';
import { SafeTextNode } from '../../src/types';

const TEXT =
  'Life can be much broader once you discover one simple fact: Everything around you that you call life was made up by people that were no smarter than you';

const fontStore = new FontStore();

const createTextNode = (
  value: string,
  style = {},
  props = {},
): SafeTextNode => ({
  style,
  props,
  type: P.Text,
  children: [{ type: P.TextInstance, value }],
});

describe('text layoutText', () => {
  test('Should render empty text', async () => {
    const node = createTextNode('');
    const lines = layoutText(node, 1500, 200, fontStore);

    expect(lines).toHaveLength(0);
  });

  test('Should render aligned left text by default', async () => {
    const node = createTextNode(TEXT);
    const lines = layoutText(node, 1500, 30, fontStore);

    expect(lines[0].box!.x).toBe(0);
  });

  test('Should render aligned left text', async () => {
    const node = createTextNode(TEXT, { textAlign: 'left' });
    const lines = layoutText(node, 1500, 30, fontStore);

    expect(lines[0].box!.x).toBe(0);
  });

  test('Should render aligned right text', async () => {
    const node = createTextNode(TEXT, { textAlign: 'right' });
    const lines = layoutText(node, 1500, 30, fontStore);
    const textWidth = lines[0].runs[0].xAdvance!;

    expect(lines[0].box!.x).toBe(1500 - textWidth);
  });

  test('Should render aligned center text', async () => {
    const node = createTextNode(TEXT, { textAlign: 'center' });
    const lines = layoutText(node, 1500, 30, fontStore);
    const textWidth = lines[0].runs[0].xAdvance!;

    expect(lines[0].box!.x).toBe((1500 - textWidth) / 2);
  });

  test('Should render single line justified text aligned to the left', async () => {
    const node = createTextNode(TEXT, { textAlign: 'justify' });
    const lines = layoutText(node, 1500, 30, fontStore);

    expect(lines[0].box!.x).toBe(0);
  });

  test('Should render multiline justified text correctly aligned', async () => {
    const containerWidth = 800;
    const node = createTextNode(TEXT, { textAlign: 'justify' });
    const lines = layoutText(node, containerWidth, 100, fontStore);

    const { positions } = lines[0].runs[0];
    const spaceWidth = positions![positions!.length - 1].xAdvance;

    // First line justified. Last line aligned to the left
    expect(lines[0].box!.width).toBe(containerWidth + spaceWidth);
    expect(lines[1].box!.width).not.toBe(containerWidth + spaceWidth);
  });

  test('Should render maxLines', async () => {
    const node = createTextNode(TEXT, { maxLines: 2 });
    const lines = layoutText(node, 300, 100, fontStore);

    expect(lines.length).toEqual(2);
  });

  test('should allow hyphenation callback to be overriden', async () => {
    const text = 'reallylongtext';
    const hyphens = ['really­', 'long', 'text'];
    const hyphenationCallback = vi.fn().mockReturnValue(hyphens);

    const node = createTextNode(text, {}, { hyphenationCallback });
    const lines = layoutText(node, 50, 100, fontStore);

    expect(lines[0].string).toEqual('really-');
    expect(lines[1].string).toEqual('long-');
    expect(lines[2].string).toEqual('text');
    expect(hyphenationCallback).toHaveBeenCalledWith(
      'reallylongtext',
      expect.any(Function),
    );
  });

  test('should not hyphenate a word that fits on a line of its own', () => {
    const text = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';

    // 180 is wide enough for every word in the text, so none of them may be
    // split: a word that fits moves down whole instead. Hyphenating one only to
    // fill the line above it is harder to read, and it happens whatever the
    // hyphenation penalty says - the penalty only weighs a break that is
    // allowed in the first place.
    const lines = layoutText(
      createTextNode(text, { textAlign: 'justify' }),
      180,
      200,
      fontStore,
    );

    expect(lines.map((line) => line.string)).toEqual([
      'Lorem ipsum dolor ',
      'sit amet consectetur ',
      'adipiscing elit',
    ]);
  });

  test('should suppress hyphenation when `hyphenationPenalty` is set to `Infinity`', () => {
    const text = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';

    // 60 is narrower than several of the words, so those have nowhere to go
    // and the line breaker is allowed to split them. That is the only case
    // hyphenation applies to, so it is the only case this option can be tested
    // on.
    const defaultLines = layoutText(
      createTextNode(text, { textAlign: 'justify' }),
      60,
      200,
      fontStore,
    );

    expect(defaultLines.some((line) => line.string.trimEnd().endsWith('-'))).toBe(
      true,
    );

    // Setting a hyphenation penalty of `Infinity` makes hyphenation nearly
    // impossible, so lines break only at word boundaries.
    const noHyphenLines = layoutText(
      createTextNode(
        text,
        { textAlign: 'justify' },
        { hyphenationPenalty: Infinity },
      ),
      60,
      200,
      fontStore,
    );

    expect(
      noHyphenLines.some((line) => line.string.trimEnd().endsWith('-')),
    ).toBe(false);

    // And nothing of the text is lost either way.
    expect(
      noHyphenLines
        .map((line) => line.string)
        .join('')
        .replace(/\s+/g, ' ')
        .trim(),
    ).toEqual(text);
  });
});
