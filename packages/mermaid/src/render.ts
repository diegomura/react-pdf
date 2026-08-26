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
 * The layout engine behind mermaid, elkjs, reads its own globals to decide what
 * it is: `self` defined and no `document` means "I am the elk worker script", so
 * it hijacks `self.onmessage` and exports no in-process worker. Inside a Web
 * Worker that describes the host, not elk, and rendering throws — taking the
 * host's own message handling with it. A stub `document` sends elk down its
 * library branch, and an own writable `self` absorbs the restore beautiful-
 * mermaid does on the way out (a worker's `self` is getter-only).
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
