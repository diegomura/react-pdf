import { afterEach, expect, test } from 'vitest';

import { mermaidToSvg } from '../src/render';

const scope = globalThis as {
  self?: unknown;
  document?: unknown;
  onmessage?: unknown;
};

/**
 * A Web Worker is `self` without `document`, which is also how elkjs recognises
 * its own worker script: it answers the host's messages and exports no layout
 * engine, so the render throws. `self` there is a getter on the global's
 * prototype — the detail that defeats beautiful-mermaid's own `delete self`
 * guard — so the emulation puts it in the same place.
 */
const enterWorkerScope = () => {
  Object.defineProperty(Object.getPrototypeOf(scope), 'self', {
    get: () => scope,
    configurable: true,
  });
};

afterEach(() => {
  delete (Object.getPrototypeOf(scope) as { self?: unknown }).self;
  delete scope.self;
});

test('renders where `self` is a getter and `document` is not defined', () => {
  enterWorkerScope();

  expect(mermaidToSvg('graph LR\n  A --> B')).toContain('<svg');
  expect(scope.onmessage).toBeUndefined();
});

test('leaves the scope as it found it', () => {
  enterWorkerScope();

  mermaidToSvg('graph LR\n  A --> B');

  expect('document' in scope).toBe(false);
  expect(Object.getOwnPropertyDescriptor(scope, 'self')).toBeUndefined();
  expect(scope.self).toBe(scope);
});
