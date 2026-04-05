import { capitalize, upperFirst } from '@react-pdf/fns';
import { SafeStyle } from '@react-pdf/stylesheet';

/**
 * Pre-normalize Thai text to handle characters that font engines decompose.
 * 
 * Certain Thai characters like ำ (U+0E33) are decomposed by font engines into
 * multiple glyphs (ํ U+0E4D + า U+0E32), causing a mismatch between string
 * indices and glyph indices. This leads to text truncation issues.
 * 
 * By pre-normalizing these characters, we ensure the string length matches
 * the glyph count, preventing truncation.
 * 
 * @param {string} text
 * @returns {string} pre-normalized text
 */
const normalizeThaiText = (text: string): string => {
  // Replace Thai character ำ (U+0E33) with its decomposed form ํ + า
  // This prevents font engine normalization from causing index mismatches
  return text.replace(/\u0E33/g, '\u0E4D\u0E32');
};

/**
 * Apply transformation to text string
 *
 * @param {string} text
 * @param {string} transformation type
 * @returns {string} transformed text
 */
const transformText = (
  text: string,
  transformation: SafeStyle['textTransform'],
) => {
  // Pre-normalize Thai text to prevent font engine decomposition issues
  // This ensures string indices match glyph indices after font layout
  const normalizedText = normalizeThaiText(text);

  switch (transformation) {
    case 'uppercase':
      return normalizedText.toUpperCase();
    case 'lowercase':
      return normalizedText.toLowerCase();
    case 'capitalize':
      return capitalize(normalizedText);
    case 'upperfirst':
      return upperFirst(normalizedText);
    default:
      return normalizedText;
  }
};

export default transformText;
