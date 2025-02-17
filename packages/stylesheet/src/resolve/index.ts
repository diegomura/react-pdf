import { compose } from '@react-pdf/fns';

import expandStyles from '../expand';
import transformStyles from '../transform';
import { Container, Style } from '../types';

const resolveStyle =
  (container: Container) =>
  (style: Style): Style => {
    return compose(transformStyles(container), expandStyles(container))(style);
  };

export default resolveStyle;
