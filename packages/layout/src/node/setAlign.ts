import * as Yoga from 'yoga-layout/load';
import { upperFirst } from '@react-pdf/fns';
import { SafeNode } from '../types';

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
 * Set generic align attribute to node's Yoga instance
 *
 * @param attr - Specific align property
 * @param value - Specific align value
 * @param node - Node
 * @returns Node
 */
const setAlign = (attr: string) => (value: any) => (node: SafeNode) => {
  const { yogaNode } = node;
  const defaultValue = attr === 'items' ? Yoga.Align.Stretch : Yoga.Align.Auto;

  if (yogaNode) {
    const align = ALIGN[value] || defaultValue;

    yogaNode[`setAlign${upperFirst(attr)}`](align);
  }

  return node;
};

export default setAlign;
