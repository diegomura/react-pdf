/*
PDFStructureContent - a reference to a marked structure content
By Ben Schmidt
*/

class PDFStructureContent {
  constructor(pageRef, mcid) {
    this.refs = [{ pageRef, mcid }];
  }

  push(structContent) {
    structContent.refs.forEach((ref) => this.refs.push(ref));
  }
}

export default PDFStructureContent;
