import BlobStream from 'blob-stream';
import PDFRenderer from './renderer';
import StyleSheet from './stylesheet';
import { createInstance } from './elements';
import Font from './font';
import { version } from '../package.json';

const View = 'VIEW';
const Text = 'TEXT';
const Link = 'LINK';
const Page = 'PAGE';
const Note = 'NOTE';
const Image = 'IMAGE';
const Document = 'DOCUMENT';

const pdf = input => {
  const container = createInstance({ type: 'ROOT' });
  const mountNode = PDFRenderer.createContainer(container);

  if (input) updateContainer(input);

  function isDirty() {
    return container.isDirty;
  }

  function updateContainer(doc) {
    PDFRenderer.updateContainer(doc, mountNode, null);
  }

  async function toBlob() {
    await container.render();

    const stream = container.instance.pipe(BlobStream());

    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        try {
          const blob = stream.toBlob('application/pdf');

          if (container.document.props.onRender) {
            container.document.props.onRender({ blob });
          }

          resolve(blob);
        } catch (error) {
          reject(error);
        }
      });

      stream.on('error', reject);
    });
  }

  function toBuffer() {
    if (container.document.props.onRender) {
      container.document.props.onRender();
    }

    container.render();

    return container.instance;
  }

  function toString() {
    let result = '';
    container.render();

    return new Promise((resolve, reject) => {
      try {
        container.instance.on('data', function(buffer) {
          result += buffer;
        });

        container.instance.on('end', function() {
          if (container.document.props.onRender) {
            container.document.props.onRender({ string: result });
          }

          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    isDirty,
    updateContainer,
    toBuffer,
    toBlob,
    toString,
  };
};

export {
  version,
  PDFRenderer,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  Document,
  StyleSheet,
  createInstance,
  pdf,
};
