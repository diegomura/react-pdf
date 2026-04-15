import { cosine, sine } from '../utils';

/**
 * Compute the widths of the columns, ensuring to distribute the star widths
 *
 * @this PDFTable
 * @memberOf PDFTable
 * @param {NormalizedTableCellStyle[]} row
 * @private
 */
export function ensure(row) {
  // Width init
  /** @type number[] **/
  this._columnWidths = [];
  ensureColumnWidths.call(
    this,
    row.reduce((a, cell) => a + cell.colSpan, 0),
  );

  // Height init
  /** @type number[] **/
  this._rowHeights = [];
  /** @type number[] **/
  this._rowYPos = [this._position.y];
  /** @type {Set<NormalizedTableCellStyle>} **/
  this._rowBuffer = new Set();
}

/**
 * Compute the widths of the columns, ensuring to distribute the star widths
 *
 * @this PDFTable
 * @memberOf PDFTable
 * @param {number} numCols
 * @private
 */
function ensureColumnWidths(numCols) {
  // Compute the widths
  let starColumnIndexes = [];
  let starMinAcc = 0;
  let unclaimedWidth = this._maxWidth;

  for (let i = 0; i < numCols; i++) {
    let col = this._colStyle(i);
    if (col.width === '*') {
      starColumnIndexes[i] = col;
      starMinAcc += col.minWidth;
    } else {
      unclaimedWidth -= col.width;
      this._columnWidths[i] = col.width;
    }
  }

  let starColCount = starColumnIndexes.reduce((x) => x + 1, 0);

  if (starMinAcc >= unclaimedWidth) {
    // case 1 - there's no way to fit all columns within available width
    // that's actually pretty bad situation with PDF as we have no horizontal scroll
    starColumnIndexes.forEach((cell, i) => {
      this._columnWidths[i] = cell.minWidth;
    });
  } else if (starColCount > 0) {
    // Otherwise we distribute evenly factoring in the cell bounds
    starColumnIndexes.forEach((col, i) => {
      let starSize = unclaimedWidth / starColCount;
      this._columnWidths[i] = Math.max(starSize, col.minWidth);
      if (col.maxWidth > 0) {
        this._columnWidths[i] = Math.min(this._columnWidths[i], col.maxWidth);
      }
      unclaimedWidth -= this._columnWidths[i];
      starColCount--;
    });
  }

  let tempX = this._position.x;
  this._columnXPos = Array.from(this._columnWidths, (v) => {
    const t = tempX;
    tempX += v;
    return t;
  });
}

/**
 * Compute the dimensions of the cells
 *
 * @this PDFTable
 * @memberOf PDFTable
 * @param {NormalizedTableCellStyle[]} row
 * @param {number} rowIndex
 * @returns {{newPage: boolean, toRender: SizedNormalizedTableCellStyle[]}}
 * @private
 */
export function measure(row, rowIndex) {
  // ===================
  // Add cells to buffer
  // ===================
  row.forEach((cell) => this._rowBuffer.add(cell));

  if (rowIndex > 0) {
    this._rowYPos[rowIndex] =
      this._rowYPos[rowIndex - 1] + this._rowHeights[rowIndex - 1];
  }

  const rowStyle = this._rowStyle(rowIndex);

  // ========================================================
  // Find any cells which are to finish rendering on this row
  // ========================================================
  /** @type {SizedNormalizedTableCellStyle[]} */
  let toRender = [];
  this._rowBuffer.forEach((cell) => {
    if (cell.rowIndex + cell.rowSpan - 1 === rowIndex) {
      toRender.push(measureCell.call(this, cell, rowStyle.height));
      this._rowBuffer.delete(cell);
    }
  });

  // =====================================================
  // Find the shared height for the row based on the cells
  // =====================================================
  let rowHeight = rowStyle.height;
  if (rowHeight === 'auto') {
    // Compute remaining height on cells
    rowHeight = toRender.reduce((acc, cell) => {
      let minHeight =
        cell.textBounds.height + cell.padding.top + cell.padding.bottom;
      for (let i = 0; i < cell.rowSpan - 1; i++) {
        minHeight -= this._rowHeights[cell.rowIndex + i];
      }
      return Math.max(acc, minHeight);
    }, 0);
  }

  rowHeight = Math.max(rowHeight, rowStyle.minHeight);
  if (rowStyle.maxHeight > 0) {
    rowHeight = Math.min(rowHeight, rowStyle.maxHeight);
  }
  this._rowHeights[rowIndex] = rowHeight;

  let newPage = false;
  if (rowHeight > this.document.page.contentHeight) {
    // We are unable to render this row on a single page, for now we log a warning and disable the newPage
    console.warn(
      new Error(
        `Row ${rowIndex} requested more than the safe page height, row has been clamped`,
      ).stack.slice(7),
    );
    this._rowHeights[rowIndex] =
      this.document.page.maxY() - this._rowYPos[rowIndex];
  } else if (this._rowYPos[rowIndex] + rowHeight >= this.document.page.maxY()) {
    // If row is going to go over the safe page height then move it over to new page
    this._rowYPos[rowIndex] = this.document.page.margins.top;
    newPage = true;
  }

  // =====================================================
  // Re-measure the cells using the know known height
  // =====================================================
  return {
    newPage,
    toRender: toRender.map((cell) => measureCell.call(this, cell, rowHeight)),
  };
}

