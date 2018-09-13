import Root from './Root';
import Document from './Document';
import Page from './Page';
import View from './View';
import Text from './Text';
import Link from './Link';
import Image from './Image';
import TextInstance from './TextInstance';

const constructors = {
  ROOT: Root,
  PAGE: Page,
  TEXT: Text,
  LINK: Link,
  VIEW: View,
  IMAGE: Image,
  DOCUMENT: Document,
  TEXT_INSTANCE: TextInstance,
};

function createInstance(element, root) {
  const { type, props = {} } = element;

  if (constructors[type]) {
    return new constructors[type](root, props);
  }

  return undefined;
}

export { createInstance };
