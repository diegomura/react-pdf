import english from 'hyphenation.de';
import Hypher from 'hypher';

const SOFT_HYPHEN_HEX = '\u00ad';

export default () =>
  class {
    constructor() {
      this.cache = {};
      this.hypher = new Hypher(english);
    }

    hyphenateWord(word) {
      if (this.cache[word]) return this.cache[word];

      const parts = word.includes(SOFT_HYPHEN_HEX)
        ? word.split(SOFT_HYPHEN_HEX)
        : this.hypher.hyphenate(word);

      this.cache[word] = parts;

      return parts;
    }
  };
