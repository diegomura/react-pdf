/* eslint react/prop-types: 0, react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '../../packages/react-pdf-node';
import { Page, Document } from '../../packages/react-pdf';
import Fractal from './Fractal';

const doc = (
  <Document
    title="Fractals"
    author="John Doe"
    subject="Rendering fractals with react-pdf"
    keywords={['react', 'pdf', 'fractals']}
  >
    <Page size="A4">
      <Fractal steps={18} />
    </Page>

    <Page orientation="landscape" size="A4">
      <Fractal steps={14} />
    </Page>

    <Page size="B4">
      <Fractal steps={10} />
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`, () => {
  console.log('Fractals rendered!');
});
