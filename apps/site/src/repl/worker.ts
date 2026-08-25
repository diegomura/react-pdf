import type React from 'react';
import type { DocumentProps } from '@react-pdf/renderer';
import { Font, pdf } from '@react-pdf/renderer';

import { transpile } from './transpile';
import { evaluateDocument, MissingModuleError } from './evaluate';

export type ReplRequest = { id: number; code: string };

export type ReplResponse =
  { id: number; blob: Blob } | { id: number; error: string; line?: number };

// mathjax is heavy, so @react-pdf/math is only pulled in once an example
// actually imports it.
const lazyModules: Record<string, () => Promise<unknown>> = {
  '@react-pdf/math': () => import('@react-pdf/math'),
};

const loaded: Record<string, unknown> = {};

const evaluate = async (compiledCode: string) => {
  for (;;) {
    try {
      return evaluateDocument(compiledCode, loaded);
    } catch (error) {
      const name =
        error instanceof MissingModuleError ? error.moduleName : undefined;
      if (
        !name ||
        !Object.hasOwn(lazyModules, name) ||
        Object.hasOwn(loaded, name)
      )
        throw error;
      loaded[name] = await lazyModules[name]();
    }
  }
};

// Examples flip global knobs on the shared Font store, and the docs previews
// run several of them through one worker. Both reset to null; Font.clear()
// would also drop the built-in Helvetica/Courier/Times families.
const resetFontGlobals = () => {
  const store = Font as unknown as {
    registerHyphenationCallback: (value: null) => void;
    registerEmojiSource: (value: null) => void;
  };
  store.registerHyphenationCallback(null);
  store.registerEmojiSource(null);
};

self.onmessage = async (event: MessageEvent<ReplRequest>) => {
  const { id, code } = event.data;

  try {
    resetFontGlobals();

    const element = (await evaluate(
      transpile(code),
    )) as React.ReactElement<DocumentProps>;
    // The blob (not an object URL) crosses the boundary: URLs created here die
    // with the worker, and the worker is restarted on every example switch.
    const blob = await pdf(element).toBlob();

    self.postMessage({ id, blob } satisfies ReplResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const line = (error as { loc?: { line?: number } })?.loc?.line;

    self.postMessage({ id, error: message, line } satisfies ReplResponse);
  }
};
