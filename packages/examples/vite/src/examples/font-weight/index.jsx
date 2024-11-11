/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import { Document, Page, Text, StyleSheet, Font } from '@react-pdf/renderer';

import RobotoFont from '../../../public/Roboto-Regular.ttf';
import RobotoFontMedium from '../../../public/Roboto-Medium.ttf';
import RobotoFontBold from '../../../public/Roboto-Bold.ttf';
import RobotoFontBlack from '../../../public/Roboto-Black.ttf';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 45,
    paddingHorizontal: 35,
    position: 'relative',
  },
  regular: {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  medium: {
    fontFamily: 'Roboto',
    fontWeight: 500,
  },
  bold: {
    fontWeight: 600,
    fontFamily: 'Roboto',
  },
  black: {
    fontWeight: 900,
    fontFamily: 'Roboto',
  },
});

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: RobotoFont,
      fontWeight: 400,
    },
    {
      src: RobotoFontMedium,
      fontWeight: 500,
    },
    {
      src: RobotoFontBold,
      fontWeight: 700,
    },
    {
      src: RobotoFontBlack,
      fontWeight: 900,
    },
  ],
});

const MyDoc = () => {
  return (
    <Page style={styles.body}>
      <Text style={styles.regular}>Regular text</Text>
      <Text style={styles.medium}>Medium text</Text>
      <Text style={styles.bold}>Bold text</Text>
      <Text style={styles.black}>Black text</Text>
    </Page>
  );
};

const FontWeight = () => {
  return (
    <Document>
      <MyDoc />
    </Document>
  );
};

export default {
  id: 'font-weight',
  name: 'Font Weight',
  description: '',
  Document: FontWeight,
};
