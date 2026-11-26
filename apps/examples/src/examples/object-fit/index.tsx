import React from 'react';
import {
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';

const IMAGE_SRC =
  'https://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg';

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
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    flex: 1,
  },
  cardFull: {
    backgroundColor: '#fff',
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
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const ObjectFit = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Object Fit</Text>
      <Text style={styles.subtitle}>
        Demonstrating contain, cover, and none modes
      </Text>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.label}>Contain</Text>
          <View style={styles.imageContainer}>
            <Image
              src={IMAGE_SRC}
              style={[styles.image, { objectFit: 'contain' }]}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Cover</Text>
          <View style={styles.imageContainer}>
            <Image
              src={IMAGE_SRC}
              style={[styles.image, { objectFit: 'cover' }]}
            />
          </View>
        </View>
      </View>

      <View style={styles.cardFull}>
        <Text style={styles.label}>None</Text>
        <View style={styles.imageContainer}>
          <Image
            src={IMAGE_SRC}
            style={[styles.image, { objectFit: 'none' }]}
          />
        </View>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'object-fit',
  name: 'Object Fit',
  description: '',
  Document: ObjectFit,
};
