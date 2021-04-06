import BlobStream from 'blob-stream';
import FontStore from '@react-pdf/font';
import renderPDF from '@react-pdf/render';
import PDFDocument from '@react-pdf/pdfkit';
import layoutDocument from '@react-pdf/layout';

import createRenderer from './renderer';
import { version } from '../package.json';

const fontStore = new FontStore();

const pdf = (initialValue, onChange) => {
  const container = { type: 'ROOT', document: null };
  const renderer = createRenderer({ onChange });
  const mountNode = renderer.createContainer(container);

  const updateContainer = doc => {
    renderer.updateContainer(doc, mountNode, null);
  };

  if (initialValue) updateContainer(initialValue);

  const layout = async () => {
    return layoutDocument(container.document, fontStore);
  }

  const render = async () => {
    const ctx = new PDFDocument({ autoFirstPage: false });
    const layoutData = await layout();
    return renderPDF(ctx, layoutData);
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

  const toString = async () => {
    let result = '';
    const instance = await render();

    return new Promise((resolve, reject) => {
      try {
        instance.on('data', buffer => {
          result += buffer;
        });

        instance.on('end', () => {
          callOnRender();
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    container,
    layout,
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

export { version, Font, StyleSheet, pdf, createRenderer };
