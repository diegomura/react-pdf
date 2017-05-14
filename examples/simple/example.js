import React from 'react';
import ReactPDF, { Page, Text, StyleSheet, Document } from 'react-pdf';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'FLEX_DIRECTION_COLUMN',
  },
});

const doc = (
  <Document>
    <Page size="A4" style={styles.container}>
      <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text>
      <Text>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/example.pdf`);
