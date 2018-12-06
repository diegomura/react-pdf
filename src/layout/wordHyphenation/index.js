import english from 'hyphenation.en-us';
import Hypher from 'hypher';

const SOFT_HYPHEN_HEX = '\u00ad';
const hypher = new Hypher(english);

export default ({ hyphenationCallback }) => () =>
  class {
    constructor() {
      this.cache = {};
    }

    calculateParts(word) {
      return word.includes(SOFT_HYPHEN_HEX)
        ? word.split(SOFT_HYPHEN_HEX)
        : hypher.hyphenate(word);
    }

    hyphenateWord(word) {
      if (this.cache[word]) return this.cache[word];

      const parts = hyphenationCallback
        ? hyphenationCallback(word)
        : this.calculateParts(word);

      this.cache[word] = parts;

      return parts;
    }
  };
