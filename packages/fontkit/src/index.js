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
