/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */

import * as primitives from '@react-pdf/primitives';
import React, { useEffect, useRef, useState } from 'react';
import queue from 'queue';
import { pdf, version, Font, StyleSheet } from './index';

export const usePDF = ({ document }) => {
  const pdfInstance = useRef(null);

  const [state, setState] = useState({
    url: null,
    blob: null,
    error: null,
    loading: false,
  });

  // Setup rendering queue
  useEffect(() => {
    const renderQueue = queue({ autostart: true, concurrency: 1 });

    const queueDocumentRender = () => {
      setState(prev => ({ ...prev, loading: true }));

      renderQueue.splice(0, renderQueue.length, () =>
        state.error ? Promise.resolve() : pdfInstance.current.toBlob(),
      );
    };

    const onRenderFailed = error => {
      console.error(error);
      setState(prev => ({ ...prev, error }));
    };

    const onRenderSuccessful = blob => {
      setState({
        blob,
        error: null,
        loading: false,
        url: URL.createObjectURL(blob),
      });
    };

    pdfInstance.current = pdf();
    pdfInstance.current.on('change', queueDocumentRender);
    pdfInstance.current.updateContainer(document);

    renderQueue.on('error', onRenderFailed);
    renderQueue.on('success', onRenderSuccessful);

    return () => {
      renderQueue.end();
      pdfInstance.current.removeListener('change', queueDocumentRender);
    };
  }, []);

  // Revoke old unused url instances
  useEffect(() => {
    return () => {
      if (state.url) {
        URL.revokeObjectURL(state.url);
      }
    };
  }, [state.url]);

  const update = () => {
    pdfInstance.current.updateContainer(document);
  };

  return [state, update];
};

export const BlobProvider = ({ document: doc, children }) => {
  const [instance, updateInstance] = usePDF({ document: doc });

  useEffect(updateInstance, [doc]);

  if (!doc) {
    console.warn('You should pass a valid document to BlobProvider');
    return null;
  }

  return children(instance);
};

export const PDFViewer = ({
  title,
  style,
  className,
  children,
  innerRef,
  showToolbar = true,
  ...props
}) => {
  const [instance, updateInstance] = usePDF({ document: children });

  useEffect(updateInstance, [children]);

  const src = instance.url
    ? `${instance.url}#toolbar=${showToolbar ? 1 : 0}`
    : null;

  return (
    <iframe
      src={src}
      title={title}
      ref={innerRef}
      style={style}
      className={className}
      {...props}
    />
  );
};

export const PDFDownloadLink = ({
  style,
  children,
  className,
  document: doc,
  fileName = 'document.pdf',
}) => {
  const [instance, updateInstance] = usePDF({ document: doc });

  useEffect(updateInstance, [children]);

  if (!doc) {
    console.warn('You should pass a valid document to PDFDownloadLink');
    return null;
  }

  const handleDownloadIE = () => {
    if (window.navigator.msSaveBlob) {
      // IE
      window.navigator.msSaveBlob(instance.blob, fileName);
    }
  };

  return (
    <a
      style={style}
      href={instance.url}
      download={fileName}
      className={className}
      onClick={handleDownloadIE}
    >
      {typeof children === 'function' ? children(instance) : children}
    </a>
  );
};

const throwEnvironmentError = name => {
  throw new Error(
    `${name} is a Node specific API. You're either using this method in a browser, or your bundler is not loading react-pdf from the appropriate web build.`,
  );
};

export const renderToStream = () => {
  throwEnvironmentError('renderToStream');
};

export const renderToString = () => {
  throwEnvironmentError('renderToString');
};

export const renderToFile = () => {
  throwEnvironmentError('renderToFile');
};

export const render = () => {
  throwEnvironmentError('render');
};

export * from './index';

export * from '@react-pdf/primitives';

export default {
  pdf,
  usePDF,
  Font,
  version,
  StyleSheet,
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
  renderToStream,
  renderToString,
  renderToFile,
  render,
  ...primitives,
};
