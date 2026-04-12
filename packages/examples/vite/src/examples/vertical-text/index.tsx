import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  CJK,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
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
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    flex: 1,
  },
  cardLabel: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
});

const VerticalText = () => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Vertical Writing Mode</Text>
        <Text style={styles.subtitle}>
          Demonstrating writingMode: vertical-rl and vertical-lr for CJK text
        </Text>

        <Text style={styles.sectionTitle}>
          vertical-rl (right to left columns)
        </Text>

        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Korean</Text>
            <Text
              style={{
                writingMode: 'vertical-rl',
                fontFamily: CJK.KOREAN,
                fontSize: 16,
                height: 200,
              }}
            >
              모든 사람은 의견의 자유와 표현의 자유에 대한 권리를 가진다.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Japanese</Text>
            <Text
              style={{
                writingMode: 'vertical-rl',
                fontFamily: CJK.JAPANESE,
                fontSize: 16,
                height: 200,
              }}
            >
              すべての人間は、生まれながらにして自由であり、かつ尊厳と権。
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Simplified Chinese</Text>
            <Text
              style={{
                writingMode: 'vertical-rl',
                fontFamily: CJK.CHINESE_SIMPLIFIED,
                fontSize: 16,
                height: 200,
              }}
            >
              人人生而自由，在尊严和权利。
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Traditional Chinese</Text>
            <Text
              style={{
                writingMode: 'vertical-rl',
                fontFamily: CJK.CHINESE_TRADITIONAL,
                fontSize: 16,
                height: 200,
              }}
            >
              人人生而自由，在尊嚴和權利。
            </Text>
          </View>
        </View>
      </Page>

      <Page style={styles.body}>
        <Text style={styles.title}>Vertical Writing Mode</Text>
        <Text style={styles.subtitle}>
          Demonstrating writingMode: vertical-rl and vertical-lr for CJK text
        </Text>

        <Text style={styles.sectionTitle}>
          vertical-lr (left to right columns)
        </Text>

        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Japanese (vertical-lr)</Text>
            <Text
              style={{
                writingMode: 'vertical-lr',
                fontFamily: CJK.JAPANESE,
                fontSize: 14,
                height: 160,
              }}
            >
              すべての人間は、生まれながらにして自由であり、かつ尊厳と権。
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Latin text (vertical-rl)</Text>
            <Text
              style={{
                writingMode: 'vertical-rl',
                fontSize: 14,
                height: 80,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur repellat minima itaque.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Auto-detected CJK (no fontFamily)
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            Mixed CJK — fonts detected automatically
          </Text>
          <Text
            style={{
              writingMode: 'vertical-rl',
              fontSize: 14,
              height: 180,
            }}
          >
            한국어 日本語 中文 mixed text 人人生而自由，在尊嚴和權利。 모든
            사람은 의견의 자유와 표현의 자유에 대한 권리를 가진다.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default {
  id: 'vertical-text',
  name: 'Vertical Text',
  description: '',
  Document: VerticalText,
};
