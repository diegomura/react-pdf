/**
 * @template T
 * @typedef {function(number): T} Dynamic<T | undefined>
 */

/**
 * @typedef {Object} Font
 * @property {PDFFontSource} [src]
 * The name of the font
 *
 * Defaults to the current document font source `doc._fontSrc`
 * @property {string} [family]
 * The font family of the font
 *
 * Defaults to the current document font family `doc._fontFamily`
 * @property {Size} [size]
 * The size of the font
 *
 * Defaults to the current document font size `doc._fontSize`
 */

/**
 * Measurement of how wide something is, false means 0 and true means 1
 *
 * @typedef {Size | boolean} Wideness
 */

/**
 * The value of the text of a cell
 * @typedef {string | null | undefined} TableCellText
 */

/** @typedef {Object} TableCellStyle
 *
 * @property {TableCellText} [text]
 * The text of the table cell
 * @property {number} [rowSpan]
 * Number of rows the cell spans.
 *
 * Defaults to `1`.
 * @property {number} [colSpan]
 * Number of columns the cell spans.
 *
 * Defaults to `1`.
 * @property {SideDefinition<Wideness>} [padding]
 * Controls the padding of the cell text
 *
 * Defaults to `0.25em`
 * @property {SideDefinition<Wideness>} [border]
 * Controls the thickness of the cells borders.
 *
 * Defaults to `[1, 1, 1, 1]`.
 * @property {SideDefinition<PDFColor>} [borderColor]
 * Color of the border on each side of the cell.
 *
 * Defaults to the border color defined by the given table layout, or `black` on all sides.
 * @property {Font} [font]
 * Font options for the cell
 *
 * Defaults to the documents current font
 * @property {PDFColor} [backgroundColor]
 * Set the background color of the cell
 *
 * Defaults to transparent
 * @property {'center' | ExpandedAlign} [align]
 * Sets the text alignment of the cells text
 *
 * Defaults to `{x: 'left', y: 'top'}`
 * @property {Size} [textStroke]
 * Sets the text stroke width of the cells text
 *
 * Defaults to `0`
 * @property {PDFColor} [textStrokeColor]
 * Sets the text stroke color of the cells text
 *
 * Defaults to `black`
 * @property {PDFColor} [textColor]
 * Sets the text color of the cells text
 *
 * Defaults to `black`
 * @property {'TH' | 'TD'} [type]
 * Sets the cell type (for accessibility)
 *
 * Defaults to `TD`
 * @property {Object} [textOptions]
 * Sets any advanced text options passed into the cell renderer
 *
 * Same as the options you pass to `doc.text()`
 *
 * Will override any defaults set by the cell if set
 * @property {string} [title]
 * Sets the accessible title for the cell
 * @property {'Column' | 'Row' | 'Both'} [scope]
 * Sets the accessible scope for the cell
 * @property {string} [id]
 * Sets the accessible id for the cell
 *
 * Defaults to `<tableId>-<rowIndex>-<colIndex>`
 * @property {boolean} [debug]
 * Whether to show the debug lines for the cell
 *
 * Defaults to `false`
 */
/** @typedef {TableCellText | TableCellStyle} TableCell **/

/**
 * The width of the column
 *
 * - `*` distributes equally, filling the whole available space
 * - `%` computes the proportion of the max size
 *
 * Defaults to `*`
 * @typedef {Size | '*'} ColumnWidth
 */

/**
 * @typedef {Object} ColumnStyle
 * @extends TableCellStyle
 *
 * @property {ColumnWidth} [width]
 * @property {Size} [minWidth]
 * The minimum width of the column
 *
 * Defaults to `0`
 * @property {Size} [maxWidth]
 * The maximum width of the column
 *
 * Defaults to `undefined` meaning no max
 */
/** @typedef {ColumnStyle | ColumnWidth} Column **/

/**
 * @typedef {Object} NormalizedColumnStyle
 * @extends ColumnStyle
 *
 * @property {number | '*'} width
 * @property {number} minWidth
 * @property {number} maxWidth
 */

/**
 * The height of the row
 *
 * - A fixed value sets an absolute height for every row.
 * - `auto` sets the height based on the text.
 *
 * `%` values are based on page content height
 *
 * Defaults to `auto`
 * @typedef {Size | 'auto'} RowHeight
 */

/**
 * @typedef {Object} RowStyle
 * @extends TableCellStyle
 *
 * @property {RowHeight} [height]
 * @property {Size} [minHeight]
 * The minimum height of the row
 *
 * `%` values are based on page content height
 *
 * Defaults to `0`
 * @property {Size} [maxHeight]
 * The maximum height of the row
 *
 * `%` values are based on page content height
 *
 * Defaults to `undefined` meaning no max
 */
/** @typedef {RowStyle | RowHeight} Row **/

/**
 * @typedef {Object} NormalizedRowStyle
 * @extends RowStyle
 *
 * @property {number | 'auto'} height
 * @property {number} minHeight
 * @property {number} maxHeight
 */

