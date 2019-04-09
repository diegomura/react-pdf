import AttributedString from '@react-pdf/textkit/attributedString';

import Font from '../font';
import { embedEmojis } from './emoji';
import { ignoreChars } from './ignorableChars';

const PREPROCESSORS = [ignoreChars, embedEmojis];

const capitalize = value => value.replace(/(^|\s)\S/g, l => l.toUpperCase());

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
    opacity,
  } = instance.style;

  instance.children.forEach(child => {
    if (child.value !== null && child.value !== undefined) {
      const obj = Font.getFont({ fontFamily, fontWeight, fontStyle });
      const font = obj ? obj.data : fontFamily;
      const string = transformText(child.value, textTransform);

      fragments.push({
        string,
        attributes: {
          font,
          color,
          opacity,
          fontSize,
          backgroundColor,
          align: textAlign,
          link: instance.src,
          characterSpacing: letterSpacing,
          underlineStyle: textDecorationStyle,
          underline: textDecoration === 'underline',
          underlineColor: textDecorationColor || color,
          lineHeight: lineHeight ? lineHeight * fontSize : null,
        },
      });
    } else {
      if (child) {
        fragments.push(...getFragments(child));
      }
    }
  });

  for (const preprocessor of PREPROCESSORS) {
    fragments = preprocessor(fragments);
  }

  return fragments;
};

export const getAttributedString = instance => {
  return AttributedString.fromFragments(getFragments(instance));
};
