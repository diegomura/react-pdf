import type React from 'react';
import type { DocumentProps } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';

import { transpile } from './transpile';
import { evaluateDocument, MissingModuleError } from './evaluate';

export type ReplRequest = { id: number; code: string };

export type ReplResponse =
  { id: number; url: string } | { id: number; error: string; line?: number };

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
      if (!name || !lazyModules[name] || name in loaded) throw error;
      loaded[name] = await lazyModules[name]();
    }
  }
};

self.onmessage = async (event: MessageEvent<ReplRequest>) => {
  const { id, code } = event.data;

  try {
    const element = (await evaluate(
      transpile(code),
    )) as React.ReactElement<DocumentProps>;
    const blob = await pdf(element).toBlob();

    self.postMessage({
      id,
      url: URL.createObjectURL(blob),
    } satisfies ReplResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const line = (error as { loc?: { line?: number } })?.loc?.line;

    self.postMessage({ id, error: message, line } satisfies ReplResponse);
  }
};
