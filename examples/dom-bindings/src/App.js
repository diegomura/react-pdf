import React from 'react';
import { Document } from '@react-pdf/dom';
import { Page } from '@react-pdf/core';
import Fractal from './Fractal';

const App = () => (
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

export default App;
