/* eslint react/prop-types: 0, react/jsx-sort-props: 0 */

import React from 'react';

import { Page, Document, Link, View, Image } from '@nutshelllabs-pdf/renderer';

export default () => (
  <Document>
    <Page size="A4">
      <Link href="#myDest">Link</Link>
    </Page>

    <Page size="A4">
      <View style={{ height: 300, backgroundColor: 'black' }} />
      <Image
        id="myDest"
        src="http://qnimate.com/wp-content/uploads/2014/03/images2.jpg"
      />
    </Page>
  </Document>
);
