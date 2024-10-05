import * as Yoga from 'yoga-layout/load';
import { upperFirst } from '@react-pdf/fns';

const ALIGN = {
  'flex-start': Yoga.Align.FlexStart,
  center: Yoga.Align.Center,
  'flex-end': Yoga.Align.FlexEnd,
  stretch: Yoga.Align.Stretch,
  baseline: Yoga.Align.Baseline,
  'space-between': Yoga.Align.SpaceBetween,
  'space-around': Yoga.Align.SpaceAround,
  'space-evenly': Yoga.Align.SpaceEvenly,
};

/**
 * @typedef {Function} NodeInstanceWrapper
 * @param {Object} node node instance
 * @returns {Object} node instance
 */

/**
 * @typedef {Function} AlignSetter
 * @param {string} value align value
 * @returns {NodeInstanceWrapper} node instance wrapper
 */

/**
 * Set generic align attribute to node's Yoga instance
 *
 * @param {string} attr specific align property
 * @returns {AlignSetter} align setter
 */
const setAlign = (attr) => (value) => (node) => {
  const { yogaNode } = node;
  const defaultValue = attr === 'items' ? Yoga.Align.Stretch : Yoga.Align.Auto;

  if (yogaNode) {
    const align = ALIGN[value] || defaultValue;

    yogaNode[`setAlign${upperFirst(attr)}`](align);
  }

  return node;
};

export default setAlign;
