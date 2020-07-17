/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React from 'react';

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

  componentDidUpdate() {
    this.instance.updateContainer(this.props.document);
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

export { pdf, version, Font, StyleSheet } from './index';

export default {
  pdf,
  Font,
  version,
  StyleSheet,
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
};

export * from '@react-pdf/primitives';
