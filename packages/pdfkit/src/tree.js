/*
PDFTree - abstract base class for name and number tree objects
*/

import PDFObject from './object';

class PDFTree {
  constructor(options = {}) {
    this._items = {};
    // disable /Limits output for this tree
    this.limits = typeof options.limits === 'boolean' ? options.limits : true;
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
      this._compareKeys(a, b)
    );

    const out = ['<<'];
    if (this.limits && sortedKeys.length > 1) {
      const first = sortedKeys[0];
      const last = sortedKeys[sortedKeys.length - 1];

      out.push(
        `  /Limits ${PDFObject.convert([
          this._dataForKey(first),
          this._dataForKey(last)
        ])}`
      );
    }

    out.push(`  /${this._keysName()} [`);

    for (let key of sortedKeys) {
      out.push(
        `    ${PDFObject.convert(this._dataForKey(key))} ${PDFObject.convert(
          this._items[key]
        )}`
      );
    }

    out.push(']');
    out.push('>>');
    return out.join('\n');
  }

  _compareKeys() {
    throw new Error('Must be implemented by subclasses');
  }

  _keysName() {
    throw new Error('Must be implemented by subclasses');
  }

  _dataForKey() {
    throw new Error('Must be implemented by subclasses');
  }
}

export default PDFTree;
