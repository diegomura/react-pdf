import * as P from '@nutshelllabs/primitives';

import fetchEmojis from '../text/emoji';
import fetchImage from '../image/fetchImage';

const isImage = node => node.type === P.Image;

/**
 * Get all asset promises that need to be resolved
 *
 * @param {Object} root node
 * @returns {Array} asset promises
 */
const fetchAssets = (fontStore, node) => {
  const promises = [];
  const listToExplore = node.children?.slice(0) || [];
  const emojiSource = fontStore ? fontStore.getEmojiSource() : null;

  while (listToExplore.length > 0) {
    const n = listToExplore.shift();

    if (isImage(n)) {
      if (!n.image) {
        promises.push(fetchImage(n));
      }
    }

    if (fontStore && n.style?.fontFamily) {
      promises.push(fontStore.load(n.style));
    }

    if (typeof n === 'string') {
      promises.push(...fetchEmojis(n, emojiSource));
    }

    if (typeof n.value === 'string') {
      promises.push(...fetchEmojis(n.value, emojiSource));
    }

    if (n.children) {
      n.children.forEach(childNode => {
        listToExplore.push(childNode);
      });
    }
  }

  return promises;
};

const traverseImageAssets = (node, cb) => {
  const nodesToExplore = node.children?.slice(0) || [];
  while (nodesToExplore.length > 0) {
    const n = nodesToExplore.shift();
    if (n.type === 'IMAGE') {
      cb(n);
    }
    if (n.children) {
      n.children.forEach(childNode => {
        nodesToExplore.push(childNode);
      });
    }
  }
};

/**
 * Fetch image, font and emoji assets in parallel.
 * Layout process will not be resumed until promise resolves.
 *
 * @param {Object} root node
 * @param {Object} fontStore font store
 * @returns {Object} root node
 */
const resolveAssets = async (node, fontStore, cache) => {
  // checks if there are any image nodes which need to be resolved with fetchImage
  const imagesPromises = [];
  traverseImageAssets(node, n => {
    if (!n.image) {
      imagesPromises.push(fetchImage(n));
    }
  });

  if (imagesPromises.length > 0) {
    await Promise.all(imagesPromises);
  }

  if (cache && node.props.cacheId && node.props.cacheId in cache) {
    return node;
  }

  const promises = fetchAssets(fontStore, node);
  await Promise.all(promises);

  if (cache && node.props.cacheId) {
    // eslint-disable-next-line no-param-reassign
    cache[node.props.cacheId] = true;
  }

  return node;
};

export default resolveAssets;
