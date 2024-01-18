import isLandscape from './isLandscape';

const PAGE_SIZES = {
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
  ID1: [153, 243],
};

/**
 * Transforms array into size object
 *
 * @param {number[]} v array
 * @returns {{ width: number, height: number }} size object with width and height
 */
const toSizeObject = (v) => ({ width: v[0], height: v[1] });

/**
 * Flip size object
 *
 * @param {{ width: number, height: number }} v size object
 * @returns {{ width: number, height: number }} flipped size object
 */
const flipSizeObject = (v) => ({ width: v.height, height: v.width });

/**
 * Adjust page size to passed DPI
 *
 * @param {{ width: number, height: number }} v size object
 * @param {number} dpi DPI
 * @returns {{ width: number, height: number }} adjusted size object
 */
const adjustDpi = (v, dpi) => ({
  width: v.width ? v.width * dpi : v.width,
  height: v.height ? v.height * dpi : v.height,
});

/**
 * Returns size object from a given string
 *
 * @param {string} v page size string
 * @returns {{ width: number, height: number }} size object with width and height
 */
const getStringSize = (v) => {
  return toSizeObject(PAGE_SIZES[v.toUpperCase()]);
};

/**
 * Returns size object from a single number
 *
 * @param {number} n page size number
 * @returns {{ width: number, height: number }} size object with width and height
 */
const getNumberSize = (n) => toSizeObject([n]);

/**
 * Return page size in an object { width, height }
 *
 * @param {Object} page instance
 * @returns {{ width: number, height: number }} size object with width and height
 */
const getSize = (page) => {
  const value = page.props?.size || 'A4';
  const dpi = parseFloat(page.props?.dpi || 72);

  const type = typeof value;

  /**
   * @type {{ width: number, height: number }}
   */
  let size;

  if (type === 'string') {
    size = getStringSize(value);
  } else if (Array.isArray(value)) {
    size = toSizeObject(value);
  } else if (type === 'number') {
    size = getNumberSize(value);
  } else {
    size = value;
  }

  size = adjustDpi(size, dpi / 72);

  return isLandscape(page) ? flipSizeObject(size) : size;
};

export default getSize;
