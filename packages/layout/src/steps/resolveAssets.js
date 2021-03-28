import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

import fetchEmojis from '../text/emoji';
import fetchImage from '../image/fetchImage';

const isImage = R.propEq('type', P.Image);

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
      promises.push(fetchImage(n));
    }

    if (fontStore && n.style && n.style.fontFamily) {
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

/**
 * Fetch image, font and emoji assets in parallel.
 * Layout process will not be resumed until promise resolves.
 *
 * @param {Object} root node
 * @param {Object} fontStore font store
 * @returns {Object} root node
 */
const resolveAssets = (node, fontStore) =>
  R.compose(
    R.then(R.always(node)),
    p => Promise.all(p),
    fetchAssets,
  )(fontStore, node);

export default resolveAssets;
