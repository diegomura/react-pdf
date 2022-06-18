/*
PDFNumberTree - represents a number tree object
*/

import PDFTree from './tree';

class PDFNumberTree extends PDFTree {
  _compareKeys(a, b) {
    return parseInt(a) - parseInt(b);
  }

  _keysName() {
    return 'Nums';
  }

  _dataForKey(k) {
    return parseInt(k);
  }
}

export default PDFNumberTree;
