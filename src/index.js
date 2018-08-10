import PDFRenderer from './renderer';
import StyleSheet from './stylesheet';
import { createElement } from './elements';
import Font from './font';
import BlobStream from 'blob-stream';

const View = 'VIEW';
const Text = 'TEXT';
const Link = 'LINK';
const Page = 'PAGE';
const Image = 'IMAGE';
const Document = 'DOCUMENT';

const pdf = input => {
  async function parse(input) {
    await input.document.render();
    return input;
  }

  async function toBlob() {
    await parse(input);

    const stream = input.pipe(BlobStream());

    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        const blob = stream.toBlob('application/pdf');

        if (input.document.props.onRender) {
          input.document.props.onRender({ blob });
        }

        resolve(blob);
      });

      stream.on('error', reject);
    });
  }

  async function toBuffer() {
    if (input.document.props.onRender) {
      input.document.props.onRender();
    }

    return await parse(input);
  }

  async function toString() {
    let result = '';
    const render = await parse(input);

    return new Promise(resolve => {
      render.on('data', function(buffer) {
        result += buffer;
      });

      render.on('end', function() {
        if (input.document.props.onRender) {
          input.document.props.onRender({ string: result });
        }

        resolve(result);
      });
    });
  }

  return {
    toBuffer,
    toBlob,
    toString,
  };
};

export {
  PDFRenderer,
  View,
  Text,
  Link,
  Page,
  Font,
  Image,
  Document,
  StyleSheet,
  createElement,
  pdf,
};