/**
 * Compute the dimensions of the cell and its text
 *
 * @this PDFTable
 * @memberOf PDFTable
 * @param {NormalizedTableCellStyle} cell
 * @param {number | 'auto'} rowHeight
 * @returns {SizedNormalizedTableCellStyle}
 * @private
 */
function measureCell(cell, rowHeight) {
  // ====================
  // Calculate cell width
  // ====================
  let cellWidth = 0;

  // Traverse all the columns of the cell
  for (let i = 0; i < cell.colSpan; i++) {
    cellWidth += this._columnWidths[cell.colIndex + i];
  }

  // =====================
  // Calculate cell height
  // =====================
  let cellHeight = rowHeight;
  if (cellHeight === 'auto') {
    // The cells height is effectively infinite
    // (although we clamp it to the page content size)
    cellHeight = this.document.page.contentHeight;
  } else {
    // Add all the spanning rows heights to the cell
    for (let i = 0; i < cell.rowSpan - 1; i++) {
      cellHeight += this._rowHeights[cell.rowIndex + i];
    }
  }

  // Allocated text space
  const textAllocatedWidth = cellWidth - cell.padding.left - cell.padding.right;

  const textAllocatedHeight =
    cellHeight - cell.padding.top - cell.padding.bottom;

  // Compute the text bounds
  const rotation = cell.textOptions.rotation ?? 0;
  const { width: textMaxWidth, height: textMaxHeight } = computeBounds(
    rotation,
    textAllocatedWidth,
    textAllocatedHeight,
  );

  const textOptions = {
    // Alignment is handled internally
    align: cell.align.x,
    ellipsis: true, // Default make overflowing text ellipsis
    stroke: cell.textStroke > 0,
    fill: true, // To fix the stroke issue
    width: textMaxWidth,
    height: textMaxHeight,
    rotation,
    // Allow the user to define any custom fields
    ...cell.textOptions,
  };

  // ========================
  // Calculate text height
  // ========================

  // Compute rendered bounds of the text given the constraints of the cell
  let textBounds = { x: 0, y: 0, width: 0, height: 0 };
  if (cell.text) {
    const rollbackFont = this.document._fontSource;
    const rollbackFontSize = this.document._fontSize;
    const rollbackFontFamily = this.document._fontFamily;
    if (cell.font?.src) this.document.font(cell.font.src, cell.font?.family);
    if (cell.font?.size) this.document.fontSize(cell.font.size);

    // We first compute the un-rotated bounds so that we can calculate the width of the text
    const unRotatedTextBounds = this.document.boundsOfString(cell.text, 0, 0, {
      ...textOptions,
      rotation: 0,
    });
    textOptions.width = unRotatedTextBounds.width;
    textOptions.height = unRotatedTextBounds.height;

    // Then compute the rendered bounds
    textBounds = this.document.boundsOfString(cell.text, 0, 0, textOptions);

    this.document.font(rollbackFont, rollbackFontFamily, rollbackFontSize);
  }

  return {
    ...cell,
    textOptions,
    x: this._columnXPos[cell.colIndex],
    y: this._rowYPos[cell.rowIndex],
    textX: this._columnXPos[cell.colIndex] + cell.padding.left,
    textY: this._rowYPos[cell.rowIndex] + cell.padding.top,
    width: cellWidth,
    height: cellHeight,
    textAllocatedHeight,
    textAllocatedWidth,
    textBounds,
  };
}

/**
 * Compute the horizon-locked bounding box of a rect
 *
 * @param {number} rotation
 * @param {number} allocWidth
 * @param {number} allocHeight
 *
 * @returns {{width: number, height: number}}
 */
