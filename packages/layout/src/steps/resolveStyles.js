import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';
import stylesheet from '@govind-react-pdf/stylesheet';

const isLink = R.propEq('type', P.Link);

const LINK_STYLES = {
  color: 'blue',
  textDecoration: 'underline',
};

/**
 * Resolves node styles
 *
 * @param {Object} container
 * @param {Object} document node
 * @returns {Object} node (and subnodes) with resolved styles
 */
const resolveNodeStyles = container => node =>
  R.o(
    R.when(isLink, R.evolve({ style: R.merge(LINK_STYLES) })),
    R.evolve({
      style: stylesheet(container),
      children: R.map(resolveNodeStyles(container)),
    }),
  )(node);

/**
 * Resolves page styles
 *
 * @param {Object} document page
 * @returns {Object} document page with resolved styles
 */
const resolvePageStyles = page => {
  const box = R.prop('box', page);
  const style = R.prop('style', page);
  const container = R.isEmpty(box) ? style : box;

  return R.evolve({
    style: stylesheet(container),
    children: R.map(resolveNodeStyles(container)),
  })(page);
};

/**
 * Resolves document styles
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved styles
 */
export default R.evolve({
  children: R.map(resolvePageStyles),
});
