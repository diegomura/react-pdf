/* global URL */
import React, { Component, PropTypes } from 'react';
import { PDFRenderer, createElement, pdf } from 'react-pdf';

class Document extends Component {
  container = createElement('DOCUMENT');

  static propTypes = {
    children: PropTypes.any,
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
    PDFRenderer.updateContainer(this.props.children, this.mountNode, this);
    this.renderer.toBlob(this.container);

    this.embed.src = URL.createObjectURL(this.renderer.toBlob(this.container));
  }

  onSuccess() {
    this.setState({});
  }

  componentDidUpdate() {
    PDFRenderer.updateContainer(this.props.children, this.mountNode, this);
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

export default Document;
