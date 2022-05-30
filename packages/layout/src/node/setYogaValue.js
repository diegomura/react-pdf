/* eslint-disable no-unused-expressions */
import Yoga from '@react-pdf/yoga';
import { isNil, upperFirst, matchPercent } from '@react-pdf/fns';

/**
 * Set generic yoga attribute to node's Yoga instance, handing `auto`, edges and percentage cases
 *
 * @param {String} property
 * @param {Number} edge
 * @param {any} value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setYogaValue = (attr, edge) => value => node => {
  const yogaNode = node._yogaNode;

  if (!isNil(value) && yogaNode) {
    const hasEdge = !isNil(edge);
    const fixedMethod = `set${upperFirst(attr)}`;
    const autoMethod = `${fixedMethod}Auto`;
    const percentMethod = `${fixedMethod}Percent`;
    const percent = matchPercent(value);

    if (percent && !yogaNode[percentMethod]) {
      throw new Error(`You can't pass percentage values to ${attr} property`);
    }

    if (percent) {
      if (hasEdge) {
        yogaNode[percentMethod]?.(edge, percent.value);
      } else {
        yogaNode[percentMethod]?.(percent.value);
      }
    } else if (value === 'auto') {
      if (hasEdge) {
        yogaNode[autoMethod]?.(edge);
      } else if (attr === 'flexBasis') {
        // YogaNode.setFlexBasisAuto is missing (#766)
        yogaNode.setFlexBasis(Yoga.UNIT_AUTO);
      } else {
        yogaNode[autoMethod]?.();
      }
    } else if (hasEdge) {
      yogaNode[fixedMethod]?.(edge, value);
    } else {
      yogaNode[fixedMethod]?.(value);
    }
  }

  return node;
};

export default setYogaValue;
