import type { ComponentType, CSSProperties } from 'react';

export type ReplFile = { name: string; code: string };

export type ReplStatus = 'idle' | 'rendering' | 'ready' | 'error';

export type CopyState = 'idle' | 'copied' | 'failed';

export type RenderContext = { signal: AbortSignal };

export type RenderFn = (
  files: ReplFile[],
  context: RenderContext,
) => Promise<Blob>;

export type Styling = { className?: string; style?: CSSProperties };

export type PartProps<P> = Styling & {
  Component: ComponentType<P & Styling>;
};
