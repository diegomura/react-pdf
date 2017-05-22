import Base from './Base';
import { pdfObject, pdfDate } from '../utils/pdf';

class Info extends Base {
  static defaultProps = {
    keywords: [],
  };

  render() {
    const { title, author, subject, keywords } = this.props;

    const info =
      pdfObject(this.id, {
        Title: `(${title})`,
        Author: `(${author})`,
        Subject: `(${subject})`,
        Keywords: `(${keywords.join(' ')})`,
        CreationDate: `(${pdfDate(new Date())})`,
        Creator: '(react-pdf)',
        Producer: '(react-pdf)',
      }) + '\n';

    this.offset = this.root.addOffset(info.length);

    return info;
  }
}

export default Info;
