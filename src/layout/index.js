import * as R from 'ramda';

import resolveAssets from './resolveAssets';
import resolveStyles from './resolveStyles';
import resolveZIndex from './resolveZIndex';
import resolveOrigins from './resolveOrigins';
import resolvePageSizes from './resolvePageSizes';
import resolveDimensions from './resolveDimensions';
import resolveTextLayout from './resolveTextLayout';
import resolveNoteChildren from './resolveNoteChildren';
import resolveInheritance from './resolveInheritance';
import resolvePageMargins from './resolvePageMargins';
import resolvePageWrapping from './resolvePageWrapping';
import resolvePagePaddings from './resolvePagePaddings';
import resolvePercentRadius from './resolvePercentRadius';
import resolveLinkSubstitution from './resolveLinkSubstitution';
import resolveAbsoluteCoordinates from './resolveAbsoluteCoordinates';
import asyncCompose from '../utils/asyncCompose';

const startTimer = name =>  R.tap(() => console.time(name));
const endTimer = name =>  R.tap(() => console.timeEnd(name));

const resolvePageStyles = resolvePageSizes('style');
const resolvePageDimensions = resolvePageSizes('box');

const layout = asyncCompose(
  resolveAbsoluteCoordinates,
  resolveOrigins,
  // resolveDimensions,
  // resolvePageDimensions,
  // resolvePageWrapping,
  resolveTextLayout,
  resolvePercentRadius,
  resolveZIndex,
  resolveDimensions,
  resolveAssets,
  resolveInheritance,
  resolvePagePaddings,
  resolveStyles,
  resolveNoteChildren,
  resolveLinkSubstitution,
  resolvePageMargins,
  resolvePageStyles,
);

export default layout;