function computeBounds(rotation, allocWidth, allocHeight) {
  let textMaxWidth, textMaxHeight;

  // We use these a lot so pre-compute
  const cos = cosine(rotation);
  const sin = sine(rotation);

  // <---------------allocWidth---------------->
  // A════════════════════F════════════════════B
  // ║                  ■■ ■                   ║
  // ║                ■■   ■                   ║
  // ║              ■■      ■                  ║
  // ║            ■■        ■                  ║
  // ║          ■■           ■                 ║
  // ║        ■■             ■                 ║
  // ║      ■■░░              ■                ║
  // ║    ■■    ░              ■               ║
  // ║  ■■   Θ   ░             ■               ║
  // ║■■          ░             ■              ║
  // E- - - - - - - - - - - - - ■ - - - - - - -║
  // ║■                          ■             ║
  // ║■                           ■            ║
  // ║ ■                          ■            ║
  // ║ ■                           ■           ║
  // ║  ■                          ■           ║
  // ║  ■                           ■          ║
  // ║   ■                          ■          ║
  // ║   ■                           ■         ║
  // ║    ■                           ■        ║
  // ║     ■                          ■        ║
  // ║     ■                           ■       ║
  // ║      ■                          ■       ║
  // ║      ■                           ■      ║
  // ║       ■                           ■     ║
  // ║       ■                           ■     ║
  // ║        ■                           ■    ║
  // ║        ■                           ■    ║
  // ║         ■                           ■   ║
  // ║         ■                           ■   ║
  // ║          ■                           ■  ║
  // ║           ■                           ■ ║
  // ║           ■                           ■ ║
  // ║            ■                           ■║
  // ║            ■                           ■║
  // ║             ■                           G
  // ║             ■                         ■■║
  // ║              ■                      ■■  ║
  // ║              ■                     ■    ║
  // ║               ■                  ■■     ║
  // ║                ■                ■       ║
  // ║                ■              ■■        ║
  // ║                 ■           ■■          ║
  // ║                 ■          ■            ║
  // ║                  ■       ■■             ║
  // ║                  ■      ■               ║
  // ║                   ■   ■■                ║
  // ║                   ■ ■■                  ║
  // D════════════════════H════════════════════C
  //
  // Given a rectangle ABCD with a fixed side AB of width allocWidth.
  // Find the largest (by area) inscribed rectangle EFGH,
  // where the angle Θ is equal to rotation (between 0-90 degrees)
  //
  // From above we can infer
  // > AF = EF * cos(Θ)
  // > FB = AB - AF
  // > FB = FG * sin(Θ)
  // Rearrange
  // > FG = FB / sin(Θ)
  // Substitute
  // > FG = (AB - EF*cos(Θ)) / sin(Θ)
  // Area of a rectangle
  // > A = EF * FG
  // Substitute
  // > A = EF * (AB - EF*cos(Θ)) / sin(Θ)
  // > dA/dEF = (AB - 2*EF*cos(Θ)) / sin(Θ)
  // Find peak at dA/dEF = 0
  // > 0 = (AB - 2*EF*cos(Θ)) / sin(Θ)
  // > EF = AB / (2*cos(Θ))
  // Substitute
  // > FG = (AB - (AB*cos(Θ)) / (2*cos(Θ))) / sin(Θ)
  // > FG = AB / (2*sin(Θ))
  //
  // Final outcome
  // Length EF = AB / (2*cos(Θ))
  // Length FG = AB / (2*sin(Θ))
  if (rotation === 0 || rotation === 180) {
    textMaxWidth = allocWidth;
    textMaxHeight = allocHeight;
  } else if (rotation === 90 || rotation === 270) {
    textMaxWidth = allocHeight;
    textMaxHeight = allocWidth;
  } else if (rotation < 90 || (rotation > 180 && rotation < 270)) {
    textMaxWidth = allocWidth / (2 * cos);
    textMaxHeight = allocWidth / (2 * sin);
  } else {
    textMaxHeight = allocWidth / (2 * cos);
    textMaxWidth = allocWidth / (2 * sin);
  }

  // If The bounding box of the text is beyond the allocHeight
  // then we need to clamp it and recompute the bounds
  // This time we are computing the sizes based on the outer box ABCD
  const EF = sin * textMaxWidth;
  const FG = cos * textMaxHeight;
  if (EF + FG > allocHeight) {
    // > AB = EF * cos(Θ) + FG * sin(Θ)
    // > BC = BG + GC
    // > BG = FG * cos(Θ)
    // > GC = EF * sin(Θ)
    // > BC = FG * cos(Θ) + EF * sin(Θ)
    // > AB = EF * cos(Θ) + FG * sin(Θ)
    // Substitution solve
    // > EF = (AB*cos(Θ) - BC*sin(Θ)) / (cos^2(Θ)-sin^2(Θ))
    // > FG = (BC*cos(Θ) - AB*sin(Θ)) / (cos^2(Θ)-sin^2(Θ))
    const denominator = cos * cos - sin * sin;

    if (rotation === 0 || rotation === 180) {
      textMaxWidth = allocWidth;
      textMaxHeight = allocHeight;
    } else if (rotation === 90 || rotation === 270) {
      textMaxWidth = allocHeight;
      textMaxHeight = allocWidth;
    } else if (rotation < 90 || (rotation > 180 && rotation < 270)) {
      textMaxWidth = (allocWidth * cos - allocHeight * sin) / denominator;
      textMaxHeight = (allocHeight * cos - allocWidth * sin) / denominator;
    } else {
      textMaxHeight = (allocWidth * cos - allocHeight * sin) / denominator;
      textMaxWidth = (allocHeight * cos - allocWidth * sin) / denominator;
    }
  }

  return { width: Math.abs(textMaxWidth), height: Math.abs(textMaxHeight) };
}
