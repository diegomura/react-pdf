// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import fontkit from './base';
import TTFFont from './TTFFont';
import WOFFFont from './WOFFFont';
import WOFF2Font from './WOFF2Font';
import TrueTypeCollection from './TrueTypeCollection';
import DFont from './DFont';

// Register font formats
fontkit.registerFormat(TTFFont);
fontkit.registerFormat(WOFFFont);
fontkit.registerFormat(TrueTypeCollection);
fontkit.registerFormat(DFont);

if (!BROWSER) {
  fontkit.registerFormat(WOFF2Font);
}

export default fontkit;
