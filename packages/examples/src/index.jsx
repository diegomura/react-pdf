import React from 'react';
import { createRoot } from 'react-dom/client';

import { PDFViewer } from '@react-pdf/renderer'

import Document from './pageWrap'

import './index.css'

const DocumentWrapper = () => {
  return (
    <>
      <PDFViewer>
        <Document />
      </PDFViewer>
    </>
  )
}

const MOUNT_ELEMENT = document.createElement('div');

document.body.appendChild(MOUNT_ELEMENT);

const root = createRoot(MOUNT_ELEMENT); // createRoot(container!) if you use TypeScript

root.render(<DocumentWrapper />);
