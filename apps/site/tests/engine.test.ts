import type React from 'react';
import { describe, it, expect } from 'vitest';

import { transpile } from '../src/repl/transpile';
import { evaluateDocument } from '../src/repl/evaluate';

const SAMPLE = `
import React from 'react';
import ReactPDF, { Document, Page, Text } from '@react-pdf/renderer';

const Doc = () => (
  <Document>
    <Page>
      <Text>Hello</Text>
    </Page>
  </Document>
);

ReactPDF.render(<Doc />);
`;

// Verbatim copy of the legacy examples/quick-start.txt: no imports, relies on
// React/ReactPDF/StyleSheet/Document/... being injected as globals.
const LEGACY_QUICK_START = `// import React from 'react';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);`;

// Verbatim copy of the legacy examples/styles.txt: renders a bare element, not
// a component, and never mentions React.
const LEGACY_STYLES = `const styles = StyleSheet.create({
  page: { backgroundColor: 'tomato' },
  section: { color: 'white', textAlign: 'center', margin: 30 }
});

const doc = (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc);`;

describe('transpile', () => {
  it('compiles JSX to CJS', () => {
    const js = transpile(SAMPLE);
    expect(js).toContain('require(');
    expect(js).not.toContain('<Document>');
  });

  it('throws a positioned error on bad syntax', () => {
    expect(() => transpile('const x = <Document>')).toThrow();
  });

  it('exposes the line number of a syntax error', () => {
    let line: number | undefined;
    try {
      transpile('const ok = 1;\nconst x = <Document>');
    } catch (error) {
      line = (error as { loc?: { line?: number } }).loc?.line;
    }
    expect(line).toBe(2);
  });
});

describe('evaluateDocument', () => {
  it('captures the element passed to ReactPDF.render', () => {
    const element = evaluateDocument(transpile(SAMPLE));
    expect(element).toBeTruthy();
    expect(typeof element.type).toBe('function');
  });

  it('rejects unknown imports', () => {
    const code = transpile(`import fs from 'fs'; ReactPDF.render(null);`);
    expect(() => evaluateDocument(code)).toThrow(/Cannot import 'fs'/);
  });

  it('throws when no document is rendered', () => {
    expect(() => evaluateDocument(transpile('const x = 1;'))).toThrow(
      /ReactPDF\.render/,
    );
  });

  it('runs a legacy example that relies on injected globals', () => {
    const element = evaluateDocument(transpile(LEGACY_QUICK_START));
    expect(typeof element.type).toBe('function');
  });

  it('runs a legacy example that renders a bare element', () => {
    const element = evaluateDocument(transpile(LEGACY_STYLES));
    expect(element.type).toBeTruthy();
  });

  it('does not shadow built-in globals such as Math', () => {
    const element = evaluateDocument(
      transpile('ReactPDF.render(<Document>{Math.floor(1.5)}</Document>);'),
    ) as React.ReactElement<{ children: unknown }>;
    expect(element.props.children).toBe(1);
  });

  it('lets user declarations shadow injected globals', () => {
    // resume.txt declares `const List`, knobs.txt declares `const Select` —
    // both collide with injected renderer exports unless the compiled body
    // gets its own block scope.
    const element = evaluateDocument(
      transpile(`
        const List = ({ children }) => children;
        const Select = (props) => props.value;
        class Text { }
        let Page = 1;
        ReactPDF.render(<Document>{List({ children: Select({ value: Page }) })}</Document>);
      `),
    ) as React.ReactElement<{ children: unknown }>;

    expect(element.props.children).toBe(1);
  });

  it('isolates captured elements between evaluations', () => {
    const first = evaluateDocument(transpile(LEGACY_STYLES));
    const second = evaluateDocument(transpile(SAMPLE));
    expect(first).not.toBe(second);
  });
});
