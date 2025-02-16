import { AttributedString, Attributes, Run } from '../types';

/**
 * @param attributes - Attributes
 * @returns Attributes with defaults
 */
const applyAttributes = (a: Attributes): Attributes => {
  return {
    align: a.align || (a.direction === 'rtl' ? 'right' : 'left'),
    alignLastLine:
      a.alignLastLine || (a.align === 'justify' ? 'left' : a.align || 'left'),
    attachment: a.attachment || null,
    backgroundColor: a.backgroundColor || null,
    bullet: a.bullet || null,
    characterSpacing: a.characterSpacing || 0,
    color: a.color || 'black',
    direction: a.direction || 'ltr',
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
    script: a.script || null,
    shrinkFactor: a.shrinkFactor || 0,
    strike: a.strike || false,
    strikeColor: a.strikeColor || a.color || 'black',
    strikeStyle: a.strikeStyle || 'solid',
    stroke: a.stroke || false,
    underline: a.underline || false,
    underlineColor: a.underlineColor || a.color || 'black',
    underlineStyle: a.underlineStyle || 'solid',
    verticalAlign: a.verticalAlign || null,
    wordSpacing: a.wordSpacing || 0,
    yOffset: a.yOffset || 0,
  };
};

/**
 * Apply default style to run
 *
 * @param run - Run
 * @returns Run with default styles
 */
const applyRunStyles = (run: Run): Run => {
  const attributes = applyAttributes(run.attributes);
  return Object.assign({}, run, { attributes });
};

/**
 * Apply default attributes for an attributed string
 */
const applyDefaultStyles = () => {
  return (attributedString: AttributedString): AttributedString => {
    const string = attributedString.string || '';
    const runs = (attributedString.runs || []).map(applyRunStyles);

    return { string, runs };
  };
};

export default applyDefaultStyles;
