/* eslint-disable no-unused-vars */
import React from 'react';

import warning from '../src/utils/warning';

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
  version,
  StyleSheet,
  PDFRenderer,
  // createInstance,
  Document as PDFDocument,
} from './index';

const flatStyles = stylesArray =>
  stylesArray.reduce((acc, style) => ({ ...acc, ...style }), {});

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

    // if (this.instance.isDirty() && !this.state.error) {
    //   this.onDocumentUpdate();
    // }
  }

  renderDocument() {
    this.instance.updateContainer(this.props.document);
  }

  onDocumentUpdate() {
    // const oldBlobUrl = this.state.url;

    this.instance.toBlob().then(blob => {
      this.setState({ blob });
      // this.setState(
      //   { blob, url: URL.createObjectURL(blob), loading: false },
      //   () => URL.revokeObjectURL(oldBlobUrl),
      // );
    });
    // .catch(error => {
    //   this.setState({ error });
    //   console.error(error);
    //   throw error;
    // });
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

class PageCanvas extends React.Component {
  componentDidMount() {
    const ctx = this.canvas.getContext('2d');

    const renderNode = node => {
      const { width, height, top, left } = node.box;

      ctx.beginPath();
      ctx.rect(left, top, width, height);
      ctx.fillStyle = node.style.backgroundColor || 'white';
      ctx.fill();

      node.children.forEach(renderNode);
    };

    renderNode(this.props.page);

    this.pngLink.href = this.canvas.toDataURL('image/png');
    this.jpgLink.href = this.canvas.toDataURL('image/jpg');
  }

  render() {
    const { page } = this.props;

    return (
      <React.Fragment>
        <canvas
          height={page.box.height}
          id="myCanvas"
          ref={ref => (this.canvas = ref)}
          style={{ border: '1px solid black' }}
          width={page.box.width}
        />
        <a download="doc.png" ref={ref => (this.pngLink = ref)}>
          Download PNG
        </a>
        <a download="doc.jpg" ref={ref => (this.jpgLink = ref)}>
          Download JPG
        </a>
      </React.Fragment>
    );
  }
}

export class DOMViewer extends React.Component {
  render() {
    const { className, style, children, innerRef, ...props } = this.props;

    return (
      <InternalBlobProvider document={children}>
        {({ blob }) => {
          if (!blob || Object.keys(blob).length === 0) return null;

          const doc = blob.children[0];
          const page = doc.children[0];

          return <PageCanvas page={page} />;
        }}
      </InternalBlobProvider>
    );
  }
}

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
  version,
  StyleSheet,
  PDFRenderer, // createInstance,
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
  Canvas,
  version,
  Document,
  PDFViewer,
  StyleSheet,
  PDFRenderer,
  BlobProvider,
  // createInstance,
  PDFDownloadLink,
};
