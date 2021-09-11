/* eslint-disable no-useless-escape */

import { createElement } from './element';

export default {
  parseFont() {
    const regex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\"\sa-z0-9]+?)\s*$/i;
    const fontPart = regex.exec(this.font);
    const data = {
      style: fontPart[1] || 'normal',
      size: fontPart[4] || '10px',
      family: fontPart[6] || 'sans-serif',
      weight: fontPart[3] || 'normal',
      href: null,
    };

    return data;
  },

  text(glyphs, positions, x, y) {
    const font = this.parseFont();
    const parent = this.closestGroupOrSvg();
    const fontSize = parseInt(font.size.slice(0, -2), 10);
    const scale = 1000 / fontSize;

    const glyphPositions = positions.reduce(
      (acc, pos) => {
        const lastValue = acc[acc.length - 1];
        const value = lastValue + pos.xAdvance / scale;
        return [...acc, value];
      },
      [0],
    );

    const textElement = createElement('text');
    const tspanElement = createElement('tspan', {
      y,
      x: glyphPositions.join(' '),
      'font-family': font.family,
      'font-size': font.size,
      'font-style': font.style,
      'font-weight': font.weight,
    });

    const codePoints = glyphs.map(glyph => parseInt(glyph, 16));

    textElement.appendChild(tspanElement);
    tspanElement.appendChild(String.fromCodePoint(...codePoints));
    this.currentElement = tspanElement;

    parent.appendChild(textElement);
  },
};
