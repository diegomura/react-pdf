import Text from './Text';
import View from './View';
import Page from './Page';
import Document from './Document';

function createElement(type, props) {
  let instance;

  switch (type) {
    case 'DOCUMENT':
      return new Document();
    case 'PAGE':
      instance = new Page();
      instance.applyProps(props);
      return instance;
    case 'TEXT':
      instance = new Text();
      // console.log(instance);
      // instance.applyProps(props);
      return instance;
    case 'VIEW':
      instance = new View();
      instance.applyProps(props);
      return instance;
    default:
      return undefined;
  }
}

export { createElement };
