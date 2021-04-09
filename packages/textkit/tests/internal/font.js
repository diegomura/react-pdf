import * as R from 'ramda';

const shortLigature = { id: 64257, codePoints: [102, 105], advanceWidth: 10 };
const longLigature = {
  id: 64259,
  codePoints: [102, 102, 105],
  advanceWidth: 10,
};

const glyphForCodePoint = R.cond([
  [R.equals(64257), R.always(shortLigature)],
  [R.equals(64259), R.always(longLigature)],
  [
    R.T,
    R.applySpec({
      id: R.identity,
      codePoints: R.of,
      advanceWidth: R.always(8),
    }),
  ],
]);

const glyphFromChar = R.compose(glyphForCodePoint, s => s.codePointAt(0));

const layoutGlyphs = R.compose(
  R.flatten,
  R.map(
    R.cond([
      [R.equals('fi'), R.always([shortLigature])],
      [R.equals('ffi'), R.always([longLigature])],
      [R.T, R.map(glyphFromChar)],
    ]),
  ),
  R.split(/(ffi|fi|.)/g),
);

const layoutPositions = R.map(
  R.applySpec({
    xAdvance: R.propOr(0, 'advanceWidth'),
    yAdvance: R.always(0),
    xOffset: R.always(0),
    yOffset: R.always(0),
  }),
);

const layoutStringIndices = glyphs => {
  let counter = 0;
  const stringIndices = [];

  for (let i = 0; i < glyphs.length; i += 1) {
    const glyph = glyphs[i];
    stringIndices.push(counter);
    counter += glyph.codePoints.length;
  }

  return stringIndices;
};

const layout = string => {
  const glyphs = layoutGlyphs(string);
  const positions = layoutPositions(glyphs);
  const stringIndices = layoutStringIndices(glyphs);

  return {
    glyphs,
    positions,
    stringIndices,
  };
};

export default {
  layout,
  glyphForCodePoint,
  unitsPerEm: 2,
  ascent: 2,
  descent: -2,
};
