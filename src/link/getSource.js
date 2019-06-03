import * as R from 'ramda';

import { getURL } from '../utils/url';

const getSource = R.compose(
  getURL,
  R.either(R.path(['props', 'src']), R.path(['props', 'href'])),
);

export default getSource;
