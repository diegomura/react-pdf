// import * as R from 'ramda';

import resolveSvg from './resolveSvg';
import resolveZIndex from './resolveZIndex';
import resolveRulers from './resolveRulers';
import resolveAssets from './resolveAssets';
import resolveStyles from './resolveStyles';
import resolveOrigins from './resolveOrigins';
import resolvePageSizes from './resolvePageSizes';
import resolvePagination from './resolvePagination';
import resolveDimensions from './resolveDimensions';
import resolveTextLayout from './resolveTextLayout';
import resolveInheritance from './resolveInheritance';
import resolvePageMargins from './resolvePageMargins';
import resolveNoteChildren from './resolveNoteChildren';
import resolvePagePaddings from './resolvePagePaddings';
import resolvePercentRadius from './resolvePercentRadius';
import resolvePercentHeight from './resolvePercentHeight';
import resolveLinkSubstitution from './resolveLinkSubstitution';
import asyncCompose from '../utils/asyncCompose';

// const startTimer = name => R.tap(() => console.time(name));
// const endTimer = name => R.tap(() => console.timeEnd(name));

const layout = asyncCompose(
  resolveZIndex,
  resolveRulers,
  resolveOrigins,
  resolvePagination,
  resolveTextLayout,
  resolvePercentRadius,
  resolveDimensions,
  resolveSvg,
  resolveAssets,
  resolveInheritance,
  resolvePercentHeight,
  resolvePagePaddings,
  resolveStyles,
  resolveNoteChildren,
  resolveLinkSubstitution,
  resolvePageMargins,
  resolvePageSizes,
);

export default layout;
