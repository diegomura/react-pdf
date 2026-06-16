import * as P from '@react-pdf/primitives';
import FontStore from '@react-pdf/font';
import { castArray } from '@react-pdf/fns';

import fetchEmojis from '../text/emoji';
import fetchImage from '../image/fetchImage';
import {
  SafeDocumentNode,
  SafeImageNode,
  SafeImageBackgroundNode,
  SafeNode,
  SafePageNode,
} from '../types';

const isImage = (node: SafeNode): node is SafeImageNode =>
  node.type === P.Image;

const isImageBackground = (node: SafeNode): node is SafeImageBackgroundNode =>
  node.type === P.ImageBackground;

/**
 * Get all asset promises that need to be resolved
 *
 * @param fontStore - Font store
 * @param node - Root node
 * @returns Asset promises
 */
const fetchAssets = (
  fontStore: FontStore,
  node: SafeNode,
  pageWidth: number,
) => {
  const promises: Promise<void>[] = [];
  const listToExplore = [node];
  const emojiSource = fontStore ? fontStore.getEmojiSource() : null;

  while (listToExplore.length > 0) {
    const n = listToExplore.shift();

    if (isImage(n) || isImageBackground(n)) {
      promises.push(fetchImage(n, pageWidth));
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
 * Fetch assets for a page
 *
 * @param fontStore - Font store
 * @param page - Page node
 * @returns Asset promises
 */
const fetchPageAssets = (fontStore: FontStore, page: SafePageNode) => {
  const pageWidth = page.style?.width as number;

  return page.children
    ?.map((child) => fetchAssets(fontStore, child, pageWidth))
    .flat();
};

/**
 * Fetch image, font and emoji assets in parallel.
 * Layout process will not be resumed until promise resolves.
 *
 * @param node root node
 * @param fontStore font store
 * @returns Root node
 */
const resolveAssets = async (node: SafeDocumentNode, fontStore: FontStore) => {
  const promises = node.children
    .map((page) => fetchPageAssets(fontStore, page))
    .flat();

  await Promise.all(promises);

  return node;
};

export default resolveAssets;
