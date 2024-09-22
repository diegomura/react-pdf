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

const MultilineText = () => (
  <Document>
    <Page size="A4">
      <View style={styles.body}>
        <Text style={{ backgroundColor: 'lightgray' }}>
          Single line text with{' '}
          <Text style={styles.highlight}>inline text highlighted</Text> Again
          Black Text
        </Text>

        <Text style={{ backgroundColor: 'lightgray' }}>
          Nested Text with{' '}
          <Text style={styles.highlight}>inline text highlighted</Text> in a
          long, long, long, long, long, long long
        </Text>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'multiline-text',
  name: 'Multiline Text',
  description: '',
  Document: MultilineText,
};
