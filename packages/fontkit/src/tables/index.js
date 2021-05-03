let tables = {};
export default tables;

// Required Tables
import cmap from './cmap';
import head from './head';
import hhea from './hhea';
import hmtx from './hmtx';
import maxp from './maxp';
import name from './name';
import OS2 from './OS2';
import post from './post';

tables.cmap = cmap;
tables.head = head;
tables.hhea = hhea;
tables.hmtx = hmtx;
tables.maxp = maxp;
tables.name = name;
tables['OS/2'] = OS2;
tables.post = post;


// TrueType Outlines
import cvt from './cvt';
import fpgm from './fpgm';
import loca from './loca';
import prep from './prep';
import glyf from './glyf';

tables.fpgm = fpgm;
tables.loca = loca;
tables.prep = prep;
tables['cvt '] = cvt;
tables.glyf = glyf;


// PostScript Outlines
import CFFFont from '../cff/CFFFont';
import VORG from './VORG';

tables['CFF '] = CFFFont;
tables['CFF2'] = CFFFont;
tables.VORG = VORG;


// Bitmap Glyphs
import EBLC from './EBLC';
import sbix from './sbix';
import COLR from './COLR';
import CPAL from './CPAL';

tables.EBLC = EBLC;
tables.CBLC = tables.EBLC;
tables.sbix = sbix;
tables.COLR = COLR;
tables.CPAL = CPAL;


// Advanced OpenType Tables
import BASE from './BASE';
import GDEF from './GDEF';
import GPOS from './GPOS';
import GSUB from './GSUB';
import JSTF from './JSTF';

tables.BASE = BASE;
tables.GDEF = GDEF;
tables.GPOS = GPOS;
tables.GSUB = GSUB;
tables.JSTF = JSTF;

// OpenType variations tables
import HVAR from './HVAR';

tables.HVAR = HVAR;

// Other OpenType Tables
import DSIG from './DSIG';
import gasp from './gasp';
import hdmx from './hdmx';
import kern from './kern';
import LTSH from './LTSH';
import PCLT from './PCLT';
import VDMX from './VDMX';
import vhea from './vhea';
import vmtx from './vmtx';

tables.DSIG = DSIG;
tables.gasp = gasp;
tables.hdmx = hdmx;
tables.kern = kern;
tables.LTSH = LTSH;
tables.PCLT = PCLT;
tables.VDMX = VDMX;
tables.vhea = vhea;
tables.vmtx = vmtx;


// Apple Advanced Typography Tables
import avar from './avar';
import bsln from './bsln';
import feat from './feat';
import fvar from './fvar';
import gvar from './gvar';
import just from './just';
import morx from './morx';
import opbd from './opbd';

tables.avar = avar;
tables.bsln = bsln;
tables.feat = feat;
tables.fvar = fvar;
tables.gvar = gvar;
tables.just = just;
tables.morx = morx;
tables.opbd = opbd;
