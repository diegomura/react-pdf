import { AttributedString, Run } from '../types';

/**
 * Scripts requiring NFD decomposition for correct glyph-to-string mapping.
 * In these complex scripts, fontkit's glyph output after OpenType shaping
 * can produce codepoints that don't match the NFC input, making index
 * mapping unreliable. NFD produces codepoints that align with fontkit's output.
 *
 * Latin, Greek, Cyrillic and other simple scripts are excluded because
 * fontkit handles their NFC forms correctly.
 */
const SCRIPTS_NEEDING_DECOMPOSITION = [
  'Bengali',
  'Devanagari',
  'Gujarati',
  'Gurmukhi',
  'Kannada',
  'Khmer',
  'Malayalam',
  'Myanmar',
  'Oriya',
  'Sinhala',
  'Tamil',
  'Telugu',
  'Tibetan',
];

const scriptPattern = SCRIPTS_NEEDING_DECOMPOSITION.map(
  (s) => `\\p{Script=${s}}`,
).join('|');

const HAS_COMPLEX_SCRIPT = new RegExp(scriptPattern, 'u');
const COMPLEX_SCRIPT_CHARS = new RegExp(`(?:${scriptPattern})+`, 'gu');

/**
 * Selectively applies NFD decomposition only to characters from complex
 * scripts that need it for correct glyph mapping. Other scripts remain
 * in their original (NFC) form since fontkit handles them correctly.
 */
const selectiveNFD = (str: string): string => {
  if (!HAS_COMPLEX_SCRIPT.test(str)) return str;
  return str.replace(COMPLEX_SCRIPT_CHARS, (match) => match.normalize('NFD'));
};

const isCustomFont = (run: Run): boolean => {
  const font = run.attributes?.font?.[0];
  return !!font && font.type !== 'STANDARD';
};

/**
 * Selectively decomposes Unicode characters in an attributed string.
 * Only characters from complex scripts (Indic, Southeast Asian) are
 * NFD-decomposed for custom fonts. Latin and other simple scripts
 * remain in NFC form.
 *
 * @returns Layout step that transforms an attributed string
 */
const decomposeUnicode = () => {
  return (attributedString: AttributedString): AttributedString => {
    let string = '';
    let offset = 0;

    const runs: Run[] = [];

    for (let i = 0; i < attributedString.runs.length; i += 1) {
      const run = attributedString.runs[i];

      const rawString = attributedString.string.slice(run.start, run.end);

      const runString = isCustomFont(run) ? selectiveNFD(rawString) : rawString;

      const fragmentLength = runString.length;

      runs.push({
        ...run,
        start: offset,
        end: offset + fragmentLength,
      });

      offset += fragmentLength;

      string += runString;
    }

    return { ...attributedString, string, runs };
  };
};

export default decomposeUnicode;
