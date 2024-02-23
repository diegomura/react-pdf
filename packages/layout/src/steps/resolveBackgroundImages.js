import fetchBackgroundImage from '../image/fetchBackgroundImage';

const isBackgroundImage = (node) => !!node?.style?.backgroundImage;

/**
 * Get all asset promises that need to be resolved
 *
 * @param {Object} node root node
 * @returns {Promise<void>[]} asset promises
 */
const fetchAssets = (node) => {
  const promises = [];
  const listToExplore = node.children?.slice(0) || [];

  while (listToExplore.length > 0) {
    const n = listToExplore.shift();

    if (isBackgroundImage(n)) {
      console.log(n?.style?.backgroundImage);
      promises.push(fetchBackgroundImage(n));
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
 * @param {Object} node root node
 * @returns {Promise<Object>} root node
 */
const resolveBackgroundImages = async (node) => {
  const promises = fetchAssets(node);
  await Promise.all(promises);
  return node;
};

export default resolveBackgroundImages;
