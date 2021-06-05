import * as R from 'ramda';

/**
 * Apply default style to run
 *
 * @param  {Object}  run
 * @return {Object} run with styles
 */
const applyRunStyles = R.evolve({
  attributes: a => ({
    align: a.align || 'left',
    alignLastLine:
      a.alignLastLine || (a.align === 'justify' ? 'left' : a.align || 'left'),
    attachment: a.attachment || null,
    backgroundColor: a.backgroundColor || null,
    bidiLevel: a.bidiLevel || null,
    bullet: a.bullet || null,
    characterSpacing: a.characterSpacing || 0,
    color: a.color || 'black',
    features: a.features || [],
    fill: a.fill !== false,
    font: a.font || null,
    fontSize: a.fontSize || 12,
    hangingPunctuation: a.hangingPunctuation || false,
    hyphenationFactor: a.hyphenationFactor || 0,
    indent: a.indent || 0,
    justificationFactor: a.justificationFactor || 1,
    lineHeight: a.lineHeight || null,
    lineSpacing: a.lineSpacing || 0,
    link: a.link || null,
    marginLeft: a.marginLeft || a.margin || 0,
    marginRight: a.marginRight || a.margin || 0,
    opacity: a.opacity,
    paddingTop: a.paddingTop || a.padding || 0,
    paragraphSpacing: a.paragraphSpacing || 0,
    underline: a.underline || false,
    underlineColor: a.underlineColor || a.color || 'black',
    underlineStyle: a.underlineStyle || 'solid',
    script: a.script || null,
    shrinkFactor: a.shrinkFactor || 0,
    strike: a.strike || false,
    strikeColor: a.strikeColor || a.color || 'black',
    strikeStyle: a.strikeStyle || 'solid',
    stroke: a.stroke || false,
    wordSpacing: a.wordSpacing || 0,
    yOffset: a.yOffset || 0,
  }),
});

/**
 * Apply default attributes for an attributed string
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} attributed string
 */
const applyDefaultStyles = () =>
  R.applySpec({
    string: R.propOr('', 'string'),
    runs: R.compose(R.map(applyRunStyles), R.defaultTo([]), R.prop('runs')),
  });

export default applyDefaultStyles;
