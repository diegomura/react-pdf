/* eslint-disable no-unused-vars */
import React from 'react';

import warning from './utils/warning';
import createReactPDFIndex from './index';

export default function createReactPDFDom(Yoga) {
  const yogaPromise = Promise.resolve(
    typeof Yoga === 'function' ? Yoga() : Yoga,
  ).then(yoga => {
    yogaRef.current = yoga;
  });
  const yogaRef = { current: null };
  const {
    pdf,
    View,
    Text,
    Link,
    Page,
    Font,
    Note,
    Image,
    Canvas,
    version,
    StyleSheet,
    PDFRenderer,
    createInstance,
    Document: PDFDocument,
  } = createReactPDFIndex(yogaRef);

  const flatStyles = stylesArray =>
    stylesArray.reduce((acc, style) => ({ ...acc, ...style }), {});

  const Document = ({ children, ...props }) => {
    return <PDFDocument {...props}>{children}</PDFDocument>;
  };

  class InternalBlobProvider extends React.PureComponent {
    state = {
      yogaLoaded: false,
      blob: null,
      url: null,
      loading: true,
      error: null,
    };

    constructor(props) {
      super(props);

      // Create new root container for this render
      this.instance = pdf();
    }

    componentDidMount() {
      if (!yogaRef.current) {
        yogaPromise.then(() => this.setState({ yogaLoaded: true }));
        return;
      }
      this.renderDocument();
      this.onDocumentUpdate();
    }

    componentDidUpdate() {
      if (!yogaRef.current) return;
      this.renderDocument();

      if (this.instance.isDirty() && !this.state.error) {
        this.onDocumentUpdate();
      }
    }

    renderDocument() {
      this.instance.updateContainer(this.props.document);
    }

    onDocumentUpdate() {
      const oldBlobUrl = this.state.url;

      this.instance
        .toBlob()
        .then(blob => {
          this.setState(
            { blob, url: URL.createObjectURL(blob), loading: false },
            () => URL.revokeObjectURL(oldBlobUrl),
          );
        })
        .catch(error => {
          this.setState({ error });
          console.error(error);
          throw error;
        });
    }

    render() {
      return this.props.children(this.state);
    }
  }

  const BlobProvider = ({ document: doc, children }) => {
    if (!doc) {
      warning(false, 'You should pass a valid document to BlobProvider');
      return null;
    }

    return (
      <InternalBlobProvider document={doc}>{children}</InternalBlobProvider>
    );
  };

  const PDFViewer = ({ className, style, children, innerRef, ...props }) => {
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

  const PDFDownloadLink = ({
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

  return {
    pdf,
    View,
    Text,
    Link,
    Page,
    Font,
    Note,
    Image,
    Canvas,
    version,
    Document,
    PDFViewer,
    StyleSheet,
    PDFRenderer,
    BlobProvider,
    createInstance,
    PDFDownloadLink,
  };
}
