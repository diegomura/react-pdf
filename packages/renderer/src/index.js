import BlobStream from 'blob-stream';
import renderPDF from '@react-pdf/render';
import PDFDocument from '@react-pdf/pdfkit';
import layoutDocument from '@react-pdf/layout';

// import Font from './font';
import createRenderer from './renderer';
import { version } from '../package.json';

const pdf = ({ initialValue, onChange }) => {
  const container = { type: 'ROOT', document: null };
  const PDFRenderer = createRenderer({ onChange });
  const mountNode = PDFRenderer.createContainer(container);

  if (initialValue) updateContainer(initialValue);

  const render = async () => {
    const ctx = new PDFDocument({ autoFirstPage: false });

    console.time('layout');
    const layout = await layoutDocument(container.document);
    console.timeEnd('layout');

    return renderPDF(ctx, layout);
  };

  const layout = async () => {
    // return layoutDocument(container);
  };

  function updateContainer(doc) {
    PDFRenderer.updateContainer(doc, mountNode, null);
  }

  function callOnRender(params = {}) {
    if (container.document.props.onRender) {
      container.document.props.onRender(params);
    }
  }

  async function toBlob() {
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
  }

  async function toBuffer() {
    callOnRender();
    return render();
  }

  function toString() {
    let result = '';
    const instance = render();

    return new Promise((resolve, reject) => {
      try {
        instance.on('data', function(buffer) {
          result += buffer;
        });

        instance.on('end', function() {
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    layout,
    container,
    updateContainer,
    toBuffer,
    toBlob,
    toString,
  };
};

const StyleSheet = {
  create: s => s
}

export { version, StyleSheet, pdf };
