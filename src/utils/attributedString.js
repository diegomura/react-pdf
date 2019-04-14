import { isNil, propEq, prop, complement, compose } from 'ramda';
import AttributedString from '@react-pdf/textkit/attributedString';

import Font from '../font';
import { embedEmojis } from './emoji';
import { ignoreChars } from './ignorableChars';

const PREPROCESSORS = [ignoreChars, embedEmojis];

const capitalize = value => value.replace(/(^|\s)\S/g, l => l.toUpperCase());

const isImage = propEq('name', 'Image');

const isTextInstance = compose(
  complement(isNil),
  prop('value'),
);

const transformText = (text, transformation) => {
  switch (transformation) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalize':
      return capitalize(text);
    default:
      return text;
  }
};

export const getFragments = instance => {
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

  const obj = Font.getFont({ fontFamily, fontWeight, fontStyle });
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

  instance.children.forEach(child => {
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
    } else {
      if (child) {
        fragments.push(...getFragments(child));
      }
    }
  });

  // console.log(fragments);

  for (const preprocessor of PREPROCESSORS) {
    fragments = preprocessor(fragments);
  }

  return fragments;
};

export const getAttributedString = instance => {
  return AttributedString.fromFragments(getFragments(instance));
};
