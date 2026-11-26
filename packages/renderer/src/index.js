import FontStore from '@react-pdf/font';
import renderPDF from '@react-pdf/render';
import PDFDocument from 'pdfkit';
import layoutDocument from '@react-pdf/layout';
import { upperFirst } from '@react-pdf/fns';

import { omitNils } from './utils';
import createRenderer from './renderer';
import packageJson from '../package.json';

const { version } = packageJson;

const fontStore = new FontStore();

// We must keep a single renderer instance, otherwise React will complain
let renderer;

// The pdf instance acts as an event emitter for DOM usage.
// We only want to trigger an update when PDF content changes
const events = {};

const pdf = (initialValue) => {
  const onChange = () => {
    const listeners = events.change?.slice() || [];
    for (let i = 0; i < listeners.length; i += 1) listeners[i]();
  };

  const container = { type: 'ROOT', document: null };
  renderer = renderer || createRenderer({ onChange });
  const mountNode = renderer.createContainer(container);

  const updateContainer = (doc, callback) => {
    renderer.updateContainer(doc, mountNode, null, callback);
  };

  if (initialValue) updateContainer(initialValue);

  const render = async (compress = true) => {
    const props = container.document.props || {};
    const {
      pdfVersion,
      conformance,
      language,
      pageLayout,
      pageMode,
      title,
      author,
      subject,
      keywords,
      creator = 'react-pdf',
      producer = 'react-pdf',
      creationDate = new Date(),
      modificationDate,
      ownerPassword,
      userPassword,
      permissions,
    } = props;

    // PDF/A-1 requires PDF 1.4; PDF/A-2/3 require PDF 1.7. pdfkit defaults
    // to 1.3, which skips writing the metadata that marks the file as PDF/A.
    const conformancePdfVersion = conformance?.startsWith('PDF/A-1')
      ? '1.4'
      : '1.7';

    const ctx = new PDFDocument({
      compress,
      subset: conformance,
      pdfVersion:
        pdfVersion || (conformance ? conformancePdfVersion : undefined),
      lang: language,
      displayTitle: true,
      autoFirstPage: false,
      ownerPassword,
      userPassword,
      permissions,
      pageLayout,
      info: omitNils({
        Title: title,
        Author: author,
        Subject: subject,
        Keywords: keywords,
        Creator: creator,
        Producer: producer,
        CreationDate: creationDate,
        ModificationDate: modificationDate,
      }),
    });

    if (pageMode) {
      ctx._root.data.PageMode = upperFirst(pageMode);
    }

    const layout = await layoutDocument(container.document, fontStore);
    const fileStream = renderPDF(ctx, layout);
    return { layout, fileStream };
  };

  const callOnRender = (params = {}) => {
    if (container.document.props.onRender) {
      container.document.props.onRender(params);
    }
  };

  const toBlob = async () => {
    const chunks = [];
    const { layout: _INTERNAL__LAYOUT__DATA_, fileStream: instance } =
      await render();

    return new Promise((resolve, reject) => {
      instance.on('data', (chunk) => {
        chunks.push(
          chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk),
        );
      });

      instance.on('end', () => {
        try {
          const blob = new Blob(chunks, { type: 'application/pdf' });
          callOnRender({ blob, _INTERNAL__LAYOUT__DATA_ });
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  // TODO: rename this method to `toStream` in next major release, because it return stream not a buffer
  const toBuffer = async () => {
    const { layout: _INTERNAL__LAYOUT__DATA_, fileStream } = await render();
    callOnRender({ _INTERNAL__LAYOUT__DATA_ });

    return fileStream;
  };

  /*
   * TODO: remove this method in next major release. it is buggy
   * see
   * - https://github.com/diegomura/react-pdf/issues/2112
   * - https://github.com/diegomura/react-pdf/issues/2095
   */
  const toString = async () => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '`toString` is deprecated and will be removed in next major release',
      );
    }

    let result = '';
    const { fileStream: instance } = await render(false); // For some reason, when rendering to string if compress=true the document is blank

    return new Promise((resolve, reject) => {
      try {
        instance.on('data', (buffer) => {
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

  const on = (event, listener) => {
    if (!events[event]) events[event] = [];
    events[event].push(listener);
  };

  const removeListener = (event, listener) => {
    if (!events[event]) return;
    const idx = events[event].indexOf(listener);
    if (idx > -1) events[event].splice(idx, 1);
  };

  return {
    on,
    container,
    toBlob,
    toBuffer,
    toString,
    removeListener,
    updateContainer,
  };
};

const Font = fontStore;

const StyleSheet = {
  create: (s) => s,
};

export { version, Font, StyleSheet, pdf, createRenderer };
