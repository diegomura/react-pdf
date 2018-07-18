/* global URL */
import React, { Component } from 'react';
import omit from 'lodash.omit';
import {
  pdf,
  PDFRenderer,
  createElement,
  Document as Container,
} from './index';

export class Document extends Component {
  static displayName = 'Document';

  container = createElement('ROOT');

  constructor(props) {
    super(props);

    this.state = {
      document: undefined,
    };
  }

  componentDidMount() {
    this.mountNode = PDFRenderer.createContainer(this.container);

    PDFRenderer.updateContainer(
      <Container {...omit(['height', 'width', 'children'], this.props)}>
        {this.props.children}
      </Container>,
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
    PDFRenderer.updateContainer(
      <Container {...omit(['height', 'width', 'children'], this.props)}>
        {this.props.children}
      </Container>,
      this.mountNode,
      this,
    );
  }

  componentWillUnmount() {
    PDFRenderer.updateContainer(null, this.mountNode, this);
  }

  render() {
    const { width, height } = this.props;

    return (
      <iframe
        ref={container => {
          this.embed = container;
        }}
        style={{ width, height }}
      />
    );
  }
}

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
