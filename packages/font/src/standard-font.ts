// @ts-expect-error ts being silly
import { PDFFont } from '@react-pdf/pdfkit';
import * as fontkit from 'fontkit';
import { Font } from './types';

export const STANDARD_FONTS = [
  'Courier',
  'Courier-Bold',
  'Courier-Oblique',
  'Courier-BoldOblique',
  'Helvetica',
  'Helvetica-Bold',
  'Helvetica-Oblique',
  'Helvetica-BoldOblique',
  'Times-Roman',
  'Times-Bold',
  'Times-Italic',
  'Times-BoldItalic',
];

class StandardFont implements Font {
  name: string;
  src: any;
  fullName: string;
  familyName: string;
  subfamilyName: string;
  postscriptName: string;
  copyright: string;
  version: number;
  underlinePosition: number;
  underlineThickness: number;
  italicAngle: number;
  bbox: fontkit.BBOX;
  'OS/2': fontkit.Os2Table;
  hhea: fontkit.HHEA;
  numGlyphs: number;
  characterSet: number[];
  availableFeatures: string[];
  type: any;

  constructor(src: string) {
    this.name = src;
    this.fullName = src;
    this.familyName = src;
    this.subfamilyName = src;
    this.type = 'STANDARD';
    this.postscriptName = src;
    this.availableFeatures = [];
    this.copyright = '';
    this.version = 1;
    this.underlinePosition = -100;
    this.underlineThickness = 50;
    this.italicAngle = 0;
    this.bbox = {} as any;
    this['OS/2'] = {} as any;
    this.hhea = {} as any;
    this.numGlyphs = 0;
    this.characterSet = [];

    this.src = PDFFont.open(null, src);
  }

  encode(str: string) {
    return this.src.encode(str);
  }

  layout(str: string) {
    const [encoded, positions] = this.encode(str);

    const glyphs = encoded.map((g: any, i: any) => {
      const glyph = this.getGlyph(parseInt(g, 16));
      glyph.advanceWidth = positions[i].advanceWidth;
      return glyph;
    });

    const advanceWidth = positions.reduce(
      (acc: any, p: any) => acc + p.advanceWidth,
      0,
    );

    return {
      positions,
      stringIndices: positions.map((_: any, i: any) => i),
      glyphs,
      script: 'latin',
      language: 'dflt',
      direction: 'ltr',
      features: {},
      advanceWidth,
      advanceHeight: 0,
      bbox: undefined as any,
    };
  }

  glyphForCodePoint(codePoint: number) {
    const glyph = this.getGlyph(codePoint);
    glyph.advanceWidth = 400;
    return glyph;
  }

  getGlyph(id: number): fontkit.Glyph {
    return {
      id,
      codePoints: [id],
      isLigature: false,
      name: this.src.font.characterToGlyph(id),
      _font: this.src,
      // @ts-expect-error assign proper value
      advanceWidth: undefined,
    };
  }

  hasGlyphForCodePoint(codePoint: number) {
    return this.src.font.characterToGlyph(codePoint) !== '.notdef';
  }

  // Based on empirical observation
  get ascent() {
    return 900;
  }

  // Based on empirical observation
  get capHeight() {
    switch (this.name) {
      case 'Times-Roman':
      case 'Times-Bold':
      case 'Times-Italic':
      case 'Times-BoldItalic':
        return 650;
      case 'Courier':
      case 'Courier-Bold':
      case 'Courier-Oblique':
      case 'Courier-BoldOblique':
        return 550;
      default:
        return 690;
    }
  }

  // Based on empirical observation
  get xHeight() {
    switch (this.name) {
      case 'Times-Roman':
      case 'Times-Bold':
      case 'Times-Italic':
      case 'Times-BoldItalic':
        return 440;
      case 'Courier':
      case 'Courier-Bold':
      case 'Courier-Oblique':
      case 'Courier-BoldOblique':
        return 390;
      default:
        return 490;
    }
  }

  // Based on empirical observation
  get descent() {
    switch (this.name) {
      case 'Times-Roman':
      case 'Times-Bold':
      case 'Times-Italic':
      case 'Times-BoldItalic':
        return -220;
      case 'Courier':
      case 'Courier-Bold':
      case 'Courier-Oblique':
      case 'Courier-BoldOblique':
        return -230;
      default:
        return -200;
    }
  }

  get lineGap() {
    return 0;
  }

  get unitsPerEm() {
    return 1000;
  }

  stringsForGlyph(): string[] {
    throw new Error('Method not implemented.');
  }

  glyphsForString(): fontkit.Glyph[] {
    throw new Error('Method not implemented.');
  }

  widthOfGlyph(): number {
    throw new Error('Method not implemented.');
  }

  getAvailableFeatures(): string[] {
    throw new Error('Method not implemented.');
  }

  createSubset(): fontkit.Subset {
    throw new Error('Method not implemented.');
  }

  getVariation(): any {
    throw new Error('Method not implemented.');
  }

  getFont(): any {
    throw new Error('Method not implemented.');
  }

  getName(): string | null {
    throw new Error('Method not implemented.');
  }

  setDefaultLanguage(): void {
    throw new Error('Method not implemented.');
  }
}

export default StandardFont;
