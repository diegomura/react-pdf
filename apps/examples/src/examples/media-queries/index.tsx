import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 35,
    backgroundColor: '#fafafa',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 9,
    color: '#888888',
  },
  content: {
    gap: 12,
    '@media max-width: 400': {
      flexDirection: 'column',
    },
    '@media min-width: 400': {
      flexDirection: 'row',
    },
  },
  block: {
    height: 150,
    width: 150,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockLabel: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  note: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  noteText: {
    fontSize: 8,
    color: '#666666',
  },
});

const MediaComponent = ({
  width,
  layout,
  note,
}: {
  width: number;
  layout: string;
  note: string;
}) => (
  <>
    <View style={styles.header}>
      <Text style={styles.title}>Media Queries</Text>
      <Text style={styles.subtitle}>
        Page width: {width}pt — layout: {layout}
      </Text>
    </View>
    <View style={styles.content}>
      <View style={[styles.block, { backgroundColor: '#4A90D9' }]}>
        <Text style={styles.blockLabel}>Block A</Text>
      </View>
      <View style={[styles.block, { backgroundColor: '#50C878' }]}>
        <Text style={styles.blockLabel}>Block B</Text>
      </View>
    </View>
    <View style={styles.note}>
      <Text style={styles.noteText}>{note}</Text>
    </View>
  </>
);

const MediaQueries = () => (
  <Document>
    <Page style={styles.page} size={[500, 600]}>
      <MediaComponent
        width={500}
        layout="row"
        note="This page is 500pt wide (above 400pt threshold), so the blocks are arranged in a row via @media min-width: 400."
      />
    </Page>
    <Page style={styles.page} size={[300, 600]}>
      <MediaComponent
        width={300}
        layout="column"
        note="This page is 300pt wide (below 400pt threshold), so the blocks stack in a column via @media max-width: 400."
      />
    </Page>
  </Document>
);

export default {
  id: 'media-queries',
  name: 'Media Queries',
  description: 'Responsive layout using media queries',
  Document: MediaQueries,
};
