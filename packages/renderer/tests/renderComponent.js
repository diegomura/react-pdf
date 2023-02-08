/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */

import Canvas from 'canvas';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';

import { renderToBuffer } from '..';

/**
 * copy-pasted code from
 * https://github.com/mozilla/pdf.js/blob/master/examples/node/pdf2png/pdf2png.js#L20-L49
 */
const NodeCanvasFactory = {
  create(width, height) {
    const canvas = Canvas.createCanvas(width, height);
    const context = canvas.getContext('2d');
    return {
      canvas,
      context,
    };
  },

  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  },

  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  },
};

async function getCanvas(pagePromise) {
  const page = await pagePromise;
  const viewport = page.getViewport({ scale: 1.0 });
  const canvasFactory = NodeCanvasFactory;
  const { canvas, context } = canvasFactory.create(
    viewport.width,
    viewport.height,
  );
  const renderContext = {
    canvasContext: context,
    viewport,
    canvasFactory,
  };

  const renderTask = page.render(renderContext);
  await renderTask.promise;

  return canvas;
}

const GAP = 10;
const composeCanvases = canvases => {
  const [maxWidth, maxHeight] = canvases.reduce(
    ([width, height], canvas) => [
      Math.max(width, canvas.width),
      Math.max(height, canvas.height),
    ],
    [0, 0],
  );

  const resultCanvas = Canvas.createCanvas(
    maxWidth,
    maxHeight * canvases.length + GAP * (canvases.length - 1),
  );
  const resultContext = resultCanvas.getContext('2d');

  canvases.forEach((canvas, index) => {
    if (index) {
      resultContext.fillStyle = '#e2e2e2';
      resultContext.fillRect(
        0,
        maxHeight * index + GAP * (index - 1),
        maxWidth,
        GAP,
      );
    }
    resultContext.drawImage(canvas, 0, maxHeight * index + GAP * index);
  });

  return resultCanvas;
};

/**
 * Generates a array with numbers from 0 to length-1
 * @param {number} length — size of array
 * @returns {number[]} array
 */
const range = length => Array.from({ length }, (_, index) => index);

const renderComponent = async element => {
  const source = await renderToBuffer(element);

  const document = await pdfjs.getDocument({
    data: source,
    verbosity: 0,
  }).promise;

  const pages = range(document.numPages).map(pageIndex =>
    document.getPage(pageIndex + 1),
  );

  if (pages.length === 1) {
    return (await getCanvas(pages[0])).toBuffer();
  }

  const canvases = await Promise.all(pages.map(page => getCanvas(page)));
  const pageSnapshots = composeCanvases(canvases);

  return pageSnapshots.toBuffer();
};

export default renderComponent;
