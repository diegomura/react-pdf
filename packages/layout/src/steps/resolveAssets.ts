import * as P from '@react-pdf/primitives';
import FontStore from '@react-pdf/font';
import { castArray } from '@react-pdf/fns';

import fetchEmojis from '../text/emoji';
import fetchImage from '../image/fetchImage';
import { SafeImageNode, SafeNode } from '../types';

const isImage = (node: SafeNode): node is SafeImageNode =>
  node.type === P.Image;

/**
 * Get all asset promises that need to be resolved
 *
 * @param fontStore - Font store
 * @param node - Root node
 * @returns Asset promises
 */
const fetchAssets = (fontStore: FontStore, node: SafeNode) => {
  const promises: Promise<void>[] = [];
  const listToExplore = node.children?.slice(0) || [];
  const emojiSource = fontStore ? fontStore.getEmojiSource() : null;

  while (listToExplore.length > 0) {
    const n = listToExplore.shift();

    if (isImage(n)) {
      promises.push(fetchImage(n));
    }

    if (fontStore && n.style?.fontFamily) {
      const fontFamilies = castArray(n.style.fontFamily);

      promises.push(
        ...fontFamilies.map((fontFamily) =>
          fontStore.load({
            fontFamily,
            fontStyle: n.style.fontStyle,
            fontWeight: n.style.fontWeight,
          }),
        ),
      );
    }

    if (typeof n === 'string') {
      promises.push(...fetchEmojis(n, emojiSource));
    }

    if ('value' in n && typeof n.value === 'string') {
      promises.push(...fetchEmojis(n.value, emojiSource));
    }

    if (n.children) {
      n.children.forEach((childNode) => {
        listToExplore.push(childNode);
      });
    }
  }

  return promises;
};

/**
 * Fetch image, font and emoji assets in parallel.
 * Layout process will not be resumed until promise resolves.
 *
 * @param node root node
 * @param fontStore font store
 * @returns Root node
 */
const resolveAssets = async (node: SafeNode, fontStore: FontStore) => {
  const promises = fetchAssets(fontStore, node);
  await Promise.all(promises);
  return node;
};

export default resolveAssets;
