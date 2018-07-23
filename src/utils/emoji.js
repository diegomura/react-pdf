/* eslint-disable no-cond-assign */
import emojiRegex from 'emoji-regex';
import Font from '../font';
import { Attachment } from '../layout';
import { fetchImage } from '../utils/image';

// Caches emoji images data
const emojis = {};
const regex = emojiRegex();

const reflect = promise => (...args) => promise(...args).then(v => v, e => e);

const fetchEmojiImage = reflect(fetchImage);

const getCodePoints = string =>
  Array.from(string)
    .map(char => char.codePointAt(0).toString(16))
    .join('-');

const buildEmojiUrl = emoji => {
  const { url, format } = Font.getEmojiSource();
  return `${url}${getCodePoints(emoji)}.${format}`;
};

let warnPrinted = false;
export const fetchEmojis = string => {
  const emojiSource = Font.getEmojiSource();

  if (!emojiSource || !emojiSource.url) {
    if (!warnPrinted) {
      console.warn('Emoji source not registered');
      warnPrinted = true;
    }
    return [];
  }

  const promises = [];

  let match;
  while ((match = regex.exec(string))) {
    const emoji = match[0];

    if (!emojis[emoji] || emojis[emoji].loading) {
      const emojiUrl = buildEmojiUrl(emoji);

      emojis[emoji] = { loading: true };

      promises.push(
        fetchEmojiImage(emojiUrl).then(image => {
          emojis[emoji].loading = false;
          emojis[emoji].data = image.data;
        }),
      );
    }
  }

  return promises;
};

export const embedEmojis = fragments => {
  const result = [];

  for (let i = 0; i < fragments.length; i++) {
    const fragment = fragments[i];

    let match;
    let lastIndex = 0;

    while ((match = regex.exec(fragment.string))) {
      const index = match.index;
      const emoji = match[0];
      const emojiSize = fragment.attributes.fontSize;
      const chunk = fragment.string.slice(lastIndex, index + match[0].length);

      // If emoji image was found, we create a new fragment with the
      // correct attachment and object substitution character;
      if (emojis[emoji] && emojis[emoji].data) {
        result.push({
          string: chunk.replace(match, Attachment.CHARACTER),
          attributes: {
            ...fragment.attributes,
            attachment: new Attachment(emojiSize, emojiSize, {
              yOffset: Math.floor(emojiSize * 0.1),
              image: emojis[emoji].data,
            }),
          },
        });
      } else {
        // If no emoji data, we just replace the emoji with a nodef char
        result.push({
          string: chunk.replace(match, String.fromCharCode(0)),
          attributes: fragment.attributes,
        });
      }

      lastIndex = index + emoji.length;
    }

    if (lastIndex < fragment.string.length) {
      result.push({
        string: fragment.string.slice(lastIndex),
        attributes: fragment.attributes,
      });
    }
  }

  return result;
};
