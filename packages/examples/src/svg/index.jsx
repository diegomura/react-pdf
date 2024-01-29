import React from 'react';
import ReactPDF, { Document, Page, StyleSheet } from '@react-pdf/renderer';

import Svg0 from './svg';
import Svg1 from './Svg1';
import Svg2 from './Svg2';
import Svg4 from './Svg4';
import Star from './Star';
import Heart from './Heart';

console.log(`React version: ${React.version}`);
console.log(`React-pdf version: ${ReactPDF.version}`);

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
        <Svg0 />
        <Svg1 />
        <Svg2 />
        <Svg4 />
        <Heart />
      </Page>
    </Document>
  );
};

export default App;
