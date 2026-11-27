import { syllables } from '@react-pdf/hyphenate/en-us';
import { isNil } from '@react-pdf/fns';

const SOFT_HYPHEN = '­';
const AFTER_DASH = /(?<=[^-]-)(?=[^-])/;

const wordHyphenation = () => {
  /**
   * @param word - Word
   * @returns Word parts
   */
  return (word: string | null) => {
    if (isNil(word)) return [];

    // Soft hyphens already in the word are the author's call, so they replace
    // the pattern set rather than adding to it.
    if (word.includes(SOFT_HYPHEN)) {
      return word.split(SOFT_HYPHEN).flatMap((part) => part.split(AFTER_DASH));
    }

    if (!AFTER_DASH.test(word)) return syllables(word);

    return word.split(AFTER_DASH).flatMap((part) => syllables(part));
  };
};

export default wordHyphenation;
