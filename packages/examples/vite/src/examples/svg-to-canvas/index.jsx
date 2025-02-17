import React from 'react';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';

import Star from './Star';
import Tiger from './Tiger';

const styles = StyleSheet.create({
  page: {
    fontSize: 20,
    color: 'black',
    padding: '10',
  },
});

const App = () => {
  return (
    <Document title="Hey!" subject="Test">
      <Page size="A4" style={styles.page}>
        <Star />
        <Tiger />
      </Page>
    </Document>
  );
};

export default {
  id: 'svgToCanvas',
  name: 'SvgToCanvas',
  description: 'Component for rendering SVGs to canvas',
  Document: App,
};
