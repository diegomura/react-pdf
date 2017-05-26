/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '@react-pdf/node';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  row: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  block: {
    flexGrow: 1,
  },
  red: {
    flexGrow: 1,
    backgroundColor: 'red'
  },
});

const doc = (
  <Document>
    <Page size="A4">
      <View style={styles.row}>
        <View style={styles.block}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <View style={styles.red} />
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
