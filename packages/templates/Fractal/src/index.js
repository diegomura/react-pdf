import React from 'react';
import ReactDOM from 'react-dom';
import { Page, Document, PDFViewer } from '@react-pdf/renderer';

import Fractal from './Fractal';

export const App = () => (
  <PDFViewer style={{height: "100vh", width: "70vw", display: "flex", overflow: "hidden"}}>
    <Document title="Fractals" author="John Doe" subject="Rendering fractals with react-pdf" keywords={['react', 'pdf', 'fractals']}>
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
  </PDFViewer>
);
ReactDOM.render(<App />, document.getElementById('root'));