import codepoints from 'codepoints';
import fs from 'fs';
import UnicodeTrieBuilder from 'unicode-trie/builder';
import compile from 'dfa/compile';

const CATEGORIES = {
  B: [
    {UISC: 'Number'},
    {UISC: 'Avagraha', UGC: 'Lo'},
    {UISC: 'Bindu', UGC: 'Lo'},
    {UISC: 'Consonant'},
    {UISC: 'Consonant_Final', UGC: 'Lo'},
    {UISC: 'Consonant_Head_Letter'},
    {UISC: 'Consonant_Medial', UGC: 'Lo'},
    {UISC: 'Consonant_Subjoined', UGC: 'Lo'},
    {UISC: 'Tone_Letter'},
    {UISC: 'Vowel', UGC: 'Lo'},
    {UISC: 'Vowel_Independent'},
    {UISC: 'Vowel_Dependent', UGC: 'Lo'}
  ],
  CGJ: [0x034f],
  CM: [
    'Nukta',
    'Gemination_Mark',
    'Consonant_Killer'
  ],
  CS: [
    'Consonant_With_Stacker'
  ],
  F: [
    {UISC: 'Consonant_Final', UGC: {not: 'Lo'}},
    {UISC: 'Consonant_Succeeding_Repha'}
  ],
  FM: [
    'Syllable_Modifier'
  ],
  GB: [
    'Consonant_Placeholder',
    0x2015,
    0x2022,
    0x25fb,
    0x25fc,
    0x25fd,
    0x25fe
  ],
  H: [
    'Virama',
    'Invisible_Stacker'
  ],
  HN: [
    'Number_Joiner'
  ],
  IND: [
    'Consonant_Dead',
    'Modifying_Letter',
    {UGC: 'Po', U: {not: [0x104e, 0x2022]}}
  ],
  M: [
    {UISC: 'Consonant_Medial', UGC: {not: 'Lo'}}
  ],
  N: [
    'Brahmi_Joining_Number'
  ],
  R: [
    'Consonant_Preceding_Repha',
    'Consonant_Prefixed'
  ],
  Rsv: [
    {UGC: 'Cn'} // TODO
  ],
  S: [
    {UGC: 'So', U: {not: 0x25cc}},
    {UGC: 'Sc'}
  ],
  SM: [
    0x1b6b,
    0x1b6c,
    0x1b6d,
    0x1b6e,
    0x1b6f,
    0x1b70,
    0x1b71,
    0x1b72,
    0x1b73
  ],
  SUB: [
    {UISC: 'Consonant_Subjoined', UGC: {not: 'Lo'}}
  ],
  V: [
    {UISC: 'Vowel', UGC: {not: 'Lo'}},
    {UISC: 'Vowel_Dependent', UGC: {not: 'Lo'}},
    {UISC: 'Pure_Killer'}
  ],
  VM: [
    {UISC: 'Bindu', UGC: {not: 'Lo'}},
    'Tone_Mark',
    'Cantillation_Mark',
    'Register_Shifter',
    'Visarga'
  ],
  VS: [
    0xfe00, 0xfe01, 0xfe02, 0xfe03, 0xfe04, 0xfe05, 0xfe06, 0xfe07,
    0xfe08, 0xfe09, 0xfe0a, 0xfe0b, 0xfe0c, 0xfe0d, 0xfe0e, 0xfe0f
  ],
  WJ: [0x2060],
  ZWJ: [
    'Joiner'
  ],
  ZWNJ: [
    'Non_Joiner'
  ],
  O: [
    'Other'
  ]
};

const USE_POSITIONS = {
  F: {
    Abv: ['Top'],
    Blw: ['Bottom'],
    Pst: ['Right'],
  },
  M: {
    Abv: ['Top'],
    Blw: ['Bottom'],
    Pst: ['Right'],
    Pre: ['Left'],
  },
  CM: {
    Abv: ['Top'],
    Blw: ['Bottom'],
  },
  V: {
    Abv: ['Top', 'Top_And_Bottom', 'Top_And_Bottom_And_Right', 'Top_And_Right'],
    Blw: ['Bottom', 'Overstruck', 'Bottom_And_Right'],
    Pst: ['Right'],
    Pre: ['Left', 'Top_And_Left', 'Top_And_Left_And_Right', 'Left_And_Right'],
  },
  VM: {
    Abv: ['Top'],
    Blw: ['Bottom', 'Overstruck'],
    Pst: ['Right'],
    Pre: ['Left'],
  },
  SM: {
    Abv: ['Top'],
    Blw: ['Bottom'],
  }
};

