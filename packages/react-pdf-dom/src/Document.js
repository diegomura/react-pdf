import React, { Component, PropTypes } from 'react';
import Pdf from 'pdfkit';
import blobStream from 'blob-stream';
import { PDFRenderer } from 'babel-loader!react-pdf';

class Document extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  componentDidMount() {
    this.document = new Pdf();

    this.stream = this.document.pip(blobStream());

    this.mountNode = PDFRenderer.createContainer(this.document);
    PDFRenderer.updateContainer(this.props.children, this.mountNode, this);

    /* TODO add callback when streaming is done */
  }

  componentDidUpdate() {
    PDFRenderer.updateContainer(this.props.children, this.mountNode, this);
  }

  componentWillUnmount() {
    PDFRenderer.updateContainer(null, this._mountNode, this);
  }

  render() {
    return <embed />;
  }
}

export default Document;
