import React from 'react';
import ReactPDF, { Page, Text, StyleSheet, Document } from 'react-pdf';
import lorem from './lorem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  block: {
    maxHeight: 200,
    maxWidth: 400,
    flex: 1,
  },
});

const doc = (
  <Document>
    <Page size="A4" styles={styles}>
      <Text>
        ~Lorem Ipsum~
      </Text>
    </Page>
    <Page size="A4">
      <Text>
        {lorem}
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/example.pdf`);
