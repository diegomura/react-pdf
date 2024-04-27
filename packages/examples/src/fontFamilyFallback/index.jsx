/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import { Document, Page, Text, StyleSheet, Font } from '@react-pdf/renderer';

import RobotoFont from '../../public/Roboto-Regular.ttf';
import NotoSansArabicFont from '../../public/NotoSansArabic-Regular.ttf';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 45,
    paddingHorizontal: 35,
    position: 'relative',
  },
  regular: {
    fontFamily: ['Roboto', 'NotoSansArabic'],
    fontSize: '14',
    fontWeight: 900,
  },
  default: {
    fontFamily: ['Courier-Bold', 'NotoSansArabic'],
    fontSize: '14',
  },
});

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: RobotoFont,
      fontWeight: 400,
    },
  ],
});

Font.register({
  family: 'NotoSansArabic',
  fonts: [
    {
      src: NotoSansArabicFont,
      fontWeight: 400,
    },
  ],
});

const MyDoc = () => {
  return (
    <Page style={styles.body}>
      <Text style={{ fontFamily: 'Courier', marginBottom: '10px' }}>
        This font is default Courier
      </Text>
      <Text style={{ fontSize: 10 }}>
        The following is partially Roboto and Noto Sans Arabic
      </Text>
      <Text style={[styles.regular, { marginBottom: '10px' }]}>
        Roboto / امتحان
      </Text>
      <Text style={{ fontSize: 10 }}>
        The following is partially Courier-Bold and Noto Sans Arabic
      </Text>
      <Text style={styles.default}>Courier-Bold / امتحان</Text>
    </Page>
  );
};

const App = () => {
  return (
    <Document>
      <MyDoc />
    </Document>
  );
};

export default App;
