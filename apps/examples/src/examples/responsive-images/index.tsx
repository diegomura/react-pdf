import React from 'react';
import { Document, Page, Image, Text, StyleSheet } from '@react-pdf/renderer';

const SMALL = 'https://placehold.co/300x200/orange/white.png?text=300w';
const MEDIUM = 'https://placehold.co/600x400/teal/white.png?text=600w';
const LARGE = 'https://placehold.co/900x600/purple/white.png?text=900w';

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  label: {
    fontSize: 10,
    marginBottom: 5,
    color: '#555',
  },
  image: {
    width: '100%',
  },
});

const srcSet = `${SMALL} 300w, ${MEDIUM} 600w, ${LARGE} 900w`;

const ResponsiveImages = () => (
  <Document>
    <Page size={{ width: 200, height: 200 }} style={styles.page}>
      <Text style={styles.label}>200pt wide → small (orange)</Text>
      <Image src={SMALL} srcSet={srcSet} style={styles.image} />
    </Page>
    <Page size={{ width: 400, height: 350 }} style={styles.page}>
      <Text style={styles.label}>400pt wide → medium (teal)</Text>
      <Image src={SMALL} srcSet={srcSet} style={styles.image} />
    </Page>
    <Page size={{ width: 700, height: 550 }} style={styles.page}>
      <Text style={styles.label}>700pt wide → large (purple)</Text>
      <Image src={SMALL} srcSet={srcSet} style={styles.image} />
    </Page>
  </Document>
);

export default {
  id: 'responsive-images',
  name: 'Responsive Images',
  description: 'srcSet and sizes for responsive image selection',
  Document: ResponsiveImages,
};
