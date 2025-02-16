import isWhiteSpace from '../../glyph/isWhiteSpace';
import { AttributedString, Glyph, LayoutOptions } from '../../types';
import { Factor } from './types';

enum Direction {
  GROW = 0,
  SHRINK = 1,
}

const WHITESPACE_PRIORITY = 1;
const LETTER_PRIORITY = 2;

const EXPAND_WHITESPACE_FACTOR = {
  before: 0.5,
  after: 0.5,
  priority: WHITESPACE_PRIORITY,
  unconstrained: false,
};

const EXPAND_CHAR_FACTOR = {
  before: 0.14453125, // 37/256
  after: 0.14453125,
  priority: LETTER_PRIORITY,
  unconstrained: false,
};

const SHRINK_WHITESPACE_FACTOR = {
  before: -0.04296875, // -11/256
  after: -0.04296875,
  priority: WHITESPACE_PRIORITY,
  unconstrained: false,
};

const SHRINK_CHAR_FACTOR = {
  before: -0.04296875,
  after: -0.04296875,
  priority: LETTER_PRIORITY,
  unconstrained: false,
};

const getCharFactor = (direction: Direction, options: LayoutOptions) => {
  const expandCharFactor = options.expandCharFactor || {};
  const shrinkCharFactor = options.shrinkCharFactor || {};

  return direction === Direction.GROW
    ? Object.assign({}, EXPAND_CHAR_FACTOR, expandCharFactor)
    : Object.assign({}, SHRINK_CHAR_FACTOR, shrinkCharFactor);
};

const getWhitespaceFactor = (direction: Direction, options: LayoutOptions) => {
  const expandWhitespaceFactor = options.expandWhitespaceFactor || {};
  const shrinkWhitespaceFactor = options.shrinkWhitespaceFactor || {};

  return direction === Direction.GROW
    ? Object.assign({}, EXPAND_WHITESPACE_FACTOR, expandWhitespaceFactor)
    : Object.assign({}, SHRINK_WHITESPACE_FACTOR, shrinkWhitespaceFactor);
};

const factor =
  (direction: Direction, options: LayoutOptions) => (glyphs: Glyph[]) => {
    const charFactor = getCharFactor(direction, options);
    const whitespaceFactor = getWhitespaceFactor(direction, options);

    const factors: Factor[] = [];
    for (let index = 0; index < glyphs.length; index += 1) {
      let f: Factor;
      const glyph = glyphs[index];

      if (isWhiteSpace(glyph)) {
        f = Object.assign({}, whitespaceFactor);

        if (index === glyphs.length - 1) {
          f.before = 0;

          if (index > 0) {
            factors[index - 1].after = 0;
          }
        }
      } else if (glyph.isMark && index > 0) {
        f = Object.assign({}, factors[index - 1]);
        f.before = 0;
        factors[index - 1].after = 0;
      } else {
        f = Object.assign({}, charFactor);
      }

      factors.push(f);
    }

    return factors;
  };

const getFactors = (
  gap: number,
  line: AttributedString,
  options: LayoutOptions,
) => {
  const direction = gap > 0 ? Direction.GROW : Direction.SHRINK;
  const getFactor = factor(direction, options);

  const factors = line.runs.reduce((acc: Factor[], run) => {
    return acc.concat(getFactor(run.glyphs));
  }, []);

  factors[0].before = 0;
  factors[factors.length - 1].after = 0;

  return factors;
};

export default getFactors;
