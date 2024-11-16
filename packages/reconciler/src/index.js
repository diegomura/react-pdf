/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import createRendererForReact19 from './reconciler-31.js';
import createRendererForReact18AndLess from './reconciler-26.js';

const isReact19 = React.version.startsWith('19');

export default isReact19
  ? createRendererForReact19
  : createRendererForReact18AndLess;
