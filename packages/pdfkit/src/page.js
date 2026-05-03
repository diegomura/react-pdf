/*
PDFPage - represents a single page in the PDF document
By Devon Govett
*/

import { normalizeSides } from './utils';

/**
 * @type {SideDefinition<Size>}
 */
const DEFAULT_MARGINS = {
  top: 72,
  left: 72,
  bottom: 72,
  right: 72,
};

const SIZES = {
  '4A0': [4767.87, 6740.79],
  '2A0': [3370.39, 4767.87],
  A0: [2383.94, 3370.39],
  A1: [1683.78, 2383.94],
  A2: [1190.55, 1683.78],
  A3: [841.89, 1190.55],
  A4: [595.28, 841.89],
  A5: [419.53, 595.28],
  A6: [297.64, 419.53],
  A7: [209.76, 297.64],
  A8: [147.4, 209.76],
  A9: [104.88, 147.4],
  A10: [73.7, 104.88],
  B0: [2834.65, 4008.19],
  B1: [2004.09, 2834.65],
  B2: [1417.32, 2004.09],
  B3: [1000.63, 1417.32],
  B4: [708.66, 1000.63],
  B5: [498.9, 708.66],
  B6: [354.33, 498.9],
  B7: [249.45, 354.33],
  B8: [175.75, 249.45],
  B9: [124.72, 175.75],
  B10: [87.87, 124.72],
  C0: [2599.37, 3676.54],
  C1: [1836.85, 2599.37],
  C2: [1298.27, 1836.85],
  C3: [918.43, 1298.27],
  C4: [649.13, 918.43],
  C5: [459.21, 649.13],
  C6: [323.15, 459.21],
  C7: [229.61, 323.15],
  C8: [161.57, 229.61],
  C9: [113.39, 161.57],
  C10: [79.37, 113.39],
  RA0: [2437.8, 3458.27],
  RA1: [1729.13, 2437.8],
  RA2: [1218.9, 1729.13],
  RA3: [864.57, 1218.9],
  RA4: [609.45, 864.57],
  SRA0: [2551.18, 3628.35],
  SRA1: [1814.17, 2551.18],
  SRA2: [1275.59, 1814.17],
  SRA3: [907.09, 1275.59],
  SRA4: [637.8, 907.09],
  EXECUTIVE: [521.86, 756.0],
  FOLIO: [612.0, 936.0],
  LEGAL: [612.0, 1008.0],
  LETTER: [612.0, 792.0],
  TABLOID: [792.0, 1224.0],
};

class PDFPage {
  constructor(document, options = {}) {
    this.document = document;
    this._options = options;
    this.size = options.size || 'letter';
    this.layout = options.layout || 'portrait';
    this.userUnit = options.userUnit || 1.0;

    // calculate page dimensions
    const dimensions = Array.isArray(this.size)
      ? this.size
      : SIZES[this.size.toUpperCase()];
    this.width = dimensions[this.layout === 'portrait' ? 0 : 1];
    this.height = dimensions[this.layout === 'portrait' ? 1 : 0];

    this.content = this.document.ref();

    if (options.font) document.font(options.font, options.fontFamily);
    if (options.fontSize) document.fontSize(options.fontSize);

    // process margins
    // Margin calculation must occur after font assignment to ensure any dynamic sizes are calculated correctly
    this.margins = normalizeSides(
      options.margin ?? options.margins,
      DEFAULT_MARGINS,
      (x) => document.sizeToPoint(x, 0, this),
    );

    // Initialize the Font, XObject, and ExtGState dictionaries
    this.resources = this.document.ref({
      ProcSet: ['PDF', 'Text', 'ImageB', 'ImageC', 'ImageI'],
    });

    // The page dictionary
    this.dictionary = this.document.ref({
      Type: 'Page',
      Parent: this.document._root.data.Pages,
      MediaBox: [0, 0, this.width, this.height],
      Contents: this.content,
      Resources: this.resources,
      UserUnit: this.userUnit,
    });

    this.markings = [];
  }

  // Lazily create these objects
  get fonts() {
    const data = this.resources.data;
    return data.Font != null ? data.Font : (data.Font = {});
  }

  get xobjects() {
    const data = this.resources.data;
    return data.XObject != null ? data.XObject : (data.XObject = {});
  }

  get ext_gstates() {
    const data = this.resources.data;
    return data.ExtGState != null ? data.ExtGState : (data.ExtGState = {});
  }

  get patterns() {
    const data = this.resources.data;
    return data.Pattern != null ? data.Pattern : (data.Pattern = {});
  }

  get colorSpaces() {
    const data = this.resources.data;
    return data.ColorSpace || (data.ColorSpace = {});
  }

  get annotations() {
    const data = this.dictionary.data;
    return data.Annots != null ? data.Annots : (data.Annots = []);
  }

  get structParentTreeKey() {
    const data = this.dictionary.data;
    return data.StructParents != null
      ? data.StructParents
      : (data.StructParents = this.document.createStructParentTreeNextKey());
  }

  /**
   * The width of the safe contents of a page
   *
   * @returns {number}
   */
  get contentWidth() {
    return this.width - this.margins.left - this.margins.right;
  }

  /**
   * The height of the safe contents of a page
   *
   * @returns {number}
   */
  get contentHeight() {
    return this.height - this.margins.top - this.margins.bottom;
  }

  maxY() {
    return this.height - this.margins.bottom;
  }

  write(chunk) {
    return this.content.write(chunk);
  }

  // Set tab order if document is tagged for accessibility.
  _setTabOrder() {
    if (!this.dictionary.Tabs && this.document.hasMarkInfoDictionary()) {
      this.dictionary.data.Tabs = 'S';
    }
  }

  end() {
    this._setTabOrder();
    this.dictionary.end();
    this.resources.data.ColorSpace = this.resources.data.ColorSpace || {};
    for (let color of Object.values(this.document.spotColors)) {
      this.resources.data.ColorSpace[color.id] = color;
    }
    this.resources.end();
    return this.content.end();
  }
}

export default PDFPage;
