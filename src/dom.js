/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import { flatStyles } from './utils/styles';
import {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Image,
  Document,
  StyleSheet,
  PDFRenderer,
  createInstance,
} from './index';

export class BlobProvider extends React.PureComponent {
  state = { blob: null, url: null };

  constructor(props) {
    super(props);

    // Create new root container for this render
    this.container = createInstance({ type: 'ROOT' });
    this.mountNode = PDFRenderer.createContainer(this.container);
  }

  componentDidMount() {
    this.renderDocument();
    this.onDocumentUpdate();
  }

  componentDidUpdate() {
    this.renderDocument();

    if (this.container.isDirty) {
      this.onDocumentUpdate();
    }
  }

  renderDocument() {
    PDFRenderer.updateContainer(this.props.document, this.mountNode, this);
  }

  onDocumentUpdate() {
    pdf(this.container)
      .toBlob()
      .then(blob => {
        this.setState({ blob, url: URL.createObjectURL(blob) });
      });
  }

  render() {
    return this.props.children(this.state);
  }
}

export const PDFViewer = ({ className, style, children }) => (
  <BlobProvider document={children}>
    {({ url }) => (
      <iframe
        className={className}
        src={url}
        style={Array.isArray(style) ? flatStyles(style) : style}
      />
    )}
  </BlobProvider>
);

export const PDFDownloadLink = ({
  document: doc,
  className,
  style,
  fileName,
  children,
}) => (
  <BlobProvider document={doc}>
    {({ url }) => (
      <a download={fileName} href={url}>
        {children}
      </a>
    )}
  </BlobProvider>
);

export {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Image,
  Document,
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
  Image,
  Document,
  PDFViewer,
  StyleSheet,
  PDFRenderer,
  BlobProvider,
  createInstance,
  PDFDownloadLink,
};
