/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '@react-pdf/node';
import { Document, Page, View, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  body: {
    padding: 35,
  },
  content: {
    padding: 20,
    '@media max-width: 400': {
      flexDirection: 'column',
    },
    '@media min-width: 400': {
      flexDirection: 'row',
    },
  },
  block: {
    height: 150,
    width: 150,
    backgroundColor: 'red',
  },
});

const MediaComponent = () => (
  <View style={styles.content}>
    <View style={[styles.block, { backgroundColor: 'red' }]} />
    <View style={[styles.block, { backgroundColor: 'green' }]} />
  </View>
);

const doc = (
  <Document>
    <Page style={styles.body} size={[500, 600]}>
      <MediaComponent />
    </Page>
    <Page style={styles.body} size={[300, 600]}>
      <MediaComponent />
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
