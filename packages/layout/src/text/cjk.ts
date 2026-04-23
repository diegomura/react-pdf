import { CJK_FONT_NAMES } from '@react-pdf/font';

/**
 * Check if a Unicode codepoint is a CJK character (Chinese, Japanese, or Korean).
 */
const isCJKCodePoint = (cp: number): boolean =>
  (cp >= 0x2e80 && cp <= 0x2eff) || // CJK Radicals Supplement
  (cp >= 0x3000 && cp <= 0x303f) || // CJK Symbols and Punctuation
  (cp >= 0x3040 && cp <= 0x309f) || // Hiragana
  (cp >= 0x30a0 && cp <= 0x30ff) || // Katakana
  (cp >= 0x3100 && cp <= 0x312f) || // Bopomofo
  (cp >= 0x3130 && cp <= 0x318f) || // Hangul Compatibility Jamo
  (cp >= 0x31f0 && cp <= 0x31ff) || // Katakana Phonetic Extensions
  (cp >= 0x3400 && cp <= 0x4dbf) || // CJK Extension A
  (cp >= 0x4e00 && cp <= 0x9fff) || // CJK Unified Ideographs
  (cp >= 0xac00 && cp <= 0xd7af) || // Hangul Syllables
  (cp >= 0xf900 && cp <= 0xfaff) || // CJK Compatibility Ideographs
  (cp >= 0x1100 && cp <= 0x11ff) || // Hangul Jamo
  (cp >= 0x20000 && cp <= 0x2a6df) || // CJK Extension B
  (cp >= 0xff00 && cp <= 0xffef); // Halfwidth and Fullwidth Forms

/**
 * Check if a string contains any CJK characters.
 */
export const containsCJK = (text: string): boolean => {
  for (let i = 0; i < text.length; i += 1) {
    const cp = text.codePointAt(i);
    if (cp === undefined) continue;
    if (isCJKCodePoint(cp)) return true;
    if (cp > 0xffff) i += 1; // Skip surrogate pair
  }
  return false;
};

/**
 * Get the list of CJK font family names to use as fallbacks.
 */
export const getCJKFallbackFontFamilies = (): string[] => CJK_FONT_NAMES;
