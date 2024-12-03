import {
  isUnassignedCodePoint,
  isCommonlyMappedToNothing,
  isNonASCIISpaceCharacter,
  isProhibitedCharacter,
  isBidirectionalRAL,
  isBidirectionalL
} from './lib/code-points';

// 2.1.  Mapping

/**
 * non-ASCII space characters [StringPrep, C.1.2] that can be
 * mapped to SPACE (U+0020)
 */
const mapping2space = isNonASCIISpaceCharacter;

/**
 * the "commonly mapped to nothing" characters [StringPrep, B.1]
 * that can be mapped to nothing.
 */
const mapping2nothing = isCommonlyMappedToNothing;

// utils
const getCodePoint = character => character.codePointAt(0);
const first = x => x[0];
const last = x => x[x.length - 1];

/**
 * Convert provided string into an array of Unicode Code Points.
 * Based on https://stackoverflow.com/a/21409165/1556249
 * and https://www.npmjs.com/package/code-point-at.
 * @param {string} input
 * @returns {number[]}
 */
function toCodePoints(input) {
  const codepoints = [];
  const size = input.length;

  for (let i = 0; i < size; i += 1) {
    const before = input.charCodeAt(i);

    if (before >= 0xd800 && before <= 0xdbff && size > i + 1) {
      const next = input.charCodeAt(i + 1);

      if (next >= 0xdc00 && next <= 0xdfff) {
        codepoints.push((before - 0xd800) * 0x400 + next - 0xdc00 + 0x10000);
        i += 1;
        continue;
      }
    }

    codepoints.push(before);
  }

  return codepoints;
}

/**
 * SASLprep.
 * @param {string} input
 * @param {Object} opts
 * @param {boolean} opts.allowUnassigned
 * @returns {string}
 */
function saslprep(input, opts = {}) {
  if (typeof input !== 'string') {
    throw new TypeError('Expected string.');
  }

  if (input.length === 0) {
    return '';
  }

  // 1. Map
  const mapped_input = toCodePoints(input)
    // 1.1 mapping to space
    .map(character => (mapping2space(character) ? 0x20 : character))
    // 1.2 mapping to nothing
    .filter(character => !mapping2nothing(character));

  // 2. Normalize
  const normalized_input = String.fromCodePoint
    .apply(null, mapped_input)
    .normalize('NFKC');

  const normalized_map = toCodePoints(normalized_input);

  // 3. Prohibit
  const hasProhibited = normalized_map.some(isProhibitedCharacter);

  if (hasProhibited) {
    throw new Error(
      'Prohibited character, see https://tools.ietf.org/html/rfc4013#section-2.3'
    );
  }

  // Unassigned Code Points
  if (opts.allowUnassigned !== true) {
    const hasUnassigned = normalized_map.some(isUnassignedCodePoint);

    if (hasUnassigned) {
      throw new Error(
        'Unassigned code point, see https://tools.ietf.org/html/rfc4013#section-2.5'
      );
    }
  }

  // 4. check bidi

  const hasBidiRAL = normalized_map.some(isBidirectionalRAL);

  const hasBidiL = normalized_map.some(isBidirectionalL);

  // 4.1 If a string contains any RandALCat character, the string MUST NOT
  // contain any LCat character.
  if (hasBidiRAL && hasBidiL) {
    throw new Error(
      'String must not contain RandALCat and LCat at the same time,' +
        ' see https://tools.ietf.org/html/rfc3454#section-6'
    );
  }

  /**
   * 4.2 If a string contains any RandALCat character, a RandALCat
   * character MUST be the first character of the string, and a
   * RandALCat character MUST be the last character of the string.
   */

  const isFirstBidiRAL = isBidirectionalRAL(
    getCodePoint(first(normalized_input))
  );
  const isLastBidiRAL = isBidirectionalRAL(
    getCodePoint(last(normalized_input))
  );

  if (hasBidiRAL && !(isFirstBidiRAL && isLastBidiRAL)) {
    throw new Error(
      'Bidirectional RandALCat character must be the first and the last' +
        ' character of the string, see https://tools.ietf.org/html/rfc3454#section-6'
    );
  }

  return normalized_input;
}

export default saslprep;
