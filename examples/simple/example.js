import React from 'react';
import ReactPDF from 'react-pdf-node';
import { Page, Text, View, StyleSheet, Document } from 'react-pdf';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  lorem: {
    color: '#ff8c8c',
  },
  sed: {
    color: '#4f4baf',
  },
  background: {
    backgroundColor: '#dadada',
  },
});

const doc = (
  <Document>
    <Page size="A4" style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.lorem}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </Text>
      </View>
      <View style={styles.background}>
        <Text style={styles.sed}>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
        </Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/example.pdf`);
