/* eslint react/prop-types: 0, react/jsx-sort-props: 0 */

import React from 'react';

import ReactPDF, {
  Page,
  Document,
  Link,
  View,
  Text,
  Image
} from '../../dist/react-pdf.es.js';

const doc = (
  <Document>
    <Page size="A4">
      <Link src="#myDest">Link</Link>
    </Page>
    <Page size="A4" >
      <View style={{ height: 300 }} />

      <Text >Henlo</Text>
      <Image dest="myDest" src="http://qnimate.com/wp-content/uploads/2014/03/images2.jpg" />
    </Page>
  </Document >
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
