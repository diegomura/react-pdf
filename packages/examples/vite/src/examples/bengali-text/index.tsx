import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';

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

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fafafa',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bengaliText: {
    fontSize: 28,
    fontFamily: 'NotoSansBengali',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  tamilText: {
    fontSize: 28,
    fontFamily: 'NotoSansTamil',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  thaiText: {
    fontSize: 28,
    fontFamily: 'Sarabun',
    color: '#1a1a1a',
    marginBottom: 4,
  },
});

const BengaliText = () => (
  <Document>
    <Page style={styles.page}>
      {/* #3310 — Bengali e-kar spacing and glyph clipping */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>#3310 — Bengali</Text>
        <Text style={styles.bengaliText}>হোসেন</Text>
        <Text style={styles.bengaliText}>বাংলা</Text>
        <Text style={styles.bengaliText}>মুফতি ইকবাল হোসেন নাটোরি</Text>
        <Text style={styles.bengaliText}>
          আমার সোনার বাংলা আমি তোমায় ভালোবাসি
        </Text>
      </View>

      {/* #3241 — Tamil composite character rendering */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>#3241 — Tamil</Text>
        <Text style={styles.tamilText}>து</Text>
        <Text style={styles.tamilText}>சொத்து</Text>
      </View>

      {/* #3295 — Thai ำ character causes text truncation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>#3295 — Thai</Text>
        <Text style={styles.thaiText}>ก</Text>
        <Text style={styles.thaiText}>กำ</Text>
        <Text style={styles.thaiText}>กำก</Text>
        <Text style={styles.thaiText}>กำกก</Text>
        <Text style={styles.thaiText}>กำกกก</Text>
        <Text style={styles.thaiText}>กำกกกำ</Text>
        <Text style={styles.thaiText}>กำกกกำก</Text>
        <Text style={styles.thaiText}>กำกกกำกก</Text>
        <Text style={styles.thaiText}>กำกกกำกกก</Text>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'bengali-text',
  name: 'Bengali Text',
  description: 'Complex script rendering — Bengali, Tamil, and Thai',
  Document: BengaliText,
};
