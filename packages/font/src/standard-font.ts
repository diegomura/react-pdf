import PDFDocument from 'pdfkit';
import * as pdfkit from 'pdfkit';
import * as fontkit from 'fontkit';
import { Font } from './types';

// pdfkit's Node build exports registerStdFonts from the release that carries
// foliojs/pdfkit#1802 on; its browser build always has. Without it, the Node
// build reads each font's metrics from a file beside its own module on first
// use, which works as long as pdfkit sits in its own package directory.
const registerStdFonts = (
  pdfkit as { registerStdFonts?: (...fonts: unknown[]) => void }
).registerStdFonts;

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

// pdfkit ships its standard font metrics as separate modules. Its Node build
// reads them from a file beside its own built module on first use, which a
// bundler cannot follow: inlined into another file, pdfkit looks next to that
// file and finds nothing. Its browser build ships no metrics at all. Loading
// them here through a dynamic import with a static specifier keeps them lazy,
// so only the faces a document uses are read, and lets a bundler carry them
// along, in both builds alike.
const STANDARD_FONT_LOADERS: Record<
  string,
  () => Promise<{ default: unknown }>
> = {
  Courier: () => import('pdfkit/standard-fonts/Courier'),
  'Courier-Bold': () => import('pdfkit/standard-fonts/CourierBold'),
  'Courier-Oblique': () => import('pdfkit/standard-fonts/CourierOblique'),
  'Courier-BoldOblique': () =>
    import('pdfkit/standard-fonts/CourierBoldOblique'),
  Helvetica: () => import('pdfkit/standard-fonts/Helvetica'),
  'Helvetica-Bold': () => import('pdfkit/standard-fonts/HelveticaBold'),
  'Helvetica-Oblique': () => import('pdfkit/standard-fonts/HelveticaOblique'),
  'Helvetica-BoldOblique': () =>
    import('pdfkit/standard-fonts/HelveticaBoldOblique'),
  'Times-Roman': () => import('pdfkit/standard-fonts/TimesRoman'),
  'Times-Bold': () => import('pdfkit/standard-fonts/TimesBold'),
  'Times-Italic': () => import('pdfkit/standard-fonts/TimesItalic'),
  'Times-BoldItalic': () => import('pdfkit/standard-fonts/TimesBoldItalic'),
};

const standardFontLoads = new Map<string, Promise<void>>();

const loadStandardFont = (name: string): Promise<void> => {
  if (!registerStdFonts) return Promise.resolve();

  let load = standardFontLoads.get(name);

  if (!load) {
    load = STANDARD_FONT_LOADERS[name]()
      .then((module) => {
        registerStdFonts(module.default);
      })
      .catch((error) => {
        standardFontLoads.delete(name);
        throw error;
      });
    standardFontLoads.set(name, load);
  }

  return load;
};

// Create a shared lightweight document for accessing standard font instances.
// Standard fonts are created once and cached, so this is negligible overhead.
let _sharedDoc: any = null;

const openStandardFont = async (src: string) => {
  // Every pdfkit document opens Helvetica as it is created, whichever face is
  // asked for, so it has to be registered before the shared document is.
  await Promise.all([loadStandardFont('Helvetica'), loadStandardFont(src)]);

  if (!_sharedDoc) {
    _sharedDoc = new PDFDocument({ autoFirstPage: false });
  }
  _sharedDoc.font(src);
  return _sharedDoc._font;
};

class StandardFont implements Font {
  name: string;
  src: any;
  glyphNames = new Map<number, string>();
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

  static async open(src: string): Promise<StandardFont> {
    return new StandardFont(src, await openStandardFont(src));
  }

  constructor(src: string, font: any) {
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

    this.src = font;
  }

  encode(str: string) {
    const [encoded, positions] = this.src.encode(str);

    // Soft hyphens (U+00AD) should have zero width for line breaking purposes.
    // Upstream pdfkit maps them to 'hyphen' in AFM data, so we override here.
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) === 0x00ad) {
        positions[i].advanceWidth = 0;
      }
    }

    return [encoded, positions];
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

  glyphName(id: number) {
    let name = this.glyphNames.get(id);

    if (name === undefined) {
      name = this.src.font.characterToGlyph(id) as string;
      this.glyphNames.set(id, name);
    }

    return name;
  }

  getGlyph(id: number): fontkit.Glyph {
    return {
      id,
      codePoints: [id],
      isLigature: false,
      name: this.glyphName(id),
      _font: this.src,
      // @ts-expect-error assign proper value
      advanceWidth: undefined,
    };
  }

  hasGlyphForCodePoint(codePoint: number) {
    return this.glyphName(codePoint) !== '.notdef';
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
