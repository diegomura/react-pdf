/* global URL */
import React, { Component, PropTypes } from 'react';
import { PDFRenderer, Document, createElement, pdf } from 'react-pdf';

class Container extends Component {
  static displayName = 'Document';

  container = createElement('ROOT');

  static propTypes = {
    children: PropTypes.node,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  constructor(props) {
    super(props);

    this.renderer = pdf();

    this.state = {
      document: undefined,
    };
  }

  componentDidMount() {
    this.mountNode = PDFRenderer.createContainer(this.container);

    PDFRenderer.updateContainer(
      <Document>{this.props.children}</Document>,
      this.mountNode,
      this,
    );

    this.renderer.toBlob(this.container);
    this.embed.src = URL.createObjectURL(this.renderer.toBlob(this.container));
  }

  componentDidUpdate() {
    PDFRenderer.updateContainer(
      <Document>{this.props.children}</Document>,
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

export default Container;
