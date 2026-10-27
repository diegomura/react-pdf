import type { ReactElement } from 'react';
import { createRenderer, Font } from '@react-pdf/renderer';
import layoutDocument from '@react-pdf/layout';
import render from '@react-pdf/render';
import SVGDocument from '@react-pdf/svgkit';

// A single reconciler instance, mirroring @react-pdf/renderer's own `pdf()` —
// the reconciler package keeps a singleton and creating a second one trips
// React's "multiple renderers concurrently rendering" warning.
const container: { type: 'ROOT'; document: any } = {
  type: 'ROOT',
  document: null,
};
const renderer = createRenderer({ onChange: () => {} });
const mountNode = renderer.createContainer(container);

let idSeq = 0;

// Calls share one container/mountNode, so a second call must not start
// until the previous one's callback has read `container.document`.
let queue: Promise<unknown> = Promise.resolve();

export const renderToSVGPages = (element: ReactElement): Promise<string[]> => {
  const result = queue.then(
    () =>
      new Promise<string[]>((resolve, reject) => {
        renderer.updateContainer(element, mountNode, null, async () => {
          try {
            const layout = await layoutDocument(container.document, Font);
            const ctx = new SVGDocument({ idPrefix: `svg-${idSeq++}-` });
            render(ctx, layout);
            resolve(ctx.pages);
          } catch (error) {
            reject(error);
          }
        });
      }),
  );

  queue = result.then(
    () => undefined,
    () => undefined,
  );

  return result;
};
