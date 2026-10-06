import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fafafa',
    padding: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 9,
    color: '#888',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 12,
    width: 254, // body width 230 + horizontal padding 24
    overflow: 'hidden',
  },
  cardLabel: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  body: {
    fontSize: 11,
    color: '#333',
    lineHeight: 1.5,
    width: 230,
  },
  pretty: {
    textWrap: 'pretty',
  },
  balance: {
    textWrap: 'balance',
  },
  nowrap: {
    textWrap: 'nowrap',
  },
  note: {
    fontSize: 9,
    color: '#666',
    marginTop: 16,
    lineHeight: 1.5,
  },
});

const PARAGRAPH =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' +
  'Voluptatem aut cum eum id quos est.';

// Disable hyphenation so the line-break differences are not muddled by
// mid-word splits introduced by the default hyphenation engine.
const noHyphenate = (word: string) => [word];

const TextWrap = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>text-wrap</Text>
      <Text style={styles.subtitle}>
        Same paragraph, same width, different textWrap values
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>textWrap: wrap (default)</Text>
        <Text style={styles.body} hyphenationCallback={noHyphenate}>
          {PARAGRAPH}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>textWrap: pretty</Text>
        <Text
          style={[styles.body, styles.pretty]}
          hyphenationCallback={noHyphenate}
        >
          {PARAGRAPH}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>textWrap: balance</Text>
        <Text
          style={[styles.body, styles.balance]}
          hyphenationCallback={noHyphenate}
        >
          {PARAGRAPH}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>textWrap: nowrap (overflow hidden)</Text>
        <Text
          style={[styles.body, styles.nowrap]}
          hyphenationCallback={noHyphenate}
        >
          {PARAGRAPH}
        </Text>
      </View>

      <Text style={styles.note}>
        Following the CSS Text Module Level 4 specification, textWrap accepts
        wrap (default), pretty (avoid orphans on the last line), balance
        (equalize line lengths, capped at 10 lines), and nowrap (never break the
        line). Pair nowrap with overflow: hidden to clip text that exceeds the
        container width.
      </Text>
    </Page>
  </Document>
);

export default {
  id: 'text-wrap',
  name: 'Text Wrap',
  description:
    'Line wrapping control via textWrap (wrap / pretty / balance / nowrap)',
  Document: TextWrap,
};
