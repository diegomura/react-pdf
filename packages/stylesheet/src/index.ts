import { compose } from '@react-pdf/fns';

import flattenStyles from './flatten';
import resolveMediaQueries from './mediaQueries';
import { Container, Style } from './types';
import resolveStyle from './resolve';

type StyleParam = Style | null | undefined;
/**
 * Resolves styles
 *
 * @param container
 * @param style - Style
 * @returns Resolved style
 */
const resolveStyles = (
  container: Container,
  style: StyleParam | StyleParam[],
) => {
  const computeMediaQueries = (value) => resolveMediaQueries(container, value);

  return compose(
    resolveStyle(container),
    computeMediaQueries,
    flattenStyles,
  )(style);
};

// Utils exported for SVG processing
export { default as transformColor } from './transform/colors';

export { default as processTransform } from './transform/transform';

export { default as flatten } from './flatten';

export default resolveStyles;
