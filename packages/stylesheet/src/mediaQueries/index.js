import matchMedia from 'media-engine';

/**
 * Resolves media queries in styles object
 *
 * @param {Object} container
 * @param {Object} styles object
 */
const resolveMediaQueries = (container, styles) => {
  return Object.keys(styles).reduce((acc, key) => {
    if (/@media/.test(key)) {
      return {
        ...acc,
        ...matchMedia({ [key]: styles[key] }, container),
      };
    }

    return { ...acc, [key]: styles[key] };
  }, {});
};

export default resolveMediaQueries;
