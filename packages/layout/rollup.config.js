import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

import pkg from './package.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Rollup plugin that transforms loadTaffy() calls into inline initSync()
 * with the WASM binary embedded as base64. This ensures the built output
 * works in browsers without needing to fetch the .wasm file at runtime.
 */
function taffyWasmInlinePlugin() {
  let wasmBase64;

  function getWasmBase64() {
    if (wasmBase64) return wasmBase64;
    // Walk up to find hoisted node_modules (yarn workspaces)
    let dir = __dirname;
    while (dir !== '/') {
      const candidate = resolve(
        dir,
        'node_modules/taffy-layout/pkg/taffy_wasm_bg.wasm',
      );
      try {
        wasmBase64 = readFileSync(candidate).toString('base64');
        return wasmBase64;
      } catch {
        // noop
      }
      dir = dirname(dir);
    }
    throw new Error('Could not find taffy_wasm_bg.wasm');
  }

  return {
    name: 'taffy-wasm-inline',
    resolveId(id) {
      // Intercept the initTaffy module to provide our own implementation
      if (id.endsWith('/yoga/initTaffy') || id.endsWith('/yoga/initTaffy.ts')) {
        return id;
      }
      return null;
    },
    load(id) {
      if (!id.endsWith('/yoga/initTaffy') && !id.endsWith('/yoga/initTaffy.ts'))
        return null;

      // Replace initTaffy module with inlined WASM version
      const base64 = getWasmBase64();
      return `
import { initSync } from 'taffy-layout';

let initialized = false;

export const initTaffy = async () => {
  if (initialized) return;
  const binaryStr = atob("${base64}");
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  initSync({ module: bytes });
  initialized = true;
};
`;
    },
  };
}

const config = [
  {
    input: 'src/index.ts',
    output: { format: 'es', dir: 'lib' },
    external: Object.keys(pkg.dependencies).concat(/@react-pdf/),
    plugins: [taffyWasmInlinePlugin(), typescript(), del({ targets: 'lib' })],
  },
  {
    input: './lib/types/index.d.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [dts(), del({ targets: 'lib/types', hook: 'buildEnd' })],
  },
];

export default config;
