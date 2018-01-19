import React, { Component } from 'react';
import { Document } from '@react-pdf/dom';
import { View, Text, Page, StyleSheet } from '@react-pdf/core';
import Fractal from './Fractal';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  block: {
    maxHeight: 200,
    maxWidth: 400,
    flex: 1,
  },
});

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="header">
          <h2>React PDF DOM bindings</h2>
        </div>
        <Document
          title="Fractals"
          author="John Doe"
          subject="Rendering fractals with react-pdf"
          keywords={['react', 'pdf', 'fractals']}
        >
          <Page size="A4">
            <Fractal steps={18} />
          </Page>

          <Page orientation="landscape" size="A4">
            <Fractal steps={14} />
          </Page>

          <Page size="B4">
            <Fractal steps={10} />
          </Page>
        </Document>
      </div>
    );
  }
}

export default App;
