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

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: RobotoFont,
      fontWeight: 400,
    },
  ],
});

const sampleText =
  'The quick brown fox jumps over the lazy dog near the riverbank';
const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fafafa',
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 9,
    color: '#888888',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    color: '#1a1a1a',
    fontWeight: 700,
    marginBottom: 10,
    marginTop: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 8,
  },
  label: {
    fontSize: 8,
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  ellipsisText: {
    fontSize: 11,
    color: '#333333',
    maxLines: 1,
    textOverflow: 'ellipsis',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
});

const MyDoc = () => {
  return (
    <Page style={styles.page}>
      <Text style={styles.title}>Text Ellipsis</Text>
      <Text style={styles.subtitle}>
        Demonstrating text truncation behavior at various widths and line limits
      </Text>

      {/* Section: Single line at different widths */}
      <Text style={styles.sectionTitle}>Single Line at Different Widths</Text>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <View style={styles.card}>
            <Text style={styles.label}>Width: 70pt</Text>
            <View style={{ width: 70 }}>
              <Text style={styles.ellipsisText}>{sampleText}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.card}>
            <Text style={styles.label}>Width: 120pt</Text>
            <View style={{ width: 120 }}>
              <Text style={styles.ellipsisText}>{sampleText}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <View style={styles.card}>
            <Text style={styles.label}>Width: 200pt</Text>
            <View style={{ width: 200 }}>
              <Text style={styles.ellipsisText}>{sampleText}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.card}>
            <Text style={styles.label}>Full Width</Text>
            <Text style={styles.ellipsisText}>{sampleText}</Text>
          </View>
        </View>
      </View>

      {/* Section: Multi-line truncation */}
      <Text style={styles.sectionTitle}>Multi-Line Truncation</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Max Lines: 2</Text>
        <Text style={[styles.ellipsisText, { maxLines: 2 }]}>{longText}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Max Lines: 3</Text>
        <Text style={[styles.ellipsisText, { maxLines: 3 }]}>{longText}</Text>
      </View>

      {/* Section: No truncation comparison */}
      <Text style={styles.sectionTitle}>Comparison: No Truncation</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Text (no ellipsis)</Text>
        <Text style={{ fontSize: 11, color: '#333333' }}>{longText}</Text>
      </View>
    </Page>
  );
};

const Ellipsis = () => {
  return (
    <Document>
      <MyDoc />
    </Document>
  );
};

export default {
  id: 'ellipsis',
  name: 'Ellipsis',
  description:
    'Text truncation with ellipsis at various widths and line limits',
  Document: Ellipsis,
};
