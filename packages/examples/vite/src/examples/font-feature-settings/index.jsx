/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import { Document, Font, Page, StyleSheet, Text } from '@react-pdf/renderer';
import React from 'react';

import RobotoFont from '../../../public/Roboto-Regular.ttf';
import RubikFont from '../../../public/Rubik-Regular.ttf';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 45,
    paddingHorizontal: 35,
    position: 'relative',
    fontSize: 14,
  },
  headline: {
    fontFamily: 'Roboto',
    fontSize: '24',
    paddingVertical: 12,
  },
  rubik: {
    fontFamily: 'Rubik',
  },
  roboto: {
    fontFamily: 'Roboto',
  },
  tabular: {
    fontFeatureSettings: ['tnum'],
  },
  smallCapitals: {
    fontFeatureSettings: ['smcp'],
  },
  disableCommonLigatures: {
    fontFeatureSettings: { liga: 0 },
  },
});

Font.register({
  family: 'Rubik',
  fonts: [{ src: RubikFont, fontWeight: 400 }],
});
Font.register({
  family: 'Roboto',
  fonts: [{ src: RobotoFont, fontWeight: 400 }],
});

const MyDoc = () => {
  const longNumberExample = "012'345'678'901";
  const commonLigaturesExample = 'A firefighter from Sheffield';
  return (
    <Page style={styles.body}>
      <Text style={styles.headline}>Rubik</Text>
      <Text style={styles.rubik}>{longNumberExample} – Default features</Text>
      <Text style={[styles.rubik, styles.tabular]}>
        {longNumberExample} – Tabular numbers
      </Text>
      <Text style={styles.headline}>Roboto</Text>
      <Text style={styles.roboto}>
        {commonLigaturesExample} – Default features
      </Text>
      <Text style={[styles.roboto, styles.disableCommonLigatures]}>
        {commonLigaturesExample} – Common ligatures off
      </Text>
      <Text style={[styles.roboto, styles.smallCapitals]}>
        {commonLigaturesExample} – Small capitals
      </Text>
    </Page>
  );
};

const FontFeatureSettings = () => {
  return (
    <Document>
      <MyDoc />
    </Document>
  );
};

export default {
  id: 'font-feature-settings',
  name: 'Font Feature Settings',
  description: '',
  Document: FontFeatureSettings,
};
