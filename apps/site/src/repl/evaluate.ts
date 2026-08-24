import React from 'react';
import * as renderer from '@react-pdf/renderer';

export const evaluateDocument = (compiledCode: string): React.ReactElement => {
  let captured: React.ReactElement | null = null;

  const ReactPDF: Record<string, unknown> = {
    ...renderer,
    render: (element: React.ReactElement) => {
      captured = element;
    },
  };
  ReactPDF.default = ReactPDF;

  const require = (name: string) => {
    if (name === 'react') return React;
    if (
      name === '@react-pdf/renderer' ||
      name.startsWith('@react-pdf/renderer/')
    )
      return ReactPDF;
    throw new Error(`Cannot import '${name}' in the REPL`);
  };

  // Legacy examples have no import statements and expect React, ReactPDF and
  // every renderer export to be in scope, the way the old buble REPL injected
  // them. `default` is a reserved word, so it can never be a parameter name.
  const scope: Record<string, unknown> = { ...ReactPDF, React, ReactPDF };
  delete scope.default;

  const module = { exports: {} };
  const names = Object.keys(scope);

  new Function('module', 'exports', 'require', ...names, compiledCode)(
    module,
    module.exports,
    require,
    ...names.map((name) => scope[name]),
  );

  if (!captured)
    throw new Error(
      'Call ReactPDF.render(<YourDocument />) to preview a document',
    );

  return captured;
};
