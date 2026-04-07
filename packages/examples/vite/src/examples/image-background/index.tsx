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
  label: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
  },
  hero: {
    width: '100%',
    height: 200,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  heroSubtitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 6,
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 3,
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    padding: 8,
  },
  cardTitle: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  banner: {
    width: '100%',
    height: 100,
    borderRadius: 3,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  bannerOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 12,
    borderRadius: 3,
  },
  bannerTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
  },
  bannerText: {
    fontSize: 9,
    color: '#555',
    marginTop: 3,
    lineHeight: 1.5,
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

const ImageBackgroundExample = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Image Background</Text>
      <Text style={styles.subtitle}>
        Renders an image behind its children using the ImageBackground component
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Hero Section (Dark Overlay)</Text>
        <ImageBackground src={Landscape1} style={styles.hero}>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>ImageBackground</Text>
            <Text style={styles.heroSubtitle}>
              Text layered over a background image
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.row}>
        <View style={styles.halfCard}>
          <Text style={styles.label}>Card with Image</Text>
          <ImageBackground src={Landscape1} style={styles.cardImage}>
            <View style={styles.cardOverlay}>
              <Text style={styles.cardTitle}>Forest</Text>
              <Text style={styles.cardDescription}>
                Content over the background
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.halfCard}>
          <Text style={styles.label}>Different Source</Text>
          <ImageBackground src={Landscape2} style={styles.cardImage}>
            <View style={styles.cardOverlay}>
              <Text style={styles.cardTitle}>River</Text>
              <Text style={styles.cardDescription}>
                Each card uses a different image
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Banner (Light Overlay)</Text>
        <ImageBackground src={Landscape2} style={styles.banner}>
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Light overlay pattern</Text>
            <Text style={styles.bannerText}>
              A semi-transparent white overlay keeps text readable over busy
              backgrounds. Combine ImageBackground with any layout.
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ImageBackground accepts the same props as Image plus children
        </Text>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'image-background',
  name: 'Image Background',
  description: 'ImageBackground component with children layered over images',
  Document: ImageBackgroundExample,
};
