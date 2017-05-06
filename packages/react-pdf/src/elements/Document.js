import Base from './Base';

class Document extends Base {
  render() {
    const childObjects = this.children.map(child => `${child.id} 0 R`);

    return {
      Type: '/Pages',
      Kids: `[${childObjects.join(' ')}]`,
      Count: this.children.length,
    };
  }
}

export default Document;
