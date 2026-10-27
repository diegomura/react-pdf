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
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cell: {
    width: '18%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 6,
    color: '#999',
    marginBottom: 6,
    textAlign: 'center',
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: '#4A90D9',
    borderRadius: 3,
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

const origins = [
  'left',
  'center',
  'right',
  'top',
  'bottom',
  '10',
  '10 10',
  'top left',
  'left top',
  'top right',
  'right top',
  'top center',
  'center top',
  'center center',
  'center bottom',
  'bottom center',
  'bottom left',
  'left bottom',
  'bottom right',
  'right bottom',
  '10 bottom',
  'bottom 10',
  'top 10',
  '10 top',
  'left 10',
  '10mm 1in',
];

const Box = ({ origin }) => (
  <View style={styles.cell}>
    <Text style={styles.label}>{String(origin)}</Text>
    <View style={[styles.box, { transformOrigin: origin }]} debug />
  </View>
);

const TransformOrigin = () => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Transform Origin</Text>
        <Text style={styles.subtitle}>
          All supported transformOrigin values — keywords, numbers, pairs, and
          units
        </Text>

        <View style={styles.grid}>
          {origins.map((origin) => (
            <Box key={String(origin)} origin={origin} />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Each box has its transformOrigin set to the value shown in its label
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default {
  id: 'transform-origin',
  name: 'Transform Origin',
  description: '',
  Document: TransformOrigin,
};
