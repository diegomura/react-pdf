import english from 'hyphenation.en-us';
import Hypher from 'hypher';
import linebreak from './linebreak';

const SOFT_HYPHEN_HEX = '\u00ad';
const NO_BREAK_SPACE_DECIMAL = 160;

const getWords = glyphString => {
  const words = [];
  const { start } = glyphString;
  let lastIndex = 0;

  for (const { index } of glyphString) {
    const codePoint = glyphString.codePointAtGlyphIndex(index);

    // Not break words in no-break-spaces
    if (codePoint === NO_BREAK_SPACE_DECIMAL) {
      continue;
    }

    if (glyphString.isWhiteSpace(index - start)) {
      const word = glyphString.slice(lastIndex, index - start);

      if (word.length > 0) {
        words.push(word);
      }

      lastIndex = index - start + 1;
    }
  }

  if (lastIndex < glyphString.end) {
    const word = glyphString.slice(
      lastIndex,
      glyphString.end - glyphString.start,
    );
    words.push(word);
  }

  return words;
};

const h = new Hypher(english);
const hyphenateString = string => {
  if (string.includes(SOFT_HYPHEN_HEX)) {
    return string.split(SOFT_HYPHEN_HEX);
  }

  return h.hyphenate(string);
};

const hyphenateWord = glyphString => {
  const hyphenated = hyphenateString(glyphString.string);

  let index = 0;
  const parts = hyphenated.map(part => {
    const res = glyphString.slice(index, index + part.length);
    index += part.length;
    return res;
  });

  return parts;
};

const hyphenate = words => words.map(word => hyphenateWord(word));

const formatter = (measureText, textAlign, callback, penalty) => {
  const spaceWidth = measureText(' ');
  const hyphenWidth = measureText('-');
  const hyphenPenalty =
    penalty || (!textAlign || textAlign === 'justify' ? 100 : 600);

  const opts = {
    width: 3,
    stretch: 6,
    shrink: 9,
  };

  return glyphString => {
    const nodes = [];
    const words = getWords(glyphString);
    const spaceStretch = (spaceWidth * opts.width) / opts.stretch;
    const spaceShrink = (spaceWidth * opts.width) / opts.shrink;
    const hyphenationCallback = callback || hyphenate;
    const hyphenatedWords = hyphenationCallback(words, glyphString);

    hyphenatedWords.forEach((word, index, array) => {
      if (word.length > 1) {
        word.forEach((part, partIndex, partArray) => {
          const isLastPart = partIndex === word.length - 1;

          nodes.push(linebreak.box(measureText(part), part, !isLastPart));

          if (partIndex !== partArray.length - 1) {
            nodes.push(linebreak.penalty(hyphenWidth, hyphenPenalty, 1));
          }
        });
      } else {
        nodes.push(linebreak.box(measureText(word[0]), word[0]));
      }
      if (index === array.length - 1) {
        nodes.push(linebreak.glue(0, linebreak.infinity, 0));
        nodes.push(linebreak.penalty(0, -linebreak.infinity, 1));
      } else {
        nodes.push(linebreak.glue(spaceWidth, spaceStretch, spaceShrink));
      }
    });

    return nodes;
  };
};

export default formatter;
