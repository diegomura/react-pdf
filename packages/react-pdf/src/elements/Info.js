import Base from './Base';
import { pdfObject, pdfDate } from '../utils/pdf';

class Info extends Base {
  static defaultProps = {
    keywords: [],
  };

  render() {
    const { title, author, subject, keywords } = this.props;

    return (
      pdfObject(this.id, {
        Title: `(${title})`,
        Author: `(${author})`,
        Subject: `(${subject})`,
        Keywords: `(${keywords.join(' ')})`,
        CreationDate: `(${pdfDate(new Date())})`,
        Creator: '(react-pdf)',
        Producer: '(react-pdf)',
      }) + '\n'
    );
  }
}

export default Info;