/** @typedef {'left' | 'center' | 'right' | 'justify'} AlignX **/
/** @typedef {'top' | 'center' | 'bottom'} AlignY **/
/**
 * @typedef {Object} ExpandedAlign
 * @property {AlignX} [x]
 * @property {AlignY} [y]
 */

/**
 * @typedef {Object} DefaultTableCellStyle
 *
 * @extends ColumnStyle
 * @extends RowStyle
 * @extends TableCellStyle
 */
/** @typedef {TableCellText | DefaultTableCellStyle} DefaultTableCell **/

/**
 * @typedef {Object} NormalizedDefaultTableCellStyle
 *
 * @extends NormalizedColumnStyle
 * @extends NormalizedRowStyle
 * @extends TableCellStyle
 */

/**
 * @typedef {Object} NormalizedTableCellStyle
 *
 * @extends NormalizedColumnStyle
 * @extends NormalizedRowStyle
 * @extends TableCellStyle
 *
 * @property {number} rowIndex
 * @property {number} rowSpan
 * @property {number} colIndex
 * @property {number} colSpan
 *
 * @property {string} text
 * @property {Font} font
 * @property {boolean} customFont
 * @property {ExpandedSideDefinition<number>} padding
 * @property {ExpandedSideDefinition<number>} border
 * @property {ExpandedSideDefinition<PDFColor>} borderColor
 * @property {ExpandedAlign} align
 * @property {number} textStroke
 * @property {PDFColor} textStrokeColor
 * @property {PDFColor} textColor
 * @property {number} minWidth
 * @property {number} maxWidth
 * @property {number} minHeight
 * @property {number} maxHeight
 * @property {Object} textOptions
 */

/**
 * @typedef {Object} SizedNormalizedTableCellStyle
 *
 * @extends {NormalizedTableCellStyle}
 *
 * @property {number} x
 * @property {number} y
 * @property {number} textX
 * @property {number} textY
 * @property {number} width
 * @property {number} height
 * @property {number} textAllocatedWidth
 * @property {number} textAllocatedHeight
 * @property {{x: number, y: number, width: number, height: number}} textBounds
 */

/**
 * @typedef {Object} Table
 *
 * @property {Position} [position]
 * The position of the table
 *
 * Defaults to the current document position `{x: doc.x, y: doc.y}`
 * @property {Size} [maxWidth]
 * The maximum width the table can expand to
 *
 * Defaults to the remaining content width (offset from the tables position)
 * @property {Column | Column[] | Dynamic<Column>} [columnStyles]
 * Column definitions of the table.
 * - A fixed value sets the config for every column
 * - Use an array or a callback function to control the column config for each column individually.
 *
 * Defaults to `auto`
 * @property {Row | Row[] | Dynamic<Row>} [rowStyles]
 * Row definitions of the table.
 * - A fixed value sets the config for every column
 * - Use an array or a callback function to control the row config of each row individually.
 *
 * The given values are ignored for rows whose text is higher.
 *
 * Defaults to `*`.
 * @property {DefaultTableCell} [defaultStyle]
 * Defaults to apply to every cell
 * @property {Iterable<Iterable<TableCell>>} [data]
 * Two-dimensional iterable that defines the table's data.
 *
 * With the first dimension being the row, and the second being the column
 *
 * If provided the table will be automatically ended after the last row has been written,
 * Otherwise it is up to the user to call `table.end()` or `table.row([], true)`
 * @property {PDFStructureElement} [structParent]
 * The parent structure to mount to
 *
 * This will cause the entire table to be enclosed in a Table structure
 * with TR and TD/TH for cells
 * @property {string} [id]
 * Sets the accessible id for the table
 *
 * Defaults to `table-<number>`
 * @property {boolean} [debug]
 * Whether to show the debug lines for all the cells
 *
 * Defaults to `false`
 */

/**
 * Fields exclusive to row styles
 * @type {string[]}
 */
export const ROW_FIELDS = ['height', 'minHeight', 'maxHeight'];
/**
 * Fields exclusive to column styles
 * @type {string[]}
 */
export const COLUMN_FIELDS = ['width', 'minWidth', 'maxWidth'];

export function memoize(fn, maxSize) {
  const cache = new Map();
  return function (...args) {
    const key = args[0];
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
      if (cache.size > maxSize) cache.delete(cache.keys().next());
    }
    return cache.get(key);
  };
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 *
 * @template T
 * @param {T} target
 * @param sources
 * @returns {T}
 */
export function deepMerge(target, ...sources) {
  if (!isObject(target)) return target;
  target = deepClone(target);

  for (const source of sources) {
    if (isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!(key in target)) target[key] = {};
          target[key] = deepMerge(target[key], source[key]);
        } else if (source[key] !== undefined) {
          target[key] = deepClone(source[key]);
        }
      }
    }
  }

  return target;
}

function deepClone(obj) {
  let result = obj;
  if (obj && typeof obj == 'object') {
    result = Array.isArray(obj) ? [] : {};
    for (const key in obj) result[key] = deepClone(obj[key]);
  }
  return result;
}
