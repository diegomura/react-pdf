import Text from './Text';
import View from './View';
import Page from './Page';
import Document from './Document';
import omit from 'lodash/fp/omit';

function createElement(type, props, root) {
  let instance;

  switch (type) {
    case 'ROOT':
      instance = new Document();
      break;
    case 'DOCUMENT':
      /*
       Since the Document instance is being created by the root element,
       all we do when the renderer gets to <Document /> is injecting
       it's props and return the root
      */
      root.setProps(omit('children', props));
      instance = root;
      break;
    case 'PAGE':
      instance = new Page(props, root);
      break;
    case 'TEXT':
      instance = new Text(props, root);
      break;
    case 'VIEW':
      instance = new View(props, root);
      break;
    default:
      instance = undefined;
  }

  return instance;
}

export { createElement };
