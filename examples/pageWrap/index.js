/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '@react-pdf/node';
import { Document, Page, Text, Font } from '@react-pdf/core';

const oswaldUrl =
  'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
  Proin bibendum, diam non dictum rutrum, ligula velit molestie leo, sit \
  amet suscipit purus ipsum et ligula. Cras placerat, tellus fringilla viverra \
  maximus, ex metus vulputate ante, finibus dapibus eros dolor fermentum massa.';

Font.register(oswaldUrl, { family: 'Oswald' });

const doc = (
  <Document>
    <Page>
      <Text style={{ fontFamily: 'Oswald' }}>{lorem}</Text>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
