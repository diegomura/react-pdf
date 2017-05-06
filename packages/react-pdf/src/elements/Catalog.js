import Base from './Base';

class Catalog extends Base {
  render() {
    return {
      Type: '/Catalog',
      Pages: `${this.children[0].id} 0 R`,
    };
  }
}

export default Catalog;
