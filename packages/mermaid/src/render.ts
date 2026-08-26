import { renderMermaidSVG, THEMES } from 'beautiful-mermaid';

export interface MermaidRenderOptions {
  bg?: string;
  fg?: string;
  accent?: string;
  line?: string;
  muted?: string;
  surface?: string;
  border?: string;
  transparent?: boolean;
}

/** Named themes are palettes, not a render option: expand them into colors. */
export function themeColors(theme?: string): MermaidRenderOptions {
  return theme ? { ...THEMES[theme] } : {};
}

/**
 * With `self` but no `document`, elkjs assumes it is running as its own worker
 * script and takes over `onmessage` instead of laying out the diagram. A fake
 * `document` keeps it in library mode. `self` is redefined as writable because
 * beautiful-mermaid assigns to it on the way out, and in a real worker `self`
 * is read-only.
 */
function inWorkerScope<T>(fn: () => T): T {
  const scope = globalThis as { document?: unknown; self?: unknown };
  if (
    typeof scope.document !== 'undefined' ||
    typeof scope.self === 'undefined'
  )
    return fn();

  const self = Object.getOwnPropertyDescriptor(scope, 'self');
  scope.document = {};
  Object.defineProperty(scope, 'self', {
    value: scope,
    writable: true,
    configurable: true,
  });

  try {
    return fn();
  } finally {
    delete scope.document;
    if (self) Object.defineProperty(scope, 'self', self);
    else delete scope.self;
  }
}

export function mermaidToSvg(
  definition: string,
  options?: MermaidRenderOptions,
): string {
  return inWorkerScope(() => renderMermaidSVG(definition, options as any));
}
