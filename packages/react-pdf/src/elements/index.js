import Document from './Document';
import Page from './Page';
import View from './View';
import Text from './Text';
import Link from './Link';
import Image from './Image';
import PDFDocument from 'pdfkit';

function createElement(type, props, root) {
  let instance;

  switch (type) {
    case 'ROOT':
      instance = new PDFDocument({ autoFirstPage: false });
      break;
    case 'DOCUMENT':
      instance = new Document(root, props);
      break;
    case 'PAGE':
      instance = new Page(root, props);
      break;
    case 'TEXT':
      instance = new Text(root, props);
      break;
    case 'LINK':
      instance = new Link(root, props);
      break;
    case 'IMAGE':
      instance = new Image(root, props);
      break;
    case 'VIEW':
      instance = new View(root, props);
      break;
    default:
      instance = undefined;
  }

  return instance;
}

export { createElement };
