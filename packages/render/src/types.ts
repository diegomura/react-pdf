import { Font, Glyph, Position } from '@react-pdf/textkit';
import PDFKitDocument from 'pdfkit';
import PDFKitReference from 'pdfkit/js/reference';

type PDFFontSource = string | Buffer | Uint8Array | ArrayBuffer | Font;

export type Context = typeof PDFKitDocument & {
  _root: any;
  _font: any;
  _imageRegistry: any;
  _acroform: any;
  _fontSize: number;

  openImage: any;
  addNamedDestination: any;
  addPage(options?: any): Context;
  translate(x: number, y: number, options: any): Context;
  font(src: PDFFontSource, size?: number): Context;
  font(src: PDFFontSource, family: string, size?: number): Context;

  /** SVG-backend capability: receives raw textkit glyphs instead of PDF operators. Implemented by @react-pdf/svgkit's SVGDocument; when unset, the pdfkit glyph-encoding path runs. */
  glyphs?: (
    glyphs: Glyph[],
    positions: Position[],
    x: number,
    y: number,
  ) => unknown;

  /** @internal pdfkit acroform internals */
  _fieldDict: (name: string, type: string, options: any) => any;
  /** @internal pdfkit acroform internals */
  _addToParent: (ref: any) => Context;
};

export interface RenderOptions {
  imageCache: Map<string | undefined, any>;
  fieldSets: (typeof PDFKitReference)[];
}
