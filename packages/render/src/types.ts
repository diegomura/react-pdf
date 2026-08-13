import { Font } from '@react-pdf/textkit';
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

  /** @internal pdfkit acroform internals */
  _fieldDict: (name: string, type: string, options: any) => any;
  /** @internal pdfkit acroform internals */
  _addToParent: (ref: any) => Context;
};

export interface RenderOptions {
  imageCache: Map<string | undefined, any>;
  fieldSets: (typeof PDFKitReference)[];
}
