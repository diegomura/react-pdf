import React from 'react';

import { Canvas } from '@react-pdf/renderer';

import SVGtoPDF from 'svg-to-pdfkit';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<path d="M50,3l12,36h38l-30,22l11,36l-31-21l-31,21l11-36l-30-22h38z" fill="#FF0" stroke="#FC0" stroke-width="2"/>
</svg>
`;

const Star = () => (
  <Canvas
    style={{
      width: '100%',
      height: 100,
    }}
    paint={(painter, availableWidth, availableHeight) => {
      SVGtoPDF(painter, svg, 0, 0, {
        width: availableWidth,
        height: availableHeight,
      });
    }}
  ></Canvas>
);

export default Star;
