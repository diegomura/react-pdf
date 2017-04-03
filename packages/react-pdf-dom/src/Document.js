/* global URL */
import React, { Component, PropTypes } from 'react';
// import Pdf from 'react-pdf/lib/pdfkit';
import { PDFRenderer, createElement, pdf } from 'react-pdf';

class Document extends Component {
  container = createElement('DOCUMENT');

  static propTypes = {
    children: PropTypes.any,
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

    // console.log(this.renderer.toBase64Url(this.container));

    this.embed.src = URL.createObjectURL(this.renderer.toBlob(this.container));

    // if (this.embed) {
    //   createDocument(this.container, this.embed);
    // }
  }

  onSuccess() {
    this.setState({});
  }

  componentDidUpdate() {
    PDFRenderer.updateContainer(this.props.children, this.mountNode, this);

    // if (this.embed) {
    //   createDocument(this.container, this.embed);
    // }
  }

  componentWillUnmount() {
    PDFRenderer.updateContainer(null, this.mountNode, this);
  }

  render() {
    return (
      <iframe
        ref={container => {
          this.embed = container;
        }}
      />
    );
  }
}

export default Document;
