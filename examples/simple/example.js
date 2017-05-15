import React from 'react';
import ReactPDF from 'react-pdf-node';
import { Page, Text, StyleSheet, Document } from 'react-pdf';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'FLEX_DIRECTION_COLUMN',
  },
  lorem: {
    color: 'red',
  },
  sed: {
    color: '#0000FF',
  },
});

const doc = (
  <Document>
    <Page size="A4" style={styles.container}>
      <Text style={styles.lorem}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Text>
      <Text style={styles.sed}>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/example.pdf`);
