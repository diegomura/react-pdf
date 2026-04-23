import React from 'react';
import { Page, Document, Link, Text, View } from '@react-pdf/renderer';

/**
 * Demonstrates bidirectional endnote links.
 *
 * Key insight: The destination `id` should be on a block-level element (View),
 * NOT on inline text. Links should wrap text directly for proper clickable areas.
 */
const Endnote = () => (
  <Document>
    <Page size="A4" style={{ padding: 30 }}>
      <View id="fn-src-1">
        <Text style={{ fontSize: 12, marginBottom: 15 }}>
          This demonstrates bidirectional endnote links. Click the superscript
          below to jump to the endnote, then click the back link to return.
        </Text>

        <Text style={{ fontSize: 12 }}>
          Here is some body text with a reference to an endnote{' '}
          <Link href="#fn-note-1" style={{ fontSize: 10, verticalAlign: 'super', color: '#0066cc' }}>¹</Link>
          {' '}that provides additional context. This demonstrates the "first
          occurrence wins" fix for wrapped text destinations.
        </Text>
      </View>
    </Page>

    <Page size="A4" style={{ padding: 30 }}>
      <View id="fn-note-1">
        <Text style={{ fontSize: 12, marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>1. </Text>
          This is the endnote explaining the reference. The link below should
          take you back to the paragraph on page 1.
        </Text>

        <Link href="#fn-src-1">
          <Text style={{ fontSize: 11, color: '#0066cc' }}>← Back to reference ¹</Text>
        </Link>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'endnote',
  name: 'Endnote',
  description: 'Bidirectional endnote links',
  Document: Endnote,
};
