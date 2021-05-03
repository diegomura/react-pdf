/**
 * Gets an encoding name from platform, encoding, and language ids.
 * Returned encoding names can be used in iconv-lite to decode text.
 */
export function getEncoding(platformID, encodingID, languageID = 0) {
  if (platformID === 1 && MAC_LANGUAGE_ENCODINGS[languageID]) {
    return MAC_LANGUAGE_ENCODINGS[languageID];
  }
  
  return ENCODINGS[platformID][encodingID];
}

// Map of platform ids to encoding ids.
export const ENCODINGS = [
  // unicode
  ['utf16be', 'utf16be', 'utf16be', 'utf16be', 'utf16be', 'utf16be'],
  
  // macintosh
  // Mappings available at http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/
  // 0	Roman                 17	Malayalam
  // 1	Japanese	            18	Sinhalese
  // 2	Traditional Chinese	  19	Burmese
  // 3	Korean	              20	Khmer
  // 4	Arabic	              21	Thai
  // 5	Hebrew	              22	Laotian
  // 6	Greek	                23	Georgian
  // 7	Russian	              24	Armenian
  // 8	RSymbol	              25	Simplified Chinese
  // 9	Devanagari	          26	Tibetan
  // 10	Gurmukhi	            27	Mongolian
  // 11	Gujarati	            28	Geez
  // 12	Oriya	                29	Slavic
  // 13	Bengali	              30	Vietnamese
  // 14	Tamil	                31	Sindhi
  // 15	Telugu	              32	(Uninterpreted)
  // 16	Kannada
  ['macroman', 'shift-jis', 'big5', 'euc-kr', 'iso-8859-6', 'iso-8859-8',
   'macgreek', 'maccyrillic', 'symbol', 'Devanagari', 'Gurmukhi', 'Gujarati',
   'Oriya', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Sinhalese',
   'Burmese', 'Khmer', 'macthai', 'Laotian', 'Georgian', 'Armenian', 'gb-2312-80', 
   'Tibetan', 'Mongolian', 'Geez', 'maccenteuro', 'Vietnamese', 'Sindhi'],
  
  // ISO (deprecated)
  ['ascii'],
  
  // windows
  // Docs here: http://msdn.microsoft.com/en-us/library/system.text.encoding(v=vs.110).aspx
  ['symbol', 'utf16be', 'shift-jis', 'gb18030', 'big5', 'wansung', 'johab', null, null, null, 'utf16be']
];

// Overrides for Mac scripts by language id.
// See http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/Readme.txt
export const MAC_LANGUAGE_ENCODINGS = {
  15: 'maciceland',
  17: 'macturkish',
  18: 'maccroatian',
  24: 'maccenteuro',
  25: 'maccenteuro',
  26: 'maccenteuro',
  27: 'maccenteuro',
  28: 'maccenteuro',
  30: 'maciceland',
  37: 'macromania',
  38: 'maccenteuro',
  39: 'maccenteuro',
  40: 'maccenteuro',
  143: 'macinuit', // Unsupported by iconv-lite
  146: 'macgaelic' // Unsupported by iconv-lite
};

