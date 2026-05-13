import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Each entry below renders a sample string in a font that supports the
// non-BMP code points it contains. All sample characters live in U+10000+
// (SMP / SIP / TIP), i.e. they are UTF-16 surrogate pairs. The purpose of
// this example is to show that surrogate pairs are looked up in the font
// stack as a single code point — without that, every character here would
// fall back to Helvetica and render as a missing glyph (tofu).
//
// URLs were resolved from
//   https://fonts.googleapis.com/css2?family=...&text=...
// so each subset includes exactly the characters used below.
const SCRIPTS: ReadonlyArray<{
  family: string;
  label: string;
  caption: string;
  url: string;
  sample: string;
}> = [
  {
    family: 'Noto Sans JP',
    label: 'CJK Ext-B (Japanese name kanji)',
    caption:
      '\u{20BB7} U+20BB7 / \u{20B9F} U+20B9F / \u{29E3D} U+29E3D — SIP',
    url: 'https://fonts.gstatic.com/l/font?kit=-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75jY0rw_mMKldF3n7ULdqbuE7JzuU-TQZ2_b_xbeAw&skey=72472b0eb8793570&v=v56',
    // 𠮷田と吉田 𠮟 𩸽
    sample: '\u{20BB7}田と吉田  \u{20B9F}  \u{29E3D}',
  },
  {
    family: 'Noto Sans Egyptian Hieroglyphs',
    label: 'Egyptian Hieroglyphs',
    caption:
      '\u{13080} U+13080 / \u{1313F} U+1313F / \u{13142} U+13142 / \u{13189} U+13189 — SMP',
    url: 'https://fonts.gstatic.com/l/font?kit=vEF42-tODB8RrNDvZSUmRhcQHzx1s7y_F9-j3qSzEcbEYindSlK6xRkRmi-6DJyNmGC4VqdZ3IChdUU&skey=fc1730efc5589785&v=v30',
    // 𓂀 𓄿 𓅂 𓆉
    sample: '\u{13080} \u{1313F} \u{13142} \u{13189}',
  },
  {
    family: 'Noto Sans Cuneiform',
    label: 'Cuneiform',
    caption:
      '\u{12000} U+12000 / \u{12041} U+12041 / \u{1208A} U+1208A / \u{120FB} U+120FB — SMP',
    url: 'https://fonts.gstatic.com/l/font?kit=bMrrmTWK7YY-MF22aHGGd7H8PhJtvBDWgbxJkxQvU_W-t7uZ9YpFIaCIMrlrtE58&skey=730a3aeff71371d1&v=v18',
    // 𒀀 𒁁 𒂊 𒃻
    sample: '\u{12000} \u{12041} \u{1208A} \u{120FB}',
  },
  {
    family: 'Noto Sans Math',
    label: 'Mathematical Alphanumeric Symbols',
    caption:
      '\u{1D400} U+1D400 / \u{1D49C} U+1D49C / \u{1D538} U+1D538 / \u{1D56E} U+1D56E / \u{1D505} U+1D505 — SMP',
    url: 'https://fonts.gstatic.com/l/font?kit=7Aump_cpkSecTWaHRlH2hyV5UHkF-Vs48d-hNu0TJ8LlkGihpLHoHLXvHsBpBiI&skey=27a26f5b3f2d5ea1&v=v19',
    // 𝐀 𝒜 𝔸 𝕮 𝔅
    sample: '\u{1D400}\u{1D49C}\u{1D538} \u{1D56E} \u{1D505}',
  },
  {
    family: 'Noto Music',
    label: 'Musical Symbols',
    caption:
      '\u{1D11E} U+1D11E / \u{1D122} U+1D122 / \u{1D158}\u{1D165} U+1D158+U+1D165 / \u{1D158}\u{1D165}\u{1D16E} — SMP',
    url: 'https://fonts.gstatic.com/l/font?kit=pe0rMIiSN5pO63htf1sxItSQAdZqQUDYyhXhOzpYe6-hOgNGBD6n32j4Lg&skey=a1f7640827c2d625&v=v21',
    // 𝄞 𝄢 𝅘𝅥 𝅘𝅥𝅮
    sample: '\u{1D11E} \u{1D122} \u{1D158}\u{1D165} \u{1D158}\u{1D165}\u{1D16E}',
  },
  {
    family: 'Noto Sans Adlam',
    label: 'Adlam (modern West African)',
    caption:
      '\u{1E900} U+1E900 / \u{1E901} U+1E901 / \u{1E902} U+1E902 / \u{1E903} U+1E903 / \u{1E904} U+1E904 — SMP',
    url: 'https://fonts.gstatic.com/l/font?kit=neIczCCpqp0s5pPusPamd81eMfjPonvqdbYxxpgufnv0TGrBZLwggvomO9nbazENrX7-_ZwTdOY6tB2ltaK3&skey=1fb7f26201009a1b&v=v27',
    // 𞤀 𞤁 𞤂 𞤃 𞤄
    sample: '\u{1E900}\u{1E901}\u{1E902}\u{1E903}\u{1E904}',
  },
];

SCRIPTS.forEach(({ family, url }) => {
  Font.register({ family, src: url });
});

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
  cardCaption: {
    fontSize: 8,
    color: '#bbb',
    marginTop: 8,
  },
  sample: {
    fontSize: 24,
  },
});

const MyDoc = () => (
  <Page style={styles.body}>
    <Text style={styles.title}>Surrogate pair rendering (SMP / SIP / TIP)</Text>
    <Text style={styles.subtitle}>
      Every character below sits above U+FFFF and is encoded as a UTF-16
      surrogate pair. Each should resolve to its supporting font (Noto)
      and render as a real glyph, not as tofu.
    </Text>

    {SCRIPTS.map(({ family, label, caption, sample }) => (
      <View key={family} style={styles.card}>
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={[styles.sample, { fontFamily: family }]}>{sample}</Text>
        <Text style={styles.cardCaption}>{caption}</Text>
      </View>
    ))}
  </Page>
);

const SurrogatePair = () => (
  <Document>
    <MyDoc />
  </Document>
);

export default {
  id: 'surrogate-pair',
  name: 'Surrogate pair',
  description: '',
  Document: SurrogatePair,
};
