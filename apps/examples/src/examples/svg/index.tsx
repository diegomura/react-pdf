import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

import Svg0 from './svg';
import Svg1 from './Svg1';
import Svg2 from './Svg2';
import Svg4 from './Svg4';
import Pattern from './Pattern';
import Car from './Car';
import Markers from './Markers';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fafafa',
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
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  halfCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    alignItems: 'center',
  },
  label: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  footerText: {
    fontSize: 7,
    color: '#aaa',
  },
});

const App = () => {
  return (
    <Document title="SVG Examples" subject="SVG rendering showcase">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>SVG Rendering</Text>
        <Text style={styles.subtitle}>
          Paths, shapes, gradients, patterns, and complex illustrations
        </Text>

        <View style={styles.card} wrap={false}>
          <Text style={styles.label}>Tiger (Complex Polygons)</Text>
          <Svg0 />
        </View>

        <View style={styles.card} wrap={false}>
          <Text style={styles.label}>Line Chart</Text>
          <Svg2 />
        </View>

        <View style={styles.card} wrap={false}>
          <Text style={styles.label}>Pattern Fill</Text>
          <Pattern />
        </View>

        <View style={styles.card} wrap={false}>
          <Text style={styles.label}>Car (Detailed Illustration)</Text>
          <Car />
        </View>

        <View style={styles.card} wrap={false}>
          <Text style={styles.label}>Markers</Text>
          <Markers />
        </View>

        <View style={styles.row} wrap={false}>
          <View style={styles.halfCard}>
            <Text style={styles.label}>Pie Chart (Arcs + Text)</Text>
            <Svg1 />
          </View>
        </View>

        <View style={styles.row} wrap={false}>
          <View style={styles.halfCard}>
            <Text style={styles.label}>Gradients</Text>
            <Svg4 />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All graphics rendered as native PDF vector paths
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default {
  id: 'svg',
  name: 'Svg',
  description: '',
  Document: App,
};
