/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '@react-pdf/node';
import { Document, Page, Text, Image, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  page: { flexDirection: 'row' },
  image: { flexGrow: 8, backgroundColor: 'grey', padding: 10 },
  text: {
    flexGrow: 3,
    backgroundColor: '#f0f0f0',
    color: '#212121',
    paddingHorizontal: 50,
    paddingVertical: 30,
  },
});

const doc = (
  <Document>
    <Page style={styles.page} size={[1500, 600]}>
      <Image
        style={styles.image}
        src="https://static.pexels.com/photos/26822/pexels-photo.jpg"
      />
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </Page>
  </Document>
);

// Renders document and save it
ReactPDF.render(doc, `${__dirname}/output.pdf`);
