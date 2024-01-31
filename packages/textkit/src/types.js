/**
 * @typedef {Object} AttributedString
 * @property {string} [string]
 * @property {string[]} [syllables]
 * @property {Run[]} [runs]
 */

/**
 * @typedef {Object} Attachment
 * @property {number} [x]
 * @property {number} [y]
 * @property {number} [width]
 * @property {number} [height]
 */

/**
 * @typedef {Object} Attributes
 * @property {string} [align]
 * @property {string} [alignLastLine]
 * @property {Attachment} [attachment]
 * @property {string} [backgroundColor]
 * @property {unknown} [bidiLevel]
 * @property {unknown} [bullet]
 * @property {number} [characterSpacing]
 * @property {string} [color]
 * @property {unknown[]} [features]
 * @property {boolean} [fill]
 * @property {Font | string} [font]
 * @property {number} [fontSize]
 * @property {boolean} [hangingPunctuation]
 * @property {number} [hyphenationFactor]
 * @property {number} [indent]
 * @property {number} [justificationFactor]
 * @property {number} [lineHeight]
 * @property {number} [lineSpacing]
 * @property {unknown} [link]
 * @property {number} [margin]
 * @property {number} [marginLeft]
 * @property {number} [marginRight]
 * @property {number} [opacity]
 * @property {number} [padding]
 * @property {number} [paddingTop]
 * @property {number} [paragraphSpacing]
 * @property {number} [scale]
 * @property {unknown} [script]
 * @property {number} [shrinkFactor]
 * @property {boolean} [strike]
 * @property {string} [strikeColor]
 * @property {string} [strikeStyle]
 * @property {boolean} [stroke]
 * @property {boolean} [underline]
 * @property {string} [underlineColor]
 * @property {string} [underlineStyle]
 * @property {string} [verticalAlign]
 * @property {number} [wordSpacing]
 * @property {number} [yOffset]
 */

/**
 * @typedef {Object} Fragment
 * @property {string} string
 * @property {Attributes} [attributes]
 */

/**
 * @typedef {Object} Glyph
 * @property {number} [id]
 * @property {number} [advanceWidth]
 * @property {number[]} [codePoints]
 */

/**
 * @typedef {Object} Font
 * @property {number} [ascent]
 * @property {number} [descent]
 * @property {number} [height]
 * @property {number} [unitsPerEm]
 * @property {Function} [glyphForCodePoint]
 * @property {Function} [layout]
 */

/**
 * @typedef {['start' | 'end', number, Attributes, number]} Point
 */

/**
 * @typedef {Object} Position
 * @property {number} [xAdvance]
 * @property {number} [yAdvance]
 * @property {number} [xOffset]
 * @property {number} [yOffset]
 * @property {number} [advanceWidth]
 */

/**
 * @typedef {Object} Rect
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {Object} Run
 * @property {number} [start]
 * @property {number} [end]
 * @property {number[]} [glyphIndices]
 * @property {Glyph[]} [glyphs]
 * @property {Position[]} [positions]
 * @property {Attributes} [attributes]
 */

module.exports = {};
