import React from 'react';
import ReactPDF from 'react-pdf-node';
import { Document, Page, View, Text, StyleSheet } from 'react-pdf';
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
    <Page size="A4">
      <View style={styles.container}>
        <Text>
          Text
        </Text>
        <View style={styles.block}>
          <Text>
            {lorem}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/example.pdf`);
