import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Svg,
  G,
  Rect,
  StyleSheet,
} from '@react-pdf/renderer';

const COLORS = ['#4A90D9', '#50C878', '#E8637A', '#F5A623', '#9B59B6'];

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const styles = StyleSheet.create({
  page: {
    padding: 30,
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
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    alignItems: 'center',
    overflow: 'hidden',
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 7,
    color: '#aaa',
  },
});

const SvgTransform = () => {
  return (
    <Document>
      <Page size={[660, 720]} style={styles.page}>
        <Text style={styles.title}>SVG Transforms</Text>
        <Text style={styles.subtitle}>
          200 rectangles with random translate and rotate transforms
        </Text>

        <View style={styles.card}>
          <Svg width="600" height="500">
            {Array.from({ length: 200 }).map((_, i) => (
              <G
                key={i}
                style={{
                  transform: `translate(${randBetween(0, 600)}, ${randBetween(0, 600)}) rotate(${randBetween(-180, 180)}deg)`,
                }}
              >
                <Rect
                  fill={COLORS[i % COLORS.length]}
                  width="200"
                  height="50"
                  opacity={0.7}
                />
              </G>
            ))}
          </Svg>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Each shape uses translate() and rotate() transforms
          </Text>
          <Text style={styles.footerText}>Rendered as native PDF paths</Text>
        </View>
      </Page>
    </Document>
  );
};

export default {
  id: 'svg-transform',
  name: 'Svg Transform',
  description: '',
  Document: SvgTransform,
};
