import React from 'react';
import {
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';

import SimpleIcon from '../../../public/simple-icon.svg';
import TestLogoUnitless from '../../../public/test-logo-unitless.svg';
import TestLogoPt from '../../../public/test-logo-pt.svg';
import TestLogoPx from '../../../public/test-logo-px.svg';
import TestLogoIn from '../../../public/test-logo-in.svg';
import TestLogoCm from '../../../public/test-logo-cm.svg';
import TestLogoMm from '../../../public/test-logo-mm.svg';
import VideoCall from '../../../public/video-call.svg';

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
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageLabel: {
    fontSize: 7,
    color: '#aaa',
    marginTop: 4,
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

const SvgImageExample = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>SVG Image</Text>
      <Text style={styles.subtitle}>
        SVG files rendered via the Image component with different sizes and
        units
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Basic SVG Images</Text>
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            <Image src={SimpleIcon} style={{ width: 40, height: 40 }} />
            <Text style={styles.imageLabel}>40x40</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={SimpleIcon} style={{ width: 60, height: 60 }} />
            <Text style={styles.imageLabel}>60x60</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={SimpleIcon} style={{ width: 100, height: 100 }} />
            <Text style={styles.imageLabel}>100x100</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={TestLogoUnitless} style={{ width: 120, height: 120 }} />
            <Text style={styles.imageLabel}>With Text and Gradient</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Different Units (Native Size)</Text>
        <View style={styles.imageRow}>
          <View style={styles.imageContainer}>
            <Image src={TestLogoIn} />
            <Text style={styles.imageLabel}>1in = 72</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={TestLogoCm} />
            <Text style={styles.imageLabel}>3cm ≈ 85</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={TestLogoPx} />
            <Text style={styles.imageLabel}>120px = 90</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={TestLogoPt} />
            <Text style={styles.imageLabel}>100pt = 100</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image src={TestLogoMm} />
            <Text style={styles.imageLabel}>50mm ≈ 142</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Complex SVG</Text>
        <Image src={VideoCall} style={{ width: 300, height: 172 }} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>SVG files rendered as images</Text>
        <Text style={styles.footerText}>Supports multiple unit types</Text>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'svg-image',
  name: 'SVG Image',
  description: 'SVG files rendered via the Image component',
  Document: SvgImageExample,
};
