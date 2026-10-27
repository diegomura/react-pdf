'use client';

import { autocompletion } from '@codemirror/autocomplete';
import { javascript } from '@codemirror/lang-javascript';
import { linter, type Diagnostic } from '@codemirror/lint';
import type { PlaygroundError } from '@react-pdf/ui';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

import { cmThemeDark, cmThemeLight } from './cm-theme';
import { reactPdfCompletions } from './completions';

const base = [
  javascript({ jsx: true }),
  autocompletion({ override: [reactPdfCompletions] }),
];

export interface EditorProps {
  value: string;
  onChange: (v: string) => void;
  /** The last render failure, shown inline. Lags edits by the debounce. */
  error?: PlaygroundError | null;
  basicSetup?: React.ComponentProps<typeof CodeMirror>['basicSetup'];
}

export function Editor({ value, error, basicSetup, onChange }: EditorProps) {
  const { resolvedTheme } = useTheme();

  // Rebuilt per error so CodeMirror reconfigures and re-runs the lint pass.
  const diagnostics = useMemo(
    () =>
      linter((view): Diagnostic[] => {
        if (!error) return [];

        const { line: at, message } = error;
        if (!at) return [{ from: 0, to: 0, severity: 'error', message }];

        const line = view.state.doc.line(
          Math.min(Math.max(at, 1), view.state.doc.lines),
        );
        return [{ from: line.from, to: line.to, severity: 'error', message }];
      }),
    [error],
  );

  const extensions = useMemo(
    () => [
      ...base,
      diagnostics,
      resolvedTheme === 'dark' ? cmThemeDark : cmThemeLight,
    ],
    [diagnostics, resolvedTheme],
  );

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      height="100%"
      theme="none"
      style={{ height: '100%' }}
      extensions={extensions}
      basicSetup={basicSetup}
    />
  );
}
