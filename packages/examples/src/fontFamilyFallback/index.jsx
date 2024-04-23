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
    fontWeight: 900,
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
      <Text style={styles.regular}>Test امتحان</Text>
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
