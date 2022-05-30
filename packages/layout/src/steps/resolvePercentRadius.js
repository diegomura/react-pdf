import evolve from '../../../fns/evolve';
import matchPercent from '../../../fns/matchPercent';

/**
 *
 * @param {Object} container width and height
 * @param {String | Number} value border radius value
 * @returns {Number} fixed border radius value
 */
const resolveRadius = container => value => {
  if (!value) return undefined;

  const match = matchPercent(value);

  return match
    ? match.percent * Math.min(container.width, container.height)
    : value;
};

/**
 * Transforms percent border radius into fixed values
 *
 * @param {Object} node
 * @returns {Object} node
 */
const resolvePercentRadius = node => {
  const style = evolve(
    {
      borderTopLeftRadius: resolveRadius(node.box),
      borderTopRightRadius: resolveRadius(node.box),
      borderBottomRightRadius: resolveRadius(node.box),
      borderBottomLeftRadius: resolveRadius(node.box),
    },
    node.style || {},
  );

  const newNode = Object.assign({}, node, { style });

  if (!node.children) return newNode;

  const children = node.children.map(resolvePercentRadius);

  return Object.assign({}, newNode, { children });
};

export default resolvePercentRadius;
