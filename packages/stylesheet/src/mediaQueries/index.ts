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
  return Object.entries(style).reduce<Style>((acc, [key, value]) => {
    if (key.startsWith('@media')) {
      return { ...acc, ...matchMedia({ [key]: value }, container) };
    }

    return { ...acc, [key]: value };
  }, {} as Style);
};

export default resolveMediaQueries;
