import Catalog from './Catalog';
import Text from './Text';
import View from './View';
import Page from './Page';
import Document from './Document';

function createElement(type, props) {
  let instance;

  switch (type) {
    case 'ROOT':
      instance = new Catalog();
      break;
    case 'DOCUMENT':
      instance = new Document(props);
      break;
    case 'PAGE':
      instance = new Page(props);
      break;
    case 'TEXT':
      instance = new Text();
      break;
    case 'VIEW':
      instance = new View(props);
      break;
    default:
      instance = undefined;
  }

  return instance;
}

export { createElement };
