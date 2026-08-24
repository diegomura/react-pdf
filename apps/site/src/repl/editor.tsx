'use client';

import { autocompletion } from '@codemirror/autocomplete';
import { javascript } from '@codemirror/lang-javascript';
import { linter, type Diagnostic } from '@codemirror/lint';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';

import { reactPdfCompletions } from './completions';
import { transpile } from './transpile';

const syntaxLinter = linter((view): Diagnostic[] => {
  try {
    transpile(view.state.doc.toString());
    return [];
  } catch (error) {
    const loc = (error as { loc?: { line: number; column: number } }).loc;
    const message = error instanceof Error ? error.message : String(error);
    if (!loc) return [{ from: 0, to: 0, severity: 'error', message }];
    const line = view.state.doc.line(
      Math.min(Math.max(loc.line, 1), view.state.doc.lines),
    );
    return [{ from: line.from, to: line.to, severity: 'error', message }];
  }
});

const extensions = [
  javascript({ jsx: true }),
  autocompletion({ override: [reactPdfCompletions] }),
  syntaxLinter,
];

export function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      height="100%"
      theme={resolvedTheme === 'light' ? 'light' : 'dark'}
      style={{ height: '100%', fontSize: 13 }}
      extensions={extensions}
    />
  );
}
