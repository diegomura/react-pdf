import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

import RobotoFont from '../../../public/Roboto-Regular.ttf';
import RobotoFontMedium from '../../../public/Roboto-Medium.ttf';
import RobotoFontBold from '../../../public/Roboto-Bold.ttf';
import RobotoFontBlack from '../../../public/Roboto-Black.ttf';

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

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fafafa',
    padding: 40,
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1a1a',
    fontFamily: 'Roboto',
  },
  subtitle: {
    fontSize: 9,
    color: '#888888',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 8,
  },
  cardHalf: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 8,
    flex: 1,
  },
  label: {
    fontSize: 8,
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  sampleRegular: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 400,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  sampleMedium: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 500,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  sampleBold: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  sampleBlack: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 900,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  sampleBody: {
    fontSize: 10,
    color: '#555555',
    lineHeight: 1.5,
  },
});

const MyDoc = () => {
  return (
    <Page style={styles.page}>
      <Text style={styles.title}>Font Weight Showcase</Text>
      <Text style={styles.subtitle}>
        Roboto typeface rendered at four different weights
      </Text>

      <View style={styles.row}>
        <View style={styles.cardHalf}>
          <Text style={styles.label}>Regular 400</Text>
          <Text style={styles.sampleRegular}>Regular</Text>
          <Text style={[styles.sampleBody, { fontWeight: 400 }]}>
            The quick brown fox jumps over the lazy dog. This weight is ideal
            for body text and long-form reading.
          </Text>
        </View>
        <View style={styles.cardHalf}>
          <Text style={styles.label}>Medium 500</Text>
          <Text style={styles.sampleMedium}>Medium</Text>
          <Text style={[styles.sampleBody, { fontWeight: 500 }]}>
            The quick brown fox jumps over the lazy dog. A subtle step up in
            weight, great for UI labels and subheadings.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Bold 700</Text>
        <Text style={styles.sampleBold}>Bold</Text>
        <Text style={[styles.sampleBody, { fontWeight: 700 }]}>
          The quick brown fox jumps over the lazy dog. Bold weight draws
          attention and works well for headings, call-to-action elements, and
          emphasised content throughout a document.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Black 900</Text>
        <Text style={styles.sampleBlack}>Black</Text>
        <Text style={[styles.sampleBody, { fontWeight: 900 }]}>
          The quick brown fox jumps over the lazy dog. The heaviest available
          weight, perfect for large display text, hero sections, and anywhere
          maximum visual impact is needed.
        </Text>
      </View>
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
