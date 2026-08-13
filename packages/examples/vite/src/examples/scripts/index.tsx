import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';

import RobotoFont from '../../../public/Roboto-Regular.ttf';

Font.register({
  family: 'Roboto',
  fonts: [{ src: RobotoFont }],
});

Font.register({
  family: 'NotoSansBengali',
  src: 'https://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsolKudCk8izI0lc.ttf',
});

Font.register({
  family: 'NotoSansTamil',
  src: 'https://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7vGor0RqKDt_EvT.ttf',
});

Font.register({
  family: 'Sarabun',
  src: 'https://fonts.gstatic.com/s/sarabun/v17/DtVjJx26TKEr37c9WBI.ttf',
});

Font.register({
  family: 'NotoSansArabic',
  src: 'https://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyGyvu3CBFQLaig.ttf',
});

Font.register({
  family: 'NotoSansDevanagari',
  src: 'https://fonts.gstatic.com/s/notosansdevanagari/v30/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlXQly-A.ttf',
});

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
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  halfCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  label: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  scriptText: {
    fontSize: 24,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  scriptTextSmall: {
    fontSize: 14,
    color: '#333',
    lineHeight: 1.6,
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

const Scripts = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>World Scripts</Text>
      <Text style={styles.subtitle}>
        Complex script rendering with Unicode decomposition and shaping
      </Text>

      <View style={styles.row}>
        <View style={styles.halfCard}>
          <Text style={styles.label}>Bengali</Text>
          <Text style={[styles.scriptText, { fontFamily: 'NotoSansBengali' }]}>
            বাংলা
          </Text>
          <Text
            style={[styles.scriptTextSmall, { fontFamily: 'NotoSansBengali' }]}
          >
            আমার সোনার বাংলা আমি তোমায় ভালোবাসি
          </Text>
        </View>
        <View style={styles.halfCard}>
          <Text style={styles.label}>Tamil</Text>
          <Text style={[styles.scriptText, { fontFamily: 'NotoSansTamil' }]}>
            தமிழ்
          </Text>
          <Text
            style={[styles.scriptTextSmall, { fontFamily: 'NotoSansTamil' }]}
          >
            யாதும் ஊரே யாவரும் கேளிர்
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfCard}>
          <Text style={styles.label}>Thai</Text>
          <Text style={[styles.scriptText, { fontFamily: 'Sarabun' }]}>
            ภาษาไทย
          </Text>
          <Text style={[styles.scriptTextSmall, { fontFamily: 'Sarabun' }]}>
            สวัสดีครับ ยินดีต้อนรับ
          </Text>
        </View>
        <View style={styles.halfCard}>
          <Text style={styles.label}>Arabic</Text>
          <Text style={[styles.scriptText, { fontFamily: 'NotoSansArabic' }]}>
            العربية
          </Text>
          <Text
            style={[styles.scriptTextSmall, { fontFamily: 'NotoSansArabic' }]}
          >
            مرحبا بالعالم
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfCard}>
          <Text style={styles.label}>Devanagari</Text>
          <Text
            style={[styles.scriptText, { fontFamily: 'NotoSansDevanagari' }]}
          >
            हिन्दी
          </Text>
          <Text
            style={[
              styles.scriptTextSmall,
              { fontFamily: 'NotoSansDevanagari' },
            ]}
          >
            वसुधैव कुटुम्बकम्
          </Text>
        </View>
        <View style={styles.halfCard}>
          <Text style={styles.label}>Latin — Accented</Text>
          <Text style={[styles.scriptText, { fontFamily: 'Roboto' }]}>
            café résumé
          </Text>
          <Text style={[styles.scriptTextSmall, { fontFamily: 'Roboto' }]}>
            naïve François Zürich Ångström
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Mixed Scripts</Text>
        <Text
          style={[styles.scriptTextSmall, { fontFamily: 'NotoSansBengali' }]}
        >
          মুফতি ইকবাল হোসেন নাটোরি
        </Text>
        <Text style={[styles.scriptTextSmall, { fontFamily: 'Sarabun' }]}>
          กำกกกำกกก
        </Text>
        <Text style={[styles.scriptTextSmall, { fontFamily: 'NotoSansTamil' }]}>
          சொத்து
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Fonts loaded from Google Fonts — requires Unicode decomposition for
          correct glyph shaping
        </Text>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'scripts',
  name: 'World Scripts',
  description:
    'Complex script rendering — Bengali, Tamil, Thai, Arabic, Devanagari, and accented Latin',
  Document: Scripts,
};
