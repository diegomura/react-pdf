import * as P from '@react-pdf/primitives';
import { Font, Fragment, fromFragments } from '@react-pdf/textkit';
import FontStore from '@react-pdf/font';

import { embedEmojis } from './emoji';
import ignoreChars from './ignoreChars';
import transformText from './transformText';
import {
  SafeNode,
  SafeTextNode,
  SafeImageNode,
  SafeTextInstanceNode,
  SafeTspanNode,
} from '../types';

const PREPROCESSORS = [ignoreChars, embedEmojis];

const isImage = (node: SafeNode): node is SafeImageNode =>
  node.type === P.Image;

const isTextInstance = (node: SafeNode): node is SafeTextInstanceNode =>
  node.type === P.TextInstance;

/**
 * Get textkit fragments of given node object
 *
 * @param fontStore - Font store
 * @param instance - Node
 * @param parentLink - Parent link
 * @param level - Fragment level
 * @returns Text fragments
 */
const getFragments = (
  fontStore: FontStore,
  instance: SafeTextNode | SafeTspanNode,
  parentLink = null,
  level = 0,
) => {
  if (!instance) return [{ string: '' }];

  let fragments: Fragment[] = [];

  const {
    color = 'black',
    direction = 'ltr',
    fontFamily = 'Helvetica',
    fontWeight,
    fontStyle,
    fontSize = 18,
    textAlign,
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

  const fontFamilies =
    typeof fontFamily === 'string' ? [fontFamily] : [...(fontFamily || [])];

  // Fallback font
  fontFamilies.push('Helvetica');

  // TODO: Fix multiple fonts passed
  const font = fontFamilies.map((fontFamilyName) => {
    if (typeof fontFamilyName !== 'string') return fontFamilyName;

    const opts = { fontFamily: fontFamilyName, fontWeight, fontStyle };
    const obj = fontStore.getFont(opts);
    return obj ? obj.data : fontFamilyName;
  }) as Font[];

  // Don't pass main background color to textkit. Will be rendered by the render package instead
  const backgroundColor = level === 0 ? null : instance.style.backgroundColor;

  const attributes = {
    font,
    color,
    opacity,
    fontSize,
    lineHeight,
    direction,
    verticalAlign,
    backgroundColor,
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
    // @ts-expect-error allow this props access
    link: parentLink || instance.props?.src || instance.props?.href,
    align: textAlign || (direction === 'rtl' ? 'right' : 'left'),
  };

  for (let i = 0; i < instance.children.length; i += 1) {
    const child = instance.children[i];

    if (isImage(child)) {
      fragments.push({
        string: String.fromCharCode(0xfffc),
        // @ts-expect-error custom font substitution engine deals with multiple fonts. unify with textkit
        attributes: {
          ...attributes,
          attachment: {
            width: (child.style.width || fontSize) as number,
            height: (child.style.height || fontSize) as number,
            image: child.image.data,
          },
        },
      });
    } else if (isTextInstance(child)) {
      fragments.push({
        string: transformText(child.value, textTransform),
        // @ts-expect-error custom font substitution engine deals with multiple fonts. unify with textkit
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
 * @param fontStore - Font store
 * @param instance Node
 * @returns Attributed string
 */
const getAttributedString = (fontStore: FontStore, instance: SafeTextNode) => {
  const fragments = getFragments(fontStore, instance);
  return fromFragments(fragments);
};

export default getAttributedString;
