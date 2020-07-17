/// <reference types="node" />

declare module '@react-pdf/stylesheet' {
  import { Style, Orientation } from '@react-pdf/types';

  interface Container {
    width: number;
    height: number;
    orientation?: Orientation;
  }

  const resolveStyle = (container: Container, style: Style | Style[]) => Style;

  export default resolveStyle;
}
