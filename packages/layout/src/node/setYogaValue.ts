import { isNil, upperFirst, matchPercent } from '@react-pdf/fns';
import * as Yoga from 'yoga-layout/load';

import { SafeNode } from '../types';

/**
 * Set generic yoga attribute to node's Yoga instance, handing `auto`, edges and percentage cases
 *
 * @param attr - Property
 * @param edge - Edge
 * @returns Node instance wrapper
 */
const setYogaValue =
  (attr: string, edge?: Yoga.Edge) =>
  (value?: string | number | null) =>
  (node: SafeNode) => {
    const { yogaNode } = node;

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
