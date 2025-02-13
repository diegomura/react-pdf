import matchMedia from 'media-engine';

import { Container, Style } from '../types';

/**
 * Resolves media queries in styles object
 *
 * @param container - Container for which styles are resolved
 * @param style - Style description
 * @returns Resolved style object
 */
const resolveMediaQueries = (container: Container, styles: Style): Style => {
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
