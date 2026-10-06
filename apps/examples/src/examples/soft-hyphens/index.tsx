import React from 'react';
import {
  Document,
  Page,
  Font,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

const shy = '­';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

Font.register({
  family: 'NotoSansJP',
  src: 'https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf',
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
  // Page 2 (hyphens-control) styles
  page2: {
    padding: 30,
    backgroundColor: '#fafafa',
  },
  sectionTitle: {
    fontFamily: 'Oswald',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 9,
    color: '#888',
    marginBottom: 6,
  },
  sectionSubtitleJP: {
    fontFamily: 'NotoSansJP',
    fontSize: 9,
    color: '#888',
    marginBottom: 6,
  },
  controlSection: {
    marginBottom: 10,
  },
  smallBox: {
    backgroundColor: '#ffffff',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    padding: 6,
    width: 95,
    marginRight: 8,
  },
  wideBox: {
    backgroundColor: '#ffffff',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    padding: 6,
    width: 240,
    marginRight: 8,
  },
  englishText: {
    fontFamily: 'Oswald',
    fontSize: 11,
    color: '#1a1a1a',
  },
  japaneseText: {
    fontFamily: 'NotoSansJP',
    fontSize: 11,
    color: '#1a1a1a',
  },
});

const dutchWord = `Potentieel broeikas${shy}gas${shy}emissie${shy}rapport`;
const germanWord = `Donau${shy}dampf${shy}schiff${shy}fahrts${shy}gesellschaft`;
const finnishWord = `Epä${shy}järjestel${shy}mällistyt${shy}tämättö${shy}myydel${shy}länsä${shy}kään`;

const widths = [80, 120, 180];

const SoftHyphens = () => (
  <Document>
    {/* Page 1: Soft hyphen (U+00AD) auto break demonstration */}
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

    {/* Page 2: hyphens / hyphenateCharacter / wordBreak CSS controls */}
    <Page style={styles.page2}>
      <Text style={styles.title}>Hyphen & Word Break Controls</Text>
      <Text style={[styles.subtitle, { marginBottom: 12 }]}>
        Demonstrating hyphens, hyphenateCharacter, and wordBreak CSS properties
      </Text>

      <View style={styles.controlSection}>
        <Text style={styles.sectionTitle}>1. Hyphen Control (English)</Text>
        <Text style={styles.sectionSubtitle}>
          Long word in narrow container — control hyphen character
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.smallBox}>
            <Text style={styles.label}>Default (hyphen)</Text>
            <Text style={styles.englishText}>
              Potentieelbroeikasgasemissierapport
            </Text>
          </View>

          <View style={styles.smallBox}>
            <Text style={styles.label}>hyphens: none</Text>
            <Text style={[styles.englishText, { hyphens: 'none' }]}>
              Potentieelbroeikasgasemissierapport
            </Text>
          </View>

          <View style={styles.smallBox}>
            <Text style={styles.label}>hyphenateCharacter: ...</Text>
            <Text style={[styles.englishText, { hyphenateCharacter: '...' }]}>
              Potentieelbroeikasgasemissierapport
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.controlSection}>
        <Text style={styles.sectionTitle}>2. CJK Text — wordBreak</Text>
        <Text style={styles.sectionSubtitleJP}>
          Problem: &quot;グレートブリテン&quot; alone on a line due to
          script-based run splitting
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.smallBox}>
            <Text style={styles.label}>wordBreak: keep-all (problem)</Text>
            <Text
              style={[
                styles.japaneseText,
                { wordBreak: 'keep-all', hyphens: 'none' },
              ]}
            >
              グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉
            </Text>
          </View>

          <View style={styles.smallBox}>
            <Text style={styles.label}>
              wordBreak: normal (CJK breaks anywhere)
            </Text>
            <Text style={[styles.japaneseText, { wordBreak: 'normal' }]}>
              グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.controlSection}>
        <Text style={styles.sectionTitle}>
          3. Mixed Content (Japanese + English)
        </Text>
        <Text style={styles.sectionSubtitle}>
          CJK breaks anywhere, Latin only at hyphenation points
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.wideBox}>
            <Text style={styles.label}>wordBreak: normal</Text>
            <Text style={[styles.japaneseText, { wordBreak: 'normal' }]}>
              This is a long and Honorificabilitudinitatibus
              califragilisticexpialidocious
              Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu
              グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉
            </Text>
          </View>

          <View style={styles.wideBox}>
            <Text style={styles.label}>wordBreak: break-all</Text>
            <Text style={[styles.japaneseText, { wordBreak: 'break-all' }]}>
              This is a long and Honorificabilitudinitatibus
              califragilisticexpialidocious
              Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu
              グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.controlSection}>
        <Text style={styles.sectionTitle}>4. Long URLs</Text>
        <Text style={styles.sectionSubtitle}>
          break-all allows URLs to wrap at any character
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.wideBox}>
            <Text style={styles.label}>wordBreak: normal (overflow)</Text>
            <Text style={[styles.englishText, { wordBreak: 'normal' }]}>
              https://example.com/very/very/loooong/path/to/resource
            </Text>
          </View>

          <View style={styles.wideBox}>
            <Text style={styles.label}>
              wordBreak: break-all, hyphens: none
            </Text>
            <Text
              style={[
                styles.englishText,
                { wordBreak: 'break-all', hyphens: 'none' },
              ]}
            >
              https://example.com/very/very/loooong/path/to/resource
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'soft-hyphens',
  name: 'Hyphenation',
  description:
    'Soft hyphen (U+00AD) auto-break and the hyphens / hyphenateCharacter / wordBreak CSS controls',
  Document: SoftHyphens,
};
