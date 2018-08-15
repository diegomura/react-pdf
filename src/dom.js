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
  createElement,
} from './index';

export class BlobProvider extends React.PureComponent {
  state = { blob: null, url: null };

  componentDidMount() {
    this.renderDocument();
  }

  // shouldComponentUpdate(newProps, newState) {
  //   return (
  //     this.props.document !== newProps.document
  //   );
  // }
  //
  // componentDidUpdate() {
  //   this.renderDocument();
  // }

  renderDocument() {
    // Create new root container for this render
    const container = createElement('ROOT');

    // Create renderer container
    this.mountNode = PDFRenderer.createContainer(container);

    // Omit some props
    const { height, width, style, className, ...props } = this.props;

    PDFRenderer.updateContainer(this.props.document, this.mountNode, this);

    pdf(container)
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
  createElement,
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
  createElement,
  PDFDownloadLink,
};
