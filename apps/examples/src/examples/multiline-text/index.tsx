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
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 11,
    color: '#333',
    lineHeight: 1.6,
  },
  highlightBlue: {
    backgroundColor: '#E8EAF6',
    color: '#3949AB',
  },
  highlightGreen: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  highlightAmber: {
    backgroundColor: '#FFF8E1',
    color: '#F57F17',
  },
  highlightPink: {
    backgroundColor: '#FCE4EC',
    color: '#C62828',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});

const MultilineText = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Multiline Text</Text>
      <Text style={styles.subtitle}>
        Demonstrating inline styling and text wrapping behavior
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Single Line with Highlight</Text>
        <Text style={styles.bodyText}>
          Single line text with{' '}
          <Text style={styles.highlightBlue}>inline text highlighted</Text>{' '}
          followed by normal text
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Multi-Line with Highlight</Text>
        <Text style={styles.bodyText}>
          This is a longer paragraph with{' '}
          <Text style={styles.highlightBlue}>
            inline highlighted text that wraps
          </Text>{' '}
          across multiple lines to demonstrate how highlighting behaves when
          text flows naturally within a paragraph
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Multiple Highlight Colors</Text>
        <Text style={styles.bodyText}>
          You can combine{' '}
          <Text style={styles.highlightBlue}>blue highlights</Text> with{' '}
          <Text style={styles.highlightGreen}>green highlights</Text> and{' '}
          <Text style={styles.highlightAmber}>amber highlights</Text> in a
          single paragraph
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Mixed Inline Styles</Text>
        <Text style={styles.bodyText}>
          Inline styles can be freely combined:{' '}
          <Text style={[styles.highlightBlue, styles.bold]}>
            bold highlight
          </Text>
          ,{' '}
          <Text style={[styles.highlightPink, styles.italic]}>
            italic highlight
          </Text>
          , and{' '}
          <Text style={[styles.highlightGreen, styles.bold, styles.italic]}>
            bold italic highlight
          </Text>{' '}
          all work together seamlessly
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Nested Inline Elements</Text>
        <Text style={styles.bodyText}>
          Text can contain{' '}
          <Text style={styles.bold}>
            bold sections with{' '}
            <Text style={styles.highlightAmber}>nested highlights</Text> inside
          </Text>{' '}
          and continue with regular text afterward
        </Text>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'multiline-text',
  name: 'Multiline Text',
  description: 'Inline text styling and multiline wrapping examples',
  Document: MultilineText,
};
