import * as R from 'ramda';

import isWhiteSpace from '../../glyph/isWhiteSpace';

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

const getCharFactor = (direction, options) => {
  const expandCharFactor = R.propOr({}, 'expandCharFactor', options);
  const shrinkCharFactor = R.propOr({}, 'shrinkCharFactor', options);

  return direction === 'GROW'
    ? R.mergeRight(EXPAND_CHAR_FACTOR, expandCharFactor)
    : R.mergeRight(SHRINK_CHAR_FACTOR, shrinkCharFactor);
};

const getWhitespaceFactor = (direction, options) => {
  const expandWhitespaceFactor = R.propOr(
    {},
    'expandWhitespaceFactor',
    options,
  );
  const shrinkWhitespaceFactor = R.propOr(
    {},
    'shrinkWhitespaceFactor',
    options,
  );

  return direction === 'GROW'
    ? R.mergeRight(EXPAND_WHITESPACE_FACTOR, expandWhitespaceFactor)
    : R.mergeRight(SHRINK_WHITESPACE_FACTOR, shrinkWhitespaceFactor);
};

const factor = (direction, options) => glyphs => {
  const charFactor = getCharFactor(direction, options);
  const whitespaceFactor = getWhitespaceFactor(direction, options);

  const factors = [];
  for (let index = 0; index < glyphs.length; index += 1) {
    let f;
    const glyph = glyphs[index];

    if (isWhiteSpace(glyph)) {
      f = R.clone(whitespaceFactor);

      if (index === glyphs.length - 1) {
        f.before = 0;

        if (index > 0) {
          factors[index - 1].after = 0;
        }
      }
    } else if (glyph.isMark && index > 0) {
      f = R.clone(factors[index - 1]);
      f.before = 0;
      factors[index - 1].after = 0;
    } else {
      f = R.clone(charFactor);
    }

    factors.push(f);
  }

  return factors;
};

const getFactors = (gap, line, options) => {
  const direction = gap > 0 ? 'GROW' : 'SHRINK';
  const getFactor = factor(direction, options);

  const concatFactors = R.useWith(R.concat, [
    R.identity,
    R.compose(getFactor, R.prop('glyphs')),
  ]);

  return R.compose(
    R.adjust(-1, R.assoc('after', 0)),
    R.adjust(0, R.assoc('before', 0)),
    R.reduce(concatFactors, []),
    R.prop('runs'),
  )(line);
};

export default getFactors;
