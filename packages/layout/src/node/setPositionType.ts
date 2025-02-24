import * as Yoga from 'yoga-layout/load';
import { isNil } from '@react-pdf/fns';
import { SafeNode } from '../types';

const POSITION = {
  absolute: Yoga.PositionType.Absolute,
  relative: Yoga.PositionType.Relative,
  static: Yoga.PositionType.Static,
};

/**
 * Set position type attribute to node's Yoga instance
 *
 * @param value - Position position type
 * @returns Node instance
 */
const setPositionType = (value?: string | null) => (node: SafeNode) => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setPositionType(POSITION[value]);
  }

  return node;
};

export default setPositionType;
