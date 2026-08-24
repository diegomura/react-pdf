import type React from 'react';
import type { DocumentProps } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';

import { transpile } from './transpile';
import { evaluateDocument } from './evaluate';

export type ReplRequest = { id: number; code: string };

export type ReplResponse =
  { id: number; url: string } | { id: number; error: string; line?: number };

self.onmessage = async (event: MessageEvent<ReplRequest>) => {
  const { id, code } = event.data;

  try {
    const element = evaluateDocument(
      transpile(code),
    ) as React.ReactElement<DocumentProps>;
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
