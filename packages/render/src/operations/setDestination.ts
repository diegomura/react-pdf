import { SafeNode } from '@react-pdf/layout';

import { Context, RenderOptions } from '../types';

const setDestination = (ctx: Context, node: SafeNode, options: RenderOptions) => {
  if (!node.box) return;
  if (!node.props) return;

  if ('id' in node.props && node.props.id) {
    const id = node.props.id;

    // Only register the first occurrence of each ID to prevent
    // wrapped text fragments from overwriting the destination
    if (!options.registeredDestinations.has(id)) {
      options.registeredDestinations.add(id);
      ctx.addNamedDestination(id, 'XYZ', null, node.box.top, null);
    }
  }
};

export default setDestination;
