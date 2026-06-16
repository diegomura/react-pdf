import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

import Quijote1 from '../../../public/quijote1.jpg';

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
    marginBottom: 6,
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
  imageWide: {
    width: '100%',
    height: 160,
    objectFit: 'fill',
    objectPositionX: 'center',
    objectPositionY: 'center',
    borderRadius: 3,
  },
  imageNarrow: {
    width: '100%',
    height: 160,
    objectFit: 'fill',
    objectPositionX: 'center',
    objectPositionY: 'center',
    borderRadius: 3,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 7,
    color: '#aaa',
  },
});

const DuplicatedImages = () => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Duplicated Images</Text>
        <Text style={styles.subtitle}>
          The same image source rendered multiple times — react-pdf deduplicates
          the embedded data automatically
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Full Width</Text>
          <Image style={styles.imageWide} src={Quijote1} />
        </View>

        <View style={styles.row}>
          <View style={styles.halfCard}>
            <Text style={styles.label}>Half Width (Left)</Text>
            <Image style={styles.imageNarrow} src={Quijote1} />
          </View>
          <View style={styles.halfCard}>
            <Text style={styles.label}>Half Width (Right)</Text>
            <Image style={styles.imageNarrow} src={Quijote1} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Full Width (Repeated)</Text>
          <Image style={styles.imageWide} src={Quijote1} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All four images reference the same source file
          </Text>
          <Text style={styles.footerText}>Embedded once in the PDF</Text>
        </View>
      </Page>
    </Document>
  );
};

export default {
  id: 'duplicated-images',
  name: 'Duplicated Images',
  description: '',
  Document: DuplicatedImages,
};
