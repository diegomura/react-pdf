import * as R from 'ramda';
import * as P from '@react-pdf/primitives';
import AttributedString from '@react-pdf/textkit/attributedString';

import { embedEmojis } from './emoji';
import ignoreChars from './ignoreChars';
import transformText from './transformText';

const PREPROCESSORS = [ignoreChars, embedEmojis];

const isType = R.propEq('type');

const isImage = isType(P.Image);

const isTextInstance = isType(P.TextInstance);

/**
 * Get textkit framgents of given node object
 *
 * @param {Object} instance node
 * @returns {Array} text fragments
 */
const getFragments = (fontStore, instance) => {
  if (!instance) return [{ string: '' }];

  let fragments = [];

  const {
    color = 'black',
    backgroundColor,
    fontFamily = 'Helvetica',
    fontWeight,
    fontStyle,
    fontSize = 18,
    textAlign = 'left',
    lineHeight,
    textDecoration,
    textDecorationColor,
    textDecorationStyle,
    textTransform,
    letterSpacing,
    textIndent,
    opacity,
  } = instance.style;

  const opts = { fontFamily, fontWeight, fontStyle };
  const obj = fontStore ? fontStore.getFont(opts) : null;
  const font = obj ? obj.data : fontFamily;

  const attributes = {
    font,
    color,
    opacity,
    fontSize,
    backgroundColor,
    align: textAlign,
    indent: textIndent,
    link: instance.src,
    characterSpacing: letterSpacing,
    underlineStyle: textDecorationStyle,
    underline: textDecoration === 'underline',
    underlineColor: textDecorationColor || color,
    strike: textDecoration === 'line-through',
    strikeStyle: textDecorationStyle,
    strikeColor: textDecorationColor || color,
    lineHeight: lineHeight ? lineHeight * fontSize : null,
  };

  for (let i = 0; i < instance.children.length; i += 1) {
    const child = instance.children[i];

    if (isImage(child)) {
      fragments.push({
        string: String.fromCharCode(0xfffc),
        attributes: {
          ...attributes,
          attachment: {
            width: child.style.width || fontSize,
            height: child.style.height || fontSize,
            image: child.image.data,
          },
        },
      });
    } else if (isTextInstance(child)) {
      fragments.push({
        string: transformText(child.value, textTransform),
        attributes,
      });
    } else if (child) {
      fragments.push(...getFragments(fontStore, child));
    }
  }

  for (let i = 0; i < PREPROCESSORS.length; i += 1) {
    const preprocessor = PREPROCESSORS[i];
    fragments = preprocessor(fragments);
  }

  return fragments;
};

/**
 * Get textkit attributed string from text node
 *
 * @param {Object} instance node
 * @returns {Object} attributed string
 */
const getAttributedString = R.compose(
  AttributedString.fromFragments,
  getFragments,
);

export default R.curryN(2, getAttributedString);
