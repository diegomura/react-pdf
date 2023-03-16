/* eslint-disable no-cond-assign */
import emojiRegex from 'emoji-regex';
import resolveImage from '@react-pdf/image';

// Caches emoji images data
const emojis = {};
const regex = emojiRegex();

const reflect = promise => (...args) =>
  promise(...args).then(
    v => v,
    e => e,
  );

// Returns a function to be able to mock resolveImage.
const makeFetchEmojiImage = () => reflect(resolveImage);

/**
 * When an emoji as no color, it might still have 2 parts,
 * the canonical emoji and an empty string.
 * ex.
 *   (no color) Array.from('❤️') => ["❤", "️"]
 *   (w/ color) Array.from('👍🏿') => ["👍", "🏿"]
 *
 * The empty string needs to be removed otherwise the generated
 * url will be incorect.
 */
const _removeNoColor = x => x !== '️';

const getCodePoints = string =>
  Array.from(string)
    .filter(_removeNoColor)
    .map(char => char.codePointAt(0).toString(16))
    .join('-');

const buildEmojiUrl = (emoji, source) => {
  const { url, format, builder } = source;
  if (typeof builder === 'function') {
    return builder(getCodePoints(emoji));
  }

  return `${url}${getCodePoints(emoji)}.${format}`;
};

export const fetchEmojis = (string, source) => {
  if (!source || (!source.url && !source.builder)) return [];

  const promises = [];

  let match;

  while ((match = regex.exec(string))) {
    const emoji = match[0];

    if (!emojis[emoji] || emojis[emoji].loading) {
      const emojiUrl = buildEmojiUrl(emoji, source);

      emojis[emoji] = { loading: true };
      const fetchEmojiImage = makeFetchEmojiImage();
      promises.push(
        fetchEmojiImage({ uri: emojiUrl }).then(image => {
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

  for (let i = 0; i < fragments.length; i += 1) {
    const fragment = fragments[i];

    let match;
    let lastIndex = 0;

    while ((match = regex.exec(fragment.string))) {
      const { index } = match;
      const emoji = match[0];
      const emojiSize = fragment.attributes.fontSize;
      const chunk = fragment.string.slice(lastIndex, index + match[0].length);

      // If emoji image was found, we create a new fragment with the
      // correct attachment and object substitution character;
      if (emojis[emoji] && emojis[emoji].data) {
        result.push({
          string: chunk.replace(match, String.fromCharCode(0xfffc)),
          attributes: {
            ...fragment.attributes,
            attachment: {
              width: emojiSize,
              height: emojiSize,
              yOffset: Math.floor(emojiSize * 0.1),
              image: emojis[emoji].data,
            },
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

export default fetchEmojis;
