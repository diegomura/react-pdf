import * as R from 'ramda';

import Font from '../font';
import isImage from '../node/isImage';
import fetchImage from '../image/fetchImage';
import { fetchEmojis } from '../text/emoji';

/**
 * Get all asset promises that need to be resolved
 *
 * @param {Object} root node
 * @returns {Array} asset promises
 */
const fetchAssets = node => {
  const promises = [];
  const listToExplore = node.children.slice(0);

  while (listToExplore.length > 0) {
    const node = listToExplore.shift();

    if (isImage(node)) {
      promises.push(fetchImage(node));
    }

    if (node.style && node.style.fontFamily) {
      promises.push(Font.load(node.style));
    }

    if (typeof node === 'string') {
      promises.push(...fetchEmojis(node));
    }

    if (typeof node.value === 'string') {
      promises.push(...fetchEmojis(node.value));
    }

    if (node.children) {
      node.children.forEach(childNode => {
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
 * @returns {Object} root node
 */
const resolveAssets = node =>
  R.compose(
    R.then(R.always(node)),
    p => Promise.all(p),
    fetchAssets,
  )(node);

export default resolveAssets;
