/// <reference types="node" />

declare module '@react-pdf/render' {
  import { Context, DocumentNode } from '@react-pdf/types';

  const render = (context: Context, document: DocumentNode) => void;

  export default render;
}
