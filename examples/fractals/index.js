/* eslint react/prop-types: 0, react/jsx-sort-props: 0 */

import React from 'react';
import Fractal from './Fractal';
import ReactPDF, { Page, Document } from '../../dist/react-pdf.es.js';

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

ReactPDF.render(doc, `${__dirname}/output.pdf`);
