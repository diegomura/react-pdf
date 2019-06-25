import * as R from 'ramda';

import resolveAssets from './resolveAssets';
import resolveStyles from './resolveStyles';
import resolveZIndex from './resolveZIndex';
import resolveOrigins from './resolveOrigins';
import resolvePageSizes from './resolvePageSizes';
import resolveDimensions from './resolveDimensions';
import resolveTextLayout from './resolveTextLayout';
import resolveInheritance from './resolveInheritance';
import resolvePageMargins from './resolvePageMargins';
import resolvePageWrapping from './resolvePageWrapping';
import resolveNoteChildren from './resolveNoteChildren';
import resolvePagePaddings from './resolvePagePaddings';
import resolvePercentRadius from './resolvePercentRadius';
import resolvePercentHeight from './resolvePercentHeight';
import resolveLinkSubstitution from './resolveLinkSubstitution';
import resolveAbsoluteCoordinates from './resolveAbsoluteCoordinates';
import asyncCompose from '../utils/asyncCompose';

const startTimer = name => R.tap(() => console.time(name));
const endTimer = name => R.tap(() => console.timeEnd(name));

const resolvePageSizeStyle = resolvePageSizes('style');

const layout = asyncCompose(
  resolveAbsoluteCoordinates,
  resolveOrigins,
  endTimer('resolvePageBreaks'),
  resolvePageWrapping,
  startTimer('resolvePageBreaks'),
  resolveTextLayout,
  resolvePercentRadius,
  resolveZIndex,
  resolveDimensions,
  resolveAssets,
  resolveInheritance,
  resolvePercentHeight,
  resolvePagePaddings,
  resolveStyles,
  resolveNoteChildren,
  resolveLinkSubstitution,
  resolvePageMargins,
  resolvePageSizeStyle,
);

export default layout;
