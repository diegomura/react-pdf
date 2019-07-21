import React from 'react';
import './App.css';
import { PDFDownloadLink} from '@react-pdf/renderer';
import MyDocument from './component/PDF/Document';
import { BlobProvider } from '@react-pdf/renderer';

function App() {
  return (
    <div className="App">
     <PDFDownloadLink document={<MyDocument/>} fileName="document.pdf">
        <button>Print</button>
     </PDFDownloadLink>

      <div>
            <BlobProvider document={<MyDocument/>}>
            {({ url }) => <iframe src={url}  title="pdf" style={{ width: '100%', height: '900px' }} />}
            </BlobProvider>
      </div>
    </div>
  );
}

export default App;
