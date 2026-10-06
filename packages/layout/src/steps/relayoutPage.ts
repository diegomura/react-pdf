import { compose } from '@react-pdf/fns';

import resolveTextLayout from './resolveTextLayout';
import resolveFloats from './resolveFloats';
import resolveInheritance from './resolveInheritance';
import { resolvePageDimensions } from './resolveDimensions';
import { resolvePageStyles } from './resolveStyles';

// Run a page back through the style and yoga steps. Used wherever a page's
// contents changed after the first pass: dynamic content that rendered, or a
// finished page being given its real height.
const relayoutPage = compose(
  resolveTextLayout,
  resolveFloats,
  resolvePageDimensions,
  resolveInheritance,
  resolvePageStyles,
);

export default relayoutPage;
