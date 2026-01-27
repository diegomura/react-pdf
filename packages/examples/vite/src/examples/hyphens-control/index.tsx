import React from 'react';
import { Document, Page, Font, Text, View, StyleSheet } from '@react-pdf/renderer';

// Register fonts
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
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 5,
    color: '#666',
    fontFamily: 'Helvetica',
  },
  subtitleJP: {
    fontSize: 10,
    marginBottom: 5,
    color: '#666',
    fontFamily: 'NotoSansJP',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  box: {
    width: 100,
    marginRight: 8,
    padding: 5,
    border: '1px solid #ccc',
  },
  boxWide: {
    width: 300,
    marginRight: 8,
    padding: 5,
    border: '1px solid #ccc',
  },
  label: {
    fontSize: 7,
    color: '#999',
    marginBottom: 3,
    fontFamily: 'Helvetica',
  },
  englishText: {
    fontFamily: 'Oswald',
    fontSize: 12,
  },
  japaneseText: {
    fontFamily: 'NotoSansJP',
    fontSize: 12,
  },
  usageText: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    marginBottom: 4,
  },
});

const HyphensControl = () => (
  <Document>
    <Page style={styles.page}>
      {/* English Hyphen Examples */}
      <View style={styles.section}>
        <Text style={styles.title}>1. Hyphen Control (English)</Text>
        <Text style={styles.subtitle}>
          Long word in narrow container - control hyphen character
        </Text>

        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.label}>Default (hyphen)</Text>
            <Text style={styles.englishText}>
              Potentieelbroeikasgasemissierapport
            </Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}>hyphens: none</Text>
            <Text style={[styles.englishText, { hyphens: 'none' }]}>
              Potentieelbroeikasgasemissierapport
            </Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.label}>hyphenateCharacter: ...</Text>
            <Text style={[styles.englishText, { hyphenateCharacter: '...' }]}>
              Potentieelbroeikasgasemissierapport
            </Text>
          </View>
        </View>
      </View>

      {/* Japanese without word-break */}
      <View style={styles.section}>
        <Text style={styles.title}>2. CJK Text - word-break</Text>
        <Text style={styles.subtitleJP}>
          Problem: &quot;グレートブリテン&quot; alone on a line due to
          script-based run splitting
        </Text>

        <View style={styles.row}>
          <View style={styles.box}>
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

          <View style={styles.box}>
            <Text style={styles.label}>
              wordBreak: normal (CJK characters break at any position)
            </Text>
            <Text style={[styles.japaneseText, { wordBreak: 'normal' }]}>
              グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉
            </Text>
          </View>
        </View>
      </View>

      {/* Mixed content */}
      <View style={styles.section}>
        <Text style={styles.title}>4. Mixed Content (Japanese + English)</Text>
        <Text style={styles.subtitle}>
          CJK breaks anywhere, Latin only at hyphenation points
        </Text>

        <View style={styles.row}>
          <View style={styles.boxWide}>
            <Text style={styles.label}>wordBreak: normal</Text>
            <Text style={[styles.japaneseText, { wordBreak: 'normal' }]}>
              This is a long and Honorificabilitudinitatibus
              califragilisticexpialidocious
              Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu
              グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉
            </Text>
          </View>

          <View style={styles.boxWide}>
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

      {/* URL example */}
      <View style={styles.section}>
        <Text style={styles.title}>5. Long URLs</Text>
        <Text style={styles.subtitle}>
          break-all allows URLs to wrap at any character
        </Text>

        <View style={styles.row}>
          <View style={styles.boxWide}>
            <Text style={styles.label}>wordBreak: normal (overflow)</Text>
            <Text style={[styles.englishText, { wordBreak: 'normal' }]}>
              https://example.com/very/very/loooong/path/to/resource
            </Text>
          </View>

          <View style={styles.boxWide}>
            <Text style={styles.label}>
              wordBreak: break-all (wraps), hyphens: none
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
  id: 'hyphens-control',
  name: 'Hyphens Control',
  description: 'Demonstrates hyphens, hyphenateCharacter, and wordBreak CSS properties',
  Document: HyphensControl,
};
