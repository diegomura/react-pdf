import unicode from 'emoji-unicode-map';
import { Attachment } from '@react-pdf/text-layout';
import { fetchImage } from '../utils/image';

const emojis = {};
const ranges = [
  '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
  '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
  '\ud83d[\ude80-\udeff]', // U+1F680 to U+1F6FF
].join('|');

export const fetchEmojis = string => {
  const match = string.match(ranges);

  if (match) {
    const emoji = match[0];
    const emojiName = unicode.get(emoji);

    if (!emojis[emojiName] || emojis[emojiName].loading) {
      emojis[emojiName] = { loading: true };

      return fetchImage(
        `https://assets.github.com/images/icons/emoji/${emojiName}.png`,
      ).then(image => {
        emojis[emojiName].loading = false;
        emojis[emojiName].data = image.data;
      });
    }
  }

  return null;
};

export const embedEmojis = ({ string, attributes }) => {
  const match = string.match(ranges);

  if (match) {
    const emoji = match[0];
    const emojiName = unicode.get(emoji);
    const emojiSize = attributes.fontSize;
    const attachment = new Attachment(emojiSize, emojiSize, {
      yOffset: Math.floor(emojiSize * 0.1),
      image: emojis[emojiName].data,
    });

    return {
      string: string.replace(match, Attachment.CHARACTER),
      attributes: {
        attachment,
        ...attributes,
      },
    };
  }

  return { string, attributes };
};
