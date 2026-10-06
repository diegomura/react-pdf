import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

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
    marginBottom: 24,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  valueLabel: {
    fontSize: 8,
    color: '#999',
    width: 30,
    textAlign: 'right',
    marginRight: 10,
  },
  track: {
    flex: 1,
    height: 6,
    backgroundColor: '#e8e8e8',
    borderRadius: 3,
  },
  trackFill: {
    height: '100%',
    backgroundColor: '#4A90D9',
    borderRadius: 3,
  },
  knob: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#4A90D9',
    position: 'absolute',
    top: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  knobLabel: {
    fontSize: 6,
    color: '#4A90D9',
    fontWeight: 'bold',
  },
  endLabel: {
    fontSize: 8,
    color: '#999',
    width: 30,
    marginLeft: 10,
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

const Slider = ({ value }: { value: number }) => (
  <View style={styles.sliderRow}>
    <Text style={styles.valueLabel}>{value}%</Text>
    <View style={styles.track}>
      <View style={[styles.trackFill, { width: `${value}%` }]} />
      <View style={[styles.knob, { left: `${Math.max(0, value - 2)}%` }]}>
        <Text style={styles.knobLabel}>{value}</Text>
      </View>
    </View>
    <Text style={styles.endLabel}>100%</Text>
  </View>
);

const Knobs = () => (
  <Document>
    <Page size="A5" style={styles.page}>
      <Text style={styles.title}>Slider Knobs</Text>
      <Text style={styles.subtitle}>
        Absolute positioning and percentage-based layouts
      </Text>

      <Slider value={0} />
      <Slider value={10} />
      <Slider value={20} />
      <Slider value={30} />
      <Slider value={40} />
      <Slider value={50} />
      <Slider value={60} />
      <Slider value={70} />
      <Slider value={80} />
      <Slider value={90} />
      <Slider value={100} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Demonstrates percentage widths, absolute positioning, and border
          radius
        </Text>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'knobs',
  name: 'Knobs',
  description: '',
  Document: Knobs,
};
