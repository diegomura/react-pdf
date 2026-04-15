import { accessibleCell, accessibleRow } from './accessibility';

/**
 * Render a cell
 *
 * @this PDFTable
 * @memberOf PDFTable
 * @param {SizedNormalizedTableCellStyle[]} row
 * @param {number} rowIndex
 * @private
 */
export function renderRow(row, rowIndex) {
  if (this._tableStruct) {
    accessibleRow.call(this, row, rowIndex, renderCell.bind(this));
  } else {
    row.forEach((cell) => renderCell.call(this, cell));
  }

  return this._rowYPos[rowIndex] + this._rowHeights[rowIndex];
}

/**
 * Render a cell
 *
 * @this PDFTable
 * @memberOf PDFTable
 * @param {SizedNormalizedTableCellStyle} cell
 * @param {PDFStructureElement} rowStruct
 * @private
 */
function renderCell(cell, rowStruct) {
  const cellRenderer = () => {
    // Render cell background
    if (cell.backgroundColor != null) {
      this.document
        .save()
        .fillColor(cell.backgroundColor)
        .rect(cell.x, cell.y, cell.width, cell.height)
        .fill()
        .restore();
    }

    // Render border
    renderBorder.call(
      this,
      cell.border,
      cell.borderColor,
      cell.x,
      cell.y,
      cell.width,
      cell.height,
    );

    // Debug cell borders
    if (cell.debug) {
      this.document.save();
      this.document.dash(1, { space: 1 }).lineWidth(1).strokeOpacity(0.3);

      // Debug cell bounds
      this.document
        .rect(cell.x, cell.y, cell.width, cell.height)
        .stroke('green');

      this.document.restore();
    }

    // Render text
    if (cell.text) renderCellText.call(this, cell);
  };

  if (rowStruct) accessibleCell.call(this, cell, rowStruct, cellRenderer);
  else cellRenderer();
}

/**
 * @this PDFTable
 * @memberOf PDFTable
 * @param {SizedNormalizedTableCellStyle} cell
 */
function renderCellText(cell) {
  const doc = this.document;

  // Configure fonts
  const rollbackFont = doc._fontSource;
  const rollbackFontSize = doc._fontSize;
  const rollbackFontFamily = doc._fontFamily;
  if (cell.customFont) {
    if (cell.font.src) doc.font(cell.font.src, cell.font.family);
    if (cell.font.size) doc.fontSize(cell.font.size);
  }

  const x = cell.textX;
  const y = cell.textY;
  const Ah = cell.textAllocatedHeight;
  const Aw = cell.textAllocatedWidth;
  const Cw = cell.textBounds.width;
  const Ch = cell.textBounds.height;
  const Ox = -cell.textBounds.x;
  const Oy = -cell.textBounds.y;

  const PxScale =
    cell.align.x === 'right' ? 1 : cell.align.x === 'center' ? 0.5 : 0;
  const Px = (Aw - Cw) * PxScale;
  const PyScale =
    cell.align.y === 'bottom' ? 1 : cell.align.y === 'center' ? 0.5 : 0;
  const Py = (Ah - Ch) * PyScale;

  const dx = Px + Ox;
  const dy = Py + Oy;

  if (cell.debug) {
    doc.save();
    doc.dash(1, { space: 1 }).lineWidth(1).strokeOpacity(0.3);

    // Debug actual text bounds
    if (cell.text) {
      doc
        .moveTo(x + Px, y)
        .lineTo(x + Px, y + Ah)
        .moveTo(x + Px + Cw, y)
        .lineTo(x + Px + Cw, y + Ah)
        .stroke('blue')
        .moveTo(x, y + Py)
        .lineTo(x + Aw, y + Py)
        .moveTo(x, y + Py + Ch)
        .lineTo(x + Aw, y + Py + Ch)
        .stroke('green');
    }
    // Debug allocated text bounds
    doc.rect(x, y, Aw, Ah).stroke('orange');

    doc.restore();
  }

  // Create text mask to cut off any overflowing text
  // Mask cuts off at the padding not the actual cell, this is intentional!
  doc.save().rect(x, y, Aw, Ah).clip();

  doc.fillColor(cell.textColor).strokeColor(cell.textStrokeColor);
  if (cell.textStroke > 0) doc.lineWidth(cell.textStroke);

  // Render the text
  doc.text(cell.text, x + dx, y + dy, cell.textOptions);

  // Cleanup
  doc.restore();
  if (cell.font) doc.font(rollbackFont, rollbackFontFamily, rollbackFontSize);
}

/**
 * @this PDFTable
 * @memberOf PDFTable
 * @param {ExpandedSideDefinition<number>} border
 * @param {ExpandedSideDefinition<PDFColor>} borderColor
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number[]} [mask]
 * @private
 */
function renderBorder(border, borderColor, x, y, width, height, mask) {
  border = Object.fromEntries(
    Object.entries(border).map(([k, v]) => [k, mask && !mask[k] ? 0 : v]),
  );

  const doc = this.document;
  if (
    [border.right, border.bottom, border.left].every(
      (val) => val === border.top,
    )
  ) {
    if (border.top > 0) {
      doc
        .save()
        .lineWidth(border.top)
        .strokeColor(borderColor.top)
        .rect(x, y, width, height)
        .stroke()
        .restore();
    }
  } else {
    // Top
    if (border.top > 0) {
      doc
        .save()
        .lineWidth(border.top)
        .moveTo(x, y)
        .strokeColor(borderColor.top)
        .lineTo(x + width, y)
        .stroke()
        .restore();
    }
    // Right
    if (border.right > 0) {
      doc
        .save()
        .lineWidth(border.right)
        .moveTo(x + width, y)
        .strokeColor(borderColor.right)
        .lineTo(x + width, y + height)
        .stroke()
        .restore();
    }
    // Bottom
    if (border.bottom > 0) {
      doc
        .save()
        .lineWidth(border.bottom)
        .moveTo(x + width, y + height)
        .strokeColor(borderColor.bottom)
        .lineTo(x, y + height)
        .stroke()
        .restore();
    }
    // Left
    if (border.left > 0) {
      doc
        .save()
        .lineWidth(border.left)
        .moveTo(x, y + height)
        .strokeColor(borderColor.left)
        .lineTo(x, y)
        .stroke()
        .restore();
    }
  }
}
