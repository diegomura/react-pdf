import PDFKitDocument from 'pdfkit';
import PDFKitReference from 'pdfkit/js/reference';

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
};

export interface RenderOptions {
  imageCache: Map<string | undefined, any>;
  fieldSets: (typeof PDFKitReference)[];
}
