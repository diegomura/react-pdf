import { describe, expect, test } from 'vitest';
import { THEMES } from 'beautiful-mermaid';

import { mermaidToSvg, themeColors } from '../src/render';

const graph = 'graph LR\n  A --> B --> C';

describe('themeColors', () => {
  test('expands a named theme into its palette', () => {
    expect(themeColors('nord')).toEqual(THEMES.nord);
  });

  test('is empty for no theme and for an unknown one', () => {
    expect(themeColors()).toEqual({});
    expect(themeColors('not-a-theme')).toEqual({});
  });

  test('hands back a copy, so overrides never leak into THEMES', () => {
    const colors = themeColors('nord');
    colors.fg = '#ff0000';

    expect(THEMES.nord.fg).not.toBe('#ff0000');
  });
});

// beautiful-mermaid takes colors, not a theme name: passing `theme` through
// rendered every diagram in the default palette.
describe('mermaidToSvg', () => {
  test('paints the theme colors it is given', () => {
    const svg = mermaidToSvg(graph, themeColors('nord'));

    expect(svg).toContain(THEMES.nord.bg);
    expect(svg).not.toBe(mermaidToSvg(graph, {}));
  });
});
