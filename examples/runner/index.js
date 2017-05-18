/* eslint react/prop-types: 0 */

import React from 'react';
import ReactPDF from 'react-pdf-node';
import { Document, Page } from 'react-pdf';

ReactPDF.render(
  <Document>
    <Page />
  </Document>,
  `${__dirname}/output.pdf`,
);
