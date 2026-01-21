import React from 'react';
import { Document, Page, View, Image, Text, StyleSheet, Font } from '@react-pdf/renderer';

import SimpleIcon from '../../../public/simple-icon.svg';
import TestLogoUnitless from '../../../public/test-logo-unitless.svg';
import TestLogoPt from '../../../public/test-logo-pt.svg';
import TestLogoPx from '../../../public/test-logo-px.svg';
import TestLogoIn from '../../../public/test-logo-in.svg';
import TestLogoCm from '../../../public/test-logo-cm.svg';
import TestLogoMm from '../../../public/test-logo-mm.svg';
import VideoCall from '../../../public/video-call.svg';

Font.register({
  family: 'Roboto',
  src: '/Roboto-Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
});

const SvgImageExample = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>SVG via Image</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic SVG Images</Text>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image src={SimpleIcon} style={{ width: 40, height: 40 }} />
            <Text style={styles.label}>40x40</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={SimpleIcon} style={{ width: 60, height: 60 }} />
            <Text style={styles.label}>60x60</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={SimpleIcon} style={{ width: 100, height: 100 }} />
            <Text style={styles.label}>100x100</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={TestLogoUnitless} style={{ width: 120, height: 120 }} />
            <Text style={styles.label}>With Text and Gradient (120x120)</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          SVG with Different Units (native size)
        </Text>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image src={TestLogoIn} />
            <Text style={styles.label}>1in = 72</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={TestLogoCm} />
            <Text style={styles.label}>3cm ≈ 85</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={TestLogoPx} />
            <Text style={styles.label}>120px = 90</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={TestLogoPt} />
            <Text style={styles.label}>100pt = 100</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={TestLogoMm} />
            <Text style={styles.label}>50mm ≈ 142</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Complex image</Text>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image src={VideoCall} style={{ width: 300, height: 172 }} />
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'svg-image',
  name: 'SVG Image',
  description: 'Test SVG files in Image component',
  Document: SvgImageExample,
};
