/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '@react-pdf/node';
import { Document, Page, Text, View } from '@react-pdf/core';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
  Proin bibendum, diam non dictum rutrum, ligula velit molestie leo, sit \
  amet suscipit purus ipsum et ligula. Cras placerat, tellus fringilla viverra \
  maximus, ex metus vulputate ante, finibus dapibus eros dolor fermentum massa.';

const doc = (
  <Document>
    <Page style={{ flexDirection: 'row' }}>
      <View style={{ flexDirection: 'column', height: 500 }}>
        <Text style={{ flex: 1 }}>{lorem}</Text>
        <Text style={{ flex: 1 }}>{lorem}</Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