// Map of platform ids to BCP-47 language codes.
export const LANGUAGES = [
  // unicode
  [],
  
  { // macintosh
    0: 'en',        30: 'fo',       60: 'ks',       90: 'rw',
    1: 'fr',        31: 'fa',       61: 'ku',       91: 'rn',
    2: 'de',        32: 'ru',       62: 'sd',       92: 'ny',
    3: 'it',        33: 'zh',       63: 'bo',       93: 'mg',
    4: 'nl',        34: 'nl-BE',    64: 'ne',       94: 'eo',
    5: 'sv',        35: 'ga',       65: 'sa',       128: 'cy',
    6: 'es',        36: 'sq',       66: 'mr',       129: 'eu',
    7: 'da',        37: 'ro',       67: 'bn',       130: 'ca',
    8: 'pt',        38: 'cz',       68: 'as',       131: 'la',
    9: 'no',        39: 'sk',       69: 'gu',       132: 'qu',
    10: 'he',       40: 'si',       70: 'pa',       133: 'gn',
    11: 'ja',       41: 'yi',       71: 'or',       134: 'ay',
    12: 'ar',       42: 'sr',       72: 'ml',       135: 'tt',
    13: 'fi',       43: 'mk',       73: 'kn',       136: 'ug',
    14: 'el',       44: 'bg',       74: 'ta',       137: 'dz',
    15: 'is',       45: 'uk',       75: 'te',       138: 'jv',
    16: 'mt',       46: 'be',       76: 'si',       139: 'su',
    17: 'tr',       47: 'uz',       77: 'my',       140: 'gl',
    18: 'hr',       48: 'kk',       78: 'km',       141: 'af',
    19: 'zh-Hant',  49: 'az-Cyrl',  79: 'lo',       142: 'br',
    20: 'ur',       50: 'az-Arab',  80: 'vi',       143: 'iu',
    21: 'hi',       51: 'hy',       81: 'id',       144: 'gd',
    22: 'th',       52: 'ka',       82: 'tl',       145: 'gv',
    23: 'ko',       53: 'mo',       83: 'ms',       146: 'ga',
    24: 'lt',       54: 'ky',       84: 'ms-Arab',  147: 'to',
    25: 'pl',       55: 'tg',       85: 'am',       148: 'el-polyton',
    26: 'hu',       56: 'tk',       86: 'ti',       149: 'kl',
    27: 'es',       57: 'mn-CN',    87: 'om',       150: 'az',
    28: 'lv',       58: 'mn',       88: 'so',       151: 'nn',
    29: 'se',       59: 'ps',       89: 'sw',
  },
  
  // ISO (deprecated)
  [],
  
  { // windows                                        
    0x0436: 'af',       0x4009: 'en-IN',    0x0487: 'rw',          0x0432: 'tn',       
    0x041C: 'sq',       0x1809: 'en-IE',    0x0441: 'sw',          0x045B: 'si',          
    0x0484: 'gsw',      0x2009: 'en-JM',    0x0457: 'kok',         0x041B: 'sk',          
    0x045E: 'am',       0x4409: 'en-MY',    0x0412: 'ko',          0x0424: 'sl',          
    0x1401: 'ar-DZ',    0x1409: 'en-NZ',    0x0440: 'ky',          0x2C0A: 'es-AR',       
    0x3C01: 'ar-BH',    0x3409: 'en-PH',    0x0454: 'lo',          0x400A: 'es-BO',       
    0x0C01: 'ar',       0x4809: 'en-SG',    0x0426: 'lv',          0x340A: 'es-CL',       
    0x0801: 'ar-IQ',    0x1C09: 'en-ZA',    0x0427: 'lt',          0x240A: 'es-CO',       
    0x2C01: 'ar-JO',    0x2C09: 'en-TT',    0x082E: 'dsb',         0x140A: 'es-CR',       
    0x3401: 'ar-KW',    0x0809: 'en-GB',    0x046E: 'lb',          0x1C0A: 'es-DO',       
    0x3001: 'ar-LB',    0x0409: 'en',       0x042F: 'mk',          0x300A: 'es-EC',       
    0x1001: 'ar-LY',    0x3009: 'en-ZW',    0x083E: 'ms-BN',       0x440A: 'es-SV',       
    0x1801: 'ary',      0x0425: 'et',       0x043E: 'ms',          0x100A: 'es-GT',       
    0x2001: 'ar-OM',    0x0438: 'fo',       0x044C: 'ml',          0x480A: 'es-HN',       
    0x4001: 'ar-QA',    0x0464: 'fil',      0x043A: 'mt',          0x080A: 'es-MX',       
    0x0401: 'ar-SA',    0x040B: 'fi',       0x0481: 'mi',          0x4C0A: 'es-NI',       
    0x2801: 'ar-SY',    0x080C: 'fr-BE',    0x047A: 'arn',         0x180A: 'es-PA',       
    0x1C01: 'aeb',      0x0C0C: 'fr-CA',    0x044E: 'mr',          0x3C0A: 'es-PY',       
    0x3801: 'ar-AE',    0x040C: 'fr',       0x047C: 'moh',         0x280A: 'es-PE',       
    0x2401: 'ar-YE',    0x140C: 'fr-LU',    0x0450: 'mn',          0x500A: 'es-PR',       
    0x042B: 'hy',       0x180C: 'fr-MC',    0x0850: 'mn-CN',       0x0C0A: 'es',          
    0x044D: 'as',       0x100C: 'fr-CH',    0x0461: 'ne',          0x040A: 'es',          
    0x082C: 'az-Cyrl',  0x0462: 'fy',       0x0414: 'nb',          0x540A: 'es-US',       
    0x042C: 'az',       0x0456: 'gl',       0x0814: 'nn',          0x380A: 'es-UY',     
    0x046D: 'ba',       0x0437: 'ka',       0x0482: 'oc',          0x200A: 'es-VE',       
    0x042D: 'eu',       0x0C07: 'de-AT',    0x0448: 'or',          0x081D: 'sv-FI',       
    0x0423: 'be',       0x0407: 'de',       0x0463: 'ps',          0x041D: 'sv',          
    0x0845: 'bn',       0x1407: 'de-LI',    0x0415: 'pl',          0x045A: 'syr',         
    0x0445: 'bn-IN',    0x1007: 'de-LU',    0x0416: 'pt',          0x0428: 'tg',          
    0x201A: 'bs-Cyrl',  0x0807: 'de-CH',    0x0816: 'pt-PT',       0x085F: 'tzm',         
    0x141A: 'bs',       0x0408: 'el',       0x0446: 'pa',          0x0449: 'ta',          
    0x047E: 'br',       0x046F: 'kl',       0x046B: 'qu-BO',       0x0444: 'tt',          
    0x0402: 'bg',       0x0447: 'gu',       0x086B: 'qu-EC',       0x044A: 'te',          
    0x0403: 'ca',       0x0468: 'ha',       0x0C6B: 'qu',          0x041E: 'th',          
    0x0C04: 'zh-HK',    0x040D: 'he',       0x0418: 'ro',          0x0451: 'bo',          
    0x1404: 'zh-MO',    0x0439: 'hi',       0x0417: 'rm',          0x041F: 'tr',          
    0x0804: 'zh',       0x040E: 'hu',       0x0419: 'ru',          0x0442: 'tk',          
    0x1004: 'zh-SG',    0x040F: 'is',       0x243B: 'smn',         0x0480: 'ug',          
    0x0404: 'zh-TW',    0x0470: 'ig',       0x103B: 'smj-NO',      0x0422: 'uk',          
    0x0483: 'co',       0x0421: 'id',       0x143B: 'smj',         0x042E: 'hsb',         
    0x041A: 'hr',       0x045D: 'iu',       0x0C3B: 'se-FI',       0x0420: 'ur',          
    0x101A: 'hr-BA',    0x085D: 'iu-Latn',  0x043B: 'se',          0x0843: 'uz-Cyrl',     
    0x0405: 'cs',       0x083C: 'ga',       0x083B: 'se-SE',       0x0443: 'uz',          
    0x0406: 'da',       0x0434: 'xh',       0x203B: 'sms',         0x042A: 'vi',          
    0x048C: 'prs',      0x0435: 'zu',       0x183B: 'sma-NO',      0x0452: 'cy',          
    0x0465: 'dv',       0x0410: 'it',       0x1C3B: 'sms',         0x0488: 'wo',          
    0x0813: 'nl-BE',    0x0810: 'it-CH',    0x044F: 'sa',          0x0485: 'sah',         
    0x0413: 'nl',       0x0411: 'ja',       0x1C1A: 'sr-Cyrl-BA',  0x0478: 'ii',          
    0x0C09: 'en-AU',    0x044B: 'kn',       0x0C1A: 'sr',          0x046A: 'yo',           
    0x2809: 'en-BZ',    0x043F: 'kk',       0x181A: 'sr-Latn-BA',  
    0x1009: 'en-CA',    0x0453: 'km',       0x081A: 'sr-Latn',     
    0x2409: 'en-029',   0x0486: 'quc',      0x046C: 'nso',         
  }
];
