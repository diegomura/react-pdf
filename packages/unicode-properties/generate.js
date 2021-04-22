/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const codePoints = require('codepoints');
const UnicodeTrieBuilder = require('unicode-trie/builder');

const log2 = Math.log2 || (n => Math.log(n) / Math.LN2);

const bits = n => (log2(n) + 1) | 0;

const categories = {};
const combiningClasses = {};
const scripts = {};
const eaws = {};
let categoryCount = 0;
let combiningClassCount = 0;
let scriptCount = 0;
let eawCount = 0;

for (var codePoint of Array.from(codePoints)) {
  if (codePoint != null) {
    if (categories[codePoint.category] == null) {
      categories[codePoint.category] = categoryCount++;
    }
    if (combiningClasses[codePoint.combiningClassName] == null) {
      combiningClasses[codePoint.combiningClassName] = combiningClassCount++;
    }
    if (scripts[codePoint.script] == null) {
      scripts[codePoint.script] = scriptCount++;
    }
    if (eaws[codePoint.eastAsianWidth] == null) {
      eaws[codePoint.eastAsianWidth] = eawCount++;
    }
  }
}

const numberBits = 10;
const combiningClassBits = bits(combiningClassCount - 1);
const scriptBits = bits(scriptCount - 1);
const eawBits = bits(eawCount - 1);

const categoryShift = combiningClassBits + scriptBits + eawBits + numberBits;
const combiningShift = scriptBits + eawBits + numberBits;
const scriptShift = eawBits + numberBits;
const eawShift = numberBits;

const numericValue = function(numeric) {
  if (numeric) {
    let exp;
    let m;
    let mant;

    if ((m = numeric.match(/^(\-?\d+)\/(\d+)$/))) {
      // fraction
      const num = parseInt(m[1]);
      const den = parseInt(m[2]);
      return ((num + 12) << 4) + (den - 1);
    } else if (/^\d0+$/.test(numeric)) {
      // base 10
      mant = parseInt(numeric[0]);
      exp = numeric.length - 1;
      return ((mant + 14) << 5) + (exp - 2);
    } else {
      const val = parseInt(numeric);
      if (val <= 50) {
        return 1 + val;
      } else {
        // base 60
        mant = val;
        exp = 0;
        while (mant % 60 === 0) {
          mant /= 60;
          ++exp;
        }

        return ((mant + 0xbf) << 2) + (exp - 1);
      }
    }
  } else {
    return 0;
  }
};

let eaw;

const trie = new UnicodeTrieBuilder();
for (codePoint of Array.from(codePoints)) {
  if (codePoint != null) {
    const category = categories[codePoint.category];
    const combiningClass = combiningClasses[codePoint.combiningClassName] || 0;
    const script = scripts[codePoint.script] || 0;
    eaw = eaws[codePoint.eastAsianWidth] || 0;

    const val =
      (category << categoryShift) |
      (combiningClass << combiningShift) |
      (script << scriptShift) |
      (eaw << eawShift) |
      numericValue(codePoint.numeric);

    trie.set(codePoint.code, val);
  }
}

// Trie is serialized suboptimally as JSON so it can be loaded via require,
// allowing unicode-properties to work in the browser
fs.writeFileSync('./trie.json', JSON.stringify(trie.toBuffer()));
fs.writeFileSync(
  './data.json',
  JSON.stringify({
    categories: Object.keys(categories),
    combiningClasses: Object.keys(combiningClasses),
    scripts: Object.keys(scripts),
    eaw: Object.keys(eaws),
  }),
);
