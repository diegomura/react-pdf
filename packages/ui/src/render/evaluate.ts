import React from 'react';
import * as renderer from '@react-pdf/renderer';

const isValidParamName = (name: string) => {
  // Shadowing built-in Math would break `Math.floor` in legacy examples, the
  // way the old buble REPL did by injecting @react-pdf/math's Math component.
  if (name === 'Math') return false;

  try {
    // eslint-disable-next-line no-new-func
    new Function(name, '');
    return true;
  } catch {
    return false;
  }
};

// Legacy examples have no import statements and expect React, ReactPDF and
// every renderer export to be in scope, the way the old buble REPL injected
// them. Renderer exports are static, so resolve the parameter list once.
const GLOBAL_NAMES = ['React', 'ReactPDF', ...Object.keys(renderer)].filter(
  isValidParamName,
);

export class MissingModuleError extends Error {
  constructor(readonly moduleName: string) {
    super(`Cannot import '${moduleName}' in the playground`);
    this.name = 'MissingModuleError';
  }
}

export const evaluateDocument = (
  compiledCode: string,
  extraModules?: Record<string, unknown>,
): React.ReactElement => {
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
    if (extraModules && Object.hasOwn(extraModules, name))
      return extraModules[name];
    throw new MissingModuleError(name);
  };

  const scope: Record<string, unknown> = { ...ReactPDF, React, ReactPDF };
  const module = { exports: {} };

  // The body runs in its own block so that top-level `const`/`let`/`class`
  // shadow the injected parameters instead of colliding with them. Legacy
  // buble downleveled these to `var`, which redeclared params legally; sucrase
  // preserves them, and resume.txt (`const List`) or any shared URL naming a
  // renderer export would throw "Identifier has already been declared".
  // eslint-disable-next-line no-new-func
  new Function(
    'module',
    'exports',
    'require',
    ...GLOBAL_NAMES,
    `{${compiledCode}\n}`,
  )(
    module,
    module.exports,
    require,
    ...GLOBAL_NAMES.map((name) => scope[name]),
  );

  if (!captured)
    throw new Error(
      'Call ReactPDF.render(<YourDocument />) to preview a document',
    );

  return captured;
};
