import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from '@react-pdf/renderer';

import Landscape1 from '../../../public/landscape1.jpg';
import Landscape2 from '../../../public/landscape2.jpg';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  hero: {
    width: '100%',
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 20,
  },
  card: {
    flex: 1,
    height: 180,
    padding: 16,
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    padding: 10,
  },
  cardTitle: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 4,
  },
  banner: {
    width: '100%',
    height: 130,
    marginTop: 24,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  bannerOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 14,
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  bannerText: {
    fontSize: 10,
    color: '#555',
    marginTop: 4,
    lineHeight: 1.5,
  },
});

const ImageBackgroundExample = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <ImageBackground src={Landscape1} style={styles.hero}>
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>ImageBackground</Text>
          <Text style={styles.heroSubtitle}>
            Renders an image behind its children
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.row}>
        <ImageBackground src={Landscape1} style={styles.card}>
          <View style={styles.cardOverlay}>
            <Text style={styles.cardTitle}>Forest</Text>
            <Text style={styles.cardDescription}>
              Content layered over the background
            </Text>
          </View>
        </ImageBackground>

        <ImageBackground src={Landscape2} style={styles.card}>
          <View style={styles.cardOverlay}>
            <Text style={styles.cardTitle}>River</Text>
            <Text style={styles.cardDescription}>
              Each card uses a different image
            </Text>
          </View>
        </ImageBackground>
      </View>

      <ImageBackground src={Landscape2} style={styles.banner}>
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Light overlay pattern</Text>
          <Text style={styles.bannerText}>
            A semi-transparent white overlay keeps text readable over busy
            backgrounds. Combine ImageBackground with any layout to build hero
            sections, cards, and banners.
          </Text>
        </View>
      </ImageBackground>
    </Page>
  </Document>
);

export default {
  id: 'image-background',
  name: 'Image Background',
  description: 'ImageBackground component with children layered over images',
  Document: ImageBackgroundExample,
};
