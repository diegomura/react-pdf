let hyphenationCallback;

export const registerHyphenationCallback = callback => {
  hyphenationCallback = callback;
};

export const getHyphenationCallback = () => hyphenationCallback;

export default {
  registerHyphenationCallback,
  getHyphenationCallback,
};
