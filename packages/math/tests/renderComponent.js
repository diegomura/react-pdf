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

const renderComponent = async (element) => {
  const source = await renderToBuffer(element);

  const document = await getDocument({
    data: new Uint8Array(source),
    verbosity: 0,
    CanvasFactory,
  }).promise;

  const page = await document.getPage(1);
  const viewport = page.getViewport({ scale: 1.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext('2d');

  await page.render({ canvasContext: context, viewport }).promise;

  return canvas.toBuffer('image/png');
};

export default renderComponent;
