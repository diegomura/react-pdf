import React from 'react';
import {
  Document,
  Page,
  Font,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

const shy = '\u00ad';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fafafa',
  },
  title: {
    fontFamily: 'Oswald',
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
  rowCard: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    flex: 1,
  },
  text: {
    fontFamily: 'Oswald',
    fontSize: 14,
    color: '#1a1a1a',
  },
  textSmall: {
    fontFamily: 'Oswald',
    fontSize: 11,
    color: '#1a1a1a',
  },
  constrainedBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    padding: 8,
  },
});

const dutchWord = `Potentieel broeikas${shy}gas${shy}emissie${shy}rapport`;
const germanWord = `Donau${shy}dampf${shy}schiff${shy}fahrts${shy}gesellschaft`;
const finnishWord = `Epä${shy}järjestel${shy}mällistyt${shy}tämättö${shy}myydel${shy}länsä${shy}kään`;

const widths = [80, 120, 180];

const SoftHyphens = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Soft Hyphens</Text>
      <Text style={styles.subtitle}>
        Demonstrating automatic word breaking with the Unicode soft hyphen
        character (U+00AD) at various container widths
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Width — Dutch compound word</Text>
        <Text style={styles.text}>{dutchWord}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Full Width — German compound word</Text>
        <Text style={styles.text}>{germanWord}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Full Width — Finnish compound word</Text>
        <Text style={styles.text}>{finnishWord}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Constrained widths — Same word at 80pt, 120pt, and 180pt
        </Text>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 4 }}>
          {widths.map((w) => (
            <View key={w} style={[styles.constrainedBox, { width: w }]}>
              <Text style={{ fontSize: 7, color: '#aaa', marginBottom: 4 }}>
                {w}pt
              </Text>
              <Text style={styles.textSmall}>{dutchWord}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Constrained widths — German word at 80pt, 120pt, and 180pt
        </Text>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 4 }}>
          {widths.map((w) => (
            <View key={w} style={[styles.constrainedBox, { width: w }]}>
              <Text style={{ fontSize: 7, color: '#aaa', marginBottom: 4 }}>
                {w}pt
              </Text>
              <Text style={styles.textSmall}>{germanWord}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.rowCard}>
          <Text style={styles.label}>Narrow (80pt)</Text>
          <View style={[styles.constrainedBox, { width: 80 }]}>
            <Text style={styles.textSmall}>{finnishWord}</Text>
          </View>
        </View>
        <View style={styles.rowCard}>
          <Text style={styles.label}>Medium (120pt)</Text>
          <View style={[styles.constrainedBox, { width: 120 }]}>
            <Text style={styles.textSmall}>{finnishWord}</Text>
          </View>
        </View>
        <View style={styles.rowCard}>
          <Text style={styles.label}>Wide (180pt)</Text>
          <View style={[styles.constrainedBox, { width: 180 }]}>
            <Text style={styles.textSmall}>{finnishWord}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'soft-hyphens',
  name: 'Soft Hyphens',
  description: '',
  Document: SoftHyphens,
};
