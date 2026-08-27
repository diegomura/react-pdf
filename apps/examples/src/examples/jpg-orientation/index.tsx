import React from 'react';
import {
  Document,
  Page,
  Image,
  View,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';

import Orientation1 from './images/orientation-1.jpeg';
import Orientation2 from './images/orientation-2.jpeg';
import Orientation3 from './images/orientation-3.jpeg';
import Orientation4 from './images/orientation-4.jpeg';
import Orientation5 from './images/orientation-5.jpeg';
import Orientation6 from './images/orientation-6.jpeg';
import Orientation7 from './images/orientation-7.jpeg';
import Orientation8 from './images/orientation-8.jpeg';

const orientations = [
  { src: Orientation1, label: 'Orientation 1', desc: 'Normal' },
  { src: Orientation2, label: 'Orientation 2', desc: 'Flipped horizontal' },
  { src: Orientation3, label: 'Orientation 3', desc: 'Rotated 180°' },
  { src: Orientation4, label: 'Orientation 4', desc: 'Flipped vertical' },
  { src: Orientation5, label: 'Orientation 5', desc: 'Transposed' },
  { src: Orientation6, label: 'Orientation 6', desc: 'Rotated 90° CW' },
  { src: Orientation7, label: 'Orientation 7', desc: 'Transversed' },
  { src: Orientation8, label: 'Orientation 8', desc: 'Rotated 90° CCW' },
];

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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    width: '24%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  label: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  desc: {
    fontSize: 7,
    color: '#bbb',
    marginBottom: 6,
  },
  image: {
    width: '100%',
    borderRadius: 3,
  },
});

const JpgOrientation = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>JPEG Orientation</Text>
      <Text style={styles.subtitle}>
        All 8 EXIF orientation values rendered correctly by react-pdf
      </Text>

      <View style={styles.grid}>
        {orientations.map((o) => (
          <View key={o.label} style={styles.card}>
            <Text style={styles.label}>{o.label}</Text>
            <Text style={styles.desc}>{o.desc}</Text>
            <Image src={o.src} style={styles.image} />
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default {
  id: 'jpg-orientation',
  name: 'Jpg Orientation',
  description: '',
  Document: JpgOrientation,
};
