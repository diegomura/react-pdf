/* eslint-disable no-useless-escape */

import { createElement } from './element';

export default {
  text(text, x, y) {
    const parent = this.closestGroupOrSvg();
    const textElement = createElement('text');

    textElement.appendChild(text);
    textElement.setAttribute('x', x);
    textElement.setAttribute('y', y);
    textElement.setAttribute('alignment-baseline', 'hanging');
    textElement.setAttribute('font-size', this.fontSizeStyle);
    textElement.setAttribute('font-family', this.fontFamilyStyle);

    parent.appendChild(textElement);
  },

  // text(glyphs, positions, x, y) {
  //   const font = this.parseFont();
  //   const parent = this.closestGroupOrSvg();
  //   const fontSize = parseInt(font.size.slice(0, -2), 10);
  //   const scale = 1000 / fontSize;

  //   const glyphPositions = positions.reduce(
  //     (acc, pos) => {
  //       const lastValue = acc[acc.length - 1];
  //       const value = lastValue + pos.xAdvance / scale;
  //       return [...acc, value];
  //     },
  //     [0],
  //   );

  //   const textElement = createElement('text');
  //   const tspanElement = createElement('tspan', {
  //     y,
  //     x: glyphPositions.join(' '),
  //     'font-family': font.family,
  //     'font-size': font.size,
  //     'font-style': font.style,
  //     'font-weight': font.weight,
  //   });

  //   const codePoints = glyphs.map(glyph => parseInt(glyph, 16));

  //   textElement.appendChild(tspanElement);
  //   tspanElement.appendChild(String.fromCodePoint(...codePoints));
  //   this.currentElement = tspanElement;

  //   parent.appendChild(textElement);
  // },
};
