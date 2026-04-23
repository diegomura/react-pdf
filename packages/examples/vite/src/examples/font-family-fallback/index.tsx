import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  CJK,
} from '@react-pdf/renderer';

import RobotoFont from '../../../public/Roboto-Regular.ttf';
import RobotoBoldFont from '../../../public/Roboto-Bold.ttf';
import RobotItalicFont from '../../../public/Roboto-Italic.ttf';

import NotoSansArabicFont from '../../../public/NotoSansArabic-Regular.ttf';

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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  regular: {
    fontFamily: ['Roboto', 'NotoSansArabic'],
    fontSize: 14,
    fontWeight: 900,
  },
  default: {
    fontFamily: ['Courier-Bold', 'NotoSansArabic'],
    fontSize: 14,
  },
});

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: RobotoFont,
      fontStyle: 'normal',
      fontWeight: 'normal',
    },
    {
      src: RobotItalicFont,
      fontStyle: 'italic',
      fontWeight: 'normal',
    },
    {
      src: RobotoBoldFont,
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
  ],
});

Font.register({
  family: 'NotoSansArabic',
  fonts: [
    {
      src: NotoSansArabicFont,
      fontWeight: 400,
    },
  ],
});

const MyDoc = () => {
  return (
    <Page style={styles.body}>
      <Text style={styles.title}>Font Family Fallback</Text>
      <Text style={styles.subtitle}>
        Demonstrating font fallbacks, mixed families, weights, and styles
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Default Courier</Text>
        <Text style={{ fontFamily: 'Courier', fontSize: 14 }}>
          This font is default Courier
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Roboto + Noto Sans Arabic fallback</Text>
        <Text style={styles.regular}>Roboto / امتحان</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          Courier-Bold + Noto Sans Arabic fallback
        </Text>
        <Text style={styles.default}>Courier-Bold / امتحان</Text>
      </View>

      <View style={[styles.card, { padding: 12 }]}>
        <Text style={styles.cardLabel}>
          Multiple font families, weights, and styles on the same line
        </Text>
        <Text style={{ fontFamily: 'Roboto', fontSize: 14 }}>
          Roboto Normal{' / '}
          <Text style={{ fontWeight: 'bold' }}>Roboto Bold</Text>
          {' / '}
          <Text style={{ fontStyle: 'italic' }}>Roboto Italic</Text>
          {' / '}
          <Text style={{ fontFamily: 'Courier' }}>Courier</Text>
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          Built-in CJK — Korean (auto-registered)
        </Text>
        <Text style={{ fontFamily: CJK.KOREAN, fontSize: 14 }}>
          한국어 텍스트
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          Built-in CJK — Japanese (auto-registered)
        </Text>
        <Text style={{ fontFamily: CJK.JAPANESE, fontSize: 14 }}>
          日本語テキスト — フォント登録不要
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          Built-in CJK — Simplified Chinese (auto-registered)
        </Text>
        <Text style={{ fontFamily: CJK.CHINESE_SIMPLIFIED, fontSize: 14 }}>
          简体中文文本 — 无需字体注册
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          CJK auto-detection — no fontFamily specified
        </Text>
        <Text style={{ fontSize: 14 }}>
          Mixed: Hello 한국어 日本語 中文 world
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          Roboto + CJK fallback (mixed scripts)
        </Text>
        <Text style={{ fontFamily: ['Roboto', CJK.KOREAN], fontSize: 14 }}>
          Roboto Latin with 한국어 fallback
        </Text>
      </View>
    </Page>
  );
};

const FontFamilyFallback = () => {
  return (
    <Document>
      <MyDoc />
    </Document>
  );
};

export default {
  id: 'font-family-fallback',
  name: 'Font Family Fallback',
  description: '',
  Document: FontFamilyFallback,
};
