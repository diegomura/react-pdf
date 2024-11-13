/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import { Document, Page, Text, StyleSheet, Font } from '@react-pdf/renderer';

import RobotoFont from '../../../public/Roboto-Regular.ttf';
import RobotoBoldFont from '../../../public/Roboto-Bold.ttf';
import RobotItalicFont from '../../../public/Roboto-Italic.ttf';

import NotoSansArabicFont from '../../../public/NotoSansArabic-Regular.ttf';

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
      fontStyle: 'normal',
      fontWeight: 'normal',
    },
    {
      src: RobotItalicFont,
      fontStyle: 'italic',
      fontWeight: 'normal',
    },
    {
      src: RobotoBoldFont,
      fontStyle: 'normal',
      fontWeight: 'bold',
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
      <Text style={{ fontFamily: 'Courier', marginBottom: '20px' }}>
        This font is default Courier
      </Text>

      <Text style={{ fontSize: 10 }}>
        The following is partially Roboto and Noto Sans Arabic
      </Text>
      <Text style={[styles.regular, { marginBottom: '20px' }]}>
        Roboto / امتحان
      </Text>

      <Text style={{ fontSize: 10 }}>
        The following is partially Courier-Bold and Noto Sans Arabic
      </Text>
      <Text style={[styles.default, { marginBottom: '20px' }]}>
        Courier-Bold / امتحان
      </Text>

      <Text style={{ fontSize: 10 }}>
        The following are multiple font families, weights, and styles all on the
        same line
      </Text>
      <Text style={{ fontFamily: 'Roboto' }}>
        Roboto Normal{' / '}
        <Text style={{ fontWeight: 'bold' }}>Roboto Bold</Text>
        {' / '}
        <Text style={{ fontStyle: 'italic' }}>Roboto Italic</Text>
        {' / '}
        <Text style={{ fontFamily: 'Courier' }}>Courier</Text>
      </Text>
    </Page>
  );
};

const FontFamilyFallback = () => {
  return (
    <Document>
      <MyDoc />
    </Document>
  );
};

export default {
  id: 'font-family-fallback',
  name: 'Font Family Fallback',
  description: '',
  Document: FontFamilyFallback,
};
