import PDFDocument from './document';
import { registerStdFonts } from './font/standard_fonts';
import Courier from './font/generated/Courier';
import CourierBold from './font/generated/CourierBold';
import CourierBoldOblique from './font/generated/CourierBoldOblique';
import CourierOblique from './font/generated/CourierOblique';
import Helvetica from './font/generated/Helvetica';
import HelveticaBold from './font/generated/HelveticaBold';
import HelveticaBoldOblique from './font/generated/HelveticaBoldOblique';
import HelveticaOblique from './font/generated/HelveticaOblique';
import SymbolFont from './font/generated/Symbol';
import TimesBold from './font/generated/TimesBold';
import TimesBoldItalic from './font/generated/TimesBoldItalic';
import TimesItalic from './font/generated/TimesItalic';
import TimesRoman from './font/generated/TimesRoman';
import ZapfDingbats from './font/generated/ZapfDingbats';

// Upstream lazy-loads these through require(); this package is ESM only, so the
// node build imports them statically instead.
registerStdFonts(
  Courier,
  CourierBold,
  CourierBoldOblique,
  CourierOblique,
  Helvetica,
  HelveticaBold,
  HelveticaBoldOblique,
  HelveticaOblique,
  SymbolFont,
  TimesBold,
  TimesBoldItalic,
  TimesItalic,
  TimesRoman,
  ZapfDingbats,
);

export default PDFDocument;
