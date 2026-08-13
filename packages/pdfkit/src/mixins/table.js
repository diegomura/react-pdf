import PDFTable from '../table/index';

export default {
  initTables() {
    this._tableIndex = 0;
  },
  /**
   * @param {Table} [opts]
   * @returns {PDFTable} returns the table object unless `data` is set,
   * then it returns the underlying document
   */
  table(opts) {
    return new PDFTable(this, opts);
  },
};
