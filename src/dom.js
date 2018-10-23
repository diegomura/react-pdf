/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import warning from 'fbjs/lib/warning';
import { flatStyles } from './utils/styles';
import {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  version,
  StyleSheet,
  PDFRenderer,
  createInstance,
  Document as PDFDocument,
} from './index';

export const Document = ({ children, ...props }) => {
  return <PDFDocument {...props}>{children}</PDFDocument>;
};

class InternalBlobProvider extends React.PureComponent {
  state = { blob: null, url: null, loading: true, error: null };

  constructor(props) {
    super(props);

    // Create new root container for this render
    this.instance = pdf();
  }

  componentDidMount() {
    this.renderDocument();
    this.onDocumentUpdate();
  }

  componentDidUpdate() {
    this.renderDocument();

    if (this.instance.isDirty()) {
      this.onDocumentUpdate();
    }
  }

  renderDocument() {
    this.instance.updateContainer(this.props.document);
  }

  onDocumentUpdate() {
    this.instance
      .toBlob()
      .then(blob => {
        this.setState({ blob, url: URL.createObjectURL(blob), loading: false });
      })
      .catch(error => {
        this.setState({ error });
        throw error;
      });
  }

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

export const PDFViewer = ({ className, style, children }) => {
  return (
    <InternalBlobProvider document={children}>
      {({ url }) => (
        <iframe
          className={className}
          src={url}
          style={Array.isArray(style) ? flatStyles(style) : style}
        />
      )}
    </InternalBlobProvider>
  );
};

export const PDFDownloadLink = ({
  document: doc,
  className,
  style,
  fileName,
  children,
}) => {
  if (!doc) {
    warning(false, 'You should pass a valid document to PDFDownloadLink');
    return null;
  }

  return (
    <InternalBlobProvider document={doc}>
      {params => (
        <a
          className={className}
          download={fileName}
          href={params.url}
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
  version,
  StyleSheet,
  PDFRenderer,
  createInstance,
} from './index';

export default {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  version,
  Document,
  PDFViewer,
  StyleSheet,
  PDFRenderer,
  BlobProvider,
  createInstance,
  PDFDownloadLink,
};
