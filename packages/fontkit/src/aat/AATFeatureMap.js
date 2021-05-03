// see https://developer.apple.com/fonts/TrueType-Reference-Manual/RM09/AppendixF.html
// and /System/Library/Frameworks/CoreText.framework/Versions/A/Headers/SFNTLayoutTypes.h on a Mac
const features = {
  allTypographicFeatures: {
    code: 0,
    exclusive: false,
    allTypeFeatures: 0
  },
  ligatures: {
    code: 1,
    exclusive: false,
    requiredLigatures: 0,
    commonLigatures: 2,
    rareLigatures: 4,
    // logos: 6
    rebusPictures: 8,
    diphthongLigatures: 10,
    squaredLigatures: 12,
    abbrevSquaredLigatures: 14,
    symbolLigatures: 16,
    contextualLigatures: 18,
    historicalLigatures: 20
  },
  cursiveConnection: {
    code: 2,
    exclusive: true,
    unconnected: 0,
    partiallyConnected: 1,
    cursive: 2
  },
  letterCase: {
    code: 3,
    exclusive: true
  },
    // upperAndLowerCase: 0          # deprecated
    // allCaps: 1                    # deprecated
    // allLowerCase: 2               # deprecated
    // smallCaps: 3                  # deprecated
    // initialCaps: 4                # deprecated
    // initialCapsAndSmallCaps: 5    # deprecated
  verticalSubstitution: {
    code: 4,
    exclusive: false,
    substituteVerticalForms: 0
  },
  linguisticRearrangement: {
    code: 5,
    exclusive: false,
    linguisticRearrangement: 0
  },
  numberSpacing: {
    code: 6,
    exclusive: true,
    monospacedNumbers: 0,
    proportionalNumbers: 1,
    thirdWidthNumbers: 2,
    quarterWidthNumbers: 3
  },
  smartSwash: {
    code: 8,
    exclusive: false,
    wordInitialSwashes: 0,
    wordFinalSwashes: 2,
    // lineInitialSwashes: 4
    // lineFinalSwashes: 6
    nonFinalSwashes: 8
  },
  diacritics: {
    code: 9,
    exclusive: true,
    showDiacritics: 0,
    hideDiacritics: 1,
    decomposeDiacritics: 2
  },
  verticalPosition: {
    code: 10,
    exclusive: true,
    normalPosition: 0,
    superiors: 1,
    inferiors: 2,
    ordinals: 3,
    scientificInferiors: 4
  },
  fractions: {
    code: 11,
    exclusive: true,
    noFractions: 0,
    verticalFractions: 1,
    diagonalFractions: 2
  },
  overlappingCharacters: {
    code: 13,
    exclusive: false,
    preventOverlap: 0
  },
  typographicExtras: {
    code: 14,
    exclusive: false,
    // hyphensToEmDash: 0
    // hyphenToEnDash: 2
    slashedZero: 4
  },
    // formInterrobang: 6
    // smartQuotes: 8
    // periodsToEllipsis: 10
  mathematicalExtras: {
    code: 15,
    exclusive: false,
    // hyphenToMinus: 0
    // asteristoMultiply: 2
    // slashToDivide: 4
    // inequalityLigatures: 6
    // exponents: 8
    mathematicalGreek: 10
  },
  ornamentSets: {
    code: 16,
    exclusive: true,
    noOrnaments: 0,
    dingbats: 1,
    piCharacters: 2,
    fleurons: 3,
    decorativeBorders: 4,
    internationalSymbols: 5,
    mathSymbols: 6
  },
  characterAlternatives: {
    code: 17,
    exclusive: true,
    noAlternates: 0
  },
    // user defined options
  designComplexity: {
    code: 18,
    exclusive: true,
    designLevel1: 0,
    designLevel2: 1,
    designLevel3: 2,
    designLevel4: 3,
    designLevel5: 4
  },
  styleOptions: {
    code: 19,
    exclusive: true,
    noStyleOptions: 0,
    displayText: 1,
    engravedText: 2,
    illuminatedCaps: 3,
    titlingCaps: 4,
    tallCaps: 5
  },
  characterShape: {
    code: 20,
    exclusive: true,
    traditionalCharacters: 0,
    simplifiedCharacters: 1,
    JIS1978Characters: 2,
    JIS1983Characters: 3,
    JIS1990Characters: 4,
    traditionalAltOne: 5,
    traditionalAltTwo: 6,
    traditionalAltThree: 7,
    traditionalAltFour: 8,
    traditionalAltFive: 9,
    expertCharacters: 10,
    JIS2004Characters: 11,
    hojoCharacters: 12,
    NLCCharacters: 13,
    traditionalNamesCharacters: 14
  },
  numberCase: {
    code: 21,
    exclusive: true,
    lowerCaseNumbers: 0,
    upperCaseNumbers: 1
  },
  textSpacing: {
    code: 22,
    exclusive: true,
    proportionalText: 0,
    monospacedText: 1,
    halfWidthText: 2,
    thirdWidthText: 3,
    quarterWidthText: 4,
    altProportionalText: 5,
    altHalfWidthText: 6
  },
  transliteration: {
    code: 23,
    exclusive: true,
    noTransliteration: 0
  },
    // hanjaToHangul: 1
    // hiraganaToKatakana: 2
    // katakanaToHiragana: 3
    // kanaToRomanization: 4
    // romanizationToHiragana: 5
    // romanizationToKatakana: 6
    // hanjaToHangulAltOne: 7
    // hanjaToHangulAltTwo: 8
    // hanjaToHangulAltThree: 9
  annotation: {
    code: 24,
    exclusive: true,
    noAnnotation: 0,
    boxAnnotation: 1,
    roundedBoxAnnotation: 2,
    circleAnnotation: 3,
    invertedCircleAnnotation: 4,
    parenthesisAnnotation: 5,
    periodAnnotation: 6,
    romanNumeralAnnotation: 7,
    diamondAnnotation: 8,
    invertedBoxAnnotation: 9,
    invertedRoundedBoxAnnotation: 10
  },
  kanaSpacing: {
    code: 25,
    exclusive: true,
    fullWidthKana: 0,
    proportionalKana: 1
  },
  ideographicSpacing: {
    code: 26,
    exclusive: true,
    fullWidthIdeographs: 0,
    proportionalIdeographs: 1,
    halfWidthIdeographs: 2
  },
  unicodeDecomposition: {
    code: 27,
    exclusive: false,
    canonicalComposition: 0,
    compatibilityComposition: 2,
    transcodingComposition: 4
  },
  rubyKana: {
    code: 28,
    exclusive: false,
    // noRubyKana: 0     # deprecated - use rubyKanaOff instead
    // rubyKana: 1     # deprecated - use rubyKanaOn instead
    rubyKana: 2
  },
  CJKSymbolAlternatives: {
    code: 29,
    exclusive: true,
    noCJKSymbolAlternatives: 0,
    CJKSymbolAltOne: 1,
    CJKSymbolAltTwo: 2,
    CJKSymbolAltThree: 3,
    CJKSymbolAltFour: 4,
    CJKSymbolAltFive: 5
  },
  ideographicAlternatives: {
    code: 30,
    exclusive: true,
    noIdeographicAlternatives: 0,
    ideographicAltOne: 1,
    ideographicAltTwo: 2,
    ideographicAltThree: 3,
    ideographicAltFour: 4,
    ideographicAltFive: 5
  },
  CJKVerticalRomanPlacement: {
    code: 31,
    exclusive: true,
    CJKVerticalRomanCentered: 0,
    CJKVerticalRomanHBaseline: 1
  },
  italicCJKRoman: {
    code: 32,
    exclusive: false,
    // noCJKItalicRoman: 0     # deprecated - use CJKItalicRomanOff instead
    // CJKItalicRoman: 1     # deprecated - use CJKItalicRomanOn instead
    CJKItalicRoman: 2
  },
  caseSensitiveLayout: {
    code: 33,
    exclusive: false,
    caseSensitiveLayout: 0,
    caseSensitiveSpacing: 2
  },
  alternateKana: {
    code: 34,
    exclusive: false,
    alternateHorizKana: 0,
    alternateVertKana: 2
  },
  stylisticAlternatives: {
    code: 35,
    exclusive: false,
    noStylisticAlternates: 0,
    stylisticAltOne: 2,
    stylisticAltTwo: 4,
    stylisticAltThree: 6,
    stylisticAltFour: 8,
    stylisticAltFive: 10,
    stylisticAltSix: 12,
    stylisticAltSeven: 14,
    stylisticAltEight: 16,
    stylisticAltNine: 18,
    stylisticAltTen: 20,
    stylisticAltEleven: 22,
    stylisticAltTwelve: 24,
    stylisticAltThirteen: 26,
    stylisticAltFourteen: 28,
    stylisticAltFifteen: 30,
    stylisticAltSixteen: 32,
    stylisticAltSeventeen: 34,
    stylisticAltEighteen: 36,
    stylisticAltNineteen: 38,
    stylisticAltTwenty: 40
  },
  contextualAlternates: {
    code: 36,
    exclusive: false,
    contextualAlternates: 0,
    swashAlternates: 2,
    contextualSwashAlternates: 4
  },
  lowerCase: {
    code: 37,
    exclusive: true,
    defaultLowerCase: 0,
    lowerCaseSmallCaps: 1,
    lowerCasePetiteCaps: 2
  },
  upperCase: {
    code: 38,
    exclusive: true,
    defaultUpperCase: 0,
    upperCaseSmallCaps: 1,
    upperCasePetiteCaps: 2
  },
  languageTag: { // indices into ltag table
    code: 39,
    exclusive: true
  },
  CJKRomanSpacing: {
    code: 103,
    exclusive: true,
    halfWidthCJKRoman: 0,
    proportionalCJKRoman: 1,
    defaultCJKRoman: 2,
    fullWidthCJKRoman: 3
  }
};

