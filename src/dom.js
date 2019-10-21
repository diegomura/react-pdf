/* eslint-disable no-unused-vars */
import React from 'react';
import { CanvasViewer } from './canvas';

import warning from '../src/utils/warning';

const queue = require('queue');

import {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  Canvas,
  Svg,
  version,
  StyleSheet,
  // createInstance,
  Document as PDFDocument,
} from './index';

const flatStyles = stylesArray =>
  stylesArray.reduce((acc, style) => ({ ...acc, ...style }), {});

export const Document = ({ children, ...props }) => {
  return <PDFDocument {...props}>{children}</PDFDocument>;
};

class InternalBlobProvider extends React.PureComponent {
  instance = pdf();
  renderQueue = queue({ autostart: true, concurrency: 1 });
  state = { blob: null, url: null, loading: true, error: null };

  componentDidMount() {
    this.queueDocumentRender(this.props.document);

    this.renderQueue.on('error', this.onRenderFailed);
    this.renderQueue.on('success', this.onRenderSuccessful);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.document !== this.props.document) {
      this.queueDocumentRender(this.props.document);
    }
  }

  queueDocumentRender(doc) {
    this.renderQueue.splice(0, this.renderQueue.length, () => {
      this.instance.updateContainer(doc);

      if (this.instance.isDirty() && !this.state.error) {
        return this.instance.toBlob();
      }

      return Promise.resolve();
    });
  }

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
    warning(false, 'You should pass a valid document to BlobProvider');
    return null;
  }

  return <InternalBlobProvider document={doc}>{children}</InternalBlobProvider>;
};

export const PDFViewer = ({
  className,
  style,
  children,
  innerRef,
  ...props
}) => {
  return (
    <InternalBlobProvider document={children}>
      {({ url }) => (
        <iframe
          className={className}
          ref={innerRef}
          src={url}
          style={Array.isArray(style) ? flatStyles(style) : style}
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
    warning(false, 'You should pass a valid document to PDFDownloadLink');
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
          className={className}
          download={fileName}
          href={params.url}
          onClick={downloadOnIE(params.blob)}
          style={Array.isArray(style) ? flatStyles(style) : style}
        >
          {typeof children === 'function' ? children(params) : children}
        </a>
      )}
    </InternalBlobProvider>
  );
};

export {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  Canvas,
  Svg,
  version,
  StyleSheet,
} from './index';

export { CanvasViewer } from './canvas';

export default {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  Canvas,
  Svg,
  version,
  Document,
  PDFViewer,
  StyleSheet,
  CanvasViewer,
  BlobProvider,
  PDFDownloadLink,
};
