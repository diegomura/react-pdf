import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import Doc from '../src/text';

const mountNode = document.querySelector('#app');

const PDF = () => (
  <PDFViewer>
    <Doc />
  </PDFViewer>
);

ReactDOM.render(<PDF />, mountNode);
