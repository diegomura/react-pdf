import { COLUMN_FIELDS, deepMerge, ROW_FIELDS } from './utils';
import { normalizeSides } from '../utils';

/**
 * Normalize the row config
 * @note The context here is the cell not the document
 *
 * @param {DefaultTableCell} [defaultStyleInternal]
 * @returns {{
 *  defaultStyle: TableCellStyle,
 *  defaultRowStyle: RowStyle,
 *  defaultColStyle: ColumnStyle
 * }}
 * @private
 */
export function normalizedDefaultStyle(defaultStyleInternal) {
  let defaultStyle = defaultStyleInternal;
  // Force object form
  if (typeof defaultStyle !== 'object') defaultStyle = { text: defaultStyle };

  const defaultRowStyle = Object.fromEntries(
    Object.entries(defaultStyle).filter(([k]) => ROW_FIELDS.includes(k)),
  );
  const defaultColStyle = Object.fromEntries(
    Object.entries(defaultStyle).filter(([k]) => COLUMN_FIELDS.includes(k)),
  );

  defaultStyle.padding = normalizeSides(defaultStyle.padding);
  defaultStyle.border = normalizeSides(defaultStyle.border);
  defaultStyle.borderColor = normalizeSides(defaultStyle.borderColor);
  defaultStyle.align = normalizeAlignment(defaultStyle.align);

  return { defaultStyle, defaultRowStyle, defaultColStyle };
}

/**
 * Normalize the row config
 *
 * @note The context here is the cell not the document
 *
 * @this PDFTable
 * @memberOf PDFTable
 * @param {RowStyle} defaultRowStyle
 * @param {Dynamic<Row>} rowStyleInternal
 * @param {number} i The target row
 * @returns {NormalizedRowStyle}
 * @private
 */
export function normalizedRowStyle(defaultRowStyle, rowStyleInternal, i) {
  let rowStyle = rowStyleInternal(i);
  // Force object form
  if (rowStyle == null || typeof rowStyle !== 'object') {
    rowStyle = { height: rowStyle };
  }
  // Normalize
  rowStyle.padding = normalizeSides(rowStyle.padding);
  rowStyle.border = normalizeSides(rowStyle.border);
  rowStyle.borderColor = normalizeSides(rowStyle.borderColor);
  rowStyle.align = normalizeAlignment(rowStyle.align);

  // Merge defaults
  rowStyle = deepMerge(defaultRowStyle, rowStyle);

  const document = this.document;
  const page = document.page;
  const contentHeight = page.contentHeight;

  if (rowStyle.height == null || rowStyle.height === 'auto') {
    rowStyle.height = 'auto';
  } else {
    rowStyle.height = document.sizeToPoint(
      rowStyle.height,
      0,
      page,
      contentHeight,
    );
  }
  rowStyle.minHeight = document.sizeToPoint(
    rowStyle.minHeight,
    0,
    page,
    contentHeight,
  );
  rowStyle.maxHeight = document.sizeToPoint(
    rowStyle.maxHeight,
    0,
    page,
    contentHeight,
  );

  return rowStyle;
}

/**
 * Normalize the column config
 *
 * @note The context here is the document not the cell
 *
 * @param {ColumnStyle} defaultColStyle
 * @param {Dynamic<Column>} colStyleInternal
 * @param {number} i - The target column
 * @returns {NormalizedColumnStyle}
 * @private
 */
export function normalizedColumnStyle(defaultColStyle, colStyleInternal, i) {
  let colStyle = colStyleInternal(i);
  // Force object form
  if (colStyle == null || typeof colStyle !== 'object') {
    colStyle = { width: colStyle };
  }
  // Normalize
  colStyle.padding = normalizeSides(colStyle.padding);
  colStyle.border = normalizeSides(colStyle.border);
  colStyle.borderColor = normalizeSides(colStyle.borderColor);
  colStyle.align = normalizeAlignment(colStyle.align);

  // Merge defaults
  colStyle = deepMerge(defaultColStyle, colStyle);

  if (colStyle.width == null || colStyle.width === '*') {
    colStyle.width = '*';
  } else {
    colStyle.width = this.document.sizeToPoint(
      colStyle.width,
      0,
      this.document.page,
      this._maxWidth, // Use table width here for percentage scaling
    );
  }
  colStyle.minWidth = this.document.sizeToPoint(
    colStyle.minWidth,
    0,
    this.document.page,
    this._maxWidth, // Use table width here for percentage scaling
  );
  colStyle.maxWidth = this.document.sizeToPoint(
    colStyle.maxWidth,
    0,
    this.document.page,
    this._maxWidth, // Use table width here for percentage scaling
  );

  return colStyle;
}

export function normalizeAlignment(align) {
  return align == null || typeof align === 'string'
    ? { x: align, y: align }
    : align;
}
