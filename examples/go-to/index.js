/* eslint react/prop-types: 0, react/jsx-sort-props: 0 */

import React from 'react';

import ReactPDF, {
  Page,
  Document,
  Link,
  View,
  Text,
} from '../../dist/react-pdf.es.js';

const doc = (
  <Document>
    <Page size="A4">
      <Link src="#myDest">Link</Link>
    </Page>
    <Page size="A4">
      <View style={{ height: 300 }} />
      <View dest="myDest">
        <Text>Hello</Text>
      </View>

    </Page>
  </Document >
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
