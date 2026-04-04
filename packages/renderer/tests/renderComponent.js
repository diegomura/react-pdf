import { createCanvas } from '@napi-rs/canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

import { renderToBuffer } from '@react-pdf/renderer';

class CanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    return { canvas, context };
  }
  reset({ canvas }, width, height) {
    canvas.width = width;
    canvas.height = height;
  }
  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

async function getCanvas(pagePromise) {
  const page = await pagePromise;
  const viewport = page.getViewport({ scale: 1.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext('2d');

  const renderTask = page.render({
    canvasContext: context,
    viewport,
  });
  await renderTask.promise;

  return canvas;
}

const GAP = 10;
const composeCanvases = (canvases) => {
  const [maxWidth, maxHeight] = canvases.reduce(
    ([width, height], canvas) => [
      Math.max(width, canvas.width),
      Math.max(height, canvas.height),
    ],
    [0, 0],
  );

  const resultCanvas = createCanvas(
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
const range = (length) => Array.from({ length }, (_, index) => index);

const renderComponent = async (element) => {
  const source = await renderToBuffer(element);

  const document = await getDocument({
    data: new Uint8Array(source),
    verbosity: 0,
    CanvasFactory,
  }).promise;

  const pages = range(document.numPages).map((pageIndex) =>
    document.getPage(pageIndex + 1),
  );

  if (pages.length === 1) {
    return (await getCanvas(pages[0])).toBuffer('image/png');
  }

  const canvases = await Promise.all(pages.map((page) => getCanvas(page)));
  const pageSnapshots = composeCanvases(canvases);

  return pageSnapshots.toBuffer('image/png');
};

export default renderComponent;
