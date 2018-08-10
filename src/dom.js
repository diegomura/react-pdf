/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { flatStyles } from './utils/styles';
import {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Image,
  StyleSheet,
  PDFRenderer,
  createElement,
  Document as Container,
} from './index';

export class Document extends Component {
  mountNode = null;

  componentDidMount() {
    this.renderDocument();
  }

  componentDidUpdate() {
    this.renderDocument();
  }

  componentWillUnmount() {
    PDFRenderer.updateContainer(null, this.mountNode, this);
  }

  renderDocument() {
    // Create new root container for this render
    const container = createElement('ROOT');

    // Create renderer container
    this.mountNode = PDFRenderer.createContainer(container);

    // Omit some props
    const { height, width, children, ...props } = this.props;

    PDFRenderer.updateContainer(
      <Container {...props}>{this.props.children}</Container>,
      this.mountNode,
      this,
    );

    pdf(container)
      .toBlob()
      .then(blob => {
        this.embed.src = URL.createObjectURL(blob);
      });
  }

  render() {
    const { className, width, height, style } = this.props;

    return (
      <iframe
        className={className}
        ref={container => {
          this.embed = container;
        }}
        style={Array.isArray(style) ? flatStyles(style) : style}
      />
    );
  }
}

Document.displayName = 'Document';
Document.defaultProps = { style: {} };

export {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Image,
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
  StyleSheet,
  PDFRenderer,
  createElement,
};
