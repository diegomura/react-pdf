import * as P from '@react-pdf/primitives';

import { embedEmojis } from './emoji';
import ignoreChars from './ignoreChars';
import fromFragments from './fromFragments';
import transformText from './transformText';

const PREPROCESSORS = [ignoreChars, embedEmojis];

const isImage = node => node.type === P.Image;

const isTextInstance = node => node.type === P.TextInstance;

/**
 * Get textkit fragments of given node object
 *
 * @param {Object} font store
 * @param {Object} instance node
 * @returns {Array} text fragments
 */
const getFragments = (fontStore, instance, parentLink, level = 0) => {
  if (!instance) return [{ string: '' }];

  let fragments = [];

  const {
    color = 'black',
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
    verticalAlign,
  } = instance.style;

  const opts = { fontFamily, fontWeight, fontStyle };
  const obj = fontStore ? fontStore.getFont(opts) : null;
  const font = obj ? obj.data : fontFamily;

  // Don't pass main background color to textkit. Will be rendered by the render package instead
  const backgroundColor = level === 0 ? null : instance.style.backgroundColor;

  const attributes = {
    font,
    color,
    opacity,
    fontSize,
    backgroundColor,
    align: textAlign,
    indent: textIndent,
    characterSpacing: letterSpacing,
    strikeStyle: textDecorationStyle,
    underlineStyle: textDecorationStyle,
    underline:
      textDecoration === 'underline' ||
      textDecoration === 'underline line-through' ||
      textDecoration === 'line-through underline',
    strike:
      textDecoration === 'line-through' ||
      textDecoration === 'underline line-through' ||
      textDecoration === 'line-through underline',
    strikeColor: textDecorationColor || color,
    underlineColor: textDecorationColor || color,
    link: parentLink || instance.props?.src || instance.props?.href,
    lineHeight: lineHeight ? lineHeight * fontSize : null,
    verticalAlign,
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
      fragments.push(
        ...getFragments(fontStore, child, attributes.link, level + 1),
      );
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
 * @param {Object} font store
 * @param {Object} instance node
 * @returns {Object} attributed string
 */
const getAttributedString = (fontStore, instance) => {
  const fragments = getFragments(fontStore, instance);
  return fromFragments(fragments);
};

export default getAttributedString;
