export default class SpotColor {
  constructor(doc, name, C, M, Y, K) {
    this.id = 'CS' + Object.keys(doc.spotColors).length;
    this.name = name;
    this.values = [C, M, Y, K];
    this.ref = doc.ref([
      'Separation',
      this.name,
      'DeviceCMYK',
      {
        Range: [0, 1, 0, 1, 0, 1, 0, 1],
        C0: [0, 0, 0, 0],
        C1: this.values.map((value) => value / 100),
        FunctionType: 2,
        Domain: [0, 1],
        N: 1
      }
    ]);
    this.ref.end();
  }

  toString() {
    return `${this.ref.id} 0 R`;
  }
}
