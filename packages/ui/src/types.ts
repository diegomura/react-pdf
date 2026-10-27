import type { ComponentType, CSSProperties } from 'react';

export type PlaygroundFile = { name: string; code: string };

export type PlaygroundStatus = 'idle' | 'rendering' | 'ready' | 'error';

/** A render failure. `line` is set when the transpiler reported one. */
export type PlaygroundError = Error & { line?: number };

export type CopyState = 'idle' | 'copied' | 'failed';

export type RenderContext = { signal: AbortSignal };

export type RenderResult = { blob: Blob; numPages: number };

export type RenderFn = (
  files: PlaygroundFile[],
  context: RenderContext,
) => Promise<RenderResult>;

export type Styling = { className?: string; style?: CSSProperties };

export type PartProps<P> = Styling & {
  Component: ComponentType<P & Styling>;
};
