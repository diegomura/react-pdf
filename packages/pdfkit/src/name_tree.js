/*
PDFNameTree - represents a name tree object
*/

import PDFObject from './object';

class PDFNameTree {
  constructor() {
    this._items = {};
  }

  add(key, val) {
    return (this._items[key] = val);
  }

  get(key) {
    return this._items[key];
  }

  toString() {
    // Needs to be sorted by key
    const sortedKeys = Object.keys(this._items).sort((a, b) =>
      a.localeCompare(b),
    );

    const out = ['<<'];
    if (sortedKeys.length > 1) {
      const first = sortedKeys[0],
        last = sortedKeys[sortedKeys.length - 1];
      out.push(
        `  /Limits ${PDFObject.convert([new String(first), new String(last)])}`,
      );
    }
    out.push('  /Names [');
    for (let key of sortedKeys) {
      out.push(
        `    ${PDFObject.convert(new String(key))} ${PDFObject.convert(
          this._items[key],
        )}`,
      );
    }
    out.push(']');
    out.push('>>');
    return out.join('\n');
  }
}

export default PDFNameTree;