const feature = (name, selector) => [features[name].code, features[name][selector]];

const OTMapping = {
  rlig: feature('ligatures', 'requiredLigatures'),
  clig: feature('ligatures', 'contextualLigatures'),
  dlig: feature('ligatures', 'rareLigatures'),
  hlig: feature('ligatures', 'historicalLigatures'),
  liga: feature('ligatures', 'commonLigatures'),
  hist: feature('ligatures', 'historicalLigatures'), // ??

  smcp: feature('lowerCase', 'lowerCaseSmallCaps'),
  pcap: feature('lowerCase', 'lowerCasePetiteCaps'),

  frac: feature('fractions', 'diagonalFractions'),
  dnom: feature('fractions', 'diagonalFractions'), // ??
  numr: feature('fractions', 'diagonalFractions'), // ??
  afrc: feature('fractions', 'verticalFractions'),
  // aalt
  // abvf, abvm, abvs, akhn, blwf, blwm, blws, cfar, cjct, cpsp, falt, isol, jalt, ljmo, mset?
  // ltra, ltrm, nukt, pref, pres, pstf, psts, rand, rkrf, rphf, rtla, rtlm, size, tjmo, tnum?
  // unic, vatu, vhal, vjmo, vpal, vrt2
  // dist -> trak table?
  // kern, vkrn -> kern table
  // lfbd + opbd + rtbd -> opbd table?
  // mark, mkmk -> acnt table?
  // locl -> languageTag + ltag table

  case: feature('caseSensitiveLayout', 'caseSensitiveLayout'), // also caseSensitiveSpacing
  ccmp: feature('unicodeDecomposition', 'canonicalComposition'), // compatibilityComposition?
  cpct: feature('CJKVerticalRomanPlacement', 'CJKVerticalRomanCentered'), // guess..., probably not given below
  valt: feature('CJKVerticalRomanPlacement', 'CJKVerticalRomanCentered'),
  swsh: feature('contextualAlternates', 'swashAlternates'),
  cswh: feature('contextualAlternates', 'contextualSwashAlternates'),
  curs: feature('cursiveConnection', 'cursive'), // ??
  c2pc: feature('upperCase', 'upperCasePetiteCaps'),
  c2sc: feature('upperCase', 'upperCaseSmallCaps'),

  init: feature('smartSwash', 'wordInitialSwashes'), // ??
  fin2: feature('smartSwash', 'wordFinalSwashes'), // ??
  medi: feature('smartSwash', 'nonFinalSwashes'), // ??
  med2: feature('smartSwash', 'nonFinalSwashes'), // ??
  fin3: feature('smartSwash', 'wordFinalSwashes'), // ??
  fina: feature('smartSwash', 'wordFinalSwashes'), // ??

  pkna: feature('kanaSpacing', 'proportionalKana'),
  half: feature('textSpacing', 'halfWidthText'), // also HalfWidthCJKRoman, HalfWidthIdeographs?
  halt: feature('textSpacing', 'altHalfWidthText'),

  hkna: feature('alternateKana', 'alternateHorizKana'),
  vkna: feature('alternateKana', 'alternateVertKana'),
  // hngl: feature 'transliteration', 'hanjaToHangulSelector' # deprecated

  ital: feature('italicCJKRoman', 'CJKItalicRoman'),
  lnum: feature('numberCase', 'upperCaseNumbers'),
  onum: feature('numberCase', 'lowerCaseNumbers'),
  mgrk: feature('mathematicalExtras', 'mathematicalGreek'),

  // nalt: not enough info. what type of annotation?
  // ornm: ditto, which ornament style?

  calt: feature('contextualAlternates', 'contextualAlternates'), // or more?
  vrt2: feature('verticalSubstitution', 'substituteVerticalForms'), // oh... below?
  vert: feature('verticalSubstitution', 'substituteVerticalForms'),
  tnum: feature('numberSpacing', 'monospacedNumbers'),
  pnum: feature('numberSpacing', 'proportionalNumbers'),
  sups: feature('verticalPosition', 'superiors'),
  subs: feature('verticalPosition', 'inferiors'),
  ordn: feature('verticalPosition', 'ordinals'),
  pwid: feature('textSpacing', 'proportionalText'),
  hwid: feature('textSpacing', 'halfWidthText'),
  qwid: feature('textSpacing', 'quarterWidthText'), // also QuarterWidthNumbers?
  twid: feature('textSpacing', 'thirdWidthText'), // also ThirdWidthNumbers?
  fwid: feature('textSpacing', 'proportionalText'), //??
  palt: feature('textSpacing', 'altProportionalText'),
  trad: feature('characterShape', 'traditionalCharacters'),
  smpl: feature('characterShape', 'simplifiedCharacters'),
  jp78: feature('characterShape', 'JIS1978Characters'),
  jp83: feature('characterShape', 'JIS1983Characters'),
  jp90: feature('characterShape', 'JIS1990Characters'),
  jp04: feature('characterShape', 'JIS2004Characters'),
  expt: feature('characterShape', 'expertCharacters'),
  hojo: feature('characterShape', 'hojoCharacters'),
  nlck: feature('characterShape', 'NLCCharacters'),
  tnam: feature('characterShape', 'traditionalNamesCharacters'),
  ruby: feature('rubyKana', 'rubyKana'),
  titl: feature('styleOptions', 'titlingCaps'),
  zero: feature('typographicExtras', 'slashedZero'),

  ss01: feature('stylisticAlternatives', 'stylisticAltOne'),
  ss02: feature('stylisticAlternatives', 'stylisticAltTwo'),
  ss03: feature('stylisticAlternatives', 'stylisticAltThree'),
  ss04: feature('stylisticAlternatives', 'stylisticAltFour'),
  ss05: feature('stylisticAlternatives', 'stylisticAltFive'),
  ss06: feature('stylisticAlternatives', 'stylisticAltSix'),
  ss07: feature('stylisticAlternatives', 'stylisticAltSeven'),
  ss08: feature('stylisticAlternatives', 'stylisticAltEight'),
  ss09: feature('stylisticAlternatives', 'stylisticAltNine'),
  ss10: feature('stylisticAlternatives', 'stylisticAltTen'),
  ss11: feature('stylisticAlternatives', 'stylisticAltEleven'),
  ss12: feature('stylisticAlternatives', 'stylisticAltTwelve'),
  ss13: feature('stylisticAlternatives', 'stylisticAltThirteen'),
  ss14: feature('stylisticAlternatives', 'stylisticAltFourteen'),
  ss15: feature('stylisticAlternatives', 'stylisticAltFifteen'),
  ss16: feature('stylisticAlternatives', 'stylisticAltSixteen'),
  ss17: feature('stylisticAlternatives', 'stylisticAltSeventeen'),
  ss18: feature('stylisticAlternatives', 'stylisticAltEighteen'),
  ss19: feature('stylisticAlternatives', 'stylisticAltNineteen'),
  ss20: feature('stylisticAlternatives', 'stylisticAltTwenty')
};

  // salt: feature 'stylisticAlternatives', 'stylisticAltOne' # hmm, which one to choose

