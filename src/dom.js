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
  container = createElement('ROOT');

  constructor(props) {
    super(props);

    this.state = {
      document: undefined,
    };
  }

  componentDidMount() {
    this.mountNode = PDFRenderer.createContainer(this.container);

    // Omit some props
    const { height, width, children, ...props } = this.props;

    PDFRenderer.updateContainer(
      <Container {...props}>{this.props.children}</Container>,
      this.mountNode,
      this,
    );

    pdf(this.container)
      .toBlob()
      .then(blob => {
        this.embed.src = URL.createObjectURL(blob);
      });
  }

  componentDidUpdate() {
    // Omit some props
    const { height, width, children, ...props } = this.props;

    PDFRenderer.updateContainer(
      <Container {...props}>{this.props.children}</Container>,
      this.mountNode,
      this,
    );
  }

  componentWillUnmount() {
    PDFRenderer.updateContainer(null, this.mountNode, this);
  }

  render() {
    const { className, width = null, height = null, style } = this.props;

    return (
      <iframe
        className={className}
        ref={container => {
          this.embed = container;
        }}
        style={
          Array.isArray(style)
            ? { width, height, ...flatStyles(style) }
            : { width, height, ...style }
        }
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
