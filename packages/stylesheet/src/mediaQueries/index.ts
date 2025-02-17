import matchMedia from 'media-engine';

import { Container, Style } from '../types';

/**
 * Resolves media queries in styles object
 *
 * @param container - Container for which styles are resolved
 * @param style - Style description
 * @returns Resolved style object
 */
const resolveMediaQueries = (container: Container, style: Style): Style => {
  return Object.keys(style).reduce((acc, key) => {
    if (/@media/.test(key)) {
      return {
        ...acc,
        ...matchMedia({ [key]: style[key] }, container),
      };
    }

    return { ...acc, [key]: style[key] };
  }, {});
};

export default resolveMediaQueries;
