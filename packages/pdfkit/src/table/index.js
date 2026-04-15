import { normalizeRow, normalizeTable } from './normalize';
import { measure, ensure } from './size';
import { renderRow } from './render';
import { accommodateCleanup, accommodateTable } from './accessibility';

class PDFTable {
  /**
   * @param {PDFDocument} document
   * @param {Table} [opts]
   */
  constructor(document, opts = {}) {
    this.document = document;
    this.opts = Object.freeze(opts);

    normalizeTable.call(this);
    accommodateTable.call(this);

    this._currRowIndex = 0;
    this._ended = false;

    // Render cells if present
    if (opts.data) {
      for (const row of opts.data) this.row(row);
      return this.end();
    }
  }

  /**
   * Render a new row in the table
   *
   * @param {Iterable<TableCell>} row - The cells to render
   * @param {boolean} lastRow - Whether this row is the last row
   * @returns {this} returns the table, unless lastRow is `true` then returns the `PDFDocument`
   */
  row(row, lastRow = false) {
    if (this._ended) {
      throw new Error(`Table was marked as ended on row ${this._currRowIndex}`);
    }

    // Convert the iterable into an array
    row = Array.from(row);
    // Transform row
    row = normalizeRow.call(this, row, this._currRowIndex);
    if (this._currRowIndex === 0) ensure.call(this, row);
    const { newPage, toRender } = measure.call(this, row, this._currRowIndex);
    if (newPage) this.document.continueOnNewPage();
    const yPos = renderRow.call(this, toRender, this._currRowIndex);

    // Position document at base of new row
    this.document.x = this._position.x;
    this.document.y = yPos;

    if (lastRow) return this.end();

    this._currRowIndex++;
    return this;
  }

  /**
   * Indicates to the table that it is finished,
   * allowing the table to flush its cell buffer (which should be empty unless there is rowSpans)
   *
   * @returns {PDFDocument} the document
   */
  end() {
    // Flush any remaining cells
    while (this._rowBuffer?.size) this.row([]);
    this._ended = true;
    accommodateCleanup.call(this);
    return this.document;
  }
}

export default PDFTable;
