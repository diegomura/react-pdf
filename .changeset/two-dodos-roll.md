---
'@react-pdf/renderer': patch
---

### updates for `usePDF` hook

`update` function takes the new document and renders it:

```jsx
const PdfView = () => {
  const [pdf, update] = usePdf();

  useEffect(() => {
    update(<PDFDocument />);
  }, []);

  if (pdf.loading) return null;

  // use your PDF here
  return <>{pdf.url}</>;
};
```
