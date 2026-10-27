import { Font, pdf } from '@react-pdf/renderer';
import type { DocumentProps, OnRenderProps } from '@react-pdf/renderer';
import type React from 'react';

import type { PlaygroundError, PlaygroundFile, RenderFn } from '../types';

import { evaluateDocument, MissingModuleError } from './evaluate';
import { transpile } from './transpile';

/**
 * Files are concatenated in array order into one module, so a declaration has
 * to appear before the file that uses it. There is no module resolution: an
 * `import './styles'` between files will not work.
 */
const joinFiles = (files: PlaygroundFile[]) =>
  files.map((file) => file.code).join('\n\n');

/**
 * mathjax and the mermaid layout engine are heavy and optional, so they load
 * only once an example imports them. Missing entirely is fine: the import
 * rejects and the original "cannot import" error surfaces.
 */
const lazyModules: Record<string, () => Promise<unknown>> = {
  '@react-pdf/math': () => import('@react-pdf/math'),
  '@react-pdf/mermaid': () => import('@react-pdf/mermaid'),
  '@react-pdf/tailwind': () => import('@react-pdf/tailwind'),
};

const loaded: Record<string, unknown> = {};

const evaluate = async (compiled: string) => {
  for (;;) {
    try {
      return evaluateDocument(compiled, loaded);
    } catch (error) {
      const name =
        error instanceof MissingModuleError ? error.moduleName : undefined;
      if (
        !name ||
        !Object.hasOwn(lazyModules, name) ||
        Object.hasOwn(loaded, name)
      )
        throw error;

      try {
        // each retry reveals at most one more missing module, so it is serial
        // eslint-disable-next-line no-await-in-loop
        loaded[name] = await lazyModules[name]();
      } catch {
        throw error;
      }
    }
  }
};

/**
 * Examples flip global knobs on the shared Font store. Both reset to null;
 * Font.clear() would also drop the built-in Helvetica/Courier/Times.
 *
 * Families added by `Font.register` are NOT reset, and there is no renderer
 * instance to discard, so they persist for the session. See docs/web-workers.md
 * for the isolation a worker buys back.
 */
const resetFontGlobals = () => {
  const store = Font as unknown as {
    registerHyphenationCallback: (value: null) => void;
    registerEmojiSource: (value: null) => void;
  };
  store.registerHyphenationCallback(null);
  store.registerEmojiSource(null);
};

/**
 * The built-in renderer: transpile the files, evaluate them, and build a PDF
 * on the main thread. Measured at 4-25ms for typical documents, so the freeze
 * is not worth a worker's complexity by default.
 */
export const render: RenderFn = async (files) => {
  resetFontGlobals();

  try {
    const element = (await evaluate(
      transpile(joinFiles(files)),
    )) as React.ReactElement<DocumentProps>;

    let numPages = 0;

    // The page count only exists on the laid-out tree (one authored <Page>
    // can wrap into several), and onRender is the only way out of the
    // renderer. It has to be attached to the resolved DOCUMENT node, not to
    // `element`: examples call `ReactPDF.render(<Report />)`, so `element` is
    // usually a component that *returns* a Document and would swallow the prop.
    const instance = pdf(element);
    const document = (
      instance as unknown as {
        container?: { document?: { props?: DocumentProps } };
      }
    ).container?.document;

    if (document) {
      const previous = document.props?.onRender;

      document.props = {
        ...document.props,
        onRender: (props: OnRenderProps) => {
          // passed by the renderer but deliberately absent from OnRenderProps
          const layout = (
            props as OnRenderProps & {
              _INTERNAL__LAYOUT__DATA_?: { children?: unknown[] };
            }
          )._INTERNAL__LAYOUT__DATA_;

          numPages = layout?.children?.length ?? 0;
          previous?.(props);
        },
      };
    }

    return { blob: await instance.toBlob(), numPages };
  } catch (error) {
    const thrown: PlaygroundError =
      error instanceof Error ? error : new Error(String(error));
    // sucrase reports the position of a syntax error here
    thrown.line ??= (error as { loc?: { line?: number } })?.loc?.line;
    throw thrown;
  }
};
