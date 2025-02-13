import { compose } from '@react-pdf/fns';
import expandStyles from './expand';
import flattenStyles from './flatten/index';
import transformStyles from './transform';
import resolveMediaQueries from './mediaQueries/index';
import { Container, Style } from './types';

/**
 * Resolves styles
 *
 * @param container - Container for which styles are resolved
 * @param style - Style description
 * @returns Eesolved style object
 */
const resolveStyles = (container: Container, style: Style | Style[]) => {
  const computeMediaQueries = (value: Style) =>
    resolveMediaQueries(container, value);

  return compose(
    transformStyles(container),
    expandStyles,
    computeMediaQueries,
    flattenStyles,
  )(style);
};

// Utils exported for SVG processing
export { default as transformColor } from './transform/colors';

export { default as processTransform } from './transform/transform';

export { default as flatten } from './flatten/index';

export { Style, SafeStyle } from './types';

export default resolveStyles;
