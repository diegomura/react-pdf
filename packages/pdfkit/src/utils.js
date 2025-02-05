export function PDFNumber(n) {
  // PDF numbers are strictly 32bit
  // so convert this number to the nearest 32bit number
  // @see ISO 32000-1 Annex C.2 (real numbers)
  return Math.fround(n);
}

/**
 * Measurement of size
 *
 * @typedef {number | `${number}` | `${number}${'em' | 'in' | 'px' | 'cm' | 'mm' | 'pc' | 'ex' | 'ch' | 'rem' | 'vw' | 'vmin' | 'vmax' | '%' | 'pt'}`} Size
 */

/**
 * Measurement of how wide something is, false means 0 and true means 1
 *
 * @typedef {Size | boolean} Wideness
 */

/**
 * Side definitions
 * - To define all sides, use a single value
 * - To define up-down left-right, use a `[Y, X]` array
 * - To define each side, use `[top, right, bottom, left]` array
 * - Or `{vertical: SideValue, horizontal: SideValue}`
 * - Or `{top: SideValue, right: SideValue, bottom: SideValue, left: SideValue}`
 *
 * @template T
 * @typedef {T | [T, T] | [T, T, T, T] | { vertical: T; horizontal: T } | ExpandedSideDefinition<T>} SideDefinition<T>
 **/

/**
 * @template T
 * @typedef {{ top: T; right: T; bottom: T; left: T }} ExpandedSideDefinition<T>
 */

/**
 * Convert any side definition into a static structure
 *
 * @template S
 * @template D
 * @template O
 * @template {S | D} T
 * @param {SideDefinition<S>} sides - The sides to convert
 * @param {SideDefinition<D>} defaultDefinition - The value to use when no definition is provided
 * @param {function(T): O} transformer - The transformation to apply to the sides once normalized
 * @returns {ExpandedSideDefinition<O>}
 */
export function normalizeSides(
  sides,
  defaultDefinition = undefined,
  transformer = (v) => v
) {
  if (
    sides === undefined ||
    sides === null ||
    (typeof sides === 'object' && Object.keys(sides).length === 0)
  ) {
    sides = defaultDefinition;
  }
  if (typeof sides !== 'object' || sides === null) {
    sides = [sides, sides, sides, sides];
  }
  if (Array.isArray(sides)) {
    if (sides.length === 2) {
      sides = { vertical: sides[0], horizontal: sides[1] };
    } else {
      sides = {
        top: sides[0],
        right: sides[1],
        bottom: sides[2],
        left: sides[3]
      };
    }
  }

  if ('vertical' in sides || 'horizontal' in sides) {
    sides = {
      top: sides.vertical,
      right: sides.horizontal,
      bottom: sides.vertical,
      left: sides.horizontal
    };
  }

  return {
    top: transformer(sides.top),
    right: transformer(sides.right),
    bottom: transformer(sides.bottom),
    left: transformer(sides.left)
  };
}

export const MM_TO_CM = 1 / 10; // 1MM = 1CM
export const CM_TO_IN = 1 / 2.54; // 1CM = 1/2.54 IN
export const PX_TO_IN = 1 / 96; // 1 PX = 1/96 IN
export const IN_TO_PT = 72; // 1 IN = 72 PT
export const PC_TO_PT = 12; // 1 PC = 12 PT

/**
 * Get cosine in degrees of a
 *
 * Rounding errors are handled
 * @param a
 * @returns {number}
 */
export function cosine(a) {
  if (a === 0) return 1;
  if (a === 90) return 0;
  if (a === 180) return -1;
  if (a === 270) return 0;
  return Math.cos((a * Math.PI) / 180);
}

/**
 * Get sine in degrees of a
 *
 * Rounding errors are handled
 * @param a
 * @returns {number}
 */
export function sine(a) {
  if (a === 0) return 0;
  if (a === 90) return 1;
  if (a === 180) return 0;
  if (a === 270) return -1;
  return Math.sin((a * Math.PI) / 180);
}
