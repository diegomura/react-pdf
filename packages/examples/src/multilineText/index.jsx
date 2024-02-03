import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    margin: 50,
  },
  highlight: {
    backgroundColor: 'tomato',
    textDecoration: 'line-through underline',
  },
});

const Doc = () => (
  <Document>
    <Page size="A4">
      <View style={styles.body}>
        <Text style={{ backgroundColor: 'green' }}>
          Single line text with{' '}
          <Text style={styles.highlight}>inline text highlighted</Text> Again
          Black Text
        </Text>

        <Text style={{ backgroundColor: 'green' }}>
          Nested Text with{' '}
          <Text style={styles.highlight}>inline text highlighted</Text> in a
          long, long, long, long, long, long long
        </Text>
      </View>
    </Page>
  </Document>
);

export default Doc;
