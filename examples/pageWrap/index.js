/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '@react-pdf/node';
import { Document, Page, StyleSheet, View, Image } from '@react-pdf/core';

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
  image: { backgroundColor: 'grey', padding: 10, marginBottom: 10 },
});

const doc = (
  <Document>
    <Page style={styles.body} size={[500, 800]} wrap>
      <Image
        style={styles.image}
        src="http://blog.oxforddictionaries.com/wp-content/uploads/mountain-names.jpg"
      />
      <Image
        style={styles.image}
        src="http://blog.oxforddictionaries.com/wp-content/uploads/mountain-names.jpg"
      />
      <Image
        style={styles.image}
        src="http://blog.oxforddictionaries.com/wp-content/uploads/mountain-names.jpg"
      />
      <View
        style={{ height: 200, backgroundColor: 'gray', marginBottom: 10 }}
      />
      <View
        style={{ height: 200, backgroundColor: 'green', marginBottom: 10 }}
      />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'red',
          marginBottom: 10,
          padding: 30,
          height: 700,
        }}
        debug
      >
        <View
          style={{ flex: 1, backgroundColor: 'blue', height: 450, padding: 20 }}
        >
          <View
            style={{
              backgroundColor: 'pink',
              height: 200,
              marginBottom: 20,
              padding: 50,
            }}
          >
            <View style={{ backgroundColor: 'white', height: '100%' }} />
          </View>
          <View
            style={{
              backgroundColor: 'pink',
              height: 200,
              marginBottom: 20,
              padding: 50,
            }}
          >
            <View style={{ backgroundColor: 'white', height: '100%' }} />
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: 'yellow' }} />
      </View>
      <View
        style={{ height: 200, backgroundColor: 'tomato', marginBottom: 10 }}
      />
      <View
        style={{ height: 200, backgroundColor: 'pink', marginBottom: 10 }}
      />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'red',
          marginBottom: 10,
          padding: 30,
          height: 700,
        }}
      />
      <View
        style={{ height: 200, backgroundColor: 'tomato', marginBottom: 10 }}
      />
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
