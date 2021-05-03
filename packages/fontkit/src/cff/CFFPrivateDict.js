import CFFDict from './CFFDict';
import CFFIndex from './CFFIndex';
import CFFPointer from './CFFPointer';

class CFFBlendOp {
  static decode(stream, parent, operands) {
    let numBlends = operands.pop();

    // TODO: actually blend. For now just consume the deltas
    // since we don't use any of the values anyway.
    while (operands.length > numBlends) {
      operands.pop();
    }
  }
}

export default new CFFDict([
  // key       name                    type                                          default
  [6,         'BlueValues',           'delta',                                       null],
  [7,         'OtherBlues',           'delta',                                       null],
  [8,         'FamilyBlues',          'delta',                                       null],
  [9,         'FamilyOtherBlues',     'delta',                                       null],
  [[12, 9],   'BlueScale',            'number',                                      0.039625],
  [[12, 10],  'BlueShift',            'number',                                      7],
  [[12, 11],  'BlueFuzz',             'number',                                      1],
  [10,        'StdHW',                'number',                                      null],
  [11,        'StdVW',                'number',                                      null],
  [[12, 12],  'StemSnapH',            'delta',                                       null],
  [[12, 13],  'StemSnapV',            'delta',                                       null],
  [[12, 14],  'ForceBold',            'boolean',                                     false],
  [[12, 17],  'LanguageGroup',        'number',                                      0],
  [[12, 18],  'ExpansionFactor',      'number',                                      0.06],
  [[12, 19],  'initialRandomSeed',    'number',                                      0],
  [20,        'defaultWidthX',        'number',                                      0],
  [21,        'nominalWidthX',        'number',                                      0],
  [22,        'vsindex',              'number',                                      0],
  [23,        'blend',                CFFBlendOp,                                    null],
  [19,        'Subrs',                new CFFPointer(new CFFIndex, {type: 'local'}), null]
]);
