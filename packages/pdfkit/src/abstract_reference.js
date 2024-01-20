/*
PDFAbstractReference - abstract class for PDF reference
*/

class PDFAbstractReference {
  toString() {
    throw new Error('Must be implemented by subclasses');
  }
}

export default PDFAbstractReference;
