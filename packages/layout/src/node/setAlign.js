import yogaModule from 'yoga-layout/sync';

import { upperFirst } from '@react-pdf/fns';

// yoga-layout sets default export using non-standard __esModule property, so we need to
// make an additional check in case it's used in a bundler that does not support it.
const Yoga = 'default' in yogaModule ? yogaModule.default : yogaModule;

const ALIGN = {
  'flex-start': Yoga.ALIGN_FLEX_START,
  center: Yoga.ALIGN_CENTER,
  'flex-end': Yoga.ALIGN_FLEX_END,
  stretch: Yoga.ALIGN_STRETCH,
  baseline: Yoga.ALIGN_BASELINE,
  'space-between': Yoga.ALIGN_SPACE_BETWEEN,
  'space-around': Yoga.ALIGN_SPACE_AROUND,
};

/**
 * Set generic align attribute to node's Yoga instance
 *
 * @param {String} specific align property
 * @param {String} align value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setAlign = attr => value => node => {
  const { yogaNode } = node;
  const defaultValue = attr === 'items' ? Yoga.ALIGN_STRETCH : Yoga.ALIGN_AUTO;

  if (yogaNode) {
    const align = ALIGN[value] || defaultValue;

    yogaNode[`setAlign${upperFirst(attr)}`](align);
  }

  return node;
};

export default setAlign;
