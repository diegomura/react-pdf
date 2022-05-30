import UnicodeTrie from 'unicode-trie';

import data from './data.json';
import trieBuffer from './trie.json';

// Trie is serialized as a Buffer in node, but here
// we may be running in a browser so we make an Uint8Array
const trieData = new Uint8Array(Buffer.from(trieBuffer.data, 'base64'));
const trie = new UnicodeTrie(trieData);

const log2 = Math.log2 || (n => Math.log(n) / Math.LN2);
const bits = n => (log2(n) + 1) | 0;

// compute the number of bits stored for each field
const CATEGORY_BITS = bits(data.categories.length - 1);
const COMBINING_BITS = bits(data.combiningClasses.length - 1);
const SCRIPT_BITS = bits(data.scripts.length - 1);
const EAW_BITS = bits(data.eaw.length - 1);
const NUMBER_BITS = 10;

// compute shift and mask values for each field
const CATEGORY_SHIFT = COMBINING_BITS + SCRIPT_BITS + EAW_BITS + NUMBER_BITS;
const COMBINING_SHIFT = SCRIPT_BITS + EAW_BITS + NUMBER_BITS;
const SCRIPT_SHIFT = EAW_BITS + NUMBER_BITS;
const EAW_SHIFT = NUMBER_BITS;
const CATEGORY_MASK = (1 << CATEGORY_BITS) - 1;
const COMBINING_MASK = (1 << COMBINING_BITS) - 1;
const SCRIPT_MASK = (1 << SCRIPT_BITS) - 1;
const EAW_MASK = (1 << EAW_BITS) - 1;
const NUMBER_MASK = (1 << NUMBER_BITS) - 1;

export const getCategory = codePoint => {
  const val = trie.get(codePoint);
  return data.categories[(val >> CATEGORY_SHIFT) & CATEGORY_MASK];
};

export const getCombiningClass = codePoint => {
  const val = trie.get(codePoint);
  return data.combiningClasses[(val >> COMBINING_SHIFT) & COMBINING_MASK];
};

export const getScript = codePoint => {
  const val = trie.get(codePoint);
  return data.scripts[(val >> SCRIPT_SHIFT) & SCRIPT_MASK];
};

export const getEastAsianWidth = codePoint => {
  const val = trie.get(codePoint);
  return data.eaw[(val >> EAW_SHIFT) & EAW_MASK];
};

export const getNumericValue = codePoint => {
  let val = trie.get(codePoint);
  const num = val & NUMBER_MASK;

  if (num === 0) {
    return null;
  }

  if (num <= 50) {
    return num - 1;
  }

  if (num < 0x1e0) {
    const numerator = (num >> 4) - 12;
    const denominator = (num & 0xf) + 1;
    return numerator / denominator;
  }

  if (num < 0x300) {
    val = (num >> 5) - 14;
    let exp = (num & 0x1f) + 2;

    while (exp > 0) {
      val *= 10;
      exp--;
    }
    return val;
  }

  val = (num >> 2) - 0xbf;
  let exp = (num & 3) + 1;

  while (exp > 0) {
    val *= 60;
    exp--;
  }

  return val;
};

export const isAlphabetic = codePoint => {
  const category = getCategory(codePoint);
  return (
    category === 'Lu' ||
    category === 'Ll' ||
    category === 'Lt' ||
    category === 'Lm' ||
    category === 'Lo' ||
    category === 'Nl'
  );
};

export const isDigit = codePoint => getCategory(codePoint) === 'Nd';

export const isPunctuation = codePoint => {
  const category = getCategory(codePoint);
  return (
    category === 'Pc' ||
    category === 'Pd' ||
    category === 'Pe' ||
    category === 'Pf' ||
    category === 'Pi' ||
    category === 'Po' ||
    category === 'Ps'
  );
};

export const isLowerCase = codePoint => {
  return getCategory(codePoint) === 'Ll';
};

export const isUpperCase = codePoint => getCategory(codePoint) === 'Lu';

export const isTitleCase = codePoint => getCategory(codePoint) === 'Lt';

export const isWhiteSpace = codePoint => {
  const category = getCategory(codePoint);
  return category === 'Zs' || category === 'Zl' || category === 'Zp';
};

export const isBaseForm = codePoint => {
  const category = getCategory(codePoint);
  return (
    category === 'Nd' ||
    category === 'No' ||
    category === 'Nl' ||
    category === 'Lu' ||
    category === 'Ll' ||
    category === 'Lt' ||
    category === 'Lm' ||
    category === 'Lo' ||
    category === 'Me' ||
    category === 'Mc'
  );
};

export const isMark = codePoint => {
  const category = getCategory(codePoint);
  return category === 'Mn' || category === 'Me' || category === 'Mc';
};

export default {
  getCategory,
  getCombiningClass,
  getScript,
  getEastAsianWidth,
  getNumericValue,
  isAlphabetic,
  isDigit,
  isPunctuation,
  isLowerCase,
  isUpperCase,
  isTitleCase,
  isWhiteSpace,
  isBaseForm,
  isMark,
};
