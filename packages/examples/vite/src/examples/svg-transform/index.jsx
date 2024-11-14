/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Document, Page, Svg, G, Rect } from '@react-pdf/renderer';

const COLORS = ['red', 'green', 'blue', 'yellow', 'purple'];

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const SvgTransform = () => {
  return (
    <Document>
      <Page size={[600, 600]}>
        <Svg width="600" height="600">
          {Array.from({ length: 200 }).map((_, i) => (
            <G
              key={i}
              style={{
                transform: `translate(${randBetween(0, 600)}, ${randBetween(0, 600)}) rotate(${randBetween(-180, 180)}deg)`,
              }}
            >
              <Rect fill={COLORS[i % COLORS.length]} width="200" height="50" />
            </G>
          ))}
        </Svg>
      </Page>
    </Document>
  );
};

export default {
  id: 'svg-transform',
  name: 'Svg Transform',
  description: '',
  Document: SvgTransform,
};
