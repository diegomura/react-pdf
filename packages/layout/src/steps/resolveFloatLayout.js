import * as P from '@react-pdf/primitives';
import { compose } from '@react-pdf/fns';


/**
 * Inherit style values from the root to the leafs
 *
 * @param {Object} document root
 * @returns {Object} document root with inheritance
 *
 */
const resolveFloatLayout = node => {
  if (!node.children) return node

  const resolveChild = compose(resolveFloatLayout);

  const children = node.children.map(resolveChild);

  return Object.assign({}, node, { children });
};

export default resolveFloatLayout;
