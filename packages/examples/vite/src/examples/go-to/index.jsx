import React from 'react';
import { Page, Document, Link, View, Image } from '@react-pdf/renderer';

const GoTo = () => (
  <Document>
    <Page size="A4">
      <Link href="#myDest">Link to Image</Link>
    </Page>

    <Page size="A4">
      <View style={{ height: 300, backgroundColor: 'black' }} />
      <Image id="myDest" src="https://react-pdf.org/images/logo.png" />
    </Page>
  </Document>
);

export default {
  id: 'go-to',
  name: 'Go To',
  description: '',
  Document: GoTo,
};