// Add cv01-cv99 features
for (let i = 1; i <= 99; i++) {
  OTMapping[`cv${`00${i}`.slice(-2)}`] = [features.characterAlternatives.code, i];
}

// create inverse mapping
let AATMapping = {};
for (let ot in OTMapping) {
  let aat = OTMapping[ot];
  if (AATMapping[aat[0]] == null) {
    AATMapping[aat[0]] = {};
  }

  AATMapping[aat[0]][aat[1]] = ot;
}

// Maps an array of OpenType features to AAT features
// in the form of {featureType:{featureSetting:true}}
export function mapOTToAAT(features) {
  let res = {};
  for (let k in features) {
    let r;
    if (r = OTMapping[k]) {
      if (res[r[0]] == null) {
        res[r[0]] = {};
      }

      res[r[0]][r[1]] = features[k];
    }
  }

  return res;
}

// Maps strings in a [featureType, featureSetting]
// to their equivalent number codes
function mapFeatureStrings(f) {
  let [type, setting] = f;
  if (isNaN(type)) {
    var typeCode = features[type] && features[type].code;
  } else {
    var typeCode = type;
  }

  if (isNaN(setting)) {
    var settingCode = features[type] && features[type][setting];
  } else {
    var settingCode = setting;
  }

  return [typeCode, settingCode];
}

// Maps AAT features to an array of OpenType features
// Supports both arrays in the form of [[featureType, featureSetting]]
// and objects in the form of {featureType:{featureSetting:true}}
// featureTypes and featureSettings can be either strings or number codes
export function mapAATToOT(features) {
  let res = {};
  if (Array.isArray(features)) {
    for (let k = 0; k < features.length; k++) {
      let r;
      let f = mapFeatureStrings(features[k]);
      if (r = AATMapping[f[0]] && AATMapping[f[0]][f[1]]) {
        res[r] = true;
      }
    }

  } else if (typeof features === 'object') {
    for (let type in features) {
      let feature = features[type];
      for (let setting in feature) {
        let r;
        let f = mapFeatureStrings([type, setting]);
        if (feature[setting] && (r = AATMapping[f[0]] && AATMapping[f[0]][f[1]])) {
          res[r] = true;
        }
      }
    }
  }

  return Object.keys(res);
}
