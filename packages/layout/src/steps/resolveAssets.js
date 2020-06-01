import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

import Font from '../font';
import fetchImage from '../image/fetchImage';
import { fetchEmojis } from '../text/emoji';

const isImage = R.propEq('type', P.Image);

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
    const n = listToExplore.shift();

    if (isImage(n)) {
      promises.push(fetchImage(n));
    }

    if (n.style && n.style.fontFamily) {
      promises.push(Font.load(n.style));
    }

    if (typeof n === 'string') {
      promises.push(...fetchEmojis(n));
    }

    if (typeof n.value === 'string') {
      promises.push(...fetchEmojis(n.value));
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
 * @returns {Object} root node
 */
const resolveAssets = node =>
  R.compose(R.then(R.always(node)), p => Promise.all(p), fetchAssets)(node);

export default resolveAssets;
