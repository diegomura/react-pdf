import * as R from 'ramda';
import PDFDocument from '@react-pdf/pdfkit';

import Font from '../font';
import isPage from '../node/isPage';
import isView from '../node/isView';
import isImage from '../node/isImage';
import isNote from '../node/isNote';
import renderView from './renderView';
import renderPage from './renderPage';
import renderNote from './renderNote';
import renderImage from './renderImage';
import addMetadata from './addMetadata';
import renderDebug from './renderDebug';

const renderNode = ctx => node => {
  const renderChildren = R.tap(
    R.compose(
      R.forEach(renderNode(ctx)),
      R.pathOr([], ['children']),
    ),
  );

  return R.compose(
    renderDebug(ctx),
    renderChildren,
    R.cond([
      [isPage, renderPage(ctx)],
      [isView, renderView(ctx)],
      [isImage, renderImage(ctx)],
      [isNote, renderNote(ctx)],
      [R.T, R.identity],
    ]),
  )(node);
};

const render = root => {
  const instance = new PDFDocument({ autoFirstPage: false });

  addMetadata(instance)(root);
  renderNode(instance)(root);

  instance.end();
  Font.reset();

  return instance;
};

export default render;
