import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Math } from '@react-pdf/math';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 9,
    color: '#888',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  cardLabel: {
    fontSize: 8,
    color: '#999',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  halfCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineText: {
    fontSize: 10,
    color: '#333',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 7,
    color: '#aaa',
  },
});

const MathExample = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Mathematical Typesetting</Text>
      <Text style={styles.subtitle}>
        LaTeX expressions rendered as vector graphics via @react-pdf/math
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Quadratic Formula</Text>
        <Math height={34}>{'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'}</Math>
      </View>

      <View style={styles.row}>
        <View style={styles.halfCard}>
          <Text style={styles.cardLabel}>Euler's Identity</Text>
          <Math height={18}>{'e^{i\\pi} + 1 = 0'}</Math>
        </View>
        <View style={styles.halfCard}>
          <Text style={styles.cardLabel}>Limits</Text>
          <Math height={26}>{'\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1'}</Math>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfCard}>
          <Text style={styles.cardLabel}>Gaussian Integral</Text>
          <Math height={32}>
            {'\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}'}
          </Math>
        </View>
        <View style={styles.halfCard}>
          <Text style={styles.cardLabel}>Basel Problem</Text>
          <Math height={32}>
            {'\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}'}
          </Math>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Matrix Notation</Text>
        <Math height={36}>
          {
            'A = \\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix}'
          }
        </Math>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Binomial Theorem</Text>
        <Math height={34}>
          {'(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n-k} y^k'}
        </Math>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Maxwell's Equation (Faraday's Law)</Text>
        <Math height={32}>
          {
            '\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}'
          }
        </Math>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Inline Usage</Text>
        <View style={styles.inlineRow}>
          <Text style={styles.inlineText}>The famous equation </Text>
          <Math inline height={12}>
            {'E = mc^2'}
          </Math>
          <Text style={styles.inlineText}> relates mass and energy.</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Generated with @react-pdf/math</Text>
        <Text style={styles.footerText}>Powered by MathJax</Text>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'math',
  name: 'Math (LaTeX)',
  description: 'Render LaTeX math expressions using @react-pdf/math',
  Document: MathExample,
};
