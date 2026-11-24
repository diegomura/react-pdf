import React from 'react';
import {
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';

import Quijote2Webp from '../../../public/quijote2.webp';
import Quijote2Png from '../../../public/quijote2.png';

// PDF has no WebP format, so react-pdf transcodes WebP to PNG while resolving the image. In the
// browser that uses the decoder the browser already ships; on Node it needs a transcoder
// registered through `registerWebpTranscoder`.
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fafafa',
    padding: 40,
  },
  title: {
    fontSize: 18,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 9,
    color: '#888',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    flex: 1,
  },
  label: {
    fontSize: 9,
    color: '#888',
    marginBottom: 6,
  },
  image: {
    width: '100%',
  },
  cover: {
    width: '100%',
    height: 90,
    objectFit: 'cover',
  },
});

const WebpImage = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>WebP images</Text>
      <Text style={styles.subtitle}>
        The same photograph as WebP and as PNG — they should look identical.
      </Text>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.label}>WebP</Text>
          <Image src={Quijote2Webp} style={styles.image} />
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>PNG (reference)</Text>
          <Image src={Quijote2Png} style={styles.image} />
        </View>
      </View>

      <View style={[styles.card, { marginTop: 8 }]}>
        <Text style={styles.label}>WebP with objectFit: cover</Text>
        <Image src={Quijote2Webp} style={styles.cover} />
      </View>
    </Page>
  </Document>
);

export default {
  id: 'webp-image',
  name: 'WebP Image',
  description: '',
  Document: WebpImage,
};
