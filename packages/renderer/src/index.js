import BlobStream from 'blob-stream';
import FontStore from '@react-pdf/font';
import renderPDF from '@react-pdf/render';
import PDFDocument from '@react-pdf/pdfkit';
import layoutDocument from '@react-pdf/layout';

import createRenderer from './renderer';
import { version } from '../package.json';

const fontStore = new FontStore();

const pdf = ({ initialValue, onChange }) => {
  const container = { type: 'ROOT', document: null };
  const PDFRenderer = createRenderer({ onChange });
  const mountNode = PDFRenderer.createContainer(container);

  const updateContainer = doc => {
    PDFRenderer.updateContainer(doc, mountNode, null);
  };

  if (initialValue) updateContainer(initialValue);

  const render = async () => {
    const ctx = new PDFDocument({ autoFirstPage: false });
    const layout = await layoutDocument(container.document, fontStore);

    return renderPDF(ctx, layout);
  };

  const callOnRender = (params = {}) => {
    if (container.document.props.onRender) {
      container.document.props.onRender(params);
    }
  };

  const toBlob = async () => {
    const instance = await render();
    const stream = instance.pipe(BlobStream());

    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        try {
          const blob = stream.toBlob('application/pdf');
          callOnRender({ blob });
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      });

      stream.on('error', reject);
    });
  };

  const toBuffer = async () => {
    callOnRender();
    return render();
  };

  const toString = () => {
    let result = '';
    const instance = render();

    return new Promise((resolve, reject) => {
      try {
        instance.on('data', buffer => {
          result += buffer;
        });

        instance.on('end', () => {
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    container,
    toBlob,
    toBuffer,
    toString,
    updateContainer,
  };
};

const Font = fontStore;

const StyleSheet = {
  create: s => s,
};

export { version, Font, StyleSheet, pdf };
