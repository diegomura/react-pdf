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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },

  // Grid cells
  cell: {
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  darkText: {
    fontSize: 8,
    color: '#1a1a1a',
  },
});

const COLORS = [
  '#3B82F6',
  '#22C55E',
  '#A855F7',
  '#F97316',
  '#EC4899',
  '#14B8A6',
  '#EF4444',
  '#EAB308',
  '#6366F1',
  '#06B6D4',
  '#F43F5E',
  '#84CC16',
];

const Cell = ({
  color,
  children,
  style,
}: {
  color: string;
  children: React.ReactNode;
  style?: object;
}) => (
  <View style={[styles.cell, { backgroundColor: color }, style]}>
    <Text style={styles.cellText}>{children}</Text>
  </View>
);

const Grid = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>CSS Grid</Text>
      <Text style={styles.subtitle}>
        Grid layout with fractional units, spanning, and auto-flow
      </Text>

      <View wrap={false} style={styles.card}>
        <Text style={styles.sectionLabel}>Equal Columns (1fr 1fr 1fr)</Text>
        <View
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 6,
          }}
        >
          {COLORS.slice(0, 6).map((c, i) => (
            <Cell key={i} color={c}>
              {i + 1}
            </Cell>
          ))}
        </View>
      </View>

      <View wrap={false} style={styles.card}>
        <Text style={styles.sectionLabel}>Mixed Columns (80px 1fr 2fr)</Text>
        <View
          style={{ display: 'grid', gridTemplateColumns: '80 1fr 2fr', gap: 6 }}
        >
          <Cell color="#64748B">Fixed</Cell>
          <Cell color="#3B82F6">1fr</Cell>
          <Cell color="#22C55E">2fr</Cell>
          <Cell color="#64748B">Fixed</Cell>
          <Cell color="#3B82F6">1fr</Cell>
          <Cell color="#22C55E">2fr</Cell>
        </View>
      </View>

      <View wrap={false} style={styles.card}>
        <Text style={styles.sectionLabel}>4 x 3 Grid</Text>
        <View
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridTemplateRows: '36 36 36',
            gap: 4,
          }}
        >
          {COLORS.map((c, i) => (
            <Cell key={i} color={c}>
              {i + 1}
            </Cell>
          ))}
        </View>
      </View>

      <View wrap={false} style={styles.card}>
        <Text style={styles.sectionLabel}>Column and Row Spanning</Text>
        <View
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '36 36 36',
            gap: 4,
          }}
        >
          <Cell color="#6366F1" style={{ gridColumn: '1 / 4' }}>
            Header (3 cols)
          </Cell>
          <Cell color="#14B8A6" style={{ gridRow: '2 / 4' }}>
            Side
          </Cell>
          <Cell color="#3B82F6">A</Cell>
          <Cell color="#22C55E">B</Cell>
          <Cell color="#F97316">C</Cell>
          <Cell color="#EC4899">D</Cell>
        </View>
      </View>

      <View wrap={false} style={styles.card}>
        <Text style={styles.sectionLabel}>Dashboard Layout</Text>
        <View
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '28 80 28',
            gap: 4,
          }}
        >
          <View
            style={[
              styles.cell,
              {
                gridColumn: '1 / 4',
                backgroundColor: '#1E293B',
              },
            ]}
          >
            <Text style={styles.cellText}>Header</Text>
          </View>
          <View
            style={[
              styles.cell,
              {
                backgroundColor: '#334155',
              },
            ]}
          >
            <Text style={styles.cellText}>Nav</Text>
          </View>
          <View
            style={[
              styles.cell,
              {
                gridColumn: '2 / 4',
                backgroundColor: '#F1F5F9',
              },
            ]}
          >
            <Text style={styles.darkText}>Main Content</Text>
          </View>
          <View
            style={[
              styles.cell,
              {
                gridColumn: '1 / 4',
                backgroundColor: '#1E293B',
              },
            ]}
          >
            <Text style={styles.cellText}>Footer</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'grid',
  name: 'CSS Grid',
  description: '',
  Document: Grid,
};