const UISC_OVERRIDE = {
  0x17dd: 'Vowel_Dependent',
  0x1ce2: 'Cantillation_Mark',
  0x1ce3: 'Cantillation_Mark',
  0x1ce4: 'Cantillation_Mark',
  0x1ce5: 'Cantillation_Mark',
  0x1ce6: 'Cantillation_Mark',
  0x1ce7: 'Cantillation_Mark',
  0x1ce8: 'Cantillation_Mark',
  0x1ced: 'Tone_Mark'
};

const UIPC_OVERRIDE = {
  0x1b6c: 'Bottom',
  0x953: 'Not_Applicable',
  0x954: 'Not_Applicable',
  0x103c: 'Left',
  0xa926: 'Top',
  0xa927: 'Top',
  0xa928: 'Top',
  0xa929: 'Top',
  0xa92a: 'Top',
  0x111ca: 'Bottom',
  0x11300: 'Top',
  0x1133c: 'Bottom',
  0x1171e: 'Left',
  0x1cf2: 'Right',
  0x1cf3: 'Right',
  0x1cf8: 'Top',
  0x1cf9: 'Top'
};

function check(pattern, value) {
  if (typeof pattern === 'object' && pattern.not) {
    if (Array.isArray(pattern.not)) {
      return pattern.not.indexOf(value) === -1;
    } else {
      return value !== pattern.not;
    }
  }

  return value === pattern;
}

function matches(pattern, code) {
  if (typeof pattern === 'number') {
    pattern = {U: pattern};
  } else if (typeof pattern === 'string') {
    pattern = {UISC: pattern};
  }

  for (let key in pattern) {
    if (!check(pattern[key], code[key])) {
      return false;
    }
  }

  return true;
}

function getUISC(code) {
  return UISC_OVERRIDE[code.code] || code.indicSyllabicCategory || 'Other';
}

function getUIPC(code) {
  return UIPC_OVERRIDE[code.code] || code.indicPositionalCategory;
}

function getPositionalCategory(code, USE) {
  let UIPC = getUIPC(code);
  let pos = USE_POSITIONS[USE];
  if (pos) {
    for (let key in pos) {
      if (pos[key].indexOf(UIPC) !== -1) {
        return USE + key;
      }
    }
  }

  return USE;
}

function getCategory(code) {
  for (let category in CATEGORIES) {
    for (let pattern of CATEGORIES[category]) {
      if (matches(pattern, {UISC: getUISC(code), UGC: code.category, U: code.code})) {
        return getPositionalCategory(code, category);
      }
    }
  }

  return null;
}

let trie = new UnicodeTrieBuilder;
let symbols = {};
let numSymbols = 0;
let decompositions = {};
for (let i = 0; i < codepoints.length; i++) {
  let codepoint = codepoints[i];
  if (codepoint) {
    let category = getCategory(codepoint);
    if (!(category in symbols)) {
      symbols[category] = numSymbols++;
    }

    trie.set(codepoint.code, symbols[category]);

    if (codepoint.indicSyllabicCategory === 'Vowel_Dependent' && codepoint.decomposition.length > 0) {
      decompositions[codepoint.code] = decompose(codepoint.code);
    }
  }
}

function decompose(code) {
  let decomposition = [];
  let codepoint = codepoints[code];
  for (let c of codepoint.decomposition) {
    let codes = decompose(c);
    codes = codes.length > 0 ? codes : [c];
    decomposition.push(...codes);
  }

  return decomposition;
}

fs.writeFileSync(__dirname + '/useTrie.json', JSON.stringify(trie.toBuffer()));

let stateMachine = compile(fs.readFileSync(__dirname + '/use.machine', 'utf8'), symbols);
let json = Object.assign({
  categories: Object.keys(symbols),
  decompositions: decompositions
}, stateMachine);

fs.writeFileSync(__dirname + '/use.json', JSON.stringify(json));
