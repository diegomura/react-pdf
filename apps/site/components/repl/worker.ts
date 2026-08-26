import type React from 'react';
import type { DocumentProps } from '@react-pdf/renderer';
import { Font, pdf } from '@react-pdf/renderer';

import { transpile } from './transpile';
import { evaluateDocument, MissingModuleError } from './evaluate';

export type ReplRequest = { id: number; code: string };

export type ReplResponse =
  | { id: number; blob: Blob }
  | { id: number; error: string; line?: number };

/**
 * elkjs, which lays out mermaid diagrams, decides what it is from its globals:
 * `self` defined and no `document` means "I am the elk worker script", so it
 * takes over `self.onmessage` and exports no in-process worker. In a real Web
 * Worker that is us — the first diagram throws, and every later render is
 * answered by elk instead of by this file. beautiful-mermaid guards against it
 * with `delete self`, which does nothing here because a worker keeps `self` on
 * its prototype chain. A stub `document` sends elk down its library branch
 * instead, and only has to be in place while it loads and builds its (cached)
 * instance.
 *
 * @react-pdf/mermaid does the same thing from 5.0.2 on; drop this once the
 * installed version has it.
 */
const asLibrary = async <T>(
  load: () => Promise<T>,
  prime: (mod: T) => void,
) => {
  const scope = globalThis as { document?: unknown; self?: unknown };
  const stubDocument = !('document' in scope);
  // beautiful-mermaid puts `self` back by assignment after its own guard, and a
  // worker's `self` is getter-only; an own writable copy absorbs the write.
  const stubSelf = !Object.getOwnPropertyDescriptor(scope, 'self');

  if (stubDocument) scope.document = {};
  if (stubSelf)
    Object.defineProperty(scope, 'self', {
      value: scope,
      writable: true,
      configurable: true,
    });

  try {
    const mod = await load();
    prime(mod);
    return mod;
  } finally {
    if (stubDocument) delete scope.document;
    if (stubSelf) delete scope.self;
  }
};

// mathjax and the mermaid layout engine are heavy, so these are only pulled in
// once an example actually imports them.
const lazyModules: Record<string, () => Promise<unknown>> = {
  '@react-pdf/math': () => import('@react-pdf/math'),
  '@react-pdf/mermaid': () =>
    asLibrary(
      () => import('@react-pdf/mermaid'),
      (mermaid) => mermaid.Mermaid({ children: 'graph LR\n  A --> B' }),
    ),
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
      // each retry reveals at most one more missing module, so it is serial
      // eslint-disable-next-line no-await-in-loop
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
