/* eslint react/prop-types: 0 */

import React from 'react';
import ReactPDF from 'react-pdf-node';
import { Page, Text, View, Document } from 'react-pdf';
import styles from './styles';
import palette from './palette';

const toggle = direction => direction === 'column' ? 'row' : 'column';

// Creates Fractal Component that renders it's step with a background color
const Fractal = ({ steps, direction = 'column' }) => {
  if (steps === 0) {
    return <View />;
  }

  const fractalStyle = {
    flexGrow: 1,
    backgroundColor: palette[steps],
  };

  return (
    <View style={styles[direction]}>
      <Fractal direction={toggle(direction)} steps={steps - 1} />
      <View style={fractalStyle}>
        <Text style={styles.text}>{steps}</Text>
      </View>
    </View>
  );
};

// Create Document Component
const doc = (
  <Document>
    <Page size="A4">
      <Fractal steps={18} />
    </Page>

    <Page orientation="landscape" size="A4">
      <Fractal steps={14} />
    </Page>

    <Page size="B4">
      <Fractal steps={10} />
    </Page>
  </Document>
);

// Renders document and save it
ReactPDF.render(doc, `${__dirname}/example.pdf`);
