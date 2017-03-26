import React, { Component, PropTypes } from 'react';
import Pdf from 'react-pdf/lib/pdfkit';
import blobStream from 'blob-stream';
import { PDFRenderer, toPDF } from 'react-pdf';

function createDocument(container, iframe) {
  const doc = new Pdf();

  const stream = doc.pipe(blobStream());
  toPDF(container.children[0], doc);

  doc.end();

  stream.on('finish', () => {
    iframe.src = stream.toBlobURL('application/pdf');
  });
}

class Document extends Component {
  container = {
    children: [],
    tag: 'CONTAINER',
    firstPageSkipped: false,
  };

  static propTypes = {
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      document: undefined,
    };
  }

  componentDidMount() {
    this.mountNode = PDFRenderer.createContainer(this.container);
    PDFRenderer.updateContainer(this.props.children, this.mountNode, this);

    if (this.embed) {
      createDocument(this.container, this.embed);
    }
  }

  onSuccess() {
    this.setState({});
  }

  componentDidUpdate() {
    PDFRenderer.updateContainer(this.props.children, this.mountNode, this);

    if (this.embed) {
      createDocument(this.container, this.embed);
    }
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
