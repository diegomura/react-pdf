import React from 'react';
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

import RobotoRegular from '../../../public/Roboto-Regular.ttf';
import RobotoBold from '../../../public/Roboto-Bold.ttf';
import RubikRegular from '../../../public/Rubik-Regular.ttf';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: RobotoRegular, fontWeight: 400 },
    { src: RobotoBold, fontWeight: 700 },
  ],
});

Font.register({
  family: 'Rubik',
  fonts: [{ src: RubikRegular, fontWeight: 400 }],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fafafa',
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 9,
    color: '#888888',
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
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  rowLabel: {
    width: 190,
    fontSize: 8,
    fontFamily: 'Courier',
    color: '#666666',
  },
  sample: {
    fontSize: 13,
    color: '#333333',
  },
  column: {
    flex: 1,
  },
  columnHeading: {
    fontSize: 8,
    fontFamily: 'Courier',
    color: '#666666',
    textAlign: 'right',
    marginBottom: 4,
  },
  amount: {
    fontFamily: 'Rubik',
    fontSize: 13,
    color: '#333333',
    textAlign: 'right',
  },
});

type TextStyleProp = React.ComponentProps<typeof Text>['style'];

const Row = ({
  code,
  style,
  children,
}: {
  code: string;
  style?: TextStyleProp;
  children: string;
}) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{code}</Text>
    <Text style={[styles.sample, style]}>{children}</Text>
  </View>
);

const AMOUNTS = ['1,111.11', '9,010.90', '741.07'];

const FontFeatureSettings = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Font Feature Settings</Text>
      <Text style={styles.subtitle}>
        OpenType features toggled per text run through the fontFeatureSettings
        style — a list of feature tags, or an object turning individual features
        on and off
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>tnum — tabular figures (Rubik)</Text>
        <Row code="default" style={{ fontFamily: 'Rubik' }}>
          012'345'678'901
        </Row>
        <Row
          code="['tnum']"
          style={{ fontFamily: 'Rubik', fontFeatureSettings: ['tnum'] }}
        >
          012'345'678'901
        </Row>
        <View style={[styles.row, { marginTop: 8, marginBottom: 0 }]}>
          <Text style={styles.rowLabel}>right-aligned columns</Text>
          <View style={[styles.column, { marginRight: 24 }]}>
            <Text style={styles.columnHeading}>default</Text>
            {AMOUNTS.map((amount) => (
              <Text key={amount} style={styles.amount}>
                {amount}
              </Text>
            ))}
          </View>
          <View style={styles.column}>
            <Text style={styles.columnHeading}>['tnum']</Text>
            {AMOUNTS.map((amount) => (
              <Text
                key={amount}
                style={[styles.amount, { fontFeatureSettings: ['tnum'] }]}
              >
                {amount}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>liga — common ligatures (Roboto)</Text>
        <Row code="default">A firefighter from Sheffield</Row>
        <Row code="{ liga: 0 }" style={{ fontFeatureSettings: { liga: 0 } }}>
          A firefighter from Sheffield
        </Row>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>smcp — small capitals (Roboto)</Text>
        <Row code="default">A firefighter from Sheffield</Row>
        <Row code="['smcp']" style={{ fontFeatureSettings: ['smcp'] }}>
          A firefighter from Sheffield
        </Row>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>inheritance</Text>
        <Text style={[styles.sample, { fontFeatureSettings: ['tnum'] }]}>
          Features inherit into nested text runs:{' '}
          <Text style={{ fontFamily: 'Rubik' }}>012'345'678'901</Text>
        </Text>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'font-feature-settings',
  name: 'Font Feature Settings',
  description:
    'OpenType font features like tabular figures, ligatures and small caps',
  Document: FontFeatureSettings,
};
