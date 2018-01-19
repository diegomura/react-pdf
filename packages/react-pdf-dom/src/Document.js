/* global URL */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PDFRenderer, Document, createElement, pdf } from '@react-pdf/core';
import omit from 'lodash.omit';

class Container extends Component {
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
      <Document {...omit(['height', 'width', 'children'], this.props)}>
        {this.props.children}
      </Document>,
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
      <Document {...omit(['height', 'width', 'children'], this.props)}>
        {this.props.children}
      </Document>,
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

Container.propTypes = {
  children: PropTypes.node,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Container;
