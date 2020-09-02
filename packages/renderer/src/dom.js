/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import * as primitives from '@react-pdf/primitives';
import { pdf, version, Font, StyleSheet } from './index';

const queue = require('queue');

class InternalBlobProvider extends React.PureComponent {
  renderQueue = queue({ autostart: true, concurrency: 1 });

  state = { blob: null, url: null, loading: true, error: null };

  componentDidMount() {
    this.instance = pdf({ onChange: this.queueDocumentRender });
    this.instance.updateContainer(this.props.document);

    this.renderQueue.on('error', this.onRenderFailed);
    this.renderQueue.on('success', this.onRenderSuccessful);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.document !== this.props.document) {
      this.instance.updateContainer(this.props.document);
    }
  }

  componentWillUnmount() {
    this.renderQueue.end();
  }

  queueDocumentRender = () => {
    this.renderQueue.splice(0, this.renderQueue.length, () =>
      this.state.error ? Promise.resolve() : this.instance.toBlob(),
    );
  };

  onRenderFailed = error => {
    this.setState({ error });
    console.error(error);
  };

  onRenderSuccessful = blob => {
    const oldBlobUrl = this.state.url;

    this.setState(
      { blob, url: URL.createObjectURL(blob), loading: false },
      () => URL.revokeObjectURL(oldBlobUrl),
    );
  };

  render() {
    return this.props.children(this.state);
  }
}

export const BlobProvider = ({ document: doc, children }) => {
  if (!doc) {
    console.warn('You should pass a valid document to BlobProvider');
    return null;
  }

  return <InternalBlobProvider document={doc}>{children}</InternalBlobProvider>;
};

export const PDFViewer = ({
  className,
  style,
  title,
  children,
  innerRef,
  ...props
}) => {
  return (
    <InternalBlobProvider document={children}>
      {({ url }) => (
        <iframe
          src={url}
          title={title}
          ref={innerRef}
          style={style}
          className={className}
          {...props}
        />
      )}
    </InternalBlobProvider>
  );
};

export const PDFDownloadLink = ({
  document: doc,
  className,
  style,
  children,
  fileName = 'document.pdf',
}) => {
  if (!doc) {
    console.warn('You should pass a valid document to PDFDownloadLink');
    return null;
  }

  const downloadOnIE = blob => () => {
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fileName);
    }
  };

  return (
    <InternalBlobProvider document={doc}>
      {params => (
        <a
          style={style}
          href={params.url}
          download={fileName}
          className={className}
          onClick={downloadOnIE(params.blob)}
        >
          {typeof children === 'function' ? children(params) : children}
        </a>
      )}
    </InternalBlobProvider>
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
