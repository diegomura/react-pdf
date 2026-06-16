import { deepMerge, memoize } from './utils';
import {
  normalizeAlignment,
  normalizedColumnStyle,
  normalizedDefaultStyle,
  normalizedRowStyle,
} from './style';
import { normalizeSides } from '../utils';

/**
 * Normalize a table
 *
 * @this PDFTable
 * @memberOf PDFTable
 * @private
 */
export function normalizeTable() {
  const doc = this.document;
  const opts = this.opts;

  // Normalize config
  let index = doc._tableIndex++;
  this._id = new String(opts.id ?? `table-${index}`);
  this._position = {
    x: doc.sizeToPoint(opts.position?.x, doc.x),
    y: doc.sizeToPoint(opts.position?.y, doc.y),
  };
  this._maxWidth = doc.sizeToPoint(
    opts.maxWidth,
    doc.page.width - doc.page.margins.right - this._position.x,
  );

  const { defaultStyle, defaultColStyle, defaultRowStyle } =
    normalizedDefaultStyle(opts.defaultStyle);
  this._defaultStyle = defaultStyle;

  let colStyle;
  if (opts.columnStyles) {
    if (Array.isArray(opts.columnStyles)) {
      colStyle = (i) => opts.columnStyles[i];
    } else if (typeof opts.columnStyles === 'function') {
      // memoize all columns
      colStyle = memoize((i) => opts.columnStyles(i), Infinity);
    } else if (typeof opts.columnStyles === 'object') {
      colStyle = () => opts.columnStyles;
    }
  }
  if (!colStyle) colStyle = () => ({});
  this._colStyle = normalizedColumnStyle.bind(this, defaultColStyle, colStyle);

  let rowStyle;
  if (opts.rowStyles) {
    if (Array.isArray(opts.rowStyles)) {
      rowStyle = (i) => opts.rowStyles[i];
    } else if (typeof opts.rowStyles === 'function') {
      // Memoize the row configs in a rolling buffer
      rowStyle = memoize((i) => opts.rowStyles(i), 10);
    } else if (typeof opts.rowStyles === 'object') {
      rowStyle = () => opts.rowStyles;
    }
  }
  if (!rowStyle) rowStyle = () => ({});
  this._rowStyle = normalizedRowStyle.bind(this, defaultRowStyle, rowStyle);
}

/**
 * Convert text into a string
 * - null and undefined are preserved (as they will be ignored)
 * - everything else is run through `String()`
 *
 * @param {*} text
 * @returns {string}
 * @private
 */
export function normalizeText(text) {
  // Parse out text
  if (text != null) text = `${text}`;
  return text;
}

/**
 * Normalize a cell config
 *
 * @this PDFTable
 * @memberOf PDFTable
 * @param {TableCellStyle} cell - The cell to mutate
 * @param {number} rowIndex - The cells row
 * @param {number} colIndex - The cells column
 * @returns {NormalizedTableCellStyle}
 * @private
 */
export function normalizeCell(cell, rowIndex, colIndex) {
  const colStyle = this._colStyle(colIndex);
  let rowStyle = this._rowStyle(rowIndex);

  const font = deepMerge({}, colStyle.font, rowStyle.font, cell.font);
  const customFont = Object.values(font).filter((v) => v != null).length > 0;
  const doc = this.document;

  // Initialize cell context
  const rollbackFont = doc._fontSource;
  const rollbackFontSize = doc._fontSize;
  const rollbackFontFamily = doc._fontFamily;
  if (customFont) {
    if (font.src) doc.font(font.src, font.family);
    if (font.size) doc.fontSize(font.size);

    // Refetch rowStyle to reflect font changes
    rowStyle = this._rowStyle(rowIndex);
  }

  cell.padding = normalizeSides(cell.padding);
  cell.border = normalizeSides(cell.border);
  cell.borderColor = normalizeSides(cell.borderColor);

  // Cell takes highest priority, then row, then column, then defaultConfig
  const config = deepMerge(this._defaultStyle, colStyle, rowStyle, cell);
  config.rowIndex = rowIndex;
  config.colIndex = colIndex;
  config.font = font ?? {};
  config.customFont = customFont;

  // Normalize config
  config.text = normalizeText(config.text);
  config.rowSpan = config.rowSpan ?? 1;
  config.colSpan = config.colSpan ?? 1;
  config.padding = normalizeSides(config.padding, '0.25em', (x) =>
    doc.sizeToPoint(x, '0.25em'),
  );
  config.border = normalizeSides(config.border, 1, (x) =>
    doc.sizeToPoint(x, 1),
  );
  config.borderColor = normalizeSides(
    config.borderColor,
    'black',
    (x) => x ?? 'black',
  );
  config.align = normalizeAlignment(config.align);
  config.align.x = config.align.x ?? 'left';
  config.align.y = config.align.y ?? 'top';
  config.textStroke = doc.sizeToPoint(config.textStroke, 0);
  config.textStrokeColor = config.textStrokeColor ?? 'black';
  config.textColor = config.textColor ?? 'black';
  config.textOptions = config.textOptions ?? {};

  // Accessibility settings
  config.id = new String(config.id ?? `${this._id}-${rowIndex}-${colIndex}`);
  config.type = config.type?.toUpperCase() === 'TH' ? 'TH' : 'TD';
  if (config.scope) {
    config.scope = config.scope.toLowerCase();
    if (config.scope === 'row') config.scope = 'Row';
    else if (config.scope === 'both') config.scope = 'Both';
    else if (config.scope === 'column') config.scope = 'Column';
  }

  if (typeof this.opts.debug === 'boolean') config.debug = this.opts.debug;

  // Rollback font
  if (customFont) doc.font(rollbackFont, rollbackFontFamily, rollbackFontSize);

  return config;
}

/**
 * Normalize a row
 *
 * @this PDFTable
 * @memberOf PDFTable
 * @param {TableCell[]} row
 * @param {number} rowIndex
 * @returns {NormalizedTableCellStyle[]}
 * @private
 */
export function normalizeRow(row, rowIndex) {
  if (!this._cellClaim) this._cellClaim = new Set();

  let colIndex = 0;
  return row.map((cell) => {
    // Ensure TableCell
    if (cell == null || typeof cell !== 'object') cell = { text: cell };

    // Find the starting column of the cell
    // Skipping over the claimed cells
    while (this._cellClaim.has(`${rowIndex},${colIndex}`)) {
      colIndex++;
    }

    cell = normalizeCell.call(this, cell, rowIndex, colIndex);

    // Claim any spanning cells
    for (let i = 0; i < cell.rowSpan; i++) {
      for (let j = 0; j < cell.colSpan; j++) {
        this._cellClaim.add(`${rowIndex + i},${colIndex + j}`);
      }
    }

    colIndex += cell.colSpan;
    return cell;
  });
}
