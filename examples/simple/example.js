import React from 'react';
import ReactPDF from 'react-pdf-node';
import { Page, Text, View, StyleSheet, Document } from 'react-pdf';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
      <View>
        <Text style={styles.lorem}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </Text>
      </View>
      <View>
        <Text style={styles.sed}>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
        </Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/example.pdf`);
