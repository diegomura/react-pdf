import React from 'react';
import createRendererForReact19 from './reconciler-31.js';
import createRendererForReact19_2 from './reconciler-33.js';
import createRendererForReact18AndLess from './reconciler-23.js';

const [major, minor] = React.version.split('.').map((v) => parseInt(v, 10));

let renderer;

if (major >= 20 || (major === 19 && minor >= 2)) {
  // Use the reconciler built for 19.2, assuming it's compatible with later versions.
  renderer = createRendererForReact19_2;
} else if (major === 19) {
  // Use the older 19.x reconciler (for 19.0.x and 19.1.x)
  renderer = createRendererForReact19;
} else {
  // Fallback for React 18.x and previous versions.
  renderer = createRendererForReact18AndLess;
}

export default renderer;
