import yogaModule from 'yoga-layout/sync';

import { isNil } from '@react-pdf/fns';

// yoga-layout sets default export using non-standard __esModule property, so we need to
// make an additional check in case it's used in a bundler that does not support it.
const Yoga = 'default' in yogaModule ? yogaModule.default : yogaModule;

/**
 * Set position type attribute to node's Yoga instance
 *
 * @param {String} position type
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setPositionType = value => node => {
  const { yogaNode } = node;

  if (!isNil(value) && yogaNode) {
    yogaNode.setPositionType(
      value === 'absolute'
        ? Yoga.POSITION_TYPE_ABSOLUTE
        : Yoga.POSITION_TYPE_RELATIVE,
    );
  }

  return node;
};

export default setPositionType;
