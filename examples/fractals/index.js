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
  <Document
    title="Fractals"
    author="John Doe"
    subject="Rendering fractals with react-pdf"
    keywords={['react', 'pdf', 'fractals']}
  >
    <Page size="A4">
      <Link src="-myDist">Link</Link>
    </Page>
    <Page size="A4">
      <View dest="-myDist">
        <Text>Hello</Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
