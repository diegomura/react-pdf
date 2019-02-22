const createHyphenator = require('hyphen');
const pattern = require('hyphen/patterns/en-us');

const SOFT_HYPHEN_HEX = '\u00ad';
const hyphen = createHyphenator(pattern);

export default ({ hyphenationCallback }) => () =>
  class {
    constructor() {
      this.cache = {};
    }

    calculateParts(word) {
      if (word.includes(SOFT_HYPHEN_HEX)) {
        return word.split(SOFT_HYPHEN_HEX);
      }

      return hyphen(word).split(SOFT_HYPHEN_HEX);
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
